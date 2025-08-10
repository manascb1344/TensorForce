/**
 * Theme domain model
 * Represents theme settings in the system
 */
export class Theme {
  constructor(data = {}) {
    this.mode = data.mode || 'Dark';
    this.color = data.color || '#03C9D7';
    this.settingsOpen = data.settingsOpen || false;
  }

  /**
   * Create a Theme instance from localStorage data
   * @param {Object} storedData - Data from localStorage
   * @returns {Theme} Theme instance
   */
  static fromStorage(storedData = {}) {
    return new Theme({
      mode: storedData.themeMode || 'Dark',
      color: storedData.colorMode || '#03C9D7',
      settingsOpen: false
    });
  }

  /**
   * Save theme to localStorage
   */
  saveToStorage() {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem('themeMode', this.mode);
    localStorage.setItem('colorMode', this.color);
  }

  /**
   * Toggle theme mode
   */
  toggleMode() {
    this.mode = this.mode === 'Dark' ? 'Light' : 'Dark';
    this.saveToStorage();
  }

  /**
   * Set theme color
   * @param {string} color - Hex color value
   */
  setColor(color) {
    this.color = color;
    this.saveToStorage();
  }

  /**
   * Check if theme is dark mode
   * @returns {boolean} True if dark mode
   */
  isDarkMode() {
    return this.mode === 'Dark';
  }
}
