import { toast } from "react-toastify";
import { ADD_USER_CONTACT_REQUEST, ADD_USER_CONTACT_SUCCESS, ADD_USER_SUBSCRIPTION_REQUEST, ADD_USER_SUBSCRIPTION_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, USER_SERVER_ERROR } from "./UserConstant";


const initialState = {
    alluser: [],
  };


const UserReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_USER_CONTACT_REQUEST:
            return { loading: true };
        case ADD_USER_CONTACT_SUCCESS:
            toast.success("Your Data has been Submitted")
            return { loading: false, adduser:true,error:false }
        case ADD_USER_SUBSCRIPTION_REQUEST:
            return { loading: true };
        case ADD_USER_SUBSCRIPTION_SUCCESS:
            toast.success("Thankyou For Subscribe !!")
            return { loading: false, addsub:true,error:false }
        case FORGOT_PASSWORD_REQUEST:
            return { loading: true };
        case FORGOT_PASSWORD_SUCCESS:
            toast.success("Password Reset link send. Please check your Email")
            return { loading: false, forgotpass:true,error:false }  
        case RESET_PASSWORD_REQUEST:
            return { loading: true };
        case RESET_PASSWORD_SUCCESS:
            toast.success("Password Reset Successfully")
            return { loading: false, resetpass:true,error:false }       
        case USER_SERVER_ERROR:
            if(action.payload.message==="Applicant_Email user contact us with this Applicant Email already exists."){
                toast.error("User With This Email Already Exists");
                return { loading: false, adduser:false,error:true };
            }
            else if(action.payload.message==="Applicant_Email Enter a valid email address."){
                toast.error("Enter a valid email address.");
                return { loading: false, adduser:false,error:true};
            }
            else if(action.payload.message==="email subscription with this email already exists."){
                toast.error("User With This Email Already Exists");
                return { loading: false, adduser:false,error:true};
            }
            else if(action.payload.message==="non_field_errors Password and Confirm Password doesn't match"){
                toast.error("Password and Confirm Password doesn't match");
                return { loading: false, resetpass:false,error:true};
            }
            else if(action.payload.message==="non_field_errors Token is not Valid or Expired"){
                toast.error("Link is not Valid or Expired");
                return { loading: false, resetpass:false,error:true};
            }
            else{
                toast.error(action.payload.message);
                return { loading: false, adduser:false,addsub:false, forgotpass:false, resetpass:false,error:true };
            }
        default:
            return state;    
}
};
export default UserReducer  
