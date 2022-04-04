export const TAG = (match: string): string => {
	// TODO: тут должен быть вызов либо другого селектора, либо rule. Используется как тестовый вариант
	return match.toUpperCase();
};

export const TAG_REGEXP = /button/g;
