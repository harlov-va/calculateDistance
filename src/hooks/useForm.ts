import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { makeURL } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import { useTypedSelector } from './useTypedSelector';
import {
	addStepAction,
	chooseCityAction,
	deleteStepAction,
	selectCityListInputs,
	validateStepAction,
} from '../redux/city/citySlice';
import { selectInputList, updateCountAction, updateDateAction } from '../redux/input/inputSlice';
import { EInputTypes } from '../enums/EInputTypes';

export const useForm = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const cityListInputs = useTypedSelector(selectCityListInputs);
	const inputList = useTypedSelector(selectInputList);
	const cities = useMemo(() => {
		return cityListInputs.map((input) => input.value);
	}, [cityListInputs]);

	const inputs = useMemo(() => {
		let count!: number;
		let date!: Date;
		inputList.forEach((input) => {
			switch (input.type) {
				case EInputTypes.NUMBER_INPUT:
					count = input.value as number;
					break;
				case EInputTypes.DATE_TIME:
					date = input.value as Date;
					break;
			}
		});
		return { count, date };
	}, [inputList]);

	useEffect(() => {
		const isEmpty = cities.every((city) => !Boolean(city));
		if (!isEmpty) navigate(makeURL(cities.join(), inputs.count, inputs.date.toISOString()));
	}, [cityListInputs, cities, inputs.count, inputs.date,navigate]);

	const isFormValid = useMemo(() => {
		return cityListInputs.every((input) => input.isValid);
	}, [cityListInputs]);
	function chooseCity(index: number, v: string) {
		dispatch(chooseCityAction({ index, value: v }));
	}

	function deleteStep(index: number) {
		dispatch(deleteStepAction({ index }));
	}

	const addStep = () => {
		dispatch(addStepAction());
	};

	function validateStep(valid: boolean, index: number) {
		dispatch(validateStepAction({ valid, index }));
	}

	function updateCount(val: number) {
		dispatch(updateCountAction({ value: val }));
	}

	function updateDate(val: Date) {
		dispatch(updateDateAction({ value: val }));
	}

	function submit() {
		navigate(makeURL(cities.join(), inputs.count, inputs.date.toISOString(), '/result'));
	}

	return {
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
	};
};
