import { isMatch } from 'matcher';
import { Rule } from '../../models/rule';
import { log } from '../../services/logger.service';
import { nextSelectorUtil } from '../../utils/nextSelector.util';

export const FILE = async (rule: Rule, fileName: string, fileText: string): Promise<void> => {
	const activeSelector = rule.selectors.find((selector) => selector.current);
	if (!activeSelector) {
		return;
	}
	const fileMask: string = activeSelector.rule.slice(5);
	const resultMatch = isMatch(fileName, [fileMask]);

	const selectedIndex = rule.selectors.findIndex((selector) => selector.current);
	log(`↳ ${activeSelector.rule} => ${resultMatch}`, { shift: selectedIndex || 1 });
	if (resultMatch) {
		const localRule = nextSelectorUtil(rule);
		log(fileText);
	}
};
