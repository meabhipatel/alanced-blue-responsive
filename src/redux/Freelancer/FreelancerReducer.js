import { toast } from "react-toastify";
import { ADD_NEW_FREELANCER_REQUEST,
ADD_NEW_FREELANCER_SUCCESS,
GET_FREELANCER_SELF_PROFILE_REQUEST,
GET_FREELANCER_SELF_PROFILE_SUCCESS,
GET_VIEW_ALL_PROJECT_REQUEST,
GET_VIEW_ALL_PROJECT_SUCCESS,
UPDATE_FREELANCER_REQUEST,
UPDATE_FREELANCER_SUCCESS,
GET_FREELANCER_ADD_BID_AMOUNT_REQUEST,
GET_FREELANCER_ADD_BID_AMOUNT_SUCCESS,
GET_FREELANCER_SELF_BID_REQUEST,
GET_FREELANCER_SELF_BID_SUCCESS,
GET_FREELANCER_SELF_BID_PROJECT_REQUEST,
GET_FREELANCER_SELF_BID_PROJECT_SUCCESS,
SERVER_ERROR,
ADD_NEW_FREELANCER_EMPLOYMENT_REQUEST,
ADD_NEW_FREELANCER_EMPLOYMENT_SUCCESS,
GET_VIEW_ALL_SAVEDJOBS_REQUEST,
GET_VIEW_ALL_SAVEDJOBS_SUCCESS,
GET_VIEW_ALL_HIRING_REQUEST,
GET_VIEW_ALL_HIRING_SUCCESS,
ADD_FREELANCER_SELF_PROJECT_REQUEST,
ADD_FREELANCER_SELF_PROJECT_SUCCESS
} from "./FreelancerConstant"

import '../../index.css'

const initialState = {
    allFreelancer: [],
    freelancerselfprofile: null
  };
  

const FreelancerReducer =(state = initialState, action) => {
    switch (action.type){
        case ADD_NEW_FREELANCER_REQUEST:
            return { loading: true };
        case ADD_NEW_FREELANCER_SUCCESS:
            toast.success("Freelancer Registration Sucessfull")
            return { loading: false, addfree:true }
        case SERVER_ERROR:
            toast.error(action.payload.message)
            return{loading: false, addfree:true}
        case GET_FREELANCER_SELF_PROFILE_REQUEST:
            return { loading: true};
        case GET_FREELANCER_SELF_PROFILE_SUCCESS: 
            return { freelancerselfprofile: action.payload }; 
        case GET_VIEW_ALL_PROJECT_REQUEST:
            return { loading: true};
        case GET_VIEW_ALL_PROJECT_SUCCESS: 
            return { viewallprojects: action.payload }; 
        case UPDATE_FREELANCER_REQUEST:
            return { loading: true };
        case UPDATE_FREELANCER_SUCCESS:
            toast.success("Freelancer Profile Updated");
            return { loading: false };
        case GET_FREELANCER_ADD_BID_AMOUNT_REQUEST:
            return { loading: true };
        case GET_FREELANCER_ADD_BID_AMOUNT_SUCCESS:
            // toast.success("Thank you ! Your Bid Add  Sucessfully",{ position: "top-center",className: "custom-toast",bodyClassName: "custom-toast-body",});
            return { loading: false, addbid: true };
        case GET_FREELANCER_SELF_BID_REQUEST:
            return { loading: true};
        case GET_FREELANCER_SELF_BID_SUCCESS: 
            return { freelancerselfbid: action.payload }; 
        case GET_FREELANCER_SELF_BID_PROJECT_REQUEST:
            return { loading: true }
        case GET_FREELANCER_SELF_BID_PROJECT_SUCCESS:
            console.log("reducer ======== >",action.payload)
            return { viewselfproject: action.payload[0], loading: false }
        case ADD_NEW_FREELANCER_EMPLOYMENT_REQUEST:
            return { loading: true };
        case ADD_NEW_FREELANCER_EMPLOYMENT_SUCCESS:
            toast.success("Employment Data Added Successfully");
            return { loading: false, addemp:true}     
            
        case GET_VIEW_ALL_SAVEDJOBS_REQUEST:
            return { loading: true};
        case GET_VIEW_ALL_SAVEDJOBS_SUCCESS: 
            return { viewallsavedjob: action.payload };
        case ADD_FREELANCER_SELF_PROJECT_REQUEST:
            return { loading: true };
        case ADD_FREELANCER_SELF_PROJECT_SUCCESS:
            toast.success("Project Added Successfully")
            return { loading: false, addFreelancerProject:true}    
        // case GET_VIEW_ALL_HIRING_REQUEST:
        //     return { loading: true};
        // case GET_VIEW_ALL_HIRING_SUCCESS: 
        //     return { freelancerhiringreq: action.payload };     
        // case ADD_NEW_SAVEUNSAVEJOB_REQUEST:
        //     return { loading: true };
        // case ADD_NEW_SAVEUNSAVEJOB_SUCCESS:
        //     return { loading: false }    
        default:
            return state;
    }
};


export default FreelancerReducer;