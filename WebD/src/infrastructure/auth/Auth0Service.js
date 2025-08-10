import { Auth0Provider } from '@auth0/auth0-react';

/**
 * Auth0 service configuration
 * Manages Auth0 authentication setup
 */
export class Auth0Service {
	constructor() {
		this.domain = 'dev-ovhg6woj2jzt3u4i.au.auth0.com';
		this.clientId = 'pEXH5RDJNSLcLz8VAH3Ac5kpI4b6gq8w';
	}

	/**
	 * Get Auth0 provider configuration
	 * @returns {Object} Auth0Provider props
	 */
	getProviderConfig() {
		return {
			domain: this.domain,
			clientId: this.clientId,
			authorizationParams: {
				redirect_uri: window.location.origin,
			},
		};
	}

	/**
	 * Create Auth0 provider component
	 * @param {React.ReactNode} children - Child components
	 * @returns {JSX.Element} Auth0Provider component
	 */
	createProvider(children) {
		return (
			<Auth0Provider {...this.getProviderConfig()}>{children}</Auth0Provider>
		);
	}

	/**
	 * Check if Auth0 is properly configured
	 * @returns {boolean} True if configuration is valid
	 */
	isConfigured() {
		return !!(this.domain && this.clientId);
	}
}
