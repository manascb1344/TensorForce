import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_CONFIG } from './shared/constants/appConstants.js';
import { AppContextProvider } from './presentation/providers/AppContextProvider.jsx';
import AppRoutes from './presentation/pages/AppRoutes.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Auth0Provider
			domain={AUTH0_CONFIG.DOMAIN}
			clientId={AUTH0_CONFIG.CLIENT_ID}
			authorizationParams={{
				redirect_uri: AUTH0_CONFIG.REDIRECT_URI,
			}}
		>
			<BrowserRouter>
				<AppContextProvider>
					<AppRoutes />
				</AppContextProvider>
			</BrowserRouter>
		</Auth0Provider>
	</React.StrictMode>
);
