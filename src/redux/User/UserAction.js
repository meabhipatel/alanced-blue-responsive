import { AddUserContact, AddUserSubscriptions, ForgotPassword, ResetPassword } from "../services/User";
import { ADD_USER_CONTACT_REQUEST, ADD_USER_CONTACT_SUCCESS, ADD_USER_SUBSCRIPTION_REQUEST, ADD_USER_SUBSCRIPTION_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, USER_SERVER_ERROR } from "./UserConstant";


export const AddUserContactAction = (data) => dispatch => {
    dispatch({
        type: ADD_USER_CONTACT_REQUEST,
        payload: []
      });
      AddUserContact(data).then(res => {
        console.log(res)
        if (res.status == 200) {
          dispatch({
            type: ADD_USER_CONTACT_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: USER_SERVER_ERROR,
            payload: res
          });
        }
      });
};


export const AddUserSubscriptionAction = (data) => dispatch => {
    dispatch({
        type: ADD_USER_SUBSCRIPTION_REQUEST,
        payload: []
      });
      AddUserSubscriptions(data).then(res => {
        console.log(res)
        if (res.status == 200) {
          dispatch({
            type: ADD_USER_SUBSCRIPTION_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: USER_SERVER_ERROR,
            payload: res
          });
        }
      });
};


export const ForgotPasswordAction = (data) => dispatch => {
  dispatch({
      type: FORGOT_PASSWORD_REQUEST,
      payload: []
    });
    ForgotPassword(data).then(res => {
      console.log(res)
      if (res.status == 200) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: res.data
        });
      } else {
        dispatch({
          type: USER_SERVER_ERROR,
          payload: res
        });
      }
    });
};

export const ResetPasswordAction = (uid, token, data) => dispatch => {
  dispatch({
      type: RESET_PASSWORD_REQUEST,
      payload: []
    });

  ResetPassword(uid, token, data).then(res => {
      console.log(res)
      if (res.status == 200) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: res.data
        });
      } else {
        dispatch({
          type: USER_SERVER_ERROR,
          payload: res
        });
      }
  });
};
