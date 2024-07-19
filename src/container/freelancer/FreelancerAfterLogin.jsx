import React, { useState, useEffect } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import profilebg from "../../components/images/profilebg.png";
import search from "../../components/images/SearchOutlined.png";
import certifybadge from "../../components/images/certifybadge.png";
import ladder from "../../components/images/ladder.png";
import bag from "../../components/images/bag.png";
import downarrow from "../../components/images/downarrow.png";
import thumbdown from "../../components/images/thumbdown.png";
import heart from "../../components/images/heart.png";
import verify from "../../components/images/verify.png";
import location from "../../components/images/location.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ViewProjectPopup from "./AllPopup/ViewProjectPopup";
import { GetViewAllProjectsListAction } from "../../redux/Freelancer/FreelancerAction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { timeAgo } from "./TimeFunctions";
import Bag from "../../components/images/experience.png";
import hero2Image from "../../assets/hero2.png";

const FreelancerAfterLogin = () => {
  //   const logindata = useSelector(state => state.login.login_data);
  const logindata = useSelector((state) => state.login.login_data) || JSON.parse(localStorage.getItem("logindata"));
  const googleUserName = localStorage.getItem("googleUserName");
  const loginMethod = localStorage.getItem("loginMethod");
  const viewallprojects = useSelector((state) => state.freelancer.viewallprojects);
  //   const accessToken = useSelector(state => state.login.accessToken);
  const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  //   React.useEffect(() => {
  //     dispatch(GetViewAllProjectsListAction())
  //   }, [])

  let displayName;

  if (loginMethod === "google") {
    //   displayName = googleUserName;
    displayName = logindata.first_Name && logindata.last_Name ? logindata?.first_Name + " " + logindata?.last_Name : googleUserName;
  } else if (loginMethod === "traditional") {
    displayName = logindata?.first_Name + " " + logindata?.last_Name;
  }

  const filteredProjects = viewallprojects ? viewallprojects.filter((project) => project.category === logindata?.category) : [];

  const searchFilteredProjects = filteredProjects.filter((project) => {
    const skills = JSON.parse(project.skills_required.replace(/'/g, '"'));
    return (
      skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const projectsToDisplay = searchFilteredProjects.length > 0 ? searchFilteredProjects : viewallprojects;
  const [expandedProjects, setExpandedProjects] = useState([]);

  const [viewProject, setViewProject] = useState([]);
  //   const userCategory = logindata?.category

  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/freelance/view-all/Project/?${queryString}`)
      .then((response) => {
        setViewProject(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
        // const projectsMatchingCategory = response.data.results.filter(project => project.category === userCategory);
        // setViewProject(projectsMatchingCategory);
        // setTotalPages(Math.ceil(projectsMatchingCategory.length / 8));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [searchQuery, currentPage]);

  const handleToggleDescription = (index) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  function getCurrentDateAndGreeting() {
    const current = new Date();
    const hours = current.getHours();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let greeting;
    if (hours < 12) {
      greeting = "Morning";
    } else if (hours < 17) {
      greeting = "Afternoon";
    } else {
      greeting = "Evening";
    }

    const dateOfMonth = current.getDate();
    function getOrdinalSuffix(date) {
      if (date > 3 && date < 21) return "th";
      switch (date % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const formattedDate = `${months[current.getMonth()]} ${dateOfMonth}${getOrdinalSuffix(dateOfMonth)}`;
    return {
      day: days[current.getDay()],
      formattedDate,
      greeting,
    };
  }

  const { day, formattedDate, greeting } = getCurrentDateAndGreeting();

  const [AllProposals, setAllProposals] = useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get("https://www.api.alanced.com/freelance/view/freelancer-all-self/bid", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAllProposals(response1.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/", AllProposals);

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [categorySearch, setCategorySearch] = useState('');

  //   useEffect(() => {
  //       setCurrentPage(1);
  //   }, [categorySearch]);

  //   const jobsPerPage = 5;
  //   const indexOfLastJob = currentPage * jobsPerPage;
  //   const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  //   const filteredJobs = projectsToDisplay?.filter(project =>
  //       project.skills_required.toLowerCase().includes(categorySearch.toLowerCase())
  //   ) || [];

  //   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  //   const totalPages = Math.ceil((filteredJobs.length || 0) / jobsPerPage);
  //   const next = () => {
  //       window.scrollTo(0, 0);
  //       if (currentPage === totalPages) return;
  //       setCurrentPage(currentPage + 1);
  //   };

  //   const prev = () => {
  //       window.scrollTo(0, 0);
  //       if (currentPage === 1) return;
  //       setCurrentPage(currentPage - 1);
  //   };

  const chunkArray = (array, size) => {
    let chunked = [];
    if (viewallprojects != null) {
      for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
      }
    }
    return chunked;
  };

  const chunkedFree = chunkArray(projectsToDisplay);

  const toggleSaveProject = async (project) => {
    try {
      let response;

      if (project.isSaved) {
        response = await axios.delete(`https://www.api.alanced.com/freelance/saved-projects/${project.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        response = await axios.post(
          `https://www.api.alanced.com/freelance/saved-projects/${project.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      const updatedJob = response.data;

      localStorage.setItem(`isSaved_${project.id}`, JSON.stringify(updatedJob.isSaved));

      if (updatedJob.isSaved) {
        toast.success("Job saved successfully!");
        navigate("/freelancer/profile");
      } else {
        toast.success("Job unsaved successfully!");
        navigate("/freelancer/profile");
      }

      const updatedProjects = projectsToDisplay.map((p) => {
        if (p.id === updatedJob.id) {
          return updatedJob;
        }
        return p;
      });

      projectsToDisplay(updatedProjects);
    } catch (error) {
      console.error("Error toggling job save state", error);
    }
  };

  const handleClick = (event, index, project) => {
    event.stopPropagation();
    event.preventDefault();
    handleToggleDescription(index);
    toggleSaveProject(project);
  };

  const [bidsCount, setBidsCount] = useState({});

  useEffect(() => {
    const fetchBidsForAllProjects = async () => {
      const bids = {};

      for (const project of viewProject || []) {
        try {
          const response = await axios.get(`https://www.api.alanced.com/freelance/View/bids/${project.id}`);
          if (response.status === 200) {
            bids[project.id] = response.data.count;
          } else {
            console.log(response.data.message || "Error fetching bids");
            bids[project.id] = 0;
          }
        } catch (err) {
          console.log(err.message);
          bids[project.id] = 0;
        }
      }

      setBidsCount(bids);
    };

    fetchBidsForAllProjects();
  }, [viewProject]);

  function highlightText(text, query) {
    if (!query) {
      return text;
    }

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} style={{ backgroundColor: "#73cbfa" }}>
            {part}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }

  return (
    <>
      <div className="lg:pt-5 px-5 lg:px-24">
        <div className="w-full h-40 md:h-52 flex bg-[#F6FAFD]">
          <div className="w-full md:w-[60%] flex flex-col justify-center items-start p-2 md:pl-10 ">
            <h1 className=" text-[#031136] text-xl font-normal">
              {day}, {formattedDate}
            </h1>
            <h1 className=" text-[#031136] text-3xl text-start font-semibold py-1">
              Good {greeting}, <span className="capitalize font-[500]">{displayName}</span>
            </h1>
          </div>
          <div className="hidden w-[40%] h-full md:block">
            <img src={hero2Image} alt="hero-2" className="w-full h-full bg-contain " />
          </div>
        </div>
        <div class="flex flex-col md:flex-row mb-5 mx-5">
          <div class="w-full md:w-[30%] pt-3 bg-[#FFFFFF] py-8 border-l border-b border-gray-200 border-opacity-30 text-left">
            <Link to="/saved-jobs">
              <div className="flex items-center justify-between border-b border-gray-200 border-opacity-30 px-4 md:px-8 py-4 hover:bg-[#e2f1f9] rounded-2xl">
                <h1 className=" text-xl text-[#031136] font-normal mr-1">Saved Jobs</h1>
                <div className="flex items-center space-x-2 text-blue-600 mr-5">
                  <i class="bi bi-heart"></i>
                  {/* <i class="bi bi-heart-fill"></i> */}
                </div>
              </div>
            </Link>
            <Link to="/my-proposals">
              <div className="flex items-center justify-between border-b border-gray-200 border-opacity-30 px-4 md:px-8 py-4 hover:bg-[#e2f1f9] rounded-2xl">
                <h1 className=" text-xl text-[#031136] font-normal mr-1">Proposals</h1>
                <div className="flex items-center space-x-2 text-blue-600 mr-5">
                  <i class="bi bi-send-check"></i>
                  {/* <i class="bi bi-send-check-fill"></i> */}
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between border-b border-gray-200 border-opacity-30 px-4 md:px-8 py-4 hover:bg-[#e2f1f9] rounded-2xl">
              <h1 className=" text-xl text-[#031136] font-normal mr-1">Get Paid</h1>
              <div className="flex items-center space-x-2 text-blue-600 mr-5">
                {/* <img src={downarrow} alt="" /> */}
                <i class="bi bi-coin"></i>
              </div>
            </div>
            <Link to="/projects">
              <div className="grid grid-cols-[2fr,1fr] gap-2 bg-[#e2f1f9] rounded-lg p-4 mx-4 my-3 shadow-sm">
                <div>
                  <h1 className=" text-lg text-[#031136] text-left">Get Tips To Find Work</h1>
                  <p className=" text-sm text-[#0A142F] opacity-50 py-2 text-left">
                    Learn to optimize search, use Connects, and land your first job.
                  </p>
                </div>
                <div className="text-center">
                  <i class="bi bi-arrow-right"></i>
                  <img src={ladder} alt="" className="mx-auto h-16 w-16 mt-2" />
                </div>
              </div>
            </Link>
            <Link to="/all-invitations">
              <div className="grid grid-cols-[2fr,1fr] gap-2 bg-[#e2f1f9] rounded-lg p-4 mx-4 relative z-10 shadow-sm">
                <div>
                  <h1 className=" text-lg text-[#031136] text-left">My Jobs</h1>
                  <p className=" text-sm text-[#0A142F] opacity-50 py-2 text-left">View your active contracts, timesheets, and available earnings.</p>
                </div>
                <div className="text-center">
                  <i class="bi bi-arrow-right"></i>
                  <img src={bag} alt="" className="mx-auto h-16 w-16 mt-2" />
                </div>
              </div>
            </Link>
          </div>
          {/* {viewallprojects != null ?  */}
          <div class="w-full md:w-[70%] pt-3 bg-[#FFFFFF] py-8 border border-gray-200 border-opacity-30 text-left">
            <div className="px-4 md:px-8 pt-4 border-b border-gray-200 border-opacity-30">
              {/* <h1 className=" text-[21px] text-[#031136] font-normal mr-1">Jobs You Might Like</h1> */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className=" text-[21px] text-[#031136] font-normal mr-1">Jobs You Might Like</h1>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-1 space-x-1 border p-1 w-[200px] rounded-md">
                    <img src={search} alt="Search Icon" className="h-4 w-4 mr-1 ml-1" />
                    <input
                      className="w-28 lg:w-40 xl:w-[160px] h-7 text-sm lg:text-sm outline-none"
                      placeholder="Search Jobs by skills"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-8 py-2">
              <p className=" opacity-50 text-[#0A142F] text-[13px]">
                Browse jobs that match your experience to a client's hiring preferences.
                <br /> Ordered by most relevant.
              </p>
            </div>
            {viewProject != null ? (
              viewProject.length > 0 ? (
                <div>
                  {viewProject &&
                    viewProject.map((project, index) => {
                      const words = project.description.split(" ");
                      const displayWords = expandedProjects[index] || words.length <= 50 ? words : words.slice(0, 50);
                      return (
                        <>
                          <Link to="/view-project/full-detail" state={{ project }}>
                            <div className="px-4 md:px-8 py-5 hover:bg-[#F6FAFD] border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <p className=" text-[#0A142F] text-[18px] font-semibold">{highlightText(project.title, searchQuery)}</p>
                                <div className="flex items-center space-x-2">
                                  <div
                                    className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200"
                                    onClick={(event) => handleClick(event, index, project)}
                                  >
                                    {localStorage.getItem(`isSaved_${project.id}`) === "true" ? (
                                      <i className="fa fa-heart p-1 text-blue-600"></i>
                                    ) : (
                                      <i className="fa fa-heart-o p-1"></i>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {AllProposals &&
                                AllProposals.map((all, proposal) => {
                                  return (
                                    <>
                                      {project.id == all.project_id ? (
                                        <span className="text-blue-600 flex justify-center items-center w-fit">
                                          <TaskOutlinedIcon className="mr-1 text-blue-600" />
                                          Already Applied
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  );
                                })}
                              <p className=" opacity-50 text-[#0A142F] text-[13px] py-3">
                                {highlightText(project.rate, searchQuery)} - {highlightText(project.experience_level.replace(/_/g, " "), searchQuery)}{" "}
                                - Est. Budget: $
                                {project.rate == "Hourly"
                                  ? project.min_hourly_rate + "/hr" + " - " + "$" + project.max_hourly_rate + "/hr"
                                  : project.fixed_budget}{" "}
                                - Posted {timeAgo(project.project_creation_date)}
                              </p>
                              <p className=" text-opacity-50 text-[#0A142F] text-[14px] py-3">
                                Job Description: {highlightText(displayWords.join(" "), searchQuery)}
                                {words.length > 50 && (
                                  <span
                                    className=" text-[#031136] text-[18px] font-semibold cursor-pointer pl-2"
                                    onClick={(event) => handleClick(event, index)}
                                  >
                                    {expandedProjects[index] ? "Less" : "More"}
                                  </span>
                                )}
                              </p>
                              {JSON.parse(project.skills_required.replace(/'/g, '"')).map((skill, index) => (
                                <Link to="">
                                  <span className="border px-4 py-1 border-gray-300 opacity-50 rounded  text-[#0A142F] text-[13px] inline-block mr-2 my-2">
                                    {highlightText(skill, searchQuery)}
                                  </span>
                                </Link>
                              ))}
                              <p className=" text-[#0A142F] text-[14px] py-1 mr-1">
                                Proposals : <span className="opacity-50">{bidsCount[project.id] ? bidsCount[project.id] : 0}</span>
                              </p>
                              <img src={verify} alt="" className="inline-block h-3 w-3 mr-1" />
                              <p className=" text-[#0A142F] text-[14px] opacity-50 inline-block">Payment verified</p>
                              <div className="text-[16px] text-[#FFC107] inline-block mx-3">★★★★★</div>
                              <img src={location} alt="" className="inline-block h-3 w-3 mr-1" />
                              <p className=" text-[#0A142F] text-[14px] opacity-50 inline-block">
                                {highlightText(project.project_owner_location ? project.project_owner_location : "NA", searchQuery)}
                              </p>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                </div>
              ) : (
                <div className=" mx-auto">
                  <img src={Bag} alt="" className="h-[10%] ml-[42%] mt-[20%]" />
                  <p className=" mt-5  text-xl opacity-70 text-center">There are no results that match your search.</p>
                  <p className=" mt-3  text-sm opacity-60 text-center">Please try adjusting your search keywords or filters.</p>
                </div>
              )
            ) : (
              <div>
                {[...Array(8)].map((_) => {
                  return (
                    <div className="mb-5">
                      <Skeleton height={30} width={200} style={{ marginLeft: 20, marginTop: 20 }} />
                      <Skeleton height={30} width={300} style={{ marginLeft: 20, marginTop: 10 }} />
                      <Skeleton height={110} width={700} style={{ marginLeft: 20, marginTop: 10 }} />
                      <Skeleton height={30} width={100} inline={true} style={{ marginTop: 5, marginLeft: 70, float: "left" }} />
                      <Skeleton height={30} width={100} inline={true} count={2} style={{ marginTop: 5, marginLeft: 5, float: "left" }} />
                      <br />
                      <br />
                      <Skeleton height={20} width={200} style={{ marginLeft: 20 }} />
                      <Skeleton height={20} width={250} style={{ marginLeft: 20, marginTop: 10 }} />
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              {/* {projectsToDisplay?.length > 5 && (
                    <div className="flex justify-end items-center gap-6 m-4">
                        <IconButton
                            size="sm"
                            variant="outlined"
                            onClick={prev}
                            disabled={currentPage === 1}
                            style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
                        >
                            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
                        </IconButton>
                        
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <span
                                    key={pageNumber}
                                    className={`px-0 py-1 ${currentPage === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold  text-[14px] cursor-pointer' : 'text-[#0A142F] font-bold  text-[14px] cursor-pointer'}`}
                                    onClick={() => setCurrentPage(pageNumber)}
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
                            style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
                        >
                            <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
                        </IconButton>
                    </div>
                )} */}
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
                            ? "bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold  text-[14px] cursor-pointer"
                            : "text-[#0A142F] font-bold  text-[14px] cursor-pointer"
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
                      backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                      border: "none",
                    }}
                  >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default FreelancerAfterLogin;
