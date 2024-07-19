import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import thumbdown from "../../components/images/thumbdown.png";
import heart from "../../components/images/heart.png";
import verify from "../../components/images/verify.png";
import location from "../../components/images/location.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetViewAllSavedJobsAction } from "../../redux/Freelancer/FreelancerAction";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { timeAgo } from "./TimeFunctions";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import experiences from "../../components/images/experience.png";

const SavedJobs = () => {
  const accessToken =
    useSelector((state) => state.login.accessToken) ||
    localStorage.getItem("jwtToken");

  // const accessToken = useSelector(state => state.login.accessToken);
  // const initialSavedJobs = useSelector(state => state.freelancer.viewallsavedjob);
  // const [savedJobs, setSavedJobs] = useState(initialSavedJobs);

  const dispatch = useDispatch();
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //     dispatch(GetViewAllSavedJobsAction(accessToken));
  // }, [dispatch, accessToken]);

  // useEffect(() => {
  //     setSavedJobs(initialSavedJobs);
  // }, [initialSavedJobs]);

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(
        `https://www.api.alanced.com/freelance/View-all/SavedProjects?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSavedJobs(response.data.results);
        // setSavedJobs(response.data.data);
        setTotalPages(Math.ceil(response.data.count / 8));
      } else {
        console.error("Error fetching saved jobs:", response.data);
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error.message);
    }
  };

  const [expandedProjects, setExpandedProjects] = useState([]);

  const handleToggleDescription = (index) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };

  const toggleJobSaveStatus = async (jobId) => {
    try {
      const response = await axios.post(
        `https://www.api.alanced.com/freelance/saved-projects/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const isSaved = response.data.isSaved;

      // Update localStorage
      localStorage.setItem(`isSaved_${jobId}`, JSON.stringify(isSaved));

      if (response.status === 200) {
        if (response.data.isSaved === false) {
          toast.success("Job unsaved successfully!");
          const updatedJobs = savedJobs.filter(
            (job) => job.Project_id !== jobId
          );
          setSavedJobs(updatedJobs);
          fetchSavedJobs();
        }
      }
    } catch (error) {
      console.error("Error toggling the job save status", error);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [accessToken, currentPage]);

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">
          Saved Jobs
        </h1>
        <div className="my-4 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
          {savedJobs && savedJobs.length > 0 ? (
            <>
              {savedJobs && (
                <>
                  {savedJobs.map((job, index) => {
                    const words = job.Project_Description.split(" ");
                    const displayWords =
                      expandedProjects[index] || words.length <= 50
                        ? words
                        : words.slice(0, 50);

                    const currentDate = new Date();
                    const jobDeadline = new Date(job.deadline);
                    return (
                      <div className="px-4 md:px-8 py-5 border-b border-gray-200 border-opacity-30">
                        {/* {currentDate > jobDeadline && (
                <p className='font-inter opacity-50 text-[#FFC107] text-[16px] font-normal py-3'>
                    Job is no longer available
                </p>
            )} */}
                        {job.is_hired ? (
                          <p className="font-inter opacity-50 text-[#FFC107] text-[16px] font-normal py-3">
                            Job is no longer available
                          </p>
                        ) : (
                          ""
                        )}
                        <div className="flex items-center justify-between">
                          <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                            {" "}
                            {job.Project_Name}
                          </p>
                          <div className="flex items-center space-x-2">
                            {/* <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
            <img src={thumbdown} alt="" className='mt-1' />
        </div> */}
                            <div
                              className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200 cursor-pointer"
                              onClick={() =>
                                toggleJobSaveStatus(job.Project_id)
                              }
                            >
                              <i
                                class="fa fa-heart p-1 text-blue-600"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                          {job.Project_Rate} -{" "}
                          {job.Project_Experience_level.replace(/_/g, " ")} -
                          Est. Budget: $
                          {job.Project_Rate == "Hourly"
                            ? job.Project_Min_Hourly_Rate +
                              "/hr" +
                              " - " +
                              "$" +
                              job.Project_Max_Hourly_Rate +
                              "/hr"
                            : job.Project_Fixed_Budget}{" "}
                          - Posted {timeAgo(job.Project_Created)}
                        </p>
                        <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                          {displayWords.join(" ")}
                          {words.length > 50 && (
                            <span
                              className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer pl-2"
                              onClick={() => handleToggleDescription(index)}
                            >
                              {expandedProjects[index] ? "Less" : "More"}
                            </span>
                          )}
                        </p>
                        <img
                          src={verify}
                          alt=""
                          className="inline-block h-5 w-5 mr-1"
                        />
                        <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                          Payment verified
                        </p>
                        <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                          ★★★★★
                        </div>
                        {/* <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/> */}
                        <i class="bi bi-geo-alt inline-block  mr-1"></i>
                        <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                          {job.Project_Hirer_Location
                            ? job.Project_Hirer_Location
                            : "NA"}
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <div className="my-8">
              <img src={experiences} alt="" className="mx-auto mt-2" />
              <div className="px-4 md:px-8 py-5 text-center text-2xl opacity-50">
                No Saved Jobs Found
              </div>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-6 m-4">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={prev}
                disabled={currentPage === 1}
                style={{
                  backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                  border: "none",
                }}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
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
                    // onClick={() => setCurrentPage(pageNumber)}
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
                  backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
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
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default SavedJobs;
