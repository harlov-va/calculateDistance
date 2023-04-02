import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import style from './Error.module.scss';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeErrorAction, selectError } from '../../redux/city/citySlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
function Error() {
	const error = useTypedSelector(selectError);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(removeErrorAction());
		navigate(-1);
	};
	return (
		<>
			<div className={style.error}>
				{error?.message ? error.message : 'Oops. Something went wrong!'}
			</div>
			<div className={style.submit}>
				<Button onClick={handleClick}>Back</Button>
			</div>
		</>
	);
}

export default Error;
