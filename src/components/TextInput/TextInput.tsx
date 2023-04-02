import React, { useState, useEffect, useRef } from 'react';
import useInput from '../../hooks/useInput';
import ItemList from './ItemList';
import './TextInput.scss';
import { ITextInputProps } from './types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchCities, selectCityList, selectError } from '../../redux/city/citySlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const TextInput = (props: ITextInputProps) => {
	const { input } = props;
	const dispatch = useAppDispatch();
	const { value: inputValue, label } = input;
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const cities = useTypedSelector(selectCityList);
	const error = useTypedSelector(selectError);
	const ref = useRef<any>(null);

	const { value, isValid, hasError, onChange, onBlur, setValue, resetTouched } = useInput(
		(v: string) => cities.includes(v),
		inputValue as string,
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
			if (ref && ref.current && !ref.current.contains(event.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keypress', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keypress', handleClickOutside);
		};
	}, [ref]);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				await dispatch(fetchCities({ cityStr: value.trim() }));
			} catch (e) {
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [value, dispatch]);

	useEffect(() => {
		if (error) throw new Error();
	}, [error]);

	const chooseCity = (city: string) => {
		resetTouched();
		props.onChange(city);
		setOpen(false);
		setValue(city);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOpen(true);
		onChange(e);
	};

	const handleBlur = () => {
		onBlur();
		if (isValid) chooseCity(value);
		else props.validateStep(isValid);
	};

	return (
		<div className="wrapper" ref={ref}>
			<label htmlFor="input" className="label">
				{label}
			</label>
			<input
				id="input"
				type="text"
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				className={`${'input'}${hasError && !open ? ' red' : ''}`}
				autoComplete="off"
				aria-label="city-input"
			/>
			{hasError && !open && <div className="error">You must choose the {label.toLowerCase()}</div>}
			{open && <ItemList loading={loading} items={cities} handler={chooseCity} />}
		</div>
	);
};

export default TextInput;
