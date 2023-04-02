import { TInput } from '../../redux/constants';

export interface ISideControlsProps {
	inputs: TInput[];
	updateCount: (val: number) => void;
	updateDate: (val: Date) => void;
}
