import { promises } from 'fs';
import { join } from 'path';
import YAML from 'yaml';
import { RowRule, Rule, RuleItem } from './models/rule';
import { RunnerConfig } from './models/runner';
import { WORK_DIR, IGNORE_DIR, CONFIG_DIR } from './services/work-dir.service';

const main = async () => {
	const ignoreFiles: string[] = await getIgnoreFiles();
	const rule: Rule = await getRule();
	runner({ filePath: WORK_DIR, ignoreFiles: ignoreFiles, rule: rule });
};

const runner = async (config: RunnerConfig): Promise<void> => {
	const { filePath, ignoreFiles, rule } = config;
	const fileNames = await promises.readdir(filePath);

	for (const fileName of fileNames) {
		if (shouldIgnoreFile(fileName, ignoreFiles)) continue;
		const { fullFilePath, isDirectory } = await getFileInfo(filePath, fileName);
		if (isDirectory) {
			const newConfig = { ...config, filePath: fullFilePath };
			runner(newConfig);
		} else {
			// do selectors and rules
			console.log(fullFilePath);
		}
	}
};

const getIgnoreFiles = async (): Promise<string[]> => {
	return (await promises.readFile(IGNORE_DIR)).toString().split('\n');
};

const getRule = async (): Promise<Rule> => {
	const ruleFile = (await promises.readFile(join(CONFIG_DIR, 'rule.yaml'))).toString();
	const rule: RowRule = YAML.parse(ruleFile);
	const selectors: RuleItem[] =
		rule.selectors?.map((selector) => ({
			funcName: selector.split(' ')[0],
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

main().catch((error) => console.log(error));
