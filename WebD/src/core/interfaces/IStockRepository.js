/**
 * Interface for stock repository
 * Defines contract for stock data operations
 */
export class IStockRepository {
	/**
	 * Get stock quote
	 * @param {string} symbol - Stock symbol
	 * @returns {Promise<Stock>} Stock instance
	 */
	async getStockQuote(symbol) {
		throw new Error('getStockQuote method must be implemented');
	}

	/**
	 * Get account information
	 * @returns {Promise<Object>} Account data
	 */
	async getAccount() {
		throw new Error('getAccount method must be implemented');
	}

	/**
	 * Get positions
	 * @returns {Promise<Array>} Positions data
	 */
	async getPositions() {
		throw new Error('getPositions method must be implemented');
	}

	/**
	 * Get orders
	 * @returns {Promise<Array>} Orders data
	 */
	async getOrders() {
		throw new Error('getOrders method must be implemented');
	}

	/**
	 * Search stocks
	 * @param {string} query - Search query
	 * @returns {Promise<Array<Stock>>} Array of stock instances
	 */
	async searchStocks(query) {
		throw new Error('searchStocks method must be implemented');
	}
}
