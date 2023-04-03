import React, { useCallback } from 'react';
import style from './SideControls.module.scss';
import NumberInput from '../NumberInput/NumberInput';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';
import { ISideControlsProps } from './types';
import { EInputTypes } from '../../enums/EInputTypes';

export const SideControls = (props: ISideControlsProps) => {
	const { inputs, updateCount, updateDate } = props;

	const handleUpdateCount = useCallback(
		(v: number) => {
			updateCount(v);
		},
		[updateCount],
	);

	const handleUpdateDate = useCallback(
		(date: Date) => {
			updateDate(date);
		},
		[updateDate],
	);

	const renderContent = () => {
		return inputs.map((input, index) => {
			switch (input.type) {
				case EInputTypes.NUMBER_INPUT:
					return (
						<div key={input.value.toString() + index}>
							<NumberInput
								initialValue={input.value as number}
								label={input.label}
								handler={handleUpdateCount}
							/>
						</div>
					);
				default:
					return (
						<div key={input.value.toString() + index}>
							<CustomDatePicker onChange={handleUpdateDate} date={input.value as Date} />
						</div>
					);
			}
		});
	};

	return <div className={style.sideControls}>{renderContent()}</div>;
};
