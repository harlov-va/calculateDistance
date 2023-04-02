import style from './Step.module.scss';
import StepIcon from '../Stepper/StepIcon';
import DeleteButton from '../DeleteButton/DeleteButton';
import { IStepProps } from './types';

const Step = (props: React.PropsWithChildren<IStepProps>) => {
	const { lastStep, separator, children, onDelete } = props;
	return (
		<div className={style.step}>
			<StepIcon lastStep={lastStep} />
			{children}
			{!lastStep && separator}

			{onDelete ? <DeleteButton onClick={onDelete} /> : null}
		</div>
	);
};

export default Step;
