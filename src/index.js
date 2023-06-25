import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Store } from './RTK/Store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import ContextProvider from './Context/ContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={Store}>
			<ContextProvider>
				<CookiesProvider>
					<App />
				</CookiesProvider>
			</ContextProvider>
		</Provider>
	</React.StrictMode>
);
