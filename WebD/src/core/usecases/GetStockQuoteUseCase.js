import { Stock } from '../domain/Stock.js';

/**
 * Use case for getting stock quotes
 * Handles the business logic for stock data retrieval
 */
export class GetStockQuoteUseCase {
  constructor(stockRepository) {
    this.stockRepository = stockRepository;
  }

  /**
   * Execute stock quote retrieval
   * @param {string} symbol - Stock symbol
   * @returns {Promise<Object>} Stock quote result
   */
  async execute(symbol) {
    try {
      // Validate symbol
      if (!symbol || typeof symbol !== 'string') {
        throw new Error('Invalid stock symbol');
      }

      // Get stock data from repository
      const stockData = await this.stockRepository.getStockQuote(symbol.toUpperCase());

      // Create stock domain model
      const stock = Stock.fromApi(stockData);

      return {
        success: true,
        stock,
        data: stockData
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stock: null
      };
    }
  }

  /**
   * Execute multiple stock quotes retrieval
   * @param {Array<string>} symbols - Array of stock symbols
   * @returns {Promise<Object>} Multiple stock quotes result
   */
  async executeMultiple(symbols) {
    try {
      if (!Array.isArray(symbols) || symbols.length === 0) {
        throw new Error('Invalid symbols array');
      }

      const results = await Promise.allSettled(
        symbols.map(symbol => this.execute(symbol))
      );

      const stocks = results
        .filter(result => result.status === 'fulfilled' && result.value.success)
        .map(result => result.value.stock);

      const errors = results
        .filter(result => result.status === 'rejected' || !result.value.success)
        .map(result => result.reason || result.value.error);

      return {
        success: stocks.length > 0,
        stocks,
        errors
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stocks: []
      };
    }
  }
}
