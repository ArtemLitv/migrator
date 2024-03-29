import { Rule } from '../../models/rule';
import { log } from '../../services/logger.service';
import { getCurrentSelectorData } from '../../utils/nextSelector.util';

export const TAG =
	(rule: Rule) =>
	(match: string): string => {
		const activeSelector = getCurrentSelectorData(rule);
		log(`↳ ${activeSelector.rule}`, { isCode: true });

		// await next(rule, match);
		// TODO: тут должен быть вызов либо другого селектора, либо rule. Используется как тестовый вариант
		return match.toUpperCase();
	};

export const TAG_REGEXP = (rule: Rule): RegExp => {
	const activeSelector = getCurrentSelectorData(rule);
	const tag: string = activeSelector.rule.replace('TAG ', '');
	const template = `<${tag}[\\w\\W]*>[\\w\\W]*<\\/${tag}>`;
	const result = new RegExp(template, 'g');
	return result;
};
