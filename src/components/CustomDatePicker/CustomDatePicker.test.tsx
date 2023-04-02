/* eslint-disable testing-library/no-container,testing-library/no-node-access */
import { render, screen, cleanup } from '@testing-library/react';
import CustomDatePicker from './CustomDatePicker';
import { ICustomDatePickerProps } from './types';

describe('Input component', () => {
	const setup = (props: ICustomDatePickerProps) => render(<CustomDatePicker {...props} />);

	describe('Should render a datepicker', () => {
		const props = {
			date: new Date(),
			onChange: jest.fn(),
		};

		it('Should render datepicker input label', () => {
			setup(props);
			const datePicker = screen.getByText('Date');
			expect(datePicker).toBeInTheDocument();
		});
	});

	describe('Should render a input text', () => {
		cleanup();
		const props = {
			date: new Date(),
			onChange: jest.fn(),
		};

		it('Should render an input', () => {
			setup(props);
			const inputLabel = screen.getByText(/Date/i);
			expect(inputLabel).toBeInTheDocument();
		});
	});
});
