import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import verify from "../../components/images/verify.png";
import locations from "../../components/images/location.png";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import FreelancerPortfolio from "./HirerAllPopup/FreelancerPortfolio";
import AddFreeHireRequest from "./HirerAllPopup/AddFreeHireRequest";
import {
  formateDate,
  formatDateToDayMonthYear,
} from "../freelancer/TimeFunctions";
import StarRating from "../freelancer/StarRating";
import experiences from "../../components/images/experience.png";

const FreelancerFullDetailBeforeLogin = () => {
  const location = useLocation();
  const freelancer = location.state && location.state.free;
  // const hirer = useSelector(state => state.login.login_data); // 20 @
  // const loginData = useSelector(state => state.login.login_data);
  const loginData =
    useSelector((state) => state.login.login_data) ||
    JSON.parse(localStorage.getItem("logindata"));
  const hirer = loginData !== undefined && loginData !== null ? loginData : "";

  console.log(freelancer, "freelancer_detail");

  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken =
    useSelector((state) => state.login.accessToken) ||
    localStorage.getItem("jwtToken");
  const [freelancerproject, setfreelancerproject] = useState([]);
  const id = freelancer.id;
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [ProjectCount, setProjectCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [freelanceremployment, setfreelanceremployment] = useState([]);
  const [isFreeHiringOpen, setIsFreeHiringOpen] = useState(false);
  const openFreeHiring = () => {
    setIsFreeHiringOpen(true);
  };

  const closeFreeHiring = () => {
    setIsFreeHiringOpen(false);
  };

  const conversationName =
    hirer !== null && hirer !== undefined
      ? {
          hirer: hirer.id,
          freelancer: freelancer,
        }
      : "";
  console.log(
    "conversation name on FreelancerFullDetailAfterLogin : ",
    conversationName
  );
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

  const prev = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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

  const [startIdx, setStartIdx] = useState(0);

  const showMoreHandler = () => {
    setStartIdx((prevIdx) => prevIdx + 3);
  };

  const showLessHandler = () => {
    setStartIdx(0);
  };

  const visibleReviews = reviews.slice(startIdx, startIdx + 3);

  // const chunkArray = (array, size) => {
  //     let chunked = [];
  //     for (let i = 0; i < array.length; i += size) {
  //         chunked.push(array.slice(i, i + size));
  //     }
  //     return chunked;
  // }

  // const chunkedProjects = chunkArray(freelancerproject, 6);

  const openPortfolio = (project) => {
    setSelectedProjects(project);
    setIsPortfolioOpen(true);
  };

  const closePortfolio = () => {
    setSelectedProjects(null);
    setIsPortfolioOpen(false);
  };

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

  const sortedEmployments = [...freelanceremployment].sort(
    (a, b) =>
      new Date(b.Company_Joining_date) - new Date(a.Company_Joining_date)
  );

  const showMoreHandlers = () => {
    setStartIdx((prevIdx) => prevIdx + 2);
  };

  const showLessHandlers = () => {
    setStartIdx(0);
  };

  const visibleEmp = sortedEmployments.slice(startIdx, startIdx + 2);

  return (
    <>
      <div className=" container-sm px-28 mt-14 mb-6">
        <div className=" flex flex-row">
          <div className=" basis-3/12 pl-14">
            <div className="relative w-24 h-24">
              <img
                src={"https://www.api.alanced.com" + freelancer.images_logo}
                alt="Profile"
                className="rounded-full w-full h-full border border-gray-200"
              />
              <div class="absolute bottom-3 right-0.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left pl-2 mt-10">
              <h1 className=" font-cardo text-[20px] fond-semibold">
                Experience level
              </h1>
              <p className="font-cardo text-lg fond-semibold text-gray-500">
                {freelancer.experience_level
                  ? freelancer.experience_level.replace(/_/g, " ")
                  : "NA"}
              </p>
            </div>
            <div className="text-left pl-2 mt-5 ">
              <h1 className=" font-cardo text-[20px] fond-semibold">
                Category
              </h1>
              <p className="font-cardo text-lg fond-semibold text-gray-500">
                {freelancer.category ? freelancer.category : "NA"}
              </p>
            </div>
            <div className="text-left pl-2 mt-5 ">
              <h1 className=" font-cardo text-[20px] fond-semibold">
                Hourly Rate
              </h1>
              <p className="font-cardo text-lg fond-semibold text-gray-500">
                ${freelancer.hourly_rate ? freelancer.hourly_rate : 0}
              </p>
            </div>
            <div className="text-left pl-2 mt-5 ">
              <h1 className=" font-cardo text-[20px] fond-semibold">
                Educations
              </h1>
              <p className="font-cardo text-lg fond-semibold text-gray-500">
                {freelancer.qualification ? freelancer.qualification : "NA"}
              </p>
            </div>
            <div className="text-left pl-2 mt-5 ">
              <h1 className=" font-cardo text-[20px] fond-semibold">
                Languages
              </h1>
              {freelancer && freelancer.Language
                ? JSON.parse(freelancer.Language.replace(/'/g, '"')).map(
                    (language, index) => (
                      <p
                        key={index}
                        className="font-cardo text-lg fond-semibold text-gray-500"
                      >
                        {language}
                      </p>
                    )
                  )
                : null}
            </div>
          </div>
          <div className=" basis-9/12">
            <div className=" flex flex-row">
              <div className=" basis-6/12">
                <div className="flex items-center">
                  <h1 className="font-cardo text-[24px] text-[#031136] font-normal mr-1">
                    {freelancer.first_Name
                      ? freelancer.first_Name + " " + freelancer.last_Name
                      : " NA"}
                  </h1>
                  <img className="h-4 w-4" src={verify} alt="Verification" />
                </div>
                <div className="flex items-center my-1">
                  <img
                    src={locations}
                    alt="Location"
                    className="h-[13px] mr-1"
                  />
                  <p className="text-[#797979] text-[14px] font-inter">
                    {freelancer.Address ? freelancer.Address : "NA"}
                  </p>
                </div>
              </div>
              <div className=" basis-3/12 text-right">
                <Link to="/login">
                  <span class="inline-block text-sm px-10 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-4 font-semibold">
                    Message
                  </span>
                </Link>
              </div>
              <Link to="/login">
                <div className=" basis-3/12 text-left">
                  <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]  mr-2">
                    <button class="px-11 py-1 bg-white">
                      <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
                        Hire
                      </p>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
            <div className="mt-[8%]">
              <p className="font-cardo text-[22px] fond-semibold text-left">
                About Freelancer
              </p>
              <div class="w-28  mt-2 ml-1 relative">
                <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
                <div class="border-gray-600 border-b-2 rounded-lg"></div>
              </div>
              <p className="text-[#031136] opacity-50 text-[14px] font-inter py-5 text-left pr-8">
                {freelancer.about ? freelancer.about : "NA"}
              </p>
            </div>
            <div className=" mt-6">
              <p className="font-cardo text-[22px] fond-semibold text-left">
                Skills
              </p>
              <div class="w-8 mt-2 ml-1 relative">
                <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
                <div class="border-gray-600 border-b-2 rounded-lg"></div>
              </div>
              <div className="text-left mt-5">
                {freelancer.skills
                  ? JSON.parse(freelancer.skills.replace(/'/g, '"')).map(
                      (skill, index) => (
                        <div
                          key={index} // Add a key prop for each skill for React to identify them uniquely.
                          className="mr-3 focus:outline-none mb-3 bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full text-blue-800 px-8 py-[3px] text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]"
                        >
                          <p className="text-center">{skill}</p>
                        </div>
                      )
                    )
                  : "NA"}
              </div>
            </div>
            <div className="mt-8">
              <p className="font-cardo text-[22px] fond-semibold text-left">
                Portfolio ({freelancerproject ? freelancerproject.length : 0})
              </p>
              <div class="w-20  mt-2 ml-1 relative">
                <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
                <div class="border-gray-600 border-b-2 rounded-lg"></div>
              </div>
              <div className="flex flex-wrap -mx-2">
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
                      <p className="font-inter text-blue-600 text-[13px] pt-2 overflow-hidden whitespace-nowrap overflow-ellipsis hover:text-blue-700 underline font-semibold text-left">
                        {pro.project_title}
                      </p>
                    </div>
                  ))}
                {isPortfolioOpen && (
                  <FreelancerPortfolio
                    project={selectedProjects}
                    closePortfolio={closePortfolio}
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-6 mt-5">
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
              <div className=" mt-6">
                <p className="font-cardo text-[22px] fond-semibold text-left">
                  Reviews ({reviews && reviews ? reviews.length : 0})
                </p>
                <div class="w-24 mt-2 ml-1 relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
                  <div class="border-gray-600 border-b-2 rounded-lg"></div>
                </div>
                {visibleReviews.map((review, index) => (
                  <>
                    <div key={index} className="text-left my-3">
                      <div className="flex justify-between items-center">
                        <p className="font-inter text-[#0A142F] text-[14px] py-1">
                          {review.Project_Name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <StarRating rating={review.rating} />
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
            </div>
          </div>
        </div>
        <div className=" mt-12 text-left border border-gray-100 p-4">
          <p className="font-cardo text-[22px] fond-semibold text-left">
            Employment History
          </p>
          <div class="w-48 mt-2 ml-1 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div class="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <div class="border-b opacity-50 my-8"></div>
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
                <div key={index} className="my-5">
                  <h1 className="font-cardo text-[18px] text-[#031136] font-normal mr-1">
                    {emp.Company_Designation} | {emp.Freelancer_Company_Name}
                  </h1>
                  <p className="font-inter opacity-50 text-[#0A142F] text-[14px] pt-2 text-left">
                    {formateDate(emp.Company_Joining_date)} -{" "}
                    {formateDate(emp.Company_Leaving_date)}
                  </p>
                  <div class="border-b opacity-50 my-3"></div>
                </div>
              </>
            ))
          )}

          {freelanceremployment.length > 2 &&
            (startIdx + 2 < freelanceremployment.length ? (
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
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default FreelancerFullDetailBeforeLogin;
