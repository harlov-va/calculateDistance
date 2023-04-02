import { screen } from '@testing-library/react';
import TravelPath from './TravelPath';
import { ITravelPathProps } from './types';
import { EInputTypes } from '../../enums/EInputTypes';
import { renderWithProviders } from '../../utils/testUtils';
import React from 'react';

describe('TravelPath Component', () => {
	const setup = (props: ITravelPathProps) => {
		const utils = renderWithProviders(<TravelPath {...props} />);
		return {
			utils,
		};
	};

	describe('Should render a list of inputs', () => {
		const props = {
			inputs: [
				{
					type: EInputTypes.TEXT_INPUT,
					value: '',
					label: 'City of origin',
					isValid: false,
				},
				{
					type: EInputTypes.TEXT_INPUT,
					value: '',
					label: 'City of destination',
					isValid: false,
				},
			],
			deleteStep: jest.fn(),
			chooseCity: jest.fn(),
			addStep: jest.fn(),
			validateStep: jest.fn(),
		};

		it('Should render two inputs', () => {
			setup(props);
			let label = screen.getByText(/City of origin/i);
			expect(label).toBeInTheDocument();
			label = screen.getByText(/City of destination/i);
			expect(label).toBeInTheDocument();
		});

		// it('Should render a Delete button', async () => {
		// 	setup(props);
		// 	let addButton = screen.getByText(/Add destination/i);
		//
		// 	await waitFor(async () => {
		// 		await fireEvent.click(addButton);
		// 		const deleteButton = screen.getByLabelText('delete-button');
		// 		expect(deleteButton).toBeInTheDocument();
		// 	});
		// });

		it('Should render without a Delete button', () => {
			setup(props);
			const deleteButton = screen.queryByLabelText('delete-button');
			expect(props.inputs).toHaveLength(2);
			expect(deleteButton).toBeNull();
		});
	});
});
