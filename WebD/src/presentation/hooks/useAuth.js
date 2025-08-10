import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticateUserUseCase } from '../../core/usecases/AuthenticateUserUseCase.js';
import { UserApiService } from '../../infrastructure/api/UserApiService.js';
import { User } from '../../core/domain/User.js';

/**
 * Custom hook for authentication management
 * Handles Auth0 integration and user authentication
 */
export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState(null);

  const userRepository = new UserApiService();
  const authenticateUseCase = new AuthenticateUserUseCase(userRepository);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated && user && !authUser) {
        setIsAuthenticating(true);
        setAuthError(null);

        try {
          const result = await authenticateUseCase.execute(user);
          
          if (result.success) {
            setAuthUser(result.user);
          } else {
            setAuthError(result.error);
          }
        } catch (error) {
          setAuthError(error.message);
        } finally {
          setIsAuthenticating(false);
        }
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, authUser]);

  const logout = () => {
    setAuthUser(null);
    setAuthError(null);
  };

  return {
    user: authUser,
    isAuthenticated: !!authUser,
    isLoading: isLoading || isAuthenticating,
    error: authError || error,
    logout,
    rawUser: user, // Original Auth0 user object
  };
};
