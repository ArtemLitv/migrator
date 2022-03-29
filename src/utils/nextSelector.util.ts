import { Rule, Selector } from '../models/rule';

export const nextSelectorUtil = (rule: Rule): Rule => {
	const localRule = JSON.parse(JSON.stringify(rule));
	const index = localRule.selectors.findIndex((selector: Selector) => selector.current);
	if (index === -1) {
		localRule.selectors[0].current = true;
	} else {
		localRule.selectors[index].current = false;
		localRule.selectors[index + 1].current = true;
	}

	return localRule;
};
