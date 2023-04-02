import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import Result from './pages/Result/Result';

const routers = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <Error />,
	},
	{
		path: '/result',
		element: <Result />,
		errorElement: <Error />,
	},
]);

export default routers;
