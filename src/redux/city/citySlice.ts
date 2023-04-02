import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { calculateRoute, getCities } from '../../data/data';
import { RootState } from '../store';
import {
	IFetchCitiesPayload,
	IFetchDistancesPayload,
	TDistances,
} from './types';
import { addInput, TInput } from '../constants';
export const fetchCities = createAsyncThunk<string[], IFetchCitiesPayload>(
	'cities/fetchCities',
	async (payload, { rejectWithValue }) => {
		try {
			return await getCities(payload.cityStr);
		} catch (error) {
			return rejectWithValue(error as SerializedError);
		}
	},
);

export const fetchDistancesAction = createAsyncThunk<TDistances, IFetchDistancesPayload>(
	'cities/deleteUserAction',
	async (payload, { rejectWithValue }) => {
		try {
			return await calculateRoute(payload.params);
		} catch (error) {
			return rejectWithValue(error as SerializedError);
		}
	},
);

export interface CityState {
	cityListInputs: TInput[];
	cityList: string[];
	error: SerializedError | undefined;
	distances: TDistances;
}

const initialState = {
	cityListInputs: [],
	cityList: [],
	error: undefined,
	distances: [[], 0],
} as CityState;

export const citySlice = createSlice({
	name: 'city',
	initialState,
	reducers: {
		initCitiesAction(state) {
			let searchParams = new URLSearchParams(document.location.search);
			const citiesParam = searchParams.get('params');
			const cityListInputs = [addInput({ isFirst: true }), addInput()];
			if (citiesParam) {
				const cities = citiesParam.split(',');

				for (let i = 0; i < cities.length; i++) {
					if (!cities[i]) break;
					if (i < 2) {
						cityListInputs[i].value = cities[i];
						cityListInputs[i].isValid = Boolean(cities[i]);
					} else {
						cityListInputs.push({ ...addInput(), value: cities[i], isValid: Boolean(cities[i]) });
					}
				}
			}
			state.cityListInputs = cityListInputs;
		},
		chooseCityAction(state, action: PayloadAction<{ index: number; value: string }>) {
			const { index, value } = action.payload;
			const cityListInputs = [...state.cityListInputs];

			cityListInputs[index].value = value;
			cityListInputs[index].isValid = true;
			state.cityListInputs = cityListInputs;
		},
		deleteStepAction(state, action: PayloadAction<{ index: number }>) {
			const { index } = action.payload;
			const cityListInputs = [...state.cityListInputs];

			cityListInputs.splice(index, 1);
			state.cityListInputs = cityListInputs;
		},
		addStepAction(state) {
			state.cityListInputs = [...state.cityListInputs, addInput()];
		},
		validateStepAction(state, action: PayloadAction<{ valid: boolean; index: number }>) {
			const { index, valid } = action.payload;
			const cityListInputs = [...state.cityListInputs];
			cityListInputs[index].isValid = valid;
			state.cityListInputs = cityListInputs;
		},
		removeErrorAction(state) {
			state.error = undefined;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchCities.fulfilled, (state, { payload }) => {
				state.cityList = [...payload];
			})
			.addCase(fetchCities.rejected, (state, action) => {
				state.error = action.payload as SerializedError;
			})
			.addCase(fetchDistancesAction.fulfilled, (state, { payload }) => {
				state.distances = [...payload];
			})
			.addCase(fetchDistancesAction.rejected, (state, action) => {
				state.error = action.payload as SerializedError;
			});
	},
});
export const {
	initCitiesAction,
	chooseCityAction,
	deleteStepAction,
	addStepAction,
	validateStepAction,
	removeErrorAction,
} = citySlice.actions;
export default citySlice.reducer;

export const selectCityListInputs = (state: RootState) => state.city.cityListInputs;

export const selectCityList = (state: RootState) => state.city.cityList;
export const selectError = (state: RootState) => state.city.error;
export const selectDistances = (state: RootState) => state.city.distances;
