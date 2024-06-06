export interface User {
    id: string;
    username: string;
    email: string;
}
  

// Define action type constants
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Define action interfaces
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User | null; // Assuming User type is defined elsewhere
}

interface LogoutAction {
  type: typeof LOGOUT;
}

// Define a union type for all possible action types
export type AuthActionTypes = LoginSuccessAction | LogoutAction;

// Define state type for authentication
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}


export interface AuthData {
    email: string;
    password: string;
}