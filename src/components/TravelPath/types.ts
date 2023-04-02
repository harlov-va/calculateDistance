import { TInput } from '../../redux/constants';

export interface ITravelPathProps {
	inputs: TInput[];
	deleteStep: (i: number) => void;
	chooseCity: (i: number, v: string) => void;
	addStep: () => void;
	validateStep: (v: boolean, i: number) => void;
}
