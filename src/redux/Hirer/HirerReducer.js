import { toast } from "react-toastify";
import { SERVER_ERROR } from '../Freelancer/FreelancerConstant'
import { ADD_NEW_HIRER_REQUEST,
ADD_NEW_HIRER_SUCCESS,ADD_PROJECT_REQUEST,ADD_PROJECT_SUCCESS,GET_VIEW_ALL_BIDS_REQUEST,GET_VIEW_ALL_BIDS_SUCCESS,GET_VIEW_ALL_FREELANCER_REQUEST,GET_VIEW_ALL_FREELANCER_SUCCESS, GET_VIEW_HIRER_SELF_PROJECT_REQUEST, GET_VIEW_HIRER_SELF_PROJECT_SUCCESS, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS, GET_HIRER_SELF_PROFILE_REQUEST, GET_HIRER_SELF_PROFILE_SUCCESS, HIRER_UPDATE_REQUEST, HIRER_UPDATE_SUCCESS } from './HirerConstant'



const initialState = {
    allHirer: [],
  };
  

const HirerReducer =(state = initialState, action) => {
    switch (action.type){
        case ADD_NEW_HIRER_REQUEST:
            return { loading: true };
        case ADD_NEW_HIRER_SUCCESS:
            toast.success("Hirer Registration Sucessfull")
            return { loading: false, addhirer:true}
        case GET_VIEW_ALL_FREELANCER_REQUEST:
            return { loading: true};
        case GET_VIEW_ALL_FREELANCER_SUCCESS: 
            return { viewallfreelancer: action.payload }; 
        case GET_VIEW_HIRER_SELF_PROJECT_REQUEST:
            return { loading: true};
        case GET_VIEW_HIRER_SELF_PROJECT_SUCCESS: 
            return { viewhirerselfproject: action.payload };
        case GET_VIEW_ALL_BIDS_REQUEST:
            return { loading: true};
        case GET_VIEW_ALL_BIDS_SUCCESS: 
            return { viewallbids : action.payload };  
        case UPDATE_PROJECT_REQUEST:
            return { loading: true };
        case UPDATE_PROJECT_SUCCESS:
            toast.success("Project Updated");
            return { loading: false };   
        case ADD_PROJECT_REQUEST:
            return { loading: true };
        case ADD_PROJECT_SUCCESS:
            toast.success("Project Added Successfully")
            return { loading: false, addproject:true}
        case GET_HIRER_SELF_PROFILE_REQUEST:
            return { loading: true};
        case GET_HIRER_SELF_PROFILE_SUCCESS: 
            return { hirerselfprofile: action.payload[0] };
        case HIRER_UPDATE_REQUEST:
            return { loading: true};
        case HIRER_UPDATE_SUCCESS: 
            toast.success("profile updated")
            return { loading: false};          
        case SERVER_ERROR:
            // toast.error(action.payload.message)
            return{loading: false, addhirer:true ,error:action.payload.message}
        default:
            return state;
    }
};


export default HirerReducer;