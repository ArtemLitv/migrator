import { isMatch } from 'matcher';
import { Rule, Selector } from '../../models/rule';
import { log } from '../../services/logger.service';
import { getCurrentSelectorData, next } from '../../utils/nextSelector.util';

export const FILE = async (rule: Rule, fileName: string, fileText: string): Promise<string> => {
	// console.log('FILE =', rule);
	const activeSelector: Selector = getCurrentSelectorData(rule);
	const selectorRule: string = activeSelector.rule;
	const fileMask: string = selectorRule.slice(5);
	const resultMatch: boolean = isMatch(fileName, [fileMask]);

	log(`↳ ${selectorRule} => ${resultMatch}`, { isCode: true });
	if (!resultMatch) {
		return new Promise((resolve) => resolve(fileText));
	}

	return await next(rule, fileText);
};
