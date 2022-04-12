import { isMatch } from 'matcher';
import { isRegExp } from 'util/types';
import { isFullSelector, isFunction } from '../../models/guards';
import { FullSelectorModificator, Rule, Selector } from '../../models/rule';
import { log, logDif } from '../../services/logger.service';
import { nextSelectorUtil } from '../../utils/nextSelector.util';

export const FILE = async (rule: Rule, fileName: string, fileText: string): Promise<string> => {
	log(fileName, { isTitle: true });
	let result = '';
	const activeSelector = rule.selectors.find((selector) => selector.current);
	if (!activeSelector) {
		return fileText;
	}
	const fileMask: string = activeSelector.rule.slice(5);
	const resultMatch = isMatch(fileName, [fileMask]);

	log(`↳ ${activeSelector.rule} => ${resultMatch}`, { isCode: true });
	if (!resultMatch) {
		return fileText;
	}

	const localRule = nextSelectorUtil(rule);
	const selectors = await getSelectors();

	const currentSelector = localRule.selectors.find((selector) => selector.current);
	if (isFullSelector(currentSelector)) {
		const selectorName = currentSelector.funcName;
		const selectorFunction = selectors[selectorName];
		const regexp = selectors[selectorName + '_REGEXP'];
		if (isFunction(selectorFunction) && isRegExp(regexp)) {
			result = fileText.replace(regexp, selectorFunction);
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
