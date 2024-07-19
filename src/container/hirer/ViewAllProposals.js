import React, { useEffect } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link, useLocation } from "react-router-dom";
import search from "../../components/images/SearchOutlined.png";
import searchbtn from "../../components/images/searchbtn.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import experience from "../../components/images/experience.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import AddHiringRequestPopup from "./HirerAllPopup/AddHiringRequestPopup";

const ViewAllProposals = () => {
  const [sortCriterion, setSortCriterion] = useState("bestMatch");
  const error = useSelector((state) => state.hirer.error);

  const viewallbids = useSelector((state) => state.hirer.viewallbids);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHiringOpen, setIsHiringOpen] = useState({});
  const location = useLocation();
  const project = location.state && location.state.project;
  const isOpen = location.state && location.state.isOpen;

  const id = project.id;

  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");

  const convertToDateObject = (dateString) => {
    const [date, time, period] = dateString.split(" ");
    const [year, month, day] = date.split("-");
    let [hour, minute] = time.split(":");

    if (period === "PM" && hour !== "12") {
      hour = parseInt(hour) + 12;
    }

    if (period === "AM" && hour === "12") {
      hour = "00";
    }

    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:00`;
    return new Date(formattedDate);
  };

  const sortBids = (bids) => {
    if (!bids) return [];

    let sortedBids = [...bids];
    switch (sortCriterion) {
      case "newest":
        sortedBids.sort((a, b) => convertToDateObject(b.bid_time) - convertToDateObject(a.bid_time));
        break;
      case "oldest":
        sortedBids.sort((a, b) => convertToDateObject(a.bid_time) - convertToDateObject(b.bid_time));
        break;
      case "highestRate":
        sortedBids.sort((a, b) => b.bid_amount - a.bid_amount);
        break;
      case "lowestRate":
        sortedBids.sort((a, b) => a.bid_amount - b.bid_amount);
        break;
      default:
        break;
    }
    return sortedBids;
  };

  const openHiring = (freelancerId) => {
    setIsHiringOpen((prev) => ({ ...prev, [freelancerId]: true }));
  };

  // Function to close hiring popup for a specific freelancer
  const closeHiring = (freelancerId) => {
    setIsHiringOpen((prev) => ({ ...prev, [freelancerId]: false }));
  };

  const [viewbids, setViewBids] = useState([]);

  console.log("viewbids on ViewAllProposals : ", viewbids);
  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/freelance/View/bids/${id}?${queryString}`)
      .then((response) => {
        setViewBids(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [searchQuery, currentPage]);

  // const [conversationName, setConversationName] = useState("")
  // const [free, setfree] = useState("")
  // useEffect(() => {
  //   if (viewbids && viewbids[0] != undefined){
  var conversationName = "";
  function conversationname(free) {
    if (free != "") {
      conversationName = {
        hirer: project.project_owner_id,
        freelancer: free,
      };
    }
    return conversationName;
  }
  // }, [free, project]);

  console.log("conversation name on ViewAllProposal : ", conversationname(3), "-----", conversationName);

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [viewinvites, setViewinvites] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.api.alanced.com/freelance/View-all/invited-freelancers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setViewinvites(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, []);

  function highlightText(text, query) {
    if (!query || (typeof text !== "string" && typeof text !== "number")) {
      return text;
    }

    const textString = String(text);
    const regex = new RegExp(`(${query})`, "gi");

    return textString.split(regex).map((part, index) => {
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

  const sortedBids = sortBids(viewbids);

  const [isViewProposalOpen, setIsViewProposalOpen] = useState(false);
  const [selectedbid, setSelectedbid] = useState(null);

  const openViewProposal = (bid) => {
    setSelectedbid(bid);
    setIsViewProposalOpen(true);
  };

  const closeViewProposal = () => {
    setSelectedbid(null);
    setIsViewProposalOpen(false);
  };

  const [expandedProjects, setExpandedProjects] = useState([]);

  const handleToggleDescription = (index) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  // const handleBtnClick = (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   openHiring();
  // };

  const handleBtnClick = (event, freelancerId) => {
    event.stopPropagation();
    event.preventDefault();
    openHiring(freelancerId);
  };

  const handleClick = (event, index) => {
    event.stopPropagation();
    event.preventDefault();
    handleToggleDescription(index);
  };

  const [selected, setSelected] = useState("All Proposals");
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

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">{project.title}</h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
          <div className="p-4 px-6">
            <p
              className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block pr-10 relative cursor-pointer`}
              onClick={() => setSelected("All Proposals")}
            >
              All Proposals
              {selected === "All Proposals" && <span style={underlineStyle}></span>}
            </p>

            {/* <p 
        className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block pr-10 relative cursor-pointer`} 
        onClick={() => setSelected('Shortlisted')}
    >
        Shortlisted
        {selected === 'Shortlisted' && <span style={underlineStyle}></span>}
    </p>
    <p 
        className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block relative cursor-pointer`} 
        onClick={() => setSelected('Messaged')}
    >
        Messaged
        {selected === 'Messaged' && <span style={underlineStyle}></span>}
    </p> */}
          </div>
          {!isOpen ? (
            <>
              {
                // !(error && error.includes("No bids found for this project")) && (
                !(viewbids != null && viewbids.length == 0) && (
                  <div className="flex justify-between items-center">
                    <section className="flex items-center p-2 bg-white rounded-lg m-5 border w-[49%]">
                      <div className="flex items-center mr-1 space-x-1">
                        <img src={search} alt="Search Icon" className="h-3 w-3" />
                        <input
                          className="w-28 lg:w-40 xl:w-[30rem] h-7 text-xs lg:text-sm outline-none"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <button className="rounded h-7 w-7 p-2 text-xs lg:text-sm font-semibold text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]">
                        <img src={searchbtn} alt="Search Icon" />
                      </button>
                    </section>
                    <select
                      id="countries"
                      onChange={(e) => {
                        setSortCriterion(e.target.value);
                      }}
                      class="bg-gray-50 border border-gray-300 text-[#797979] text-sm font-inter font-normal rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[22%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-12"
                    >
                      <option selected disabled value="bestMatch">
                        Best Match
                      </option>
                      <option value="newest">Newest Applicants</option>
                      <option value="oldest">Oldest Applicants</option>
                      <option value="highestRate">Highest Rate</option>
                      <option value="lowestRate">Lowest Rate</option>
                    </select>
                  </div>
                )
              }
              {(viewbids != null && viewbids.length === 0) || !viewbids ? (
                <div className="my-8">
                  <img src={experience} alt="" className="mx-auto mt-2" />
                  <div className="px-4 md:px-8 py-5 text-center text-2xl opacity-50">No proposals found for this project</div>
                </div>
              ) : (
                <>
                  {viewbids != null ? (
                    <div>
                      {sortedBids &&
                        sortedBids.map((bid, index) => {
                          const words = bid.description.split(" ");
                          const displayWords = expandedProjects[index] || words.length <= 50 ? words : words.slice(0, 50);

                          const isInvited =
                            viewinvites &&
                            viewinvites.some(
                              (invitation) => bid.freelancer_id === invitation.freelancer_id && bid.project_id === invitation.project_id
                            );
                          return (
                            <>
                              <Link to="/View/proposal" state={{ project, bid }}>
                                <div className="px-4 md:px-8 py-2 border-b border-gray-200 hover:bg-[#F6FAFD] border-opacity-30">
                                  <div class="flex">
                                    <div class="flex-[10%] p-4">
                                      <div className="relative w-24 h-24 mx-auto">
                                        <img
                                          src={"https://www.api.alanced.com" + bid.freelancer_profilepic}
                                          alt="Profile"
                                          className="rounded-full w-full h-full border border-gray-200"
                                        />
                                        <div class="absolute bottom-2 right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                                      </div>
                                    </div>
                                    <div class="flex-[90%] p-4">
                                      <div class="flex items-center justify-between">
                                        <p className="font-cardo text-[#0A142F] text-2xl font-medium">
                                          {highlightText(bid.freelancer_name, searchQuery)}
                                        </p>

                                        <div class="flex items-center space-x-4">
                                          <Link
                                            to="/messages"
                                            state={{
                                              conversationName: {
                                                hirer: project.project_owner_id,
                                                freelancer: bid.freelancer_id,
                                                freelancerDetails: bid,
                                              },
                                              // Other data you may want to pass
                                            }}
                                            // to={{
                                            //   pathname: '/messages',
                                            //   state: {
                                            //     conversationName: {"hirer": project.project_owner_id,
                                            //     "freelancer": bid.freelancer_id,},
                                            //     // Other data you may want to pass
                                            //   },
                                            // }}
                                          >
                                            <span class="inline-block text-sm px-10 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold">
                                              Message
                                            </span>
                                          </Link>

                                          {/* <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={isInvited ? null : handleBtnClick}>
    <button class={`px-10 py-1 bg-white ${isInvited ? 'cursor-not-allowed' : ''}`} disabled={isInvited}>
        <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
            {isInvited ? 'Hired' : 'Hire'}
        </p>
    </button>
</div> */}
                                          {/* <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={isInvited ? null : (event) => handleBtnClick(event, bid.freelancer_id)}>
  <button class={`px-10 py-1 bg-white ${isInvited ? 'cursor-not-allowed' : ''}`} disabled={isInvited}>
    <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
      {isInvited ? 'Hired' : 'Hire'}
    </p>
  </button>
</div> */}
                                          <div
                                            class={` ${
                                              isInvited
                                                ? "p-0.5 inline-block rounded bg-gradient-to-b from-[gray] to-[lightgray]"
                                                : "p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]"
                                            }`}
                                            onClick={isInvited ? null : (event) => handleBtnClick(event, bid.freelancer_id)}
                                          >
                                            <button class={`px-10 py-1 bg-white ${isInvited ? "cursor-not-allowed" : ""}`} disabled={isInvited}>
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

                                          {/* <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={handleBtnClick}>
                                          <button class="px-10 py-1 bg-white">
                                              <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Hire</p>
                                          </button>        
                                  </div> */}
                                          {isHiringOpen[bid.freelancer_id] && (
                                            <AddHiringRequestPopup closeHiring={() => closeHiring(bid.freelancer_id)} bid={bid} />
                                          )}
                                          {/* {isHiringOpen && <AddHiringRequestPopup closeHiring={closeHiring} bid={bid}/>} */}
                                        </div>
                                      </div>
                                      <h1 className="font-cardo opacity-50 text-lg text-[#031136]">
                                        {highlightText(bid.freelancer_category.replace(/_/g, " "), searchQuery)}
                                      </h1>
                                      <div style={{ display: "flex" }}>
                                        <h1 className="font-cardo text-lg text-[#031136] font-semibold py-3 flex-1">
                                          ${highlightText(bid.bid_amount, searchQuery)}{" "}
                                          <span className="opacity-50 font-medium">{bid.bid_type == "Fixed" ? "" : "/hr"}</span>
                                        </h1>
                                        <h1 className="font-cardo text-lg text-[#031136] font-semibold py-3 flex-1">
                                          {highlightText(bid.bid_type, searchQuery)}
                                        </h1>
                                        <h1 className="font-cardo text-lg text-[#031136] py-3 flex-1">
                                          {highlightText(bid.freelancer_address, searchQuery)}
                                        </h1>
                                        <h1 className="font-cardo text-lg text-[#031136] py-3 flex-1"></h1>
                                      </div>
                                      <p className="font-inter text-[#0A142F] text-[14px]">
                                        Cover Letter -{" "}
                                        <span className="opacity-50">
                                          {highlightText(displayWords.join(" "), searchQuery)}
                                          {words.length > 50 && (
                                            <span
                                              className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer pl-2"
                                              onClick={(event) => handleClick(event, index)}
                                            >
                                              {expandedProjects[index] ? "Less" : "More"}
                                            </span>
                                          )}
                                        </span>
                                      </p>
                                      <div className="text-left mt-5">
                                        {bid.freelancer_skills &&
                                          (() => {
                                            try {
                                              const skillsArray = JSON.parse(bid.freelancer_skills.replace(/'/g, '"'));
                                              return skillsArray.map((skill, index) => (
                                                <div
                                                  key={index}
                                                  className="mr-3 my-2 focus:outline-none bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full w-28 text-blue-800 px-3 py-[3px] text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]"
                                                >
                                                  <p className="text-center">{highlightText(skill, searchQuery)}</p>
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
                              </Link>
                              {/* {isViewProposalOpen && <ViewProposalPopup closeViewProposal={closeViewProposal} state={{project}} bid={selectedbid}/>} */}
                            </>
                          );
                        })}

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
                  ) : (
                    <div>
                      {[...Array(8)].map((_) => {
                        return (
                          <div>
                            <Skeleton
                              height={100}
                              width={100}
                              style={{
                                borderRadius: "50%",
                                marginLeft: 30,
                                float: "left",
                                marginTop: 30,
                              }}
                            />
                            <Skeleton height={20} width={100} style={{ marginLeft: 20, marginTop: 30 }} />
                            <Skeleton height={20} width={150} style={{ marginLeft: 20 }} />
                            <Skeleton
                              height={40}
                              width={150}
                              style={{
                                float: "right",
                                marginTop: -40,
                                marginLeft: 10,
                                marginRight: 50,
                              }}
                            />
                            <Skeleton
                              height={40}
                              width={150}
                              style={{
                                float: "right",
                                marginTop: -64,
                                marginRight: 210,
                              }}
                            />
                            <Skeleton height={100} width={1000} style={{ marginLeft: 150 }} />
                            <Skeleton
                              height={30}
                              width={100}
                              inline="true"
                              style={{
                                marginLeft: 150,
                                marginTop: 10,
                                borderRadius: "25px",
                              }}
                            />
                            <Skeleton
                              height={30}
                              width={100}
                              inline="true"
                              count={4}
                              style={{
                                marginLeft: 20,
                                marginTop: 10,
                                borderRadius: "25px",
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="my-8">
              <img src={experience} alt="" className="mx-auto mt-2" />
              <div className="px-4 md:px-8 py-5 text-center text-2xl opacity-50">This job is closed and is no longer accepting proposals.</div>
            </div>
          )}
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default ViewAllProposals;
