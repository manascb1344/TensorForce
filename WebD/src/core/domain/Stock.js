/**
 * Stock domain model
 * Represents a stock in the system
 */
export class Stock {
  constructor(data = {}) {
    this.symbol = data.symbol || '';
    this.name = data.name || '';
    this.price = data.price || 0;
    this.change = data.change || 0;
    this.changePercent = data.changePercent || 0;
    this.volume = data.volume || 0;
    this.marketCap = data.marketCap || 0;
    this.peRatio = data.peRatio || 0;
    this.dividendYield = data.dividendYield || 0;
  }

  /**
   * Create a Stock instance from API data
   * @param {Object} apiData - Stock data from API
   * @returns {Stock} Stock instance
   */
  static fromApi(apiData) {
    return new Stock({
      symbol: apiData.symbol,
      name: apiData.name,
      price: apiData.price,
      change: apiData.change,
      changePercent: apiData.changePercent,
      volume: apiData.volume,
      marketCap: apiData.marketCap,
      peRatio: apiData.peRatio,
      dividendYield: apiData.dividendYield
    });
  }

  /**
   * Check if stock has positive change
   * @returns {boolean} True if stock price increased
   */
  isPositive() {
    return this.change > 0;
  }

  /**
   * Check if stock has negative change
   * @returns {boolean} True if stock price decreased
   */
  isNegative() {
    return this.change < 0;
  }

  /**
   * Get formatted price string
   * @returns {string} Formatted price with 2 decimal places
   */
  getFormattedPrice() {
    return this.price.toFixed(2);
  }

  /**
   * Get formatted change string
   * @returns {string} Formatted change with sign
   */
  getFormattedChange() {
    const sign = this.change >= 0 ? '+' : '';
    return `${sign}${this.change.toFixed(2)}`;
  }

  /**
   * Get formatted change percent string
   * @returns {string} Formatted change percent with sign
   */
  getFormattedChangePercent() {
    const sign = this.changePercent >= 0 ? '+' : '';
    return `${sign}${this.changePercent.toFixed(2)}%`;
  }
}
