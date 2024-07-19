import API from "../../config/API";
import DataService from "../../config/Dataservice"
import { handleError, setHeadersWithAccessToken } from './Comman';


export const AddUserContact = async (data) =>{
    return DataService.post(API.Users.User.AddUserContact, data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return handleError(err);
    });
};


export const AddUserSubscriptions = async (data) =>{
    return DataService.post(API.Users.User.AddUserSubscription, data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return handleError(err);
    });
};

export const ForgotPassword = async (data) =>{
    return DataService.post(API.Users.User.ForgotPassword, data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return handleError(err);
    });
};


export const ResetPassword = async (uid, token, data) => {
    return DataService.post(`${API.Users.User.ResetPassword}/${uid}/${token}`, data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return handleError(err);
    });
};
