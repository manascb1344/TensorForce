import { useState, useEffect } from 'react';
import { GetStockQuoteUseCase } from '../../core/usecases/GetStockQuoteUseCase.js';
import { AlpacaApiService } from '../../infrastructure/api/AlpacaApiService.js';
import { isValidStockSymbol } from '../../shared/utils/validation.js';

/**
 * Custom hook for stock data management
 * Handles stock data fetching and state management
 */
export const useStock = () => {
	const [stockSymbol, setStockSymbol] = useState('MSFT');
	const [stock, setStock] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const stockRepository = new AlpacaApiService();
	const getStockQuoteUseCase = new GetStockQuoteUseCase(stockRepository);

	const fetchStockQuote = async symbol => {
		if (!isValidStockSymbol(symbol)) {
			setError('Invalid stock symbol');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const result = await getStockQuoteUseCase.execute(symbol);

			if (result.success) {
				setStock(result.stock);
			} else {
				setError(result.error);
				setStock(null);
			}
		} catch (error) {
			setError(error.message);
			setStock(null);
		} finally {
			setIsLoading(false);
		}
	};

	const updateStockSymbol = newSymbol => {
		if (newSymbol && newSymbol !== stockSymbol) {
			setStockSymbol(newSymbol.toUpperCase());
			fetchStockQuote(newSymbol.toUpperCase());
		}
	};

	const refreshStockData = () => {
		if (stockSymbol) {
			fetchStockQuote(stockSymbol);
		}
	};

	// Auto-fetch stock data when symbol changes
	useEffect(() => {
		if (stockSymbol) {
			fetchStockQuote(stockSymbol);
		}
	}, [stockSymbol]);

	return {
		stock,
		stockSymbol,
		isLoading,
		error,
		updateStockSymbol,
		refreshStockData,
		setStockSymbol,
	};
};
