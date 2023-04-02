import { screen, fireEvent, waitFor } from '@testing-library/react';
import TextInput from './TextInput';
import { ITextInputProps } from './types';
import { EInputTypes } from '../../enums/EInputTypes';
import { renderWithProviders } from '../../utils/testUtils';
import React from 'react';

describe('TextInput Component', () => {
	const setup = (props: ITextInputProps) => {
		const utils = renderWithProviders(<TextInput {...props} />);
		const inputEl: HTMLInputElement = screen.getByLabelText('city-input');
		return {
			inputEl,
			utils,
		};
	};

	describe('Should render a list', () => {
		const props = {
			input: {
				type: EInputTypes.NUMBER_INPUT,
				value: '',
				label: 'City of origin',
				isValid: false,
			},
			onChange: jest.fn(),
			validateStep: jest.fn(),
		};

		it('Should render a input', () => {
			setup(props);
			const input = screen.getByText(/City of origin/i);
			expect(input).toBeInTheDocument();
		});

		it('Should select a city', async () => {
			const { inputEl } = setup(props);
			await fireEvent.change(inputEl, { target: { value: 'p' } });
			expect(inputEl).toBeInTheDocument();
			await waitFor(async () => {
				const option = screen.getByText('Paris');
				await fireEvent.click(option);
				expect(inputEl.value).toBe('Paris');
			});
		});

		// it('Should display an error', async () => {
		// 	const { input } = props;
		// 	input.isValid = false;
		// 	const { inputEl } = setup(props);
		// 	await fireEvent.click(inputEl);
		// 	const body = document.body;
		// 	await fireEvent.click(body);
		//
		// 	const message = screen.getByText(`You must choose the ${input.label.toLowerCase()}`);
		// 	expect(message).toBeInTheDocument();
		// });
	});
});
