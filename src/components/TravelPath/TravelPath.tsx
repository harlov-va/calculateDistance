import TextButton from '../TextButton/TextButton';
import TextInput from '../TextInput/TextInput';
import DeleteButton from '../DeleteButton/DeleteButton';
import style from './TravelPath.module.scss';
import Step from '../Stepper/Step';
import { ITravelPathProps } from './types';
import { Separator } from '../Separator/Separator';

const TravelPath = (props: ITravelPathProps) => {
	const { inputs, deleteStep, validateStep, chooseCity, addStep } = props;
	const handleAddStep = () => {
		addStep();
	};

	return (
		<div className="stepper">
			<div className={style.container}>
				{inputs.map((input, i) => (
					<Step
						key={`${input.value}${i}`}
						lastStep={i === inputs.length - 1}
						separator={<Separator />}
					>
						<div className={style.content}>
							<TextInput
								input={input}
								validateStep={(v) => validateStep(v, i)}
								onChange={(v: string) => chooseCity(i, v)}
							/>
							{inputs.length > 2 && i > 0 && <DeleteButton onClick={() => deleteStep(i)} />}
						</div>
					</Step>
				))}
				<Step>
					<div className={style.add}>
						<TextButton onClick={handleAddStep}>Add destination</TextButton>
					</div>
				</Step>
			</div>
		</div>
	);
};

export default TravelPath;
