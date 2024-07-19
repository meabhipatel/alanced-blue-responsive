import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import profilepic from "../../../components/images/profilepic.png";
import verify from "../../../components/images/verify.png";
import locations from "../../../components/images/location.png";
import { useState } from "react";
import Portfolio from "./Portfolio";
import axios from "axios";
import { useSelector } from "react-redux";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Navbar from "../../../components/Layout/Navbar";
import HomeSection4 from "../../../components/Layout/HomeSection4";
import Footer from "../../../components/Layout/Footer";
import AddHiringRequestPopup from "./AddHiringRequestPopup";
import StarRating from "../../freelancer/StarRating";
import { formatDateToDayMonthYear } from "../../freelancer/TimeFunctions";
import experiences from "../../../components/images/experience.png";

const ViewProposalPopup = ({ closeViewProposal }) => {
  const location = useLocation();
  const project = location.state && location.state.project;
  const bid = location.state && location.state.bid;

  const [conversationName, setConversationName] = useState("");
  useEffect(() => {
    if ((project && bid != null) || undefined) {
      setConversationName({
        hirer: project.project_owner_id,
        freelancer: bid.freelancer_id,
        freelancerDetails: bid,
      });
    }
  }, [project, bid]);
  console.log("bid on ViewPropsalPopup : ", bid);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken =
    useSelector((state) => state.login.accessToken) ||
    localStorage.getItem("jwtToken");
  const freelancerselfprofile = useSelector(
    (state) => state.freelancer.freelancerselfprofile
  );
  const [freelancerproject, setfreelancerproject] = useState([]);
  const [freelanceremp, setfreelanceremp] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const id = freelancerselfprofile && freelancerselfprofile[0].id ? freelancerselfprofile[0].id : '';
  const id = bid.freelancer_id;
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [isHiringOpen, setIsHiringOpen] = useState(false);

  const openHiring = () => {
    setIsHiringOpen(true);
  };

  const closeHiring = () => {
    setIsHiringOpen(false);
  };

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
        // const projectsMatchingCategory = response.data.results.filter(project => project.category === userCategory);
        // setViewProject(projectsMatchingCategory);
        // setTotalPages(Math.ceil(projectsMatchingCategory.length / 8));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [currentPage]);

  //   useEffect(() => {
  //     if(id) {
  //         axios.get(`http://127.0.0.1:8000/freelance/View-all/Freelancer/Self-Project/${id}`)
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
            setfreelanceremp(response.data.data);
          } else {
            console.log(response.data.message || "Error fetching project");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [id]);

  const [viewinvites, setViewinvites] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.api.alanced.com/freelance/View-all/invited-freelancers`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // setViewFreeBid(response.data.data);
        setViewinvites(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, []);

  const isInvited =
    viewinvites &&
    viewinvites.some(
      (invitation) =>
        bid.freelancer_id === invitation.freelancer_id &&
        bid.project_id === invitation.project_id
    );

  function formatDate(dateStr) {
    if (!dateStr) return "present";

    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateObj = new Date(dateStr);

    return dateObj.toLocaleDateString(undefined, options);
  }

  const [startIdx, setStartIdx] = useState(0);
  const sortedEmployments = [...freelanceremp].sort(
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

  const showMoreHandler = () => {
    setStartIdx((prevIdx) => prevIdx + 3);
  };

  const showLessHandler = () => {
    setStartIdx(0);
  };

  const visibleReviews = reviews.slice(startIdx, startIdx + 3);

  const prev = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [active, setActive] = React.useState(1);

  // const next = () => {
  //     if (active === Math.ceil(freelancerproject.length / 6)) return;
  //     setActive(active + 1);
  // };

  // const prev = () => {
  //     if (active === 1) return;
  //     setActive(active - 1);
  // };

  // 1. Chunk the Array
  const chunkArray = (array, size) => {
    let chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const chunkedProjects = chunkArray(freelancerproject, 6);

  const openPortfolio = (project) => {
    setSelectedProjects(project);
    setIsPortfolioOpen(true);
  };

  const closePortfolio = () => {
    setSelectedProjects(null);
    setIsPortfolioOpen(false);
  };

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center z-10 mt-20"> */}
      {/* <div className="fixed inset-0 bg-black opacity-10"></div> */}
      {/* <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 h-[94%] z-20 overflow-y-scroll"> */}
      {/* <div className='flex flex-row'>
        <div className='basis-6/12 cursor-pointer'><i class="bi bi-chevron-left font-bold text-black text-lg" onClick={closeViewProposal}></i></div>
        <div className=' basis-6/12'>
            <Link to="/View/proposal" state={{project,bidData}}>
            <div className=' text-right font-cardo font-normal text-base'>
            <i class="bi bi-box-arrow-up-right"></i> Open proposal in a new window
            </div>
            </Link>
        </div>
    </div> */}
      {/* <div className=' container px-2'> */}
      <div className="mt-2 mx-[9%]">
        <div className="flex mt-8 bg-[#FFFFFF] border border-gray-200 border-opacity-30">
          <div className="flex-[20%] p-6">
            <div className="relative w-24 h-24">
              <img
                src={"https://www.api.alanced.com" + bid.freelancer_profilepic}
                alt="Profile"
                className="rounded-full w-full h-full border border-gray-200"
              />
              <div class="absolute bottom-3 right-0.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
          <div className="flex-[30%] py-6">
            <div className="flex items-center">
              <h1 className="font-cardo text-[24px] text-[#031136] font-normal mr-1">
                {bid.freelancer_name}
              </h1>
              <img className="h-4 w-4" src={verify} alt="Verification" />
            </div>
            <div className="flex items-center my-1">
              <img src={locations} alt="Location" className="h-[13px] mr-1" />
              <p className="text-[#797979] text-[14px] font-inter">
                {bid.freelancer_address ? bid.freelancer_address : "NA"}
              </p>
            </div>
            {/* <p className="text-blue-600 text-[16px] font-inter py-3 font-semibold cursor-pointer hover:underline">View Profile</p> */}
          </div>
          <div className="flex-[50%] p-6 text-right">
            <Link to="/messages" state={{ conversationName }}>
              <span class="inline-block text-sm px-10 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-4 font-semibold">
                Message
              </span>
            </Link>
            {/* <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] mt-3 mr-2">
                <button class="px-11 py-1 bg-white" onClick={openHiring}><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Hire</p></button>
            </div> */}

            {/* <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] mt-3 mr-2">
  <button
    class={`px-11 py-1 bg-white ${isInvited ? 'cursor-not-allowed' : ''}`}
    onClick={isInvited ? null : openHiring}
    disabled={isInvited}
  >
    <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
      {isInvited ? 'Hired' : 'Hire'}
    </p>
  </button>
</div> */}
            <div
              class={` ${
                isInvited
                  ? "p-0.5 inline-block rounded bg-gradient-to-b from-[gray] to-[lightgray] mt-3 mr-2"
                  : "p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] mt-3 mr-2"
              }`}
            >
              <button
                class={`px-11 py-1 bg-white ${
                  isInvited ? "cursor-not-allowed" : ""
                }`}
                disabled={isInvited}
                onClick={isInvited ? null : openHiring}
              >
                <p
                  class={`${
                    isInvited
                      ? "bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]"
                      : "bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]"
                  }`}
                >
                  {isInvited ? "Hired" : "Hire"}
                </p>
              </button>
            </div>

            {isHiringOpen && (
              <AddHiringRequestPopup closeHiring={closeHiring} bid={bid} />
            )}
          </div>
        </div>
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-[30%] py-4 px-8 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
            <h1 className="font-cardo text-xl text-[#031136] font-normal">
              Applicant
            </h1>
            <p className="text-[#031136] opacity-50 text-[14px] font-inter py-2">
              {bid.freelancer_name} has applied to or been invited to your or
              your company's job {project.title}{" "}
            </p>
            <h1 className="font-cardo text-xl text-[#031136] font-normal pt-4">
              Hourly Rate
            </h1>
            {/* <p className="text-[#031136] opacity-50 text-[14px] font-inter py-2">$5.00/hr</p> */}
            <h1 className="font-cardo text-xl text-[#031136] font-semibold inline-block py-2 opacity-50">
              ${bid.freelancer_hourly_rate ? bid.freelancer_hourly_rate : 0}/hr
            </h1>
            <h1 className="font-cardo text-xl text-[#031136] font-normal pt-4">
              {bid.freelancer_experience_level.replace(/_/g, " ")}
            </h1>
          </div>
          <div class="w-full md:w-[70%] py-4 px-8 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
            <div className="flex justify-between items-center">
              <h1 className="font-cardo text-2xl text-[#031136] font-normal">
                Proposal Details
              </h1>
              <div>
                <h1 className="font-cardo text-xl text-[#031136] font-semibold">
                  ${bid.bid_amount}
                  {bid.bid_type == "Hourly" ? "/hr" : ""}
                </h1>
                <p className="text-[#031136] opacity-50 text-[14px] font-inter font-semibold">
                  Proposed bid ({bid.bid_type})
                </p>
              </div>
            </div>
            <div className="border-b opacity-60 my-3"></div>
            <h1 className="font-cardo text-xl text-[#031136] font-normal">
              Cover Letter
            </h1>
            <p className="text-[#031136] opacity-50 text-[14px] font-inter py-4">
              {bid.description}
            </p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-[30%] bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
            <div className="border-b border-gray-200 border-opacity-30 py-6 px-8">
              <h1 className="font-cardo text-xl text-[#031136] font-normal">
                View Profile
              </h1>
              <p className="text-[#031136] opacity-50 text-[14px] font-inter py-2 pb-6">
                {bid.freelancer_category.replace(/_/g, " ")}
              </p>
              {/* <span class="text-sm px-16 py-[10px] lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold">All Work</span> */}
            </div>
            <div className="border-b border-gray-200 border-opacity-30 py-6 px-8">
              <h1 className="font-cardo text-xl text-[#031136] font-normal">
                Languages
              </h1>
              {bid.Freelancer_Languages
                ? JSON.parse(bid.Freelancer_Languages.replace(/'/g, '"')).map(
                    (language, index) => (
                      <p
                        key={index}
                        className="font-inter text-[#0A142F] text-[14px] py-1"
                      >
                        {language}
                      </p>
                    )
                  )
                : null}
              <h1 className="font-cardo text-xl text-[#031136] font-normal pt-6">
                Education
              </h1>
              <p className="font-inter text-[#0A142F] text-[14px] py-1">
                {bid.Freelancer_qualification
                  ? bid.Freelancer_qualification
                  : "NA"}
              </p>
            </div>
          </div>
          <div class="w-full md:w-[70%] bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
            <div className="border-b border-gray-200 border-opacity-30 py-4 px-8">
              <div className="flex justify-between items-center">
                <h1 className="font-cardo text-2xl text-[#031136] font-normal">
                  {bid.freelancer_category.replace(/_/g, " ")}
                </h1>
                <div>
                  <h1 className="font-cardo text-xl text-[#031136] font-semibold inline-block">
                    $
                    {bid.freelancer_hourly_rate
                      ? bid.freelancer_hourly_rate
                      : 0}
                    /hr
                  </h1>
                </div>
              </div>
              <p className="text-[#031136] opacity-50 text-[14px] font-inter py-5">
                {bid.freelancer_about}
              </p>
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
              {reviews.length > 3 &&
                (startIdx + 3 < reviews.length ? (
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
            <div className="border-b border-gray-200 border-opacity-30 py-4 px-8">
              <h1 className="font-cardo text-2xl text-[#031136] font-normal">
                Portfolio ({projectCount})
              </h1>
              <div className="flex flex-wrap -mx-2">
                {/* {chunkedProjects[active - 1] && chunkedProjects[active - 1].map((pro, index) => ( */}
                {freelancerproject &&
                  freelancerproject.map((pro, index) => (
                    <div
                      className="w-1/3 px-2 cursor-pointer"
                      key={index}
                      onClick={() => openPortfolio(pro)}
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
                {isPortfolioOpen && (
                  <Portfolio
                    project={selectedProjects}
                    closePortfolio={closePortfolio}
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
            {/* <div className='border-b border-gray-200 border-opacity-30 py-4 px-8'>
    <h1 className="font-cardo text-2xl text-[#031136] font-normal">Portfolio</h1>
    <div className="flex flex-wrap -mx-2">  
        <div className='w-1/3 px-2 cursor-pointer' onClick={openPortfolio}>  
            <div className='w-full h-[165px] mt-4 border border-gray-100 overflow-hidden'>
                <img 
                    src={profilepic} 
                    alt="" 
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',  
                        width: '100%', 
                        height: '100%' 
                    }}
                />
            </div>
            <p className='font-inter text-blue-600 text-[13px] pt-2 overflow-hidden whitespace-nowrap overflow-ellipsis hover:text-blue-700 underline font-semibold'>Project Title</p>
        </div>
        {isPortfolioOpen && <Portfolio closePortfolio={closePortfolio} project={project}/>}
</div>
        </div> */}
            <div className="border-b border-gray-200 border-opacity-30 py-4 px-8">
              <h1 className="font-cardo text-2xl text-[#031136] font-normal">
                Skills
              </h1>
              <div className="text-left mt-5">
                {bid.freelancer_skills &&
                  (() => {
                    try {
                      const skillsArray = JSON.parse(
                        bid.freelancer_skills.replace(/'/g, '"')
                      );
                      return skillsArray.map((skill, index) => (
                        <div
                          key={index}
                          className="mr-3 focus:outline-none bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full w-28 text-blue-800 px-3 py-[3px] my-1 text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]"
                        >
                          <p className="text-center">{skill}</p>
                        </div>
                      ));
                    } catch (error) {
                      console.error("Error parsing JSON:", error);
                      return null;
                    }
                  })()}
              </div>
            </div>
          </div>
        </div>
        <div className="my-6 p-4 bg-[#FFFFFF] py-8 border border-gray-200 border-opacity-40 text-left">
          <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">
            Employment history
          </h1>
          <div class="border-b opacity-50 my-3"></div>
          {visibleEmp.length === 0 ? (
            <>
              <img src={experiences} alt="" className="mx-auto mt-5" />
              <h1 className="font-cardo text-2xl text-center py-3">
                No Data Found
              </h1>
            </>
          ) : (
            visibleEmp &&
            visibleEmp.map((emp, index) => (
              <>
                <h1 className="font-cardo text-[18px] text-[#031136] font-normal mr-1">
                  {emp.Company_Designation} | {emp.Freelancer_Company_Name}
                </h1>
                <p className="font-inter opacity-50 text-[#0A142F] text-[14px] pt-2 text-left">
                  {formatDate(emp.Company_Joining_date)} -{" "}
                  {formatDate(emp.Company_Leaving_date)}
                </p>
                <div class="border-b opacity-50 my-3"></div>
              </>
            ))
          )}
          {freelanceremp.length > 3 &&
            (startIdx + 3 < freelanceremp.length ? (
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
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default ViewProposalPopup;
