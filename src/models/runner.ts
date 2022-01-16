import { FullSelectorModificator, Rule } from './rule';

export interface RunnerConfig {
	filePath: string;
	ignoreFiles: string[];
	rule: Rule;
	selectors: FullSelectorModificator;
}
