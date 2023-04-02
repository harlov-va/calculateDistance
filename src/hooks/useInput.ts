import React from 'react';
import { useState } from 'react';

const useInput = (validate: (v: string) => boolean, initialValue: string) => {
	const [touched, setTouched] = useState(false);
	const [value, setValue] = useState(initialValue);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue((e.target as HTMLInputElement).value);
	};

	const onBlur = () => {
		setTouched(true);
	};

	const resetTouched = () => {
		setTouched(false);
	};

	const isValid = validate(value);

	const hasError = !isValid && touched;

	return { value, hasError, isValid, onChange, onBlur, resetTouched, setValue };
};
export default useInput;
