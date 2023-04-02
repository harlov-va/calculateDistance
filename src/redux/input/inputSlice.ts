import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { addInput, TInput } from '../constants';
import { EInputTypes } from '../../enums/EInputTypes';

export interface InputState {
	inputList: TInput[];
}

const initialState = {
	inputList: [],
} as InputState;
export const inputSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		initInputsAction(state) {
			let searchParams = new URLSearchParams(document.location.search);
			const res = [];
			res.push(
				{
					...addInput(),
					type: EInputTypes.NUMBER_INPUT,
					value: searchParams.get('count') ?? 1,
					label: 'Passengers',
					isValid: true,
				},
				{
					...addInput(),
					type: EInputTypes.DATE_TIME,
					value: new Date(searchParams.get('date') ?? new Date()),
					isValid: true,
				},
			);

			state.inputList = res;
		},
		updateCountAction(state, action: PayloadAction<{ value: number }>) {
			const { value } = action.payload;
			const res = [...state.inputList];
			for (let i = 0; i < res.length; i++) {
				if (res[i].type === EInputTypes.NUMBER_INPUT) {
					res[i].value = value;
					break;
				}
			}
			state.inputList = res;
		},
		updateDateAction(state, action: PayloadAction<{ value: Date }>) {
			const { value } = action.payload;
			const res = [...state.inputList];
			for (let i = 0; i < res.length; i++) {
				if (res[i].type === EInputTypes.DATE_TIME) {
					res[i].value = value;
					break;
				}
			}
			state.inputList = res;
		},
	},
});
export const { initInputsAction, updateCountAction, updateDateAction } = inputSlice.actions;
export default inputSlice.reducer;

export const selectInputList = (state: RootState) => state.input.inputList;
