import { TInput } from '../../redux/constants';

export interface ITextInputProps {
	input: TInput;
	onChange: (v: string) => void;
	validateStep: (v: boolean) => void;
}
