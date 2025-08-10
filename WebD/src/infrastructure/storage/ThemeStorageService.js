import { Theme } from '../../core/domain/Theme.js';

/**
 * Theme storage service
 * Handles theme data persistence in localStorage
 */
export class ThemeStorageService {
	constructor() {
		this.themeKey = 'themeMode';
		this.colorKey = 'colorMode';
	}

	/**
	 * Load theme from storage
	 * @returns {Theme} Theme instance
	 */
	loadTheme() {
		try {
			if (typeof window === 'undefined') {
				return new Theme();
			}

			const storedData = {
				themeMode: localStorage.getItem(this.themeKey),
				colorMode: localStorage.getItem(this.colorKey),
			};

			return Theme.fromStorage(storedData);
		} catch (error) {
			console.warn('Failed to load theme from storage:', error);
			return new Theme();
		}
	}

	/**
	 * Save theme to storage
	 * @param {Theme} theme - Theme instance
	 */
	saveTheme(theme) {
		try {
			if (typeof window === 'undefined') {
				return;
			}

			if (theme instanceof Theme) {
				theme.saveToStorage();
			} else {
				throw new Error('Invalid theme object');
			}
		} catch (error) {
			console.error('Failed to save theme to storage:', error);
		}
	}

	/**
	 * Clear theme from storage
	 */
	clearTheme() {
		try {
			if (typeof window === 'undefined') {
				return;
			}

			localStorage.removeItem(this.themeKey);
			localStorage.removeItem(this.colorKey);
		} catch (error) {
			console.error('Failed to clear theme from storage:', error);
		}
	}

	/**
	 * Check if theme exists in storage
	 * @returns {boolean} True if theme exists
	 */
	hasTheme() {
		if (typeof window === 'undefined') {
			return false;
		}

		return !!(
			localStorage.getItem(this.themeKey) || localStorage.getItem(this.colorKey)
		);
	}
}
