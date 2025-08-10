/**
 * User domain model
 * Represents a user in the system
 */
export class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.picture = data.picture || '';
    this.sub = data.sub || '';
  }

  /**
   * Create a User instance from Auth0 user data
   * @param {Object} auth0User - Auth0 user object
   * @returns {User} User instance
   */
  static fromAuth0(auth0User) {
    return new User({
      id: auth0User.sub,
      name: auth0User.name,
      email: auth0User.email,
      picture: auth0User.picture,
      sub: auth0User.sub
    });
  }

  /**
   * Convert user to API payload format
   * @returns {Object} API payload
   */
  toApiPayload() {
    return {
      username: this.name,
      email: this.email
    };
  }

  /**
   * Check if user is valid
   * @returns {boolean} True if user has required fields
   */
  isValid() {
    return !!(this.name && this.email);
  }
}
