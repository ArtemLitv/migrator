export type anyFunction = (...args: any) => any;

export interface RowRule {
	selectors?: string[];
	rules?: string[];
}

export interface Rule {
	selectors: Selector[];
	rules: RuleItem[];
}

export interface Selector extends RuleItem {
	current: boolean;
}

export interface RuleItem {
	funcName: string;
	rule: string;
}

export interface FullSelectorModificator {
	[key: string]: anyFunction | RegExp;
}
