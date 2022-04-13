import { LOG_DIR } from './work-dir.service';
import { appendFileSync, writeFileSync } from 'fs';

export interface LogOption {
	isCode?: boolean;
	isTitle?: boolean;
}

export const log = (message: string, option?: LogOption): void => {
	if (option?.isCode) {
		message = `\`${message}\`<br>`;
	}
	if (option?.isTitle) {
		message = `# ${message}`;
	}
	appendFileSync(LOG_DIR, `${message}` + '\n');
};

export const logDif = (before: string, after: string): void => {
	const header = '|before|after|\n|-|-|';
	const body = `|${sanitize(before)}|${sanitize(after)}|`;
	const table = header + '\n' + body;

	appendFileSync(LOG_DIR, table + '\n');
};

const sanitize = (text: string): string => {
	return text
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/[\n\r]/g, '<br>')
		.replace(/<br><br>/g, '<br>');
};
export const clearLogger = (): void => {
	writeFileSync(LOG_DIR, '');
};
