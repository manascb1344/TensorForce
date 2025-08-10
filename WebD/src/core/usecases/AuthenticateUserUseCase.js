import { User } from '../domain/User.js';

/**
 * Use case for user authentication
 * Handles the business logic for user authentication
 */
export class AuthenticateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Execute user authentication
   * @param {Object} auth0User - Auth0 user data
   * @returns {Promise<Object>} Authentication result
   */
  async execute(auth0User) {
    try {
      // Create user domain model from Auth0 data
      const user = User.fromAuth0(auth0User);

      // Validate user data
      if (!user.isValid()) {
        throw new Error('Invalid user data');
      }

      // Authenticate with backend
      const result = await this.userRepository.authenticate(user);

      return {
        success: true,
        user,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        user: null
      };
    }
  }
}
