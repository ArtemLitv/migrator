// import { matcher } from '../../../node_modules/matcher/index';

import { Rule } from '../../models/rule';
import { nextSelectorUtil } from '../../utils/nextSelector.util';

export const FILE = (rule: Rule, fileName: string): void => {
	// const fileMask: string = rule.slice(5, -1);
	// matcher(fileNames, [fileMask]);
	// return;
	const localRule = nextSelectorUtil(rule);
	const selectedIndex = localRule.selectors.findIndex((selector) => selector.current);
	const shift = '\t'.repeat(selectedIndex || 1);
	console.log(shift + '↳ FILE');
};
