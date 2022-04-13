import { Rule } from '../../models/rule';
import { log } from '../../services/logger.service';
import { getCurrentSelectorData, next } from '../../utils/nextSelector.util';

export const TAG = (rule: Rule) => (match: string): string => {
	const activeSelector = getCurrentSelectorData(rule);
	log(`↳ ${activeSelector.rule}`, { isCode: true });

	// await next(rule, match);
	// TODO: тут должен быть вызов либо другого селектора, либо rule. Используется как тестовый вариант
	return match;
};

export const TAG_REGEXP = /button/g;
