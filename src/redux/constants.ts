import { EInputTypes } from '../enums/EInputTypes';

export const defaultValue = {
	type: EInputTypes.TEXT_INPUT,
	value: '',
	label: '',
	isValid: false,
};

export type TInput = {
	type: EInputTypes;
	value: string | number | Date;
	label: string;
	isValid: boolean;
};

export interface IAddInputParams {
	type?: EInputTypes;
	isFirst?: boolean;
}
export function addInput(params?: IAddInputParams) {
	const { type = EInputTypes.TEXT_INPUT, isFirst = false } = params ?? {};
	return {
		...defaultValue,
		type,
		label: `City of ${isFirst ? 'origin' : 'destination'}`,
	};
}
