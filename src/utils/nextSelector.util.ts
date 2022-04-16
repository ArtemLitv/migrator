import { isRegExp } from 'util/types';
import { isFullSelector, isFunction } from '../models/guards';
import { FullSelectorModificator, Rule, Selector } from '../models/rule';
import { logDif } from '../services/logger.service';

export const callNextSelector = async (rule: Rule, fileText: string): Promise<string> => {
	const selectors = await getSelectors();
	const nextRule = setNextSelector(rule);
	const currentSelector = getCurrentSelectorData(nextRule);

	let result = fileText;
	if (isFullSelector(currentSelector)) {
		const selectorName = currentSelector.funcName;
		const selectorFunction = selectors[selectorName];
		const regexpFunc = selectors[selectorName + '_REGEXP'];
		const regexp = regexpFunc(nextRule);
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
	return (await import('../selectors/selectors')).default;
};

export const getCurrentSelectorData = (rule: Rule): Selector => {
	return rule.selectors.find((selector) => selector.current)!;
};

const setNextSelector = (rule: Rule): Rule => {
	const localRule: Rule = JSON.parse(JSON.stringify(rule));
	const index = localRule.selectors.findIndex((selector: Selector) => selector.current);
	const lastIndex = rule.selectors.length - 1;
	if (index === -1) {
		localRule.selectors[0].current = true;
	} else if (index === lastIndex) {
		localRule.selectors = localRule.selectors.map((selector) => ({
			...selector,
			current: false,
		}));
	} else {
		localRule.selectors[index].current = false;
		localRule.selectors[index + 1].current = true;
	}

	return localRule;
};
