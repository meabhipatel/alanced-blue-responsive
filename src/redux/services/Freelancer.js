import API from "../../config/API";
import DataService from "../../config/Dataservice"
import { handleError, setHeadersWithAccessToken } from './Comman';


export const AddFreelancer = async (data) =>{
    // setHeadersWithAccessToken(token);
    return DataService.post(API.Freelancers.Freelancer.FreelancerRegistration, data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return handleError(err);
    });
};


export const GetFreelancerSelfProfile = async (token) => {    
    setHeadersWithAccessToken(token);
    return await DataService.get(API.Freelancers.Freelancer.FreelancerSelfProfileView)
      .then((res) => {
        console.log("Freelancer Self Profile",res);
        return res.data;
      })
      .catch((err) => {
        return handleError(err);
      });
  };


  export const GetViewAllProjectList = async () => {
    // setHeadersWithAccessToken(token);
    return await DataService.get(API.Freelancers.Freelancer.ViewAllProjects)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        return handleError(err);
      });
  };
  

  export const UpdateFreelancerProfile = async(data,token) =>{
    setHeadersWithAccessToken(token);
    return DataService.put(API.Freelancers.Freelancer.UpdateFreelancerProfile, data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return handleError(err);
      });
  }  


  export const GetViewAllSavedJobs = async (token) => {
    setHeadersWithAccessToken(token);
    return await DataService.get(API.Freelancers.Freelancer.ViewAllSavedJobs)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        return handleError(err);
      });
  };


//   export const SaveUnsaveJob = async (data,id,token) =>{
//     setHeadersWithAccessToken(token);
//     return DataService.post(`${API.Freelancers.Freelancer.SavedUnsavedJobs}/${id}`, data)
//     .then(res => {
//         return res.data;
//     })
//     .catch(err => {
//         return handleError(err);
//     });
// };

export const AddBidAmount = async (data, token) => {
  setHeadersWithAccessToken(token);
  // console.log("//+/+/+/+/+/+/++//+//",token)
  console.log("///////////////////////////////",data)
  return DataService.post(`${API.Freelancers.Freelancer.AddBidAmount}/${data.project_id}`, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return handleError(err);
    });
};

export const GetFreelancerSelfBid = async (token) => {    
  setHeadersWithAccessToken(token);
  return await DataService.get(API.Freelancers.Freelancer.ViewFreelancerSelfBid)
    .then((res) => {
      console.log("Freelancer Self Bid",res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};

export const GetFreelancerSelfBidProject = async (data, token) => {    
  setHeadersWithAccessToken(token);
  console.log("data from freelancer services",data)
  return await DataService.get(`${API.Freelancers.Freelancer.ViewFreelancerSelfBidProject}/${data}`)
    .then((res) => {
      console.log("Freelancer Self Bid Project",res);
      return res.data;
    })
    .catch((err) => {
      return handleError(err);
    });
};


export const AddFreelancerEmployment = async (data,token) =>{
  setHeadersWithAccessToken(token);
  return DataService.post(API.Freelancers.Freelancer.AddFreelancerEmployment, data)
  .then(res => {
      return res.data;
  })
  .catch(err => {
      return handleError(err);
  });
};  


// export const GetFreelancerHiringRequest = async (token) => {    
//   setHeadersWithAccessToken(token);
//   return await DataService.get(API.Freelancers.Freelancer.ViewAllHiringRequest)
//     .then((res) => {
//       console.log("Freelancer Hiring Request",res);
//       return res.data;
//     })
//     .catch((err) => {
//       return handleError(err);
//     });
// };


export const AddFreelancerProject = async (data,token) =>{
  setHeadersWithAccessToken(token);
  return DataService.post(API.Freelancers.Freelancer.AddFreelancerSelfProject, data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(res => {
      return res.data;
  })
  .catch(err => {
      return handleError(err);
  });
};  
