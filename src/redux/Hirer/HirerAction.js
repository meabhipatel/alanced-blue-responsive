import { Navigate } from 'react-router-dom'
import { AddHirer, AddProject, GetViewAllBids, GetViewAllfreelancers, GetViewHirerSelfProjects, UpdateProject, GetHirerSelfProfile, HirerUpdate } from '../../redux/services/Hirer'
import { SERVER_ERROR } from '../Freelancer/FreelancerConstant'
import { ADD_NEW_HIRER_REQUEST,
 ADD_NEW_HIRER_SUCCESS,
 ADD_PROJECT_REQUEST,
 ADD_PROJECT_SUCCESS,
 GET_VIEW_ALL_BIDS_REQUEST,
 GET_VIEW_ALL_BIDS_SUCCESS,
 GET_VIEW_ALL_FREELANCER_REQUEST,
 GET_VIEW_ALL_FREELANCER_SUCCESS,
 GET_VIEW_HIRER_SELF_PROJECT_REQUEST,
 GET_VIEW_HIRER_SELF_PROJECT_SUCCESS,
 UPDATE_PROJECT_REQUEST,
 UPDATE_PROJECT_SUCCESS,
 GET_HIRER_SELF_PROFILE_REQUEST,
 GET_HIRER_SELF_PROFILE_SUCCESS,
 HIRER_UPDATE_REQUEST,
 HIRER_UPDATE_SUCCESS
} from './HirerConstant'


export const AddNewHirerAction = (data) => dispatch => {
    dispatch({
        type: ADD_NEW_HIRER_REQUEST,
        payload: []
      });
      AddHirer(data).then(res => {
        console.log(res)
        if (res.status == 200) {
          dispatch({
            type: ADD_NEW_HIRER_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: SERVER_ERROR,
            payload: res
          });
        }
      });
};

export const GetViewAllFreelancersAction = () => dispatch => {
  
  dispatch({
    type: GET_VIEW_ALL_FREELANCER_REQUEST,
    payload: []
  });

  GetViewAllfreelancers().then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_VIEW_ALL_FREELANCER_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: SERVER_ERROR,
        payload: res
      });
    }
  });
};


export const GetViewHirerSelfProjectssAction = (token) => dispatch => {
  
  dispatch({
    type: GET_VIEW_HIRER_SELF_PROJECT_REQUEST,
    payload: []
  });

  GetViewHirerSelfProjects(token).then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_VIEW_HIRER_SELF_PROJECT_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: SERVER_ERROR,
        payload: res
      });
    }
  });
};


export const GetViewAllBidsAction = (id) => dispatch => {
  
  dispatch({
    type: GET_VIEW_ALL_BIDS_REQUEST,
    payload: []
  });

  GetViewAllBids(id).then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_VIEW_ALL_BIDS_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: SERVER_ERROR,
        payload: res
      });
    }
  });
};


export const UpdateProjectAction = (data, token, navigate,id) => dispatch => {
  dispatch({
    type: UPDATE_PROJECT_REQUEST,
    payload: []
  });

  UpdateProject(data, token,id).then(res => {
    if (res.status === 200) {
      dispatch({
        type: UPDATE_PROJECT_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: SERVER_ERROR,
        payload: res
      });
    }
  });
};


export const AddProjectAction = (data,token) => dispatch => {
  dispatch({
      type: ADD_PROJECT_REQUEST,
      payload: []
    });
    AddProject(data,token).then(res => {
      if (res.status == 200) {
        dispatch({
          type: ADD_PROJECT_SUCCESS,
          payload: res.data
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
          payload: res
        });
      }
    });
};

export const GetHirerSelfProfileAction = (token) => dispatch => {
  
  dispatch({
    type: GET_HIRER_SELF_PROFILE_REQUEST,
    payload: []
  });

  GetHirerSelfProfile(token).then(res => {
    if (res.status === 200) {
      dispatch({
        type: GET_HIRER_SELF_PROFILE_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: SERVER_ERROR,
        payload: res
      });
    }
  });
};

export const HirerUpdateAction = (data, token) => dispatch => {
  
  dispatch({
    type: HIRER_UPDATE_REQUEST,
    payload: []
  });

  HirerUpdate(data, token).then(res => {
    if (res.status === 200) {
      dispatch({
        type: HIRER_UPDATE_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: SERVER_ERROR,
        payload: res
      });
    }
  });
};