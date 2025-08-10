/**
 * Interface for user repository
 * Defines contract for user data operations
 */
export class IUserRepository {
	/**
	 * Authenticate user with backend
	 * @param {User} user - User instance
	 * @returns {Promise<Object>} Authentication response
	 */
	async authenticate(user) {
		throw new Error('authenticate method must be implemented');
	}

	/**
	 * Get user profile
	 * @param {string} userId - User ID
	 * @returns {Promise<User>} User instance
	 */
	async getUserProfile(userId) {
		throw new Error('getUserProfile method must be implemented');
	}

	/**
	 * Update user profile
	 * @param {string} userId - User ID
	 * @param {Object} profileData - Profile data to update
	 * @returns {Promise<User>} Updated user instance
	 */
	async updateUserProfile(userId, profileData) {
		throw new Error('updateUserProfile method must be implemented');
	}
}
