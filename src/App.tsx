import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routers from './routers';
import { useAppDispatch } from './hooks/useAppDispatch';
import { initCitiesAction } from './redux/city/citySlice';
import './App.scss';
import { initInputsAction } from './redux/input/inputSlice';

export const App = () => {
	const dispatch = useAppDispatch();
	dispatch(initCitiesAction());
	dispatch(initInputsAction());

	return (
		<div className="mainContainer" role="application">
			<RouterProvider router={routers} />
		</div>
	);
};
