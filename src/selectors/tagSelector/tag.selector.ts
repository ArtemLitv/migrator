import { Rule } from "../../models/rule";

export const TAG = (rule: Rule) => (match: string): string => {
	console.log('>> TAG', rule);
	// TODO: тут должен быть вызов либо другого селектора, либо rule. Используется как тестовый вариант
	return match;
};

export const TAG_REGEXP = /button/g;
