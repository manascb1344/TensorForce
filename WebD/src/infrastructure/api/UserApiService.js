import axios from 'axios';
import { IUserRepository } from '../../core/interfaces/IUserRepository.js';
import { User } from '../../core/domain/User.js';

/**
 * User API service implementation
 * Implements IUserRepository interface for user authentication
 */
export class UserApiService extends IUserRepository {
  constructor() {
    super();
    this.baseURL = 'https://tensorforce-backend.onrender.com/api';
  }

  /**
   * Authenticate user with backend
   * @param {User} user - User instance
   * @returns {Promise<Object>} Authentication response
   */
  async authenticate(user) {
    try {
      const response = await axios.post(
        `${this.baseURL}/authenticate`,
        user.toApiPayload(),
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Authentication failed: ${response.status}`);
      }
    } catch (error) {
      throw new Error(
        `Authentication error: ${error.response?.data?.message || error.message}`
      );
    }
  }

  /**
   * Get user profile
   * @param {string} userId - User ID
   * @returns {Promise<User>} User instance
   */
  async getUserProfile(userId) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${userId}`, {
        timeout: 10000,
      });

      if (response.status === 200) {
        return User.fromAuth0(response.data);
      } else {
        throw new Error(`Failed to get user profile: ${response.status}`);
      }
    } catch (error) {
      throw new Error(
        `Get user profile error: ${error.response?.data?.message || error.message}`
      );
    }
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<User>} Updated user instance
   */
  async updateUserProfile(userId, profileData) {
    try {
      const response = await axios.put(
        `${this.baseURL}/users/${userId}`,
        profileData,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        return User.fromAuth0(response.data);
      } else {
        throw new Error(`Failed to update user profile: ${response.status}`);
      }
    } catch (error) {
      throw new Error(
        `Update user profile error: ${error.response?.data?.message || error.message}`
      );
    }
  }
}
