import API from "../../config/API";
import DataService from "../../config/Dataservice"
import { handleError, setHeadersWithAccessToken } from './Comman';


export const AddHirer = async (data) =>{
    // setHeadersWithAccessToken(token);
    return DataService.post(API.Hirers.Hirer.HirerRegistration, data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return handleError(err);
    });
};


export const GetViewAllfreelancers = async () => {
    return await DataService.get(API.Hirers.Hirer.ViewAllFreelancers)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        return handleError(err);
      });
  };


export const GetViewHirerSelfProjects = async (token) => {
   setHeadersWithAccessToken(token);
    return await DataService.get(API.Hirers.Hirer.ViewHirerSelfProject)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        return handleError(err);
      });
  };


  export const GetViewAllBids = async (id) => {
     return await DataService.get(`${API.Hirers.Hirer.ViewAllBids}/${id}`)
       .then((res) => {
         console.log(res);
         return res.data;
       })
       .catch((err) => {
         return handleError(err);
       });
   };  


   export const UpdateProject = async(data,token,id) =>{
    console.log(id,'chkidonact****************')
    setHeadersWithAccessToken(token);
    return DataService.put(`${API.Hirers.Hirer.UpdateProject}/${id}`, data)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return handleError(err);
      });
  }   


  export const AddProject = async (data,token) =>{
    setHeadersWithAccessToken(token);
    return DataService.post(API.Hirers.Hirer.AddProject, data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return handleError(err);
    });
};  

export const GetHirerSelfProfile = async (token) => {
  setHeadersWithAccessToken(token);
   return await DataService.get(API.Hirers.Hirer.HirerProfile)
     .then((res) => {
       console.log("hirer data : ",res);
       return res.data;
     })
     .catch((err) => {
       return handleError(err);
     });
 };

 export const HirerUpdate = async (data, token) => {
  setHeadersWithAccessToken(token);
   return await DataService.put(API.Hirers.Hirer.HirerUpdate, data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
     .then((res) => {
       console.log("hirer data : ",res);
       return res.data;
     })
     .catch((err) => {
       return handleError(err);
     });
 };