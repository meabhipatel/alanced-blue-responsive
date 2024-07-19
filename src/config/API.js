const API = {
  Auth: {
    Login: "/account/login",
  },

  Freelancers: {
    Freelancer: {
      FreelancerRegistration: '/account/freelancer/registration',
      FreelancerSelfProfileView: '/account/freelancer/selfprofile/view',
      FreelancerViewReviews:'/freelance/View-all/Review',
      ViewAllProjects: '/freelance/view-all/Project/',
      UpdateFreelancerProfile: '/account/freelancer/profile/update',
      AddBidAmount: '/freelance/Add/bid',
      ViewFreelancerSelfBid: '/freelance/view/freelancer-self/bid',
      ViewFreelancerSelfBidProject: '/freelance/view/freelancer-self/project-bid',
      AddFreelancerEmployment:'/freelance/Add/Freelancer/Employment',
      ViewAllSavedJobs:'/freelance/View-all/SavedProjects',
      ViewAllHiringRequest:'/freelance/View-all/hire-request',
      AddFreelancerSelfProject:'/freelance/Add/Freelancer/Self-Project'
    }
  },
  
  Hirers: {
    Hirer: {
      HirerRegistration: '/account/hirer/registration',
      ViewAllFreelancers:'/account/freelancer/profile/view-all/', // 24 @
      ViewHirerSelfProject:'/freelance/view/hirer-self/Project',
      ViewAllBids:'/freelance/View/bids',
      UpdateProject:'/freelance/update/project',
      AddProject:'/freelance/Add/Project',
      HirerProfile:'/account/hirer/selfprofile/view',
      HirerUpdate: '/account/hirer/profile/update',
    }
  },

  Users:{
    User:{
      AddUserContact:'/freelance/user/contact-us',
      AddUserSubscription:'/freelance/add/subscribe',
      ForgotPassword:"/account/forgot-password",
      ResetPassword:"/account/password/reset"
    }
  }
};


export default API;