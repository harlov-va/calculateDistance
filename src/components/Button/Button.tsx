import React, { PropsWithChildren } from 'react';
import style from './Button.module.scss';
import { IButtonProps } from './types';

const Button = (props: PropsWithChildren<IButtonProps>) => {
	return (
		<button
			type="button"
			disabled={props.disabled}
			className={style.button}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
