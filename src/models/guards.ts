import { anyFunction, Selector } from './rule';

export function isFullSelector(data: any): data is Required<Selector> {
	return 'current' in data;
}

export function isFunction(data: any): data is anyFunction {
	return typeof data === 'function';
}

export function isRegExp(data: any): data is RegExp {
	return !!data.test;
}
