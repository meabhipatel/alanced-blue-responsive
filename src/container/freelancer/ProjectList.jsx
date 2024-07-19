import React, { useState, useEffect } from "react";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "rc-slider/assets/index.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import CategoryList from "./AllSelectionData/CategoryList";
import ExperienceLevel from "./AllSelectionData/ExperienceLevel";
import ProjectRate from "./AllSelectionData/ProjectRate";
import CityList from "./AllSelectionData/CityList";
import SkillsList from "./AllSelectionData/SkillsList";
import Bag from "../../components/images/experience.png";
import mybg from "../../assets/half_background.png";
import hero2Image from "../../assets/hero2.png";
import { IoMdSearch } from "react-icons/io";

function ProjectList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [skillFilter, setSkillFilter] = useState([]);
  const [expFilter, setExpFilter] = useState([]);
  const [rateFilter, setRateFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleCategoryFilterChange = (e) => {
    const category = e.target.value;
    if (e.target.checked) {
      setCategoryFilter((prevFilters) => [...prevFilters, category]);
    } else {
      setCategoryFilter((prevFilters) => prevFilters.filter((filter) => filter !== category));
    }
    setCurrentPage(1);
  };

  const handleSkillFilterChange = (e) => {
    const skills = e.target.value;
    if (e.target.checked) {
      setSkillFilter((prevFilters) => [...prevFilters, skills]);
    } else {
      setSkillFilter((prevFilters) => prevFilters.filter((filter) => filter !== skills));
    }
    setCurrentPage(1);
  };

  const handleExpFilterChange = (e) => {
    const exp = e.target.value;
    if (e.target.checked) {
      setExpFilter((prevFilters) => [...prevFilters, exp]);
    } else {
      setExpFilter((prevFilters) => prevFilters.filter((filter) => filter !== exp));
    }
    setCurrentPage(1);
  };

  const handleRateFilterChange = (e) => {
    const protype = e.target.value;
    if (e.target.checked) {
      setRateFilter((prevFilters) => [...prevFilters, protype]);
    } else {
      setRateFilter((prevFilters) => prevFilters.filter((filter) => filter !== protype));
    }
    setCurrentPage(1);
  };

  const handleCityFilterChange = (e) => {
    const city = e.target.value;
    if (e.target.checked) {
      setCityFilter((prevFilters) => [...prevFilters, city]);
    } else {
      setCityFilter((prevFilters) => prevFilters.filter((filter) => filter !== city));
    }
    setCurrentPage(1);
  };

  const [viewProject, setViewProject] = useState([]);

  useEffect(() => {
    const queryParameters = [];

    if (categoryFilter.length > 0) {
      queryParameters.push(`category=${categoryFilter.join("&category=")}`);
    }

    if (skillFilter.length > 0) {
      queryParameters.push(`skills_required=${skillFilter.join("&skills_required=")}`);
    }

    if (expFilter.length > 0) {
      queryParameters.push(`experience_level=${expFilter.join("&experience_level=")}`);
    }

    if (rateFilter.length > 0) {
      queryParameters.push(`rate=${rateFilter.join("&rate=")}`);
    }

    if (cityFilter.length > 0) {
      queryParameters.push(`project_owner_location=${cityFilter.join("&project_owner_location=")}`);
    }

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
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [categoryFilter, skillFilter, expFilter, rateFilter, searchQuery, cityFilter, currentPage]);

  const [cate] = useState(CategoryList);
  const [expe] = useState(ExperienceLevel);
  const [type] = useState(ProjectRate);
  const [city] = useState(CityList);
  const [req_skill] = useState(SkillsList);

  function timeAgo(postedTimeStr) {
    const postedTime = new Date(postedTimeStr);
    const currentTime = new Date();

    const deltaInMilliseconds = currentTime - postedTime;
    const deltaInSeconds = Math.floor(deltaInMilliseconds / 1000);
    const deltaInMinutes = Math.floor(deltaInSeconds / 60);
    const deltaInHours = Math.floor(deltaInMinutes / 60);
    const deltaInDays = Math.floor(deltaInHours / 24);

    if (deltaInMinutes < 1) {
      return "just now";
    } else if (deltaInMinutes < 60) {
      return `${deltaInMinutes} minute ago`;
    } else if (deltaInHours < 24) {
      return `${deltaInHours} hour ago`;
    } else if (deltaInDays < 30) {
      return `${deltaInDays} day ago`;
    } else if (deltaInDays < 365) {
      const months = Math.floor(deltaInDays / 30);
      return `${months} month ago`;
    } else {
      const years = Math.floor(deltaInDays / 365);
      return `${years} year ago`;
    }
  }

  const [expandedProjects, setExpandedProjects] = useState([]);

  const handleToggleDescription = (index) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };
  const handleClick = (event, index) => {
    event.stopPropagation();

    handleToggleDescription(index);
  };

  const [AllProposals, setAllProposals] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;
      try {
        // Fetch doc API
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

  //(=//=//=//=//=//=//=//=//=)filter API integrtion(//=//=//=//=//=//=//=//=//=)

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

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [showAll, setShowAll] = useState(false);
  const initialCategoryCount = 5; // Initial number of categories to show

  const [visibleCategories, setVisibleCategories] = useState(cate.slice(0, initialCategoryCount));

  const handleShowMore = () => {
    setVisibleCategories(cate); // Show all categories
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleCategories(cate.slice(0, initialCategoryCount)); // Show the initial count
    setShowAll(false);
  };

  const [showAllSkills, setShowAllSkills] = useState(false);
  const initialSkillCount = 5; // Initial number of skills to show

  const [visibleSkills, setVisibleSkills] = useState(req_skill.slice(0, initialSkillCount));

  const handleShowMoreSkills = () => {
    setVisibleSkills(req_skill); // Show all skills
    setShowAllSkills(true);
  };

  const handleShowLessSkills = () => {
    setVisibleSkills(req_skill.slice(0, initialSkillCount)); // Show the initial count
    setShowAllSkills(false);
  };

  const [showAllCity, setShowAllCity] = useState(false);
  const initialCityCount = 5; // Initial number of cities to show

  const [visibleCities, setVisibleCities] = useState(city.slice(0, initialCityCount));

  const handleShowMoreCity = () => {
    setVisibleCities(city); // Show all cities
    setShowAllCity(true);
  };

  const handleShowLessCity = () => {
    setVisibleCities(city.slice(0, initialCityCount)); // Show the initial count
    setShowAllCity(false);
  };

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
      {/* ---> page Header  */}
      <div className="h-[50vh] bg-no-repeat bg-cover flex justify-center items-end pb-6" style={{ backgroundImage: `url(${mybg})` }}>
        <div className="w-[95%] sm:w-[80%] flex p-5 rounded-md text-2xl bg-white">
          <div className="w-full flex flex-col items-start pt-5 text-start">
            <h1>Projects List</h1>
            <p className=" text-sm text-[#797979] font-normal mt-2">Explore high-paying freelance opportunities and land your dream job now!</p>
            <div className="w-full bg-gray-50 p-3 h-14 rounded-md flex items-center mt-4 shadow-md">
              <div className="w-full flex flex-row">
                <IoMdSearch className="w-6 h-6 text-[#797979]" />
                <input
                  className="w-full px-3 text-base bg-transparent outline-none"
                  placeholder="Search by Category"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
              </div>

              <button className="rounded h-8 w-24 font-semibold text-base text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]">Search</button>
            </div>
          </div>
          <div className="w-full relative hidden lg:block  ">
            <img src={hero2Image} alt="hero-image-2" className="absolute -bottom-12" />
          </div>
        </div>
      </div>

      {/* ---> page Body  */}
      <div className="mt-1 xl:px-20 mb-2">
        <div className="flex flex-row px-5">
          {/* ---> side categoy bar */}
          <div className="w-full hidden lg:block md:w-[25%] pt-3 bg-[#FFFFFF] py-8 text-left sticky top-24 h-[90vh] overflow-y-auto">
            <div>
              <h1 className=" text-xl text-left font-normal">Category</h1>
            </div>
            {visibleCategories.map((category, index) => (
              <div key={category} className="flex flex-row mt-4">
                <div className="basis-10/12">
                  <label className="flex items-center  relative cursor-pointer">
                    <input className="hidden" type="checkbox" value={category} onChange={handleCategoryFilterChange} />
                    <div className="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                      <span className="checkmark hidden">
                        <i className="bi bi-check-lg pr-0.5 pt-2"></i>
                      </span>
                    </div>
                    <span className="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                    <span className="font-normal text-[#797979]">{category}</span>
                  </label>
                </div>
              </div>
            ))}
            {showAll ? (
              <div>
                <h1 className=" text-xl text-left mt-5 font-normal cursor-pointer" onClick={handleShowLess}>
                  Show Less
                </h1>
              </div>
            ) : (
              <div>
                <h1 className=" text-xl text-left mt-5 font-normal cursor-pointer" onClick={handleShowMore}>
                  +{cate.length - initialCategoryCount} More
                </h1>
              </div>
            )}
            <div>
              <h1 className=" text-xl text-left font-normal mt-10">Experience Level</h1>
            </div>
            {expe.map((exp) => (
              <div key={exp} className="flex flex-row mt-4">
                <div className="basis-8/12">
                  <label className="flex items-center  relative cursor-pointer">
                    <input className="hidden" type="checkbox" value={exp} onChange={handleExpFilterChange} />
                    <div className="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                      <span className="checkmark hidden">
                        <i className="bi bi-check-lg pr-0.5 pt-2"></i>
                      </span>
                    </div>
                    <span className="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                    <span className="font-normal text-[#797979]">{exp.replace(/_/g, " ")}</span>
                  </label>
                </div>
              </div>
            ))}
            <div>
              <h1 className=" text-xl text-left font-normal mt-10">Project Type</h1>
            </div>
            {type.map((protype, index) => (
              <div key={index} className="flex flex-row mt-4">
                <div className=" basis-8/12 text-left">
                  <label className="relative inline-flex items-center mr-5 cursor-pointer">
                    <input className="sr-only peer" type="checkbox" value={protype} onChange={handleRateFilterChange} />
                    <div className="w-11 h-6 bg-white border-2  border-blue-300 rounded-full peer dark:bg-white-700 peer-focus:ring-0 peer-focus:ring-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gradient-to-r  after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                    <span className="ml-3 text-base font-normal  text-[#797979]">{protype}</span>
                  </label>
                </div>
              </div>
            ))}

            <div>
              <h1 className=" text-xl text-left font-normal mt-10">Skills</h1>
            </div>
            {visibleSkills.map((skills) => (
              <div key={skills} className="flex flex-row mt-4">
                <div className="basis-8/12">
                  <label className="flex items-center  relative cursor-pointer">
                    <input className="hidden" type="checkbox" value={skills} onChange={handleSkillFilterChange} />
                    <div className="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                      <span className="checkmark hidden">
                        <i className="bi bi-check-lg pr-0.5 pt-2"></i>
                      </span>
                    </div>
                    <span className="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                    <span className="font-normal text-[#797979]">{skills}</span>
                  </label>
                </div>
              </div>
            ))}
            {showAllSkills ? (
              <div>
                <h1 className=" text-xl text-left mt-5 font-normal cursor-pointer" onClick={handleShowLessSkills}>
                  Show Less
                </h1>
              </div>
            ) : (
              <div>
                <h1 className=" text-xl text-left mt-5 font-normal cursor-pointer" onClick={handleShowMoreSkills}>
                  +{req_skill.length - initialSkillCount} More
                </h1>
              </div>
            )}
            <div>
              <h1 className=" text-xl text-left font-normal mt-10">Citys</h1>
            </div>
            {visibleCities.map((location, index) => (
              <div key={index} className="flex flex-row mt-4">
                <div className="basis-8/12">
                  <label className="flex items-center  relative cursor-pointer">
                    <input className="hidden" type="checkbox" value={location} onChange={handleCityFilterChange} />
                    <div className="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                      <span className="checkmark hidden">
                        <i className="bi bi-check-lg pr-0.5 pt-2"></i>
                      </span>
                    </div>
                    <span className="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                    <span className="font-normal text-[#797979]">{location}</span>
                  </label>
                </div>
              </div>
            ))}
            {showAllCity ? (
              <div>
                <h1 className=" text-xl text-left mt-5 font-normal cursor-pointer" onClick={handleShowLessCity}>
                  Show Less
                </h1>
              </div>
            ) : (
              <div>
                <h1 className=" text-xl text-left mt-5 font-normal cursor-pointer" onClick={handleShowMoreCity}>
                  +{city.length - initialCityCount} More
                </h1>
              </div>
            )}
          </div>

          {/* ---> card container  */}
          {viewProject != null ? (
            viewProject.length > 0 ? (
              <div className="w-full lg:w-[80%] flex flex-col gap-y-3 mt-10 md:ml-2 mb-5">
                {viewProject && (
                  <>
                    {viewProject.map((project, index) => {
                      const words = project.description.split(" ");
                      const displayWords = expandedProjects[index] || words.length <= 30 ? words : words.slice(0, 30);

                      return (
                        <div
                          key={index}
                          className="w-full flex flex-col md:flex-row justify-between md:px-12 p-2 rounded-md bg-gray-50 hover:bg-gray-100 duration-300"
                        >
                          <div className="basis-9/12 text-left ">
                            <h1 className=" text-lg">{highlightText(project.title, searchQuery)}</h1>
                            {AllProposals &&
                              AllProposals.map((all) => {
                                return (
                                  <>
                                    {project.id == all.project_id ? (
                                      <span key={all.project_id} className="text-blue-600 flex justify-center items-center w-fit">
                                        <TaskOutlinedIcon className="mr-1 text-blue-600" />
                                        Already Applied
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                            <div className="flex flex-row mt-3">
                              <div className=" basis-4/12 border-2 border-r-[#797979] mr-2 border-t-0 border-b-0 border-l-0">
                                <div className="flex flex-row">
                                  <div className=" basis-2/12">
                                    <i className="bi bi-geo-alt"></i>
                                  </div>
                                  <div className=" basis-10/12  text-[#797979]">
                                    {highlightText(project.project_owner_location ? project.project_owner_location : "NA", searchQuery)}
                                  </div>
                                </div>
                              </div>
                              <div className=" basis-4/12 border-2 border-r-[#797979] mr-2 border-t-0 border-b-0 border-l-0">
                                <div className="flex flex-row">
                                  <div className=" basis-2/12">
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                  </div>
                                  <div className=" basis-10/12  text-[#797979]">{timeAgo(project.project_creation_date)}</div>
                                </div>
                              </div>
                              <div className=" basis-4/12">
                                <div className="flex flex-row">
                                  <div className=" basis-2/12">
                                    <i className="bi bi-file-text"></i>
                                  </div>
                                  <div className=" basis-10/12  text-[#797979]">{bidsCount[project.id] ? bidsCount[project.id] : 0} Received</div>
                                </div>
                              </div>
                            </div>

                            <p className=" text-opacity-50 text-[#0A142F] text-[14px] py-3">
                              Job Description: {highlightText(displayWords.join(" "), searchQuery)}
                              {words.length > 30 && (
                                <span
                                  className=" text-[#031136] text-[18px] font-semibold cursor-pointer pl-2"
                                  onClick={(event) => handleClick(event, index)}
                                >
                                  {expandedProjects[index] ? "Less" : "More"}
                                </span>
                              )}
                            </p>
                            {JSON.parse(project.skills_required.replace(/'/g, '"')).map((skill, index) => (
                              <span
                                key={index}
                                className="border px-4 py-1 border-gray-300 opacity-60 rounded  text-[#0A142F] text-[13px] inline-block mr-2 my-2"
                              >
                                {highlightText(skill, searchQuery)}
                              </span>
                            ))}
                          </div>
                          <div className="h-full flex flex-row md:flex-col items-center md:items-end justify-center gap-5 md:gap-2">
                            <h1 className=" text-xl font-extrabold text-right">
                              $
                              {project.rate == "Hourly"
                                ? project.min_hourly_rate + "/hr" + " - " + "$" + project.max_hourly_rate + "/hr"
                                : project.fixed_budget}
                            </h1>
                            <p className=" text-[#797979] mt-1 text-sm text-right">{project.rate} Rate</p>
                            <div className="">
                              <Link to="/view-more/project-detail" state={{ project }}>
                                <button className="rounded h-12 w-36  text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-sm font-bold ">
                                  View Detail
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              <div className=" mx-auto">
                <img src={Bag} alt="" className="h-[10%] ml-[30%] mt-[20%]" />
                <p className=" mt-5  text-xl opacity-70">There are no results that match your search.</p>
                <p className=" mt-3  text-sm opacity-60">Please try adjusting your search keywords or filters.</p>
              </div>
            )
          ) : (
            <div className=" basis-9/12 mt-10">
              <Skeleton height={50} width={50} inline={true} style={{ float: "left" }} />
              <Skeleton height={110} width={700} style={{ float: "left", marginLeft: 20 }} />
              <Skeleton height={40} width={100} style={{ marginTop: 40 }} />
              <br />
              <Skeleton height={40} width={100} inline={true} style={{ marginTop: 5, marginLeft: 70, float: "left" }} />
              <Skeleton height={40} width={100} inline={true} count={2} style={{ marginTop: 5, marginLeft: 5, float: "left" }} />

              <Skeleton height={50} width={50} inline={true} style={{ float: "left", marginTop: 80, marginLeft: -382 }} />
              <Skeleton height={110} width={700} style={{ float: "left", marginLeft: 70, marginTop: 35 }} />
              <Skeleton height={40} width={100} style={{ marginTop: 125 }} />
              <br />
              <Skeleton height={40} width={100} inline={true} style={{ marginTop: 5, marginLeft: 70, float: "left" }} />
              <Skeleton height={40} width={100} inline={true} count={2} style={{ marginTop: 5, marginLeft: 5, float: "left" }} />

              <Skeleton height={50} width={50} inline={true} style={{ float: "left", marginTop: 80, marginLeft: -382 }} />
              <Skeleton height={110} width={700} style={{ float: "left", marginLeft: 70, marginTop: 35 }} />
              <Skeleton height={40} width={100} style={{ marginTop: 125 }} />
              <br />
              <Skeleton height={40} width={100} inline={true} style={{ marginTop: 5, marginLeft: 70, float: "left" }} />
              <Skeleton height={40} width={100} inline={true} count={2} style={{ marginTop: 5, marginLeft: 5, float: "left" }} />
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-6 m-4">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={prev}
              disabled={currentPage === 1}
              style={{ backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)", border: "none" }}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
            </IconButton>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <span
                  key={pageNumber}
                  className={`px-0 py-1 ${currentPage === pageNumber ? "bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold  text-[14px] cursor-pointer" : "text-[#0A142F] font-bold  text-[14px] cursor-pointer"}`}
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
              style={{ backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)", border: "none" }}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
            </IconButton>
          </div>
        )}
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
}

export default ProjectList;
