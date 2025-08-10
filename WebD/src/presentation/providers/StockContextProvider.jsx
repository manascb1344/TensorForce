import React, { createContext, useContext } from 'react';
import { useStock } from '../hooks/useStock.js';

const StockContext = createContext();

/**
 * Stock context provider
 * Provides stock data and operations to components
 */
export const StockContextProvider = ({ children }) => {
	const stockData = useStock();

	return (
		<StockContext.Provider value={stockData}>{children}</StockContext.Provider>
	);
};

/**
 * Hook to use stock context
 * @returns {Object} Stock context value
 */
export const useStockContext = () => {
	const context = useContext(StockContext);
	if (!context) {
		throw new Error('useStockContext must be used within StockContextProvider');
	}
	return context;
};
