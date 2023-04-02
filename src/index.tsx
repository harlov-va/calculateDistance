import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';

const domContainer = document.getElementById('root');

if (domContainer) {
	const root = ReactDOM.createRoot(domContainer);
	root.render(
		<Provider store={setupStore(undefined)}>
			<App />
		</Provider>,
	);
}
