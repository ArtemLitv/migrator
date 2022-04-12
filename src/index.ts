import { promises, writeFileSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';
import { isFullSelector, isFunction } from './models/guards';
import { FullSelectorModificator, RowRule, Rule, RuleItem, Selector } from './models/rule';
import { RunnerConfig } from './models/runner';
import { clearLogger, log } from './services/logger.service';
import { WORK_DIR, IGNORE_DIR, CONFIG_DIR } from './services/work-dir.service';

const main = async (): Promise<void> => {
	clearLogger();
	const ignoreFiles: string[] = await getIgnoreFiles();
	// imports selectors and modificators
	const selectors = await getSelectors();
	const rule: Rule = await getRule();
	console.log('RULE =', rule);
	runner({
		filePath: WORK_DIR,
		ignoreFiles: ignoreFiles,
		rule: rule,
		selectors,
	});
};

const runner = async (config: RunnerConfig): Promise<void> => {
	const { filePath, ignoreFiles, rule, selectors } = config;
	const fileNames = await promises.readdir(filePath);

	for (const fileName of fileNames) {
		log(fileName, { isTitle: true });
		if (shouldIgnoreFile(fileName, ignoreFiles)) continue;
		const { fullFilePath, isDirectory } = await getFileInfo(filePath, fileName);
		if (isDirectory) {
			const newConfig = { ...config, filePath: fullFilePath };
			runner(newConfig);
		} else {
			// do selectors and rules
			const fileText = await getFileText(fullFilePath);
			const currentSelector = rule.selectors.find((selector) => selector.current); // FILE selector
			if (isFullSelector(currentSelector)) {
				const selectorName = currentSelector.funcName;
				const selectorFunction = selectors[selectorName];
				if (isFunction(selectorFunction)) {
					const newFileText = await selectorFunction(rule, fileName, fileText);
					writeFileSync(fullFilePath, newFileText);
				}
			} else {
				console.error(`This is not a full selector. ${currentSelector}`);
			}
		}
	}
};

const getIgnoreFiles = async (): Promise<string[]> => {
	return (await promises.readFile(IGNORE_DIR)).toString().split('\n');
};

const getSelectors = async (): Promise<FullSelectorModificator> => {
	return (await import('./selectors/selectors')).default;
};

const getRule = async (): Promise<Rule> => {
	const ruleFile = (await promises.readFile(join(CONFIG_DIR, 'rule.yaml'))).toString();
	const rule: RowRule = YAML.parse(ruleFile);
	const selectors: Selector[] =
		rule.selectors?.map((selector, index) => ({
			funcName: selector.split(' ')[0],
			current: index === 0,
			rule: selector,
		})) || [];

	const rules: RuleItem[] =
		rule.rules?.map((rule) => ({
			funcName: rule.split(' ')[0],
			rule: rule,
		})) || [];

	return {
		selectors,
		rules,
	};
};

const shouldIgnoreFile = (fileName: string, ignoreFiles: string[]): boolean => {
	return ignoreFiles.includes(fileName);
};

const getFileInfo = async (filePath: string, fileName: string): Promise<any> => {
	const fullFilePath: string = join(filePath, fileName);
	const fileInfo = await promises.lstat(fullFilePath);
	const isDirectory = fileInfo.isDirectory();
	return { fullFilePath, isDirectory };
};

const getFileText = async (filePath: string): Promise<string> => {
	return (await promises.readFile(filePath)).toString();
};

main().catch((error) => console.log(error));
