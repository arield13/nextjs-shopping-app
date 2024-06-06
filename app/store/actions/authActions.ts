import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AuthActionTypes, LOGIN_SUCCESS, AuthData, LOGOUT } from '../types/authTypes';
import { authService } from '@/app/services/authServices';
import { Dispatch, UnknownAction } from 'redux';
import { useDispatch } from 'react-redux';



 export const loginUser   = async (userData: AuthData) => {
        const dispatch = useDispatch();
        console.log("dispatch : ",userData)
         const user = await authService.login(userData);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
};


export const logoutUser = () => (dispatch: Dispatch<AuthActionTypes>) => {
    // Implement your logout logic here (e.g., clearing local storage)
    // After successful logout, dispatch LOGOUT action
    dispatch({ type: LOGOUT });
};