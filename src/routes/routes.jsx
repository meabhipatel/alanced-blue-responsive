import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import Login from "../container/auth/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Home from "../components/Layout/Home";
import FreelancerRegistration from "../container/freelancer/FreelancerRegistration";
import HirerRegistration from "../container/hirer/HirerRegistration";
import Choose from "../container/auth/Choose";
import ProjectList from "../container/freelancer/ProjectList";
import FreelancerSelfProfile from "../container/freelancer/FreelancerSelfProfile";
import FreelancerAfterLogin from "../container/freelancer/FreelancerAfterLogin";
import ViewProjectNewTab from "../container/freelancer/AllPopup/ViewProjectNewTab";
import MyProposalReferrals from "../container/freelancer/MyProposalReferrals";
import SavedJobs from "../container/freelancer/SavedJobs";
import MyProposals from "../container/freelancer/MyProposals";
import MyJobs from "../container/freelancer/MyJobs";
import Messages from "../container/messages/Messages";
import AllContracts from "../container/freelancer/AllContracts";
import MyReports from "../container/freelancer/MyReports";
import AddPortfolio from "../container/freelancer/portfolio/AddPortfolio";
import AddBidAmount from "../container/freelancer/AddBidAmount";
import SendProposal from "../container/freelancer/SendProposal";
import HirerAfterLogin from "../container/hirer/HirerAfterLogin";
import ViewAllJobPost from "../container/hirer/ViewAllJobPost";
import ViewAllProposals from "../container/hirer/ViewAllProposals";
import ViewProposal from "../container/freelancer/ViewProposal";
import ViewJobPost from "../container/hirer/ViewJobPost";
import ViewBidDetailAfterAdd from "../container/freelancer/ViewBidDetailAfterAdd";
import EditJobPost from "../container/hirer/EditJobPost";
import FindTalent from "../container/hirer/FindTalent";
import AddJobPost from "../container/hirer/AddJobPost";
import ViewProposalPopup from "../container/hirer/HirerAllPopup/ViewProposalPopup";
import ViewProjectPopup from "../container/freelancer/AllPopup/ViewProjectPopup";
import ViewSendPraposalAfterAdd from "../container/freelancer/ViewSendPraposalAfterAdd";
import SelfBidProject from "../container/freelancer/SelfBidProject";
import AboutUs from "../components/Layout/AboutUs";
import ContactUs from "../components/Layout/ContactUs";
import FAQ from "../components/Layout/FAQ";
import Enterprises from "../container/freelancer/Enterprises";
import HirerSelfProfile from "../container/hirer/HirerProfile";
import WhyAlanced from "../components/Layout/WhyAlanced";
import SafetyAndSecurity from "../components/Layout/SafetyAndSecurity";
import TermsConditions from "../components/Layout/TermsConditions";
import PrivacyPolicy from "../components/Layout/PrivacyPolicy";
import Cookies from "../components/Layout/Cookies";
import ViewMoreProjectDetail from "../container/freelancer/ViewMoreProjectDetail";
import FreelancerFullDetailAfterLogin from "../container/hirer/FreelancerFullDetailAfterLogin";
import Notifications from "../components/Layout/Notifications";
import ResetPassword from "../components/Layout/ResetPassword";
import SendPasswordResetEmail from "../components/Layout/SendPasswordResetEmail";
import AddPortfolioForm from "../container/freelancer/portfolio/AddPortfolioForm";
import ViewHiringDetail from "../container/freelancer/ViewHiringDetail";
import AllInvitedFreelancers from "../container/hirer/AllInvitedFreelancers";
import ViewInvitationDetail from "../container/hirer/ViewInvitationDetail";
import AllHirerContracts from "../container/hirer/AllHirerContracts";
import AllInvitations from "../container/freelancer/AllInvitations";
import FreelancerFullDetailBeforeLogin from "../container/hirer/FreelancerFullDetailBeforeLogin";
import Navbar from "../components/Layout/Navbar";
import DynamicMarginTop from "./DynamicMarginTop";
import ScrollToTop from "../components/molecules/ScrollToTop";

const AppRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginType = useSelector((state) => state.login.type) || localStorage.getItem("loginType");

  React.useEffect(() => {
    if (loginType == "HIRER") {
      navigate("/hirer/profile");
    }
    if (loginType == "FREELANCER") {
      navigate("/freelancer/profile");
    }
  }, [loginType]);

  const navbarNotAvailable = ["/login", "/sign-up"];

  return (
    <>
      {/* ---> Navbar  */}
      {!navbarNotAvailable.includes(location.pathname) && <Navbar />}

      <DynamicMarginTop />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/freelancer/registration" element={<FreelancerRegistration />} />
        <Route path="/hirer/registration" element={<HirerRegistration />} />
        <Route path="/sign-up" element={<Choose />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/view-all/freelancer" element={<FindTalent />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/enterprises" element={<Enterprises />}></Route>
        <Route path="/why-alanced" element={<WhyAlanced />}></Route>
        <Route path="/safety-security" element={<SafetyAndSecurity />}></Route>
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/view-more/project-detail" element={<ViewMoreProjectDetail />}></Route>
        <Route path="/view-freelancer/full-detail" element={<FreelancerFullDetailAfterLogin />}></Route>
        <Route path="/view-freelancer/detail" element={<FreelancerFullDetailBeforeLogin />}></Route>
        <Route path="/reset-user-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/reset-password" element={<SendPasswordResetEmail />} />

        {loginType == "FREELANCER" && (
          <>
            <Route path="/freelancer/edit-profile" element={<FreelancerSelfProfile />} />
            <Route path="/freelancer/profile" element={<FreelancerAfterLogin />} />
            <Route path="/freelancer/view-project/detail" element={<ViewProjectNewTab />} />
            <Route path="/freelancer/view-referals" element={<MyProposalReferrals />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/my-proposals" element={<MyProposals />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/freelancer/all-contracts" element={<AllContracts />} />
            <Route path="/freelancer/my-reports" element={<MyReports />} />
            <Route path="/freelancer/add/portfolio" element={<AddPortfolio />} />
            <Route path="/freelancer/add-bid" element={<AddBidAmount />} />
            <Route path="/freelancer/send-proposal" element={<SendProposal />} />
            <Route path="/View/freelancer/proposal" element={<ViewProposal />} />
            <Route path="/View/bid-details" element={<ViewBidDetailAfterAdd />} />
            <Route path="/view-project/full-detail" element={<ViewProjectPopup />} />
            <Route path="/send-proposal/detail" element={<ViewSendPraposalAfterAdd />}></Route>
            <Route path="/view/SelfBidProject" element={<SelfBidProject />}></Route>
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/freelancer/add-portfolio" element={<AddPortfolioForm />}></Route>
            <Route path="/view/hiring-detail" element={<ViewHiringDetail />}></Route>
            <Route path="/all-invitations" element={<AllInvitations />}></Route>
          </>
        )}

        {loginType == "HIRER" && (
          <>
            <Route path="/hirer/profile" element={<HirerAfterLogin />} />
            <Route path="/View-all/Job-post" element={<ViewAllJobPost />} />
            <Route path="/View-all/proposals" element={<ViewAllProposals />} />
            <Route path="/View/proposal" element={<ViewProposalPopup />} />
            <Route path="/View/Job-post" element={<ViewJobPost />} />
            <Route path="/edit/Job-post" element={<EditJobPost />} />
            <Route path="/add/Job-post" element={<AddJobPost />} />
            <Route path="/hirer/profile-edit" element={<HirerSelfProfile />}></Route>
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/freelancer/my-reports" element={<MyReports />} />
            <Route path="/view-all/invited-freelancers" element={<AllInvitedFreelancers />} />
            <Route path="/view/invitation-Detail" element={<ViewInvitationDetail />} />
            <Route path="/view-all/hirer-contracts" element={<AllHirerContracts />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default AppRouter;
