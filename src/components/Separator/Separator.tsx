import React from 'react';
import style from './Separator.module.scss';

export const Separator = () => {
	return (
		<div className={style.dots}>
			{Array(6)
				.fill(null)
				.map((_, index) => (
					<div key={index} className={style.dot}></div>
				))}
		</div>
	);
};
