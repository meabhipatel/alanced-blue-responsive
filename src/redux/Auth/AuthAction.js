import { toast } from "react-toastify"
import { Login, LoginHandler } from "../services/Auth"
import { AUTH_ERROR, AUTH_LOGOUT, LOGIN_REQUEST, LOGIN_SUCCESS } from "./Constant"

export const LoginAction = (data,rememberMe) => async (dispatch) => {

    dispatch({
        type: LOGIN_REQUEST
    })
    LoginHandler(data).then((res) => {
        console.log(res)
        if (res.status === 200) {
            const token = res.data.token;
            if (rememberMe) {
                const expiryDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
                localStorage.setItem('accessToken', token);
                localStorage.setItem('tokenExpiry', expiryDate);
            } else {
                const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                localStorage.setItem('accessToken', token);
                localStorage.setItem('tokenExpiry', expiryDate);
            }
            localStorage.setItem('accessToken', res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // navigate('')
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: res
            })
        }
    }).catch((err) => {

    })
}


export const LogoutAction = () => (dispatch) => {
    try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpiry');
        dispatch({
            type: AUTH_LOGOUT,
        });
        toast.success('Logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};