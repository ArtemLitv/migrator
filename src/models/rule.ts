export interface RowRule {
	selectors?: string[];
	rules?: string[];
}

export interface Rule {
	selectors: RuleItem[];
	rules: RuleItem[];
}

export interface RuleItem {
	funcName: string;
	rule: string;
}

export interface FullSelectorModificator {
	[funcName: string]: (...args: any) => any;
}
