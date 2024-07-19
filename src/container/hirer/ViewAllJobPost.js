import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link } from "react-router-dom";
import search from "../../components/images/SearchOutlined.png";
import searchbtn from "../../components/images/searchbtn.png";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { GetViewHirerSelfProjectssAction } from "../../redux/Hirer/HirerAction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { timeAgo } from "../freelancer/TimeFunctions";
import experiences from "../../components/images/experience.png";

const ViewAllJobPost = () => {
  const viewhirerselfproject = useSelector((state) => state.hirer.viewhirerselfproject);
  //  const accessToken = useSelector(state => state.login.accessToken);
  const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const id = viewhirerselfproject && viewhirerselfproject.id ? viewhirerselfproject.id : "";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  //  React.useEffect(() => {
  //   dispatch(GetViewHirerSelfProjectssAction(accessToken))
  // }, [])

  const [selectedButton, setSelectedButton] = useState("All Job Posts");
  const commonStyle = "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  const [viewhirerProject, setViewhirerProject] = useState([]);
  //   const userCategory = logindata?.category

  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/freelance/view/hirer-self/Project?${queryString}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setViewhirerProject(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [searchQuery, currentPage]);

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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

  const isJobOpen = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return now < deadlineDate;
  };

  const [bidsCount, setBidsCount] = useState({});

  useEffect(() => {
    const fetchBidsForAllProjects = async () => {
      const bids = {};

      for (const project of viewhirerProject || []) {
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
  }, [viewhirerProject]);

  const [invitesCount, setInvitesCount] = useState({});

  useEffect(() => {
    const fetchInvitesForAllProjects = async () => {
      const invites = {};

      for (const project of viewhirerProject || []) {
        try {
          const response = await axios.get(`https://www.api.alanced.com/freelance/View/project-invitations-count/${project.id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.status === 200) {
            invites[project.id] = response.data.data;
          } else {
            console.log(response.data.message || "Error fetching bids");
            invites[project.id] = 0;
          }
        } catch (err) {
          console.log(err.message);
          invites[project.id] = 0;
        }
      }

      setInvitesCount(invites);
    };

    fetchInvitesForAllProjects();
  }, [viewhirerProject]);

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <div className="mt-3 flex flex-wrap">
          <Link to="/View-all/Job-post" className="flex-grow md:flex-none p-1">
            <span
              className={`${commonStyle} px-3 my-3 md:px-8 text-base font-inter font-bold ${
                selectedButton === "All Job Posts"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-50"
              } mr-3`}
              onClick={() => setSelectedButton("All Job Posts")}
            >
              All Job Posts
            </span>
          </Link>
          <Link to="/view-all/hirer-contracts" className="flex-grow md:flex-none p-1">
            <span
              className={`${commonStyle} px-3 md:px-8 font-inter font-normal text-sm text-[#797979] opacity-[50%] ${
                selectedButton === "All Contracts"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-[50%]"
              } mr-3`}
              onClick={() => setSelectedButton("All Contracts")}
            >
              All Contracts
            </span>
          </Link>
        </div>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
          <section className="flex items-center p-2 bg-white rounded-lg m-5 border w-[49%]">
            <div className="flex items-center mr-1 space-x-1">
              <img src={search} alt="Search Icon" className="h-3 w-3" />
              <input
                className="w-28 lg:w-40 xl:w-[30rem] h-7 text-xs lg:text-sm outline-none"
                placeholder="Search Projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <div className='flex items-center mr-1 space-x-1'>
        <img src={search} alt="Search Icon" className="h-3 w-3" />
        <input className='w-28 lg:w-40 xl:w-[30rem] h-7 text-xs lg:text-sm outline-none' placeholder='Search Job Postings' />
    </div> */}
            <button className="rounded h-7 w-7 p-2 text-xs lg:text-sm font-semibold text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]">
              <img src={searchbtn} alt="Search Icon" />
            </button>
          </section>
          {viewhirerProject !== null ? (
            viewhirerProject && viewhirerProject.length > 0 ? (
              <div>
                {viewhirerProject &&
                  viewhirerProject.map((project, index) => (
                    <div className="px-4 md:px-8 py-5 border-b border-gray-200 hover:bg-[#F6FAFD] border-opacity-30" key={index}>
                      <div class="flex">
                        <div class="flex-[40%]">
                          <Link to="/View/Job-post" state={{ project }}>
                            <p className="font-inter text-[#0A142F] text-[16px] font-medium hover:underline hover:text-blue-600">
                              {highlightText(project.title, searchQuery)}
                            </p>
                          </Link>
                          <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-1">
                            {highlightText(project.Project_Rate, searchQuery)} Rate -{" "}
                            {highlightText(project.experience_level.replace(/_/g, " "), searchQuery)} - Posted {timeAgo(project.Project_created_at)}
                          </p>
                          <span
                            className={`px-4 py-1 rounded font-inter text-[#0A142F] text-[13px] inline-block mr-2 my-2 font-semibold ${
                              project.is_hired
                                ? "bg-yellow-100 text-yellow-700 border border-yellow-700"
                                : "bg-[#E4EBE4] text-blue-800 border border-blue-800"
                            }`}
                          >
                            {project.is_hired ? "Closed" : "Open"}
                          </span>
                        </div>
                        <div class="flex-[40%] flex">
                          <div class="flex-1 p-2">
                            <p className="font-inter text-[#0A142F] text-[16px] font-medium">{bidsCount[project.id] ? bidsCount[project.id] : 0}</p>
                            <p className="font-inter text-[#0A142F] opacity-50 text-[16px] font-medium">Proposals</p>
                          </div>
                          <div class="flex-1 p-2">
                            <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                              {invitesCount[project.id] ? invitesCount[project.id] : 0}
                            </p>
                            <p className="font-inter text-[#0A142F] opacity-50 text-[16px] font-medium">Messaged</p>
                          </div>
                          <div class="flex-1 p-2">
                            <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                              {invitesCount[project.id] ? invitesCount[project.id] : 0}
                            </p>
                            <p className="font-inter text-[#0A142F] opacity-50 text-[16px] font-medium">Invitations</p>
                          </div>
                        </div>
                        <div class="flex-[20%] text-center">
                          <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] mt-3 mr-2">
                            <Link to="/View-all/proposals" state={{ project, isOpen: project.is_hired }}>
                              <button class="px-2 py-1 bg-white">
                                <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
                                  View Proposals
                                </p>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="mt-16 mb-8">
                <img src={experiences} alt="" className="mx-auto mt-2" />
                <div className="px-4 md:px-8 py-5 text-center text-2xl opacity-50">Jobs Not Found</div>
              </div>
            )
          ) : (
            <div>
              {[...Array(8)].map((_) => {
                return (
                  <div className="flex mt-5">
                    <div className="pl-6">
                      <Skeleton height={20} width={120} />
                      <Skeleton height={20} width={250} style={{ marginTop: 10 }} />
                      <Skeleton height={30} width={60} style={{ marginTop: 10 }} />
                    </div>
                    <div className="ml-48">
                      <Skeleton height={45} inline="true" count={2} width={100} style={{ marginLeft: 60 }} />
                      <Skeleton height={45} inline="true" width={60} style={{ marginLeft: 60 }} />
                    </div>
                    <Skeleton height={40} width={150} style={{ marginLeft: 140 }} />
                  </div>
                );
              })}
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
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default ViewAllJobPost;
