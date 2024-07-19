import React, { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "../../components/Layout/Navbar";
import freelancercover from "../../components/images/freelancercover.png";
import edit from "../../components/images/edit.png";
import profilepic from "../../components/images/profilepic.png";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import verify from "../../components/images/verify.png";
import location from "../../components/images/location.png";
import availablenow from "../../components/images/availablenow.png";
import jobsuccess from "../../components/images/jobsuccess.png";
import pin from "../../components/images/pin.png";
import threedot from "../../components/images/threedot.png";
import share from "../../components/images/share.png";
import updownarrow from "../../components/images/updownarrow.png";
import plus from "../../components/images/plus.png";
import cupbook from "../../components/images/cupbook.png";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import testimonial from "../../components/images/testimonial.png";
import certificate from "../../components/images/certificate.png";
import del from "../../components/images/delete.png";
import experiences from "../../components/images/experience.png";
import { useDispatch, useSelector } from "react-redux";
import {
  GetFreelancerSelfProfileAction,
  UpdateFreelancerProfileAction,
} from "../../redux/Freelancer/FreelancerAction";
import StarRating from "./StarRating";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditTitlePopup from "./AllPopup/EditTitlePopup";
import AddEducationPopup from "./AllPopup/AddEducationPopup";
import EditSkillPopup from "./AllPopup/EditSkillPopup";
import OtherExperiencePopup from "./AllPopup/OtherExperiencePopup";
import VideoIntroPopup from "./AllPopup/VideoIntroPopup";
import HrsPerWeekPopup from "./AllPopup/HrsPerWeekPopup";
import AddLanguagePopup from "./AllPopup/AddLanguagePopup";
import EditLanguagePopup from "./AllPopup/EditLanguagePopup";
import EditEducationPopup from "./AllPopup/EditEducationPopup";
import AvailableOffPopup from "./AllPopup/AvailableOffPopup";
import EditHrRatePopup from "./AllPopup/EditHrRatePopup";
import AddCertificatesPopup from "./AllPopup/AddCertificatesPopup";
import AddEmploymentPopup from "./AllPopup/AddEmploymentPopup";
import EditEmploymentPopup from "./AllPopup/EditEmploymentPopup";
import TestimonialPopup from "./AllPopup/TestimonialPopup";
import FreelancerProjectsPopup from "./AllPopup/FreelancerProjectsPopup";
import axios from "axios";
import EditExperienceLevelPopup from "./AllPopup/EditExperienceLevelPopup";
import EditFreelancerProjectsPopup from "./AllPopup/EditFreelancerProjectsPopup";
import { formateDate, formatDateToDayMonthYear } from "./TimeFunctions";

const FreelancerSelfProfile = () => {
  const accessToken =
    useSelector((state) => state.login.accessToken) ||
    localStorage.getItem("jwtToken");
  const jwtToken = localStorage.getItem("jwtToken");
  console.log(accessToken, "chkaccesstojken");
  console.log(jwtToken, "chkjwttoken");
  const freelancerselfprofile = useSelector(
    (state) => state.freelancer.freelancerselfprofile
  );
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [bid, setBid] = useState([]);
  const [freelancerproject, setfreelancerproject] = useState([]);
  const [freelanceremployment, setfreelanceremployment] = useState([]);
  const id =
    freelancerselfprofile && freelancerselfprofile[0].id
      ? freelancerselfprofile[0].id
      : "";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ProjectCount, setProjectCount] = useState(0);

  //   function formatDate(dateStr) {
  //     if (!dateStr) return "present";

  //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //     const dateObj = new Date(dateStr);

  //     return dateObj.toLocaleDateString(undefined, options);
  // }

  // function formatDateToDayMonthYear(dateStr) {
  //     if (!dateStr) return "";

  //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //     const dateObj = new Date(dateStr);

  //     return dateObj.toLocaleDateString(undefined, options);
  // }

  const scrollToWorkHistory = () => {
    const element = document.getElementById("workHistory");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function combinedClick() {
    handlePinClick();
    handleMouseLeave();
  }

  useEffect(() => {
    if (id) {
      axios
        .get(`https://www.api.alanced.com/freelance/View-all/Review/${id}`)
        .then((response) => {
          if (response.data.status === 200) {
            setReviews(response.data.data);
          } else {
            console.log(response.data.message || "Error fetching reviews");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [id]);

  useEffect(() => {
    const queryParameters = [];

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(
        `https://www.api.alanced.com/freelance/View-all/Freelancer/Self-Project/${id}?${queryString}`
      )
      .then((response) => {
        setfreelancerproject(response.data.results);
        setProjectCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / 6));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [currentPage]);

  // useEffect(() => {
  //     if(id) {
  //         axios.get(`https://aparnawiz91.pythonanywhere.com/freelance/View-all/Freelancer/Self-Project/${id}`)
  //             .then(response => {
  //                 if (response.data.status === 200) {
  //                     setfreelancerproject(response.data.data);
  //                 } else {
  //                     console.log(response.data.message || 'Error fetching project');
  //                 }
  //             })
  //             .catch(err => {
  //                 console.log(err.message);
  //             });
  //     }
  // }, [id]);

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://www.api.alanced.com/freelance/View-all/Freelancer/Employment/${id}`
        )
        .then((response) => {
          if (response.data.status === 200) {
            setfreelanceremployment(response.data.data);
          } else {
            console.log(
              response.data.message || "Error fetching Employment data"
            );
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [id]);

  // useEffect(() => {
  //     const queryParameters = [];

  //     queryParameters.push(`page=${currentPage}`);

  //     const queryString = queryParameters.join('&');

  //     axios
  //       .get(`https://alanced.pythonanywhere.com/freelance/view/freelancer-self/bid?${queryString}`,{
  //         headers: {
  //             'Authorization': `Bearer ${accessToken}`
  //         }
  //     })
  //       .then((response) => {
  //         setBid(response.data.count);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching filtered data:', error);
  //       });
  //   }, [currentPage]);

  useEffect(() => {
    axios
      .get("https://www.api.alanced.com/freelance/view/freelancer-self/bid", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setBid(response.data.count);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [isAvailable, setIsAvailable] = useState(
    localStorage.getItem("userAvailability") || "available"
  );

  useEffect(() => {
    localStorage.setItem("userAvailability", isAvailable);
  }, [isAvailable]);

  const [active, setActive] = React.useState(1);

  const prev = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  //   const next = () => {
  //       if (active === Math.ceil(freelancerproject.length / 6)) return;
  //       setActive(active + 1);
  //   };

  //   const prev = () => {
  //       if (active === 1) return;
  //       setActive(active - 1);
  //   };

  const chunkArray = (array, size) => {
    let chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const chunkedProjects = chunkArray(freelancerproject, 6);

  const [startIdx, setStartIdx] = useState(0);

  const showMoreHandler = () => {
    setStartIdx((prevIdx) => prevIdx + 4);
  };

  const showLessHandler = () => {
    setStartIdx(0);
  };

  const visibleReviews = reviews.slice(startIdx, startIdx + 4);

  const sortedEmployments = [...freelanceremployment].sort(
    (a, b) =>
      new Date(b.Company_Joining_date) - new Date(a.Company_Joining_date)
  );

  const showMoreHandlers = () => {
    setStartIdx((prevIdx) => prevIdx + 3);
  };

  const showLessHandlers = () => {
    setStartIdx(0);
  };

  const visibleEmp = sortedEmployments.slice(startIdx, startIdx + 3);

  const [selectedButton, setSelectedButton] = useState("All Work");
  const [selectedButtons, setSelectedButtons] = useState("Github");
  const commonStyle =
    "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  const [selected, setSelected] = useState("completed");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);

  function calculateJobSuccess(reviews) {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const totalReviews = reviews.length;
    const positiveReviews = reviews.filter(
      (review) => review.rating >= 4
    ).length;
    const neutralReviews = reviews.filter(
      (review) => review.rating === 3
    ).length;

    const successPercentage =
      ((positiveReviews + 0.5 * neutralReviews) / totalReviews) * 100;

    return Math.round(successPercentage);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);
  const [isOtherExpOpen, setIsOtherExpOpen] = useState(false);
  const [isVideoIntroOpen, setIsVideoIntroOpen] = useState(false);
  const [isHrsperWeekOpen, setIsHrsperWeekOpen] = useState(false);
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [isEditLanguageOpen, setIsEditLanguageOpen] = useState(false);
  const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const [isAvailableOffOpen, setIsAvailableOffOpen] = useState(false);
  const [isHrRateOpen, setIsHrRateOpen] = useState(false);
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [isAddEmploymentOpen, setIsAddEmploymentOpen] = useState(false);
  const [isEditEmploymentOpen, setIsEditEmploymentOpen] = useState(false);
  const [isTestimonialOpen, setIsTestimonialOpen] = useState(false);
  //   const [isFreeProjectOpen, setIsFreeProjectOpen] = useState(false);
  const [isExperienceLevelOpen, setIsExperienceLevelOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const openExperienceLevel = () => {
    setIsExperienceLevelOpen(true);
  };

  const closeExperienceLevel = () => {
    setIsExperienceLevelOpen(false);
  };

  //   const openFreeProject = (project) => {
  //     setSelectedProject(project);
  //     setIsFreeProjectOpen(true);
  // };

  // const closeFreeProject = () => {
  //     setSelectedProject(null);
  //     setIsFreeProjectOpen(false);
  // };

  const [isEditFreeProjectOpen, setIsEditFreeProjectOpen] = useState(false);

  const openEditFreeProject = (project) => {
    setSelectedProject(project);
    setIsEditFreeProjectOpen(true);
  };

  const closeEditFreeProject = () => {
    setSelectedProject(null);
    setIsEditFreeProjectOpen(false);
  };

  const openTestimonial = () => {
    setIsTestimonialOpen(true);
  };

  const closeTestimonial = () => {
    setIsTestimonialOpen(false);
  };

  const openEditEmployment = (employment) => {
    setSelectedEmp(employment);
    setIsEditEmploymentOpen(true);
  };

  const closeEditEmployment = () => {
    setSelectedEmp(null);
    setIsEditEmploymentOpen(false);
  };

  const openAddEmployment = () => {
    setIsAddEmploymentOpen(true);
  };

  const closeAddEmployment = () => {
    setIsAddEmploymentOpen(false);
  };

  const openAddCertificates = () => {
    setIsCertificatesOpen(true);
  };

  const closeAddCertificates = () => {
    setIsCertificatesOpen(false);
  };

  const openHrRate = () => {
    setIsHrRateOpen(true);
  };

  const closeHrRate = () => {
    setIsHrRateOpen(false);
  };

  const openAvailableOff = () => {
    setIsAvailableOffOpen(true);
  };

  const closeAvailableOff = () => {
    setIsAvailableOffOpen(false);
  };

  const openEditEducation = () => {
    setIsEditEducationOpen(true);
  };

  const closeEditEducation = () => {
    setIsEditEducationOpen(false);
  };

  const openEditLanguage = () => {
    setIsEditLanguageOpen(true);
  };

  const closeEditLanguage = () => {
    setIsEditLanguageOpen(false);
  };

  const openAddLanguage = () => {
    setIsAddLanguageOpen(true);
  };

  const closeAddLanguage = () => {
    setIsAddLanguageOpen(false);
  };

  const openHrsperWeek = () => {
    setIsHrsperWeekOpen(true);
  };

  const closeHrsperWeek = () => {
    setIsHrsperWeekOpen(false);
  };

  const openVideoIntro = () => {
    setIsVideoIntroOpen(true);
  };

  const closeVideoIntro = () => {
    setIsVideoIntroOpen(false);
  };

  const openOtherExp = () => {
    setIsOtherExpOpen(true);
  };

  const closeOtherExp = () => {
    setIsOtherExpOpen(false);
  };

  const openEditSkill = () => {
    setIsEditSkillOpen(true);
  };

  const closeEditSkill = () => {
    setIsEditSkillOpen(false);
  };

  const openAddEducation = () => {
    setIsAddEducationOpen(true);
  };

  const closeAddEducation = () => {
    setIsAddEducationOpen(false);
  };

  const openEditTitle = () => {
    setIsEditTitleOpen(true);
  };

  const closeEditTitle = () => {
    setIsEditTitleOpen(false);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  //       const handleImageSave = async () => {
  //     const formData = new FormData();
  //     formData.append("images_logo", selectedFile);

  //     if(freelancerselfprofile && freelancerselfprofile[0]){
  //         freelancerselfprofile[0].images_logo = URL.createObjectURL(selectedFile);
  //     }

  //     dispatch(UpdateFreelancerProfileAction(formData, accessToken));
  //     setIsModalOpen(false);
  //     navigate('/freelancer/edit-profile');
  // }

  const handleImageSave = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("images_logo", selectedFile);

      if (freelancerselfprofile && freelancerselfprofile[0]) {
        freelancerselfprofile[0].images_logo =
          URL.createObjectURL(selectedFile);
      }

      dispatch(UpdateFreelancerProfileAction(formData, accessToken));
    }

    setIsModalOpen(false);
    navigate("/freelancer/edit-profile");
  };

  const underlineStyle = {
    content: '""',
    display: "block",
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "2px",
    background: "linear-gradient(90deg, #0909E9, #00D4FF)",
  };

  React.useEffect(() => {
    dispatch(GetFreelancerSelfProfileAction(accessToken));
  }, []);

  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const profileLink = "http://localhost:3000/freelancer/edit-profile";

  const handlePinClick = useCallback(() => {
    navigator.clipboard
      .writeText(profileLink)
      .then(() => {
        console.log("Setting showCopyMessage to true");
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 2000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }, [profileLink]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const maxWords = 50;
  const aboutText =
    freelancerselfprofile && freelancerselfprofile[0]
      ? freelancerselfprofile[0].about
      : "";
  const words = aboutText.split(/\s+/).slice(0, maxWords);
  const truncatedText =
    words.join(" ") + (words.length >= maxWords && !isExpanded ? "..." : "");

  return (
    <>
      <div className="mt-4 mx-[9%]">
        <img src={freelancercover} alt="" className="" />
        <div class="flex flex-col md:flex-row">
          <div className="md:w-[30%] bg-white border border-gray-200 border-opacity-30">
            <div className="border-b border-gray-200 border-opacity-30 py-8 p-4 mb-4 md:mb-0 relative">
              <div className="relative w-28 h-28 mx-auto">
                <img
                  src={
                    freelancerselfprofile && freelancerselfprofile[0]
                      ? "https://www.api.alanced.com" +
                        freelancerselfprofile[0].images_logo
                      : ""
                  }
                  alt="Profile"
                  className="rounded-full w-full h-full border border-gray-200"
                />
                <div
                  className="absolute top-1 left-2 p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                  onClick={handleEditClick}
                >
                  <img src={edit} alt="edit" />
                </div>
                <div class="absolute bottom-3 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 py-4 pl-8 bg-[#FFFFFF] text-left mb-4 md:mb-0">
              <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1 mb-3">
                {freelancerselfprofile && freelancerselfprofile[0].category
                  ? freelancerselfprofile[0].category
                  : "Your Designation"}
              </h1>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
                <div className="">
                  <h4 className="text-[#031136] font-cardo font-bold text-[23px]">
                    $
                    {freelancerselfprofile && freelancerselfprofile[0]
                      ? freelancerselfprofile[0].hourly_rate
                      : 0}
                  </h4>
                  <p className="text-[#0A142F] font-inter opacity-50 text-[14px]">
                    Hourly rate
                  </p>
                </div>
                <div className="">
                  <h4 className="text-[#031136] font-cardo font-bold text-[23px]">
                    {bid}
                  </h4>
                  <p className="text-[#0A142F] font-inter opacity-50 text-[14px]">
                    Proposals
                  </p>
                </div>
                <div className="">
                  <h4 className="text-[#031136] font-cardo font-bold text-[23px]">
                    {reviews && reviews ? reviews.length : 0}
                  </h4>
                  <p className="text-[#0A142F] font-inter opacity-50 text-[14px]">
                    Reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 text-left flex flex-col py-4 px-4 md:px-8">
              <div className="flex items-center justify-between">
                <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">
                  Experience Level
                </h1>
                <div className="flex items-center space-x-2">
                  {freelancerselfprofile &&
                  freelancerselfprofile[0] &&
                  freelancerselfprofile[0].experience_level ? (
                    <div
                      className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                      onClick={openExperienceLevel}
                    >
                      <img src={edit} alt="edit" />
                    </div>
                  ) : (
                    <div
                      className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                      onClick={openExperienceLevel}
                    >
                      <img src={plus} alt="add" />
                    </div>
                  )}
                  {isExperienceLevelOpen && (
                    <EditExperienceLevelPopup
                      closeExperienceLevel={closeExperienceLevel}
                    />
                  )}
                </div>
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] py-1">
                {freelancerselfprofile && freelancerselfprofile[0]
                  ? freelancerselfprofile[0].experience_level.replace(/_/g, " ")
                  : ""}
              </p>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 text-left flex flex-col py-4 px-4 md:px-8">
              <div className="flex items-center justify-between">
                <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">
                  Languages
                </h1>
                <div className="flex items-center space-x-2">
                  {freelancerselfprofile &&
                  freelancerselfprofile[0] &&
                  freelancerselfprofile[0].Language ? (
                    <div
                      className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                      onClick={openEditLanguage}
                    >
                      <img src={edit} alt="edit" />
                    </div>
                  ) : (
                    <div
                      className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                      onClick={openEditLanguage}
                    >
                      <img src={plus} alt="add" />
                    </div>
                  )}
                  {isEditLanguageOpen && (
                    <EditLanguagePopup closeEditLanguage={closeEditLanguage} />
                  )}
                </div>
              </div>
              {freelancerselfprofile &&
              freelancerselfprofile[0] &&
              freelancerselfprofile[0].Language
                ? JSON.parse(
                    freelancerselfprofile[0].Language.replace(/'/g, '"')
                  ).map((language, index) => (
                    <p
                      key={index}
                      className="font-inter text-[#0A142F] text-[14px] py-1"
                    >
                      {language}
                    </p>
                  ))
                : null}
            </div>
            <div className="border-b border-gray-200 border-opacity-30 text-left flex flex-col py-4 px-4 md:px-8">
              <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">
                Verifications
              </h1>
              <p className="font-inter text-[#0A142F] text-[14px] py-1 inline-block mr-1">
                ID : <span className="opacity-50 mr-1">Verified</span>
                <img
                  src={verify}
                  alt=""
                  className="inline-block h-3 w-3 mb-0.5"
                />
              </p>
              <p className="font-inter text-[#0A142F] text-[14px] py-1 opacity-50">
                {freelancerselfprofile && freelancerselfprofile[0]
                  ? `${freelancerselfprofile[0].first_Name} ${freelancerselfprofile[0].last_Name}`
                  : ""}
              </p>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 text-left flex flex-col py-4 px-4 md:px-8">
              <div className="">
                <div className="flex items-center justify-between">
                  <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">
                    Education
                  </h1>
                  <div className="flex items-center space-x-2">
                    {/* Display + icon only if qualification is not available */}
                    {!freelancerselfprofile ||
                    !freelancerselfprofile[0] ||
                    !freelancerselfprofile[0].qualification ? (
                      <div
                        className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                        onClick={openAddEducation}
                      >
                        <img src={plus} alt="more" />
                      </div>
                    ) : null}

                    {isAddEducationOpen && (
                      <AddEducationPopup
                        closeAddEducation={closeAddEducation}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <p className="font-inter text-[#0A142F] text-[14px] pt-1">
                    {freelancerselfprofile && freelancerselfprofile[0]
                      ? freelancerselfprofile[0].qualification
                      : ""}
                  </p>
                  <div className="flex items-center space-x-2">
                    {/* Display edit icon only if qualification is available */}
                    {freelancerselfprofile &&
                    freelancerselfprofile[0] &&
                    freelancerselfprofile[0].qualification ? (
                      <div
                        className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                        onClick={openEditEducation}
                      >
                        <img src={edit} alt="more" />
                      </div>
                    ) : null}

                    {isEditEducationOpen && (
                      <EditEducationPopup
                        qualification={
                          freelancerselfprofile && freelancerselfprofile[0]
                            ? freelancerselfprofile[0].qualification
                            : ""
                        }
                        closeEditEducation={closeEditEducation}
                      />
                    )}
                    {isAddEducationOpen && (
                      <AddEducationPopup
                        closeAddEducation={closeAddEducation}
                      />
                    )}
                  </div>
                </div>

                <div className="border-b opacity-50 my-5"></div>

                <div className="my-3 flex flex-wrap">
                  <Link to="" className="flex-grow md:flex-none p-1">
                    <span
                      className={`${commonStyle} px-3 md:px-6 ${
                        selectedButtons === "Github"
                          ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                          : "border border-gray-300 text-[#0A142F] opacity-50"
                      } mr-1`}
                      onClick={() => setSelectedButtons("Github")}
                    >
                      Github
                    </span>
                  </Link>
                  <Link to="" className="flex-grow md:flex-none p-1">
                    <span
                      className={`${commonStyle} px-3 md:px-6 ${
                        selectedButtons === "StackOverflow"
                          ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                          : "border border-gray-300 text-[#0A142F] opacity-50"
                      } mr-3`}
                      onClick={() => setSelectedButtons("StackOverflow")}
                    >
                      StackOverflow
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto mt-10">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 relative z-20">
                  <div className="text-right">
                    <button
                      onClick={handleModalClose}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <div className="mx-8">
                    <h1 className="font-cardo text-[21px] text-[#031136] font-normal text-left">
                      Edit Photo
                    </h1>
                    <p className="font-cardo text-[17px] text-[#031136] font-normal pt-2 text-left">
                      Show Clients The Best Version Of Yourself!
                    </p>
                    <div className="flex justify-between items-center mt-4 mb-2">
                      <div className="relative w-[200px] h-[200px] overflow-hidden">
                        {selectedFile ? (
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={
                              freelancerselfprofile && freelancerselfprofile[0]
                                ? "https://www.api.alanced.com" +
                                  freelancerselfprofile[0].images_logo
                                : ""
                            }
                            alt="Profile"
                          />
                        )}
                      </div>
                      <div className="relative w-28 h-28 overflow-hidden">
                        {selectedFile ? (
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={
                              freelancerselfprofile && freelancerselfprofile[0]
                                ? "https://www.api.alanced.com" +
                                  freelancerselfprofile[0].images_logo
                                : ""
                            }
                            alt="Profile"
                          />
                        )}
                      </div>
                      <div className="relative w-20 h-20 overflow-hidden">
                        {selectedFile ? (
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={
                              freelancerselfprofile && freelancerselfprofile[0]
                                ? "https://www.api.alanced.com" +
                                  freelancerselfprofile[0].images_logo
                                : ""
                            }
                            alt="Profile"
                          />
                        )}
                      </div>
                      <div className="relative w-16 h-16 overflow-hidden">
                        {selectedFile ? (
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={
                              freelancerselfprofile && freelancerselfprofile[0]
                                ? "https://www.api.alanced.com" +
                                  freelancerselfprofile[0].images_logo
                                : ""
                            }
                            alt="Profile"
                          />
                        )}
                      </div>
                      <input
                        type="file"
                        ref={inputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="font-cardo text-[17px] text-[#031136] font-normal pt-2 text-left">
                      Must Be An Actual Photo Of You.
                    </p>
                    <p className="text-[#0A142F] font-inter opacity-50 text-[14px] text-left">
                      Logos, clip-art, group photos, and digitally-altered
                      images are not allowed.
                    </p>
                    <div className="mt-8 flex justify-end">
                      <Link to="">
                        <span
                          class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold"
                          onClick={handleImageClick}
                          onChange={handleFileChange}
                        >
                          Change Image
                        </span>
                      </Link>
                      <div
                        class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]"
                        onClick={handleImageSave}
                      >
                        <Link to="">
                          <button class="px-2 py-1 bg-white">
                            <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
                              Save Photo
                            </p>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div class="md:w-[70%] border border-gray-200 border-opacity-30">
            <div className="border-b border-gray-200 border-opacity-30 flex flex-col md:flex-row py-3.5">
              <div class="w-full md:w-3/4 pt-3 text-left pl-8">
                <div className="flex items-center">
                  <h1 className="font-cardo text-[24px] text-[#031136] font-normal mr-1">
                    {freelancerselfprofile && freelancerselfprofile[0]
                      ? `${freelancerselfprofile[0].first_Name} ${freelancerselfprofile[0].last_Name}`
                      : ""}
                  </h1>
                  <img className="h-4 w-4" src={verify} alt="Verification" />
                </div>
                <div className="flex items-center my-1">
                  <img
                    src={location}
                    alt="Location"
                    className="h-[13px] mr-1"
                  />
                  <p className="text-[#797979] text-[14px] font-inter">
                    {freelancerselfprofile && freelancerselfprofile[0].Address
                      ? freelancerselfprofile[0].Address
                      : "Your Location here"}
                  </p>
                </div>

                <div className="flex space-x-1 mt-2">
                  <button
                    className={`flex items-center justify-center text-[#0A142F] font-inter opacity-50 text-[13px] py-2 px-4 focus:outline-none rounded-full ${
                      isAvailable === "available" ? "ring-1 ring-gray-400" : ""
                    }`}
                  >
                    <img src={availablenow} alt="" className="h-[16px] mr-2" />
                    Available Now
                  </button>

                  <button
                    className={`text-center text-[#0A142F] font-inter opacity-50 text-[13px] py-2 px-4 focus:outline-none rounded-full ${
                      isAvailable === "off" ? "ring-1 ring-gray-400" : ""
                    }`}
                  >
                    Off
                  </button>

                  <div
                    class="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 mt-1 cursor-pointer"
                    onClick={openAvailableOff}
                  >
                    <img src={edit} alt="edit" />
                  </div>
                  {isAvailableOffOpen && (
                    <AvailableOffPopup
                      isAvailable={isAvailable}
                      setIsAvailable={setIsAvailable}
                      closeAvailableOff={closeAvailableOff}
                    />
                  )}
                </div>
                <div className="flex items-center mt-3">
                  {/* <img src={jobsuccess} alt="" className="h-[22px] mr-2" /> */}
                  <i class="bi bi-patch-check text-blue-600 mr-2"></i>
                  <p className="font-inter text-[#797979] text-[13px]">
                    {calculateJobSuccess(reviews)}% Job Success
                  </p>
                </div>
              </div>
              <div class="w-full md:w-1/4 px-auto pt-8">
                {/* <Link to=''><span class="inline-block text-sm px-4 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-2 font-semibold">See Public View</span></Link> */}
                <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] mt-3 mr-2">
                  <button
                    class="px-2 py-1 bg-white"
                    onClick={scrollToWorkHistory}
                  >
                    <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
                      See Public Reviews
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 py-4 px-8 text-left">
              <h1 className="font-cardo text-[21px] text-[#031136] font-normal">
                View Profile
              </h1>
              <div className="my-3 flex flex-wrap">
                {freelancerselfprofile &&
                freelancerselfprofile[0] &&
                freelancerselfprofile[0].skills
                  ? JSON.parse(
                      freelancerselfprofile[0].skills.replace(/'/g, '"')
                    ).map((skill, index) => (
                      <Link
                        key={index}
                        to=""
                        className="flex-grow md:flex-none p-1"
                      >
                        <span
                          className={`${commonStyle} px-3 my-3 md:px-8 ${
                            selectedButton === skill
                              ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                              : "border border-gray-300 text-[#0A142F] opacity-50"
                          } mr-3`}
                          onClick={() => setSelectedButton(skill)}
                        >
                          {skill}
                        </span>
                      </Link>
                    ))
                  : null}
                <Link to="" className="flex-grow md:flex-none p-1">
                  <span
                    className={`${commonStyle} px-3 md:px-8 ${
                      selectedButton === "All Work"
                        ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                        : "border border-gray-300 text-[#0A142F] opacity-50"
                    } mr-3`}
                    onClick={() => setSelectedButton("All Work")}
                  >
                    All Work
                  </span>
                </Link>
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 py-4 px-4 md:px-8 text-left">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-2">
                    {freelancerselfprofile && freelancerselfprofile[0].category
                      ? freelancerselfprofile[0].category.replace(/_/g, " ")
                      : "Your Designation"}
                  </h1>
                  <div
                    className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                    onClick={openEditTitle}
                  >
                    <img
                      src={
                        freelancerselfprofile &&
                        freelancerselfprofile[0].category
                          ? edit
                          : plus
                      }
                      alt={
                        freelancerselfprofile &&
                        freelancerselfprofile[0].category
                          ? "Edit"
                          : "Add"
                      }
                      className="align-middle"
                    />
                  </div>
                  {isEditTitleOpen && (
                    <EditTitlePopup closeEditTitle={closeEditTitle} />
                  )}
                </div>

                {/* <div className="flex items-center">
        <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-2">{freelancerselfprofile && freelancerselfprofile[0].category ? freelancerselfprofile[0].category.replace(/_/g, ' ') : 'Your Designation'}</h1>
        <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={openEditTitle}>
            <img src={edit} alt="Edit" className="align-middle" />
        </div>
        {isEditTitleOpen && <EditTitlePopup closeEditTitle={closeEditTitle} />}
    </div> */}
                <div className="flex items-center">
                  <h1 className="font-cardo text-[20px] text-[#031136] font-bold mr-2">
                    $
                    {freelancerselfprofile && freelancerselfprofile[0]
                      ? freelancerselfprofile[0].hourly_rate
                      : 0}
                    /Hr
                  </h1>
                  <div
                    className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 mr-2 cursor-pointer"
                    onClick={openHrRate}
                  >
                    <img src={edit} alt="edit" className="align-middle" />
                  </div>
                  {isHrRateOpen && (
                    <EditHrRatePopup closeHrRate={closeHrRate} />
                  )}
                  {/* <div 
        className="relative p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" 
        onClick={combinedClick} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <img src={pin} alt="pin" className="align-middle" />
        {isHovered && 
    <div style={{
        position: 'absolute',
        top: '-70px',
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000
    }}>
        <div style={{
            padding: '8px 6px',
            paddingLeft: 16,
            backgroundColor: 'black',
            color: 'white',
            width: 200,
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute',
                top: '40px', 
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderTop: '10px solid black',
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: 'none', 
            }}></div>
            Copy link to clipboard
        </div>
    </div>
}

        {showCopyMessage && 
            <div style={{
                position: 'absolute',
                top: '-60px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                padding: '8px 6px',
                backgroundColor: 'black',
                color: 'white',
                zIndex: 1000,
                width:250,
                borderRadius:10,
                paddingLeft:16
            }}>
                Profile link copied to clipboard
            </div>
        }
    </div> */}
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[13px] py-2">
                Specializes in{" "}
                {freelancerselfprofile && freelancerselfprofile[0].category
                  ? freelancerselfprofile[0].category.replace(/_/g, " ")
                  : "Your Designation"}
              </p>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px]">
                {isExpanded ? aboutText : truncatedText}
              </p>
              {words.length >= maxWords && (
                <h1
                  onClick={toggleExpansion}
                  className="font-cardo text-[18px] text-[#031136] font-normal py-2 cursor-pointer"
                >
                  {isExpanded ? "See Less" : "See More"}
                </h1>
              )}
              {/* <p className='font-inter opacity-50 text-[#0A142F] text-[14px]'>{freelancerselfprofile && freelancerselfprofile[0] ? freelancerselfprofile[0].about : ''}</p> 
   <h1 className="font-cardo text-[18px] text-[#031136] font-normal py-2 cursor-pointer">See More</h1> */}
            </div>
            <div
              className="border-b border-gray-200 border-opacity-30 text-left py-6 px-4 md:px-8"
              id="workHistory"
            >
              <div className="flex items-center justify-between">
                <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1 pb-3">
                  Reviews ({reviews && reviews ? reviews.length : 0})
                </h1>
              </div>
              {visibleReviews.map((review, index) => (
                <>
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <p className="font-inter text-[#0A142F] text-[14px] py-1">
                        {review.Project_Name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} />
                        {/* <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 inline-block">
                <img src={share} alt="share" />
            </div> */}
                      </div>
                    </div>
                    <p className="font-inter opacity-50 text-[#0A142F] text-[12px]">
                      {formatDateToDayMonthYear(review.reviews_created_date)}
                    </p>
                    <p className="font-inter opacity-50 text-[#0A142F] text-[14px] pt-3">
                      {review.review}
                    </p>
                    <div class="grid grid-cols-3 gap-4 my-6">
                      <div class="">
                        <p className="font-cardo text-[#031136] text-[16px] font-bold">
                          $
                          {review.project_Rate == "Hourly"
                            ? review.project_Min_Hourly_Rate + "/hr"
                            : review.project_Budget}
                        </p>
                      </div>
                      <div class="">
                        <p className="font-cardo text-[#031136] text-[16px] font-bold">
                          {review.project_Rate}
                        </p>
                      </div>
                      <div class="">
                        <p className="font-cardo text-[#031136] text-[16px] font-bold">
                          {review.Reviewer}
                        </p>
                      </div>
                    </div>
                    <div class="border-b opacity-50 my-4"></div>
                  </div>
                </>
              ))}
              {reviews.length > 4 &&
                (startIdx + 4 < reviews.length ? (
                  <h1
                    className="font-cardo text-[20px] text-[#031136] font-normal text-right cursor-pointer"
                    onClick={showMoreHandler}
                  >
                    Show More
                  </h1>
                ) : (
                  <h1
                    className="font-cardo text-[20px] text-[#031136] font-normal text-right cursor-pointer"
                    onClick={showLessHandler}
                  >
                    Show Less
                  </h1>
                ))}
            </div>
            <div
              className="border-b border-gray-200 border-opacity-30 text-left pt-3 px-4 md:px-8 py-8"
              id="freeselfpro"
            >
              <div className="flex items-center justify-between">
                <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">
                  Portfolio ({ProjectCount})
                </h1>
                <div className="flex items-center space-x-2">
                  <Link
                    to="/freelancer/add-portfolio"
                    onClick={() => window.scroll(0, 0)}
                  >
                    <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200">
                      <img src={plus} alt="More" />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap -mx-2">
                {/* {chunkedProjects[active - 1] && chunkedProjects[active - 1].map((pro, index) => ( */}
                {freelancerproject &&
                  freelancerproject.map((pro, index) => (
                    <div
                      className="w-1/3 px-2 cursor-pointer"
                      key={index}
                      onClick={() => openEditFreeProject(pro)}
                    >
                      <div className="w-full h-[165px] mt-4 border border-gray-100 overflow-hidden">
                        <img
                          src={"https://www.api.alanced.com" + pro.images_logo}
                          alt=""
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <p className="font-inter text-blue-600 text-[13px] pt-2 overflow-hidden whitespace-nowrap overflow-ellipsis hover:text-blue-700 underline font-semibold">
                        {pro.project_title}
                      </p>
                    </div>
                  ))}
                {isEditFreeProjectOpen && (
                  <EditFreelancerProjectsPopup
                    project={selectedProject}
                    closeEditFreeProject={closeEditFreeProject}
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-6 mt-5">
                {/* {freelancerproject.length > 6 && (
  <>
    <IconButton
      size="sm"
      variant="outlined"
      onClick={prev}
      disabled={active === 1}
      style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
    >
      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
    </IconButton>

    {[...Array(Math.ceil(freelancerproject.length / 6))].map((_, index) => {
      const pageNumber = index + 1;
      return (
        <span
          key={pageNumber}
          className={`px-0 py-1 ${active === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold font-inter text-[14px] cursor-pointer' : 'text-[#0A142F] font-bold font-inter text-[14px] cursor-pointer'}`}
          onClick={() => setActive(pageNumber)}
        >
          {pageNumber}
        </span>
      );
    })}

    <IconButton
      size="sm"
      variant="outlined"
      onClick={next}
      disabled={active === Math.ceil(freelancerproject.length / 6)}
      style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
    >
      <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
    </IconButton>
  </>
)} */}
                {totalPages > 1 && (
                  <div className="flex justify-end items-center gap-6 m-4">
                    <IconButton
                      size="sm"
                      variant="outlined"
                      onClick={prev}
                      disabled={currentPage === 1}
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #0909E9, #00D4FF)",
                        border: "none",
                      }}
                    >
                      <ArrowLeftIcon
                        strokeWidth={2}
                        className="h-4 w-4 text-white"
                      />
                    </IconButton>

                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <span
                          key={pageNumber}
                          className={`px-0 py-1 ${
                            currentPage === pageNumber
                              ? "bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold font-inter text-[14px] cursor-pointer"
                              : "text-[#0A142F] font-bold font-inter text-[14px] cursor-pointer"
                          }`}
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </span>
                      );
                    })}

                    <IconButton
                      size="sm"
                      variant="outlined"
                      onClick={next}
                      disabled={currentPage === totalPages}
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #0909E9, #00D4FF)",
                        border: "none",
                      }}
                    >
                      <ArrowRightIcon
                        strokeWidth={2}
                        className="h-4 w-4 text-white"
                      />
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 text-left pt-3 px-4 md:px-8 py-8">
              <div className="flex items-center justify-between pb-3">
                <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">
                  Skills & Expertise
                </h1>
                <div className="flex items-center space-x-2">
                  {freelancerselfprofile &&
                  freelancerselfprofile[0] &&
                  freelancerselfprofile[0].skills ? (
                    // If skills are available, show the edit icon
                    <div
                      className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                      onClick={openEditSkill}
                    >
                      <img src={edit} alt="edit" />
                    </div>
                  ) : (
                    <div
                      className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                      onClick={openEditSkill}
                    >
                      <img src={plus} alt="add" />
                    </div>
                  )}
                  {isEditSkillOpen && (
                    <EditSkillPopup closeEditSkill={closeEditSkill} />
                  )}
                </div>
              </div>

              {/* <div className="flex items-center justify-between pb-3">
    <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">Skills & Expertise</h1>
    <div className="flex items-center space-x-2">
        <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={openEditSkill}>
            <img src={edit} alt="edit"/>
        </div>
        {isEditSkillOpen && <EditSkillPopup closeEditSkill={closeEditSkill}/>}
    </div>
    </div> */}
              {freelancerselfprofile &&
              freelancerselfprofile[0] &&
              freelancerselfprofile[0].skills
                ? JSON.parse(
                    freelancerselfprofile[0].skills.replace(/'/g, '"')
                  ).map((skill, index) => (
                    <Link key={index} to="">
                      <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[13px] inline-block mr-2 my-2">
                        {skill}
                      </span>
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="my-6 p-4 bg-[#FFFFFF] py-8 border border-gray-200 border-opacity-40">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">
              Employment history
            </h1>
            <div className="flex items-center space-x-2">
              <div
                className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                onClick={openAddEmployment}
              >
                <img src={plus} alt="more" />
              </div>
              {isAddEmploymentOpen && (
                <AddEmploymentPopup closeAddEmployment={closeAddEmployment} />
              )}
            </div>
          </div>
          <div class="border-b opacity-50 my-3"></div>
          {visibleEmp.length === 0 ? (
            <>
              <img src={experiences} alt="" className="mx-auto mt-5" />
              <h1 className="font-cardo text-2xl text-center py-3">
                No Data Found
              </h1>
            </>
          ) : (
            visibleEmp.map((emp, index) => (
              <>
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <h1 className="font-cardo text-[18px] text-[#031136] font-normal mr-1">
                      {emp.Company_Designation} | {emp.Freelancer_Company_Name}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <div
                        className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer"
                        onClick={() => openEditEmployment(emp)}
                      >
                        <img src={edit} alt="edit" />
                      </div>
                      {isEditEmploymentOpen && (
                        <EditEmploymentPopup
                          employment={selectedEmp}
                          closeEditEmployment={closeEditEmployment}
                        />
                      )}
                    </div>
                  </div>
                  <p className="font-inter opacity-50 text-[#0A142F] text-[14px] pt-2 text-left">
                    {formateDate(emp.Company_Joining_date)} -{" "}
                    {formateDate(emp.Company_Leaving_date)}
                  </p>
                  <div class="border-b opacity-50 my-3"></div>
                </div>
              </>
            ))
          )}

          {freelanceremployment.length > 3 &&
            (startIdx + 3 < freelanceremployment.length ? (
              <h1
                className="font-cardo text-[20px] text-[#031136] font-normal mx-auto cursor-pointer"
                onClick={showMoreHandlers}
              >
                Show More
              </h1>
            ) : (
              <h1
                className="font-cardo text-[20px] text-[#031136] font-normal mx-auto cursor-pointer"
                onClick={showLessHandlers}
              >
                Show Less
              </h1>
            ))}
          {/* <h1 className="font-cardo text-[20px] text-[#031136] font-normal mx-auto cursor-pointer">Show More</h1> */}
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default FreelancerSelfProfile;
