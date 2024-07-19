import { toast } from "react-toastify";
import { AUTH_ERROR, AUTH_LOGOUT, LOGIN_REQUEST, LOGIN_SUCCESS } from "./Constant";

const initialState = {
    login: {
        type: 'HIRER',
        accessToken: ''
    }
}


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true }
        case LOGIN_SUCCESS:
            toast.success('Login Success')
            return { type: action.payload.type, accessToken: action.payload.token.access, login_data:action.payload.login_data, Login: true }
        case AUTH_ERROR:
            toast.error(action.payload.message)
            // return state;
            return {state: state, Login: false}
        case AUTH_LOGOUT:
            return { accessToken: null }
        default:
            return state
    }
}

export default Reducer;
