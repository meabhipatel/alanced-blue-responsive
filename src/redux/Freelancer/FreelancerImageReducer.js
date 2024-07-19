import { toast } from "react-toastify";
import { 
GET_FREELANCER_SELF_PROFILE_REQUEST,
GET_FREELANCER_SELF_PROFILE_SUCCESS,
} from "./FreelancerConstant"

import '../../index.css'

const initialState = {
    AllFreelancer: [],
    freelancerselfprofile: null
  };
  

const FreelancerImageReducer =(state = initialState, action) => {
    switch (action.type){
        
        case GET_FREELANCER_SELF_PROFILE_REQUEST:
            return { loading: true};
        case GET_FREELANCER_SELF_PROFILE_SUCCESS:
            console.log("freelancer reducer ============= ",action.payload)
            return { freelancerimageprofile: action.payload }; 
        default:
            return state;
    }
};


export default FreelancerImageReducer;