import reducer, { fetchCities, CityState } from './/citySlice';

const fetchCitiesPayload = ['Paris', 'Montpellier', 'Aix-en-Provence'];

describe('citySlice', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: undefined })).toEqual({
			cityListInputs: [],
			cityList: [],
			error: undefined,
			distances: [[], 0],
		});
	});

	it('receive cities by search', () => {
		const action = { type: fetchCities.fulfilled.type, payload: fetchCitiesPayload };

		const previousState: CityState = {
			cityListInputs: [],
			cityList: [],
			error: undefined,
			distances: [[], 0],
		};

		expect(reducer(previousState, action)).toEqual({
			cityListInputs: [],
			cityList: ['Paris', 'Montpellier', 'Aix-en-Provence'],
			error: undefined,
			distances: [[], 0],
		});
	});
});
