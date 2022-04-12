import { isMatch } from 'matcher';
import { isRegExp } from 'util/types';
import { isFullSelector, isFunction } from '../../models/guards';
import { FullSelectorModificator, Rule, Selector } from '../../models/rule';
import { log, logDif } from '../../services/logger.service';
import { nextSelectorUtil } from '../../utils/nextSelector.util';

export const FILE = async (rule: Rule, fileName: string, fileText: string): Promise<string> => {
	const activeSelector: Selector = getCurrentSelectorData(rule);
	const selectorRule: string = activeSelector.rule;
	const fileMask: string = selectorRule.slice(5);
	const resultMatch: boolean = isMatch(fileName, [fileMask]);

	log(`↳ ${selectorRule} => ${resultMatch}`, { isCode: true });
	if (!resultMatch) {
		return fileText;
	}

	return await next(rule, fileText);
};

const getCurrentSelectorData = (rule: Rule): Selector => {
	return rule.selectors.find((selector) => selector.current)!;
};

const next = async (rule: Rule, fileText: string): Promise<string> => {
	const selectors = await getSelectors();
	const nextRule = nextSelectorUtil(rule);
	const currentSelector = getCurrentSelectorData(nextRule);

	let result = fileText;
	if (isFullSelector(currentSelector)) {
		const selectorName = currentSelector.funcName;
		const selectorFunction = selectors[selectorName];
		const regexp = selectors[selectorName + '_REGEXP'];
		if (isFunction(selectorFunction) && isRegExp(regexp)) {
			result = fileText.replace(regexp, selectorFunction(nextRule));
			logDif(fileText, result);
		}
	} else {
		console.error(`This is not a full selector. ${currentSelector}`);
	}
	return result;
};

const getSelectors = async (): Promise<FullSelectorModificator> => {
	return (await import('../selectors')).default;
};
