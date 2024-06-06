
import { User } from '@/app/interfaces/User'; // Assuming User interface is defined
import { AuthData } from '../store/types/authTypes';

const API_URL = 'https://reqres.in/api/login';

// AuthService with login method
export const authService = {
  login: async (authData: AuthData): Promise<Boolean | null> => {
    try {
      // Make a POST request to the login endpoint
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData)
      });

      // Check if request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        // Assuming the response contains a token and user data
        const { token } = responseData;

        // Example: Save token to localStorage for future authenticated requests
        localStorage.setItem('token', token);
        localStorage.setItem('email', authData.email);

        // Return user data
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // Catch and handle any errors during request or response processing
      console.error('Login error:', error);
      return null;
    }
  },
};
