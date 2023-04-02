import React from 'react';
import TravelPath from '../../components/TravelPath/TravelPath';
import Button from '../../components/Button/Button';
import { useForm } from '../../hooks/useForm';
import style from './Home.module.scss';
import { SideControls } from '../../components/SideControls/SideControls';

function Home() {
	const {
		cityListInputs,
		inputList,
		isFormValid,
		deleteStep,
		chooseCity,
		addStep,
		validateStep,
		updateCount,
		updateDate,
		submit,
	} = useForm();

	const handleSubmit = () => {
		submit();
	};

	return (
		<div className={style.container}>
			<TravelPath
				inputs={cityListInputs}
				deleteStep={deleteStep}
				chooseCity={chooseCity}
				addStep={addStep}
				validateStep={validateStep}
			/>
			<SideControls inputs={inputList} updateCount={updateCount} updateDate={updateDate} />
			<div className={style.submit}>
				<Button disabled={!isFormValid} onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default Home;
