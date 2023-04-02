import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import blogReducer from './input/inputSlice';
import cityReducer from './city/citySlice';

const rootReducer = combineReducers({
	city: cityReducer,
	input: blogReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
