import React, { createContext, useContext, useState } from 'react';
import { UI_STATES } from '../../shared/constants/appConstants.js';

const AppContext = createContext();

/**
 * App context provider
 * Manages global application state
 */
export const AppContextProvider = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [isClicked, setIsClicked] = useState(UI_STATES.INITIAL);
	const [screenSize, setScreenSize] = useState(undefined);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleClick = clicked => {
		setIsClicked(prevIsClicked => ({
			...UI_STATES.INITIAL,
			[clicked]: !prevIsClicked[clicked],
		}));
	};

	const handleSubmit = event => {
		event.preventDefault();
		setIsSubmitted(true);
	};

	const value = {
		activeMenu,
		setActiveMenu,
		isClicked,
		setIsClicked,
		handleClick,
		screenSize,
		setScreenSize,
		isSubmitted,
		setIsSubmitted,
		handleSubmit,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook to use app context
 * @returns {Object} App context value
 */
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within AppContextProvider');
	}
	return context;
};
