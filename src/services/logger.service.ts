import { LOG_DIR } from './work-dir.service';
import { appendFileSync, writeFileSync } from 'fs';

export interface LogOption {
	shift: number;
}

export const log = (message: string, option?: LogOption): void => {
	let shift = '';
	if (option) {
		shift = '\t'.repeat(option.shift);
	}
	appendFileSync(LOG_DIR, `${shift}${message}` + '\n');
};

export const clearLogger = (): void => {
	writeFileSync(LOG_DIR, '');
};
