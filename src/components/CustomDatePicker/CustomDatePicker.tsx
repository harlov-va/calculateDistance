import { useState } from 'react';
import { getMonth, getYear } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.scss';
import { ICustomDatePickerProps } from './types';

const CustomDatePicker = (props: ICustomDatePickerProps) => {
	const { date, onChange } = props;
	const [startDate, setStartDate] = useState(date);
	const years = Array.from('0123456789', (s) => Number(s) + 2023);
	const months = [
		'JAN',
		'FEB',
		'MAR',
		'APR',
		'MAY',
		'JUN',
		'JUL',
		'AUG',
		'SEP',
		'OCT',
		'NOV',
		'DEC',
	];

	function updateDate(date: Date) {
		setStartDate(date);
		onChange(date);
	}
	return (
		<>
			<label className="labelDate">Date</label>
			<DatePicker
				calendarStartDay={1}
				renderCustomHeader={({
					date,
					changeYear,
					changeMonth,
					decreaseMonth,
					increaseMonth,
					prevMonthButtonDisabled,
					nextMonthButtonDisabled,
				}) => (
					<div
						style={{
							margin: 10,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
							{'<'}
						</button>

						<select
							value={months[getMonth(date)]}
							onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
						>
							{months.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>

						<select
							value={getYear(date)}
							onChange={({ target: { value } }) => changeYear(Number(value))}
						>
							{years.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>

						<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
							{'>'}
						</button>
					</div>
				)}
				selected={startDate}
				onChange={(date: Date) => updateDate(date)}
				placeholderText="Pick a date to travel"
			/>
		</>
	);
};

export default CustomDatePicker;
