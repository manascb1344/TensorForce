import apisauce from 'apisauce';
import { IStockRepository } from '../../core/interfaces/IStockRepository.js';
import { Stock } from '../../core/domain/Stock.js';

/**
 * Alpaca API service implementation
 * Implements IStockRepository interface for Alpaca trading API
 */
export class AlpacaApiService extends IStockRepository {
	constructor() {
		super();
		this.api = apisauce.create({
			baseURL: 'https://paper-api.alpaca.markets',
			headers: {
				'APCA-API-KEY-ID': import.meta.env.VITE_ALPACA_API_KEY,
				'APCA-API-SECRET-KEY': import.meta.env.VITE_ALPACA_API_SECRET,
			},
			timeout: 5000,
		});
	}

	/**
	 * Get account information
	 * @returns {Promise<Object>} Account data
	 */
	async getAccount() {
		try {
			const response = await this.api.get('v2/account');

			if (response.ok) {
				return response.data;
			} else {
				throw new Error(`API Error: ${response.status} - ${response.problem}`);
			}
		} catch (error) {
			throw new Error(`Failed to get account: ${error.message}`);
		}
	}

	/**
	 * Get positions
	 * @returns {Promise<Array>} Positions data
	 */
	async getPositions() {
		try {
			const response = await this.api.get('v2/positions');

			if (response.ok) {
				return response.data;
			} else {
				throw new Error(`API Error: ${response.status} - ${response.problem}`);
			}
		} catch (error) {
			throw new Error(`Failed to get positions: ${error.message}`);
		}
	}

	/**
	 * Get orders
	 * @returns {Promise<Array>} Orders data
	 */
	async getOrders() {
		try {
			const response = await this.api.get('v2/orders');

			if (response.ok) {
				return response.data;
			} else {
				throw new Error(`API Error: ${response.status} - ${response.problem}`);
			}
		} catch (error) {
			throw new Error(`Failed to get orders: ${error.message}`);
		}
	}

	/**
	 * Get stock quote (placeholder - Alpaca doesn't provide real-time quotes in paper trading)
	 * @param {string} symbol - Stock symbol
	 * @returns {Promise<Stock>} Stock instance
	 */
	async getStockQuote(symbol) {
		// Note: Alpaca paper trading API doesn't provide real-time quotes
		// This would need to be implemented with a different API (e.g., Alpha Vantage, IEX Cloud)
		throw new Error(
			'Real-time quotes not available in Alpaca paper trading API'
		);
	}

	/**
	 * Search stocks (placeholder)
	 * @param {string} query - Search query
	 * @returns {Promise<Array<Stock>>} Array of stock instances
	 */
	async searchStocks(query) {
		// This would need to be implemented with a different API
		throw new Error('Stock search not available in Alpaca API');
	}
}
