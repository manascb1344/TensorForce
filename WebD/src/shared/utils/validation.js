/**
 * Validation utility functions
 * Common validation logic used across the application
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate stock symbol format
 * @param {string} symbol - Stock symbol to validate
 * @returns {boolean} True if symbol is valid
 */
export const isValidStockSymbol = (symbol) => {
  if (!symbol || typeof symbol !== 'string') {
    return false;
  }
  
  // Stock symbols should be 1-5 characters, alphanumeric
  const symbolRegex = /^[A-Z]{1,5}$/;
  return symbolRegex.test(symbol.toUpperCase());
};

/**
 * Validate user data
 * @param {Object} userData - User data to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateUserData = (userData) => {
  const errors = [];

  if (!userData.name || userData.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!userData.email || !isValidEmail(userData.email)) {
    errors.push('Valid email is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate API response
 * @param {Object} response - API response to validate
 * @returns {boolean} True if response is valid
 */
export const isValidApiResponse = (response) => {
  return response && 
         typeof response === 'object' && 
         response.status >= 200 && 
         response.status < 300;
};

/**
 * Sanitize string input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validate theme mode
 * @param {string} mode - Theme mode to validate
 * @returns {boolean} True if mode is valid
 */
export const isValidThemeMode = (mode) => {
  return ['Light', 'Dark'].includes(mode);
};

/**
 * Validate color hex format
 * @param {string} color - Color hex to validate
 * @returns {boolean} True if color is valid
 */
export const isValidHexColor = (color) => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
};
