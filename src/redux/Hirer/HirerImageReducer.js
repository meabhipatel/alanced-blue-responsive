import { SERVER_ERROR } from '../Freelancer/FreelancerConstant'
import { GET_HIRER_SELF_PROFILE_REQUEST, GET_HIRER_SELF_PROFILE_SUCCESS,} from './HirerConstant'



const initialState = {
    AllHirer: [],
  };
  

const HirerImageReducer =(state = initialState, action) => {
    switch (action.type){
        case GET_HIRER_SELF_PROFILE_REQUEST:
            return { loading: true};
        case GET_HIRER_SELF_PROFILE_SUCCESS: 
            return { hirerimageprofile: action.payload[0] };          
        case SERVER_ERROR:
            // toast.error(action.payload.message)
            return{loading: false, addhirer:true ,error:action.payload.message}
        default:
            return state;
    }
};


export default HirerImageReducer;