import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link } from "react-router-dom";
import availablenow from "../../components/images/availablenow.png";
import edit from "../../components/images/edit.png";
import { GetFreelancerSelfBidAction } from "../../redux/Freelancer/FreelancerAction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { timeAgo } from "./TimeFunctions";
import axios from "axios";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Bag from "../../components/images/experience.png";

const MyProposals = () => {
  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  const freelancerselfbid = useSelector((state) => state.freelancer.freelancerselfbid);
  // const freelancerhiringreq = useSelector(state => state.freelancer.freelancerhiringreq)
  const bidCount = freelancerselfbid?.length || 0;
  const dispatch = useDispatch();
  const [currentBidPage, setCurrentBidPage] = useState(1);
  const [totalBidPages, setTotalBidPages] = useState(0);
  const [BidsCount, setBidsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hiringCount, setHiringCount] = useState(0);

  // React.useEffect(() => {
  //     dispatch(GetFreelancerHiringRequestAction(accessToken))
  //   }, [])

  const [viewfreebid, setViewFreeBid] = useState([]);
  //   const userCategory = logindata?.category

  useEffect(() => {
    const queryParameters = [];

    queryParameters.push(`page=${currentBidPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/freelance/view/freelancer-self/bid?${queryString}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // setViewFreeBid(response.data.data);
        setViewFreeBid(response.data.results);
        setBidsCount(response.data.count);
        setTotalBidPages(Math.ceil(response.data.count / 6));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [currentBidPage]);

  const Bidprev = () => {
    setCurrentBidPage((prev) => Math.max(prev - 1, 1));
  };

  const Bidnext = () => {
    setCurrentBidPage((prev) => Math.min(prev + 1, totalBidPages));
  };

  const [viewallhiring, setViewAllHiring] = useState([]);
  console.log("viewallhiring on MyProposals :", viewallhiring);
  //   const userCategory = logindata?.category

  useEffect(() => {
    const queryParameters = [];

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/freelance/View-all/pending-hire-request?${queryString}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // setViewFreeBid(response.data.data);
        setViewAllHiring(response.data.results);
        setHiringCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / 6));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [currentPage]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [selectedButton, setSelectedButton] = useState("Active");
  const commonStyle = "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  const [active, setActive] = React.useState(1);

  // const next = () => {
  //   if (active === 5) return;

  //   setActive(active + 1);
  // };

  // const prev = () => {
  //   if (active === 1) return;

  //   setActive(active - 1);
  // };

  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <>
      <div className="mt-2 mx-[10rem]">
        <h1 className="font-cardo text-[21px] text-[#031136] font-normal pt-4 text-left">My proposals</h1>
        <div className="my-3 flex flex-wrap">
          <Link to="/my-proposals" className="flex-grow md:flex-none p-1">
            <span
              className={`${commonStyle} px-3 my-3 md:px-8 ${
                selectedButton === "Active"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white  font-inter text-sm font-normal border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-50"
              } mr-3`}
              onClick={() => setSelectedButton("Active")}
            >
              Active
            </span>
          </Link>
          <Link to="/freelancer/view-referals" className="flex-grow md:flex-none p-1">
            <span
              className={`${commonStyle} px-3 md:px-8 ${
                selectedButton === "Referrals"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-50"
              } mr-3`}
              onClick={() => setSelectedButton("Referrals")}
            >
              Referrals
            </span>
          </Link>
          {/* <Link to='/freelancer/view-archived'className="flex-grow md:flex-none p-1">
                <span className={`${commonStyle} px-3 md:px-8 ${selectedButton === 'Archieved' ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-3`}
                    onClick={() => setSelectedButton('Archieved')}>
                    Archieved
                </span>
            </Link> */}
        </div>
        <div class="flex-1 border-t-2 border-gray-200 opacity-30 my-4"></div>
        {/* <div className='my-4 bg-[#FFFFFF] border border-[#E7E8F2] text-left'>
      <h1 className='font-inter text-[16px] font-semibold text-[#031136] p-3'>Offers (0)</h1>
    </div> */}
        <div className="my-4 bg-[#FFFFFF] border border-[#E7E8F2] text-left">
          <h1 className="font-inter text-[16px] font-bold text-[#031136] p-3">Submitted Proposals ({BidsCount})</h1>
          {viewfreebid != null ? (
            viewfreebid.length > 0 ? (
              <div>
                {viewfreebid && (
                  <>
                    {viewfreebid.map((bid, index) => {
                      const bidTime = new Date(bid.bid_time);

                      // Calculate the time difference
                      const currentTime = new Date();
                      // Options for formatting the date
                      const dateFormatOptions = {
                        day: "numeric",
                        month: "short", // Use 'short' for abbreviated month name
                        year: "numeric",
                      };
                      // Format the date as "23 Sep 2023"
                      const formattedDate = bidTime.toLocaleDateString(undefined, dateFormatOptions);

                      return (
                        <div className="px-4 md:px-8 py-4 border-b border-gray-200 border-opacity-30 flex items-center">
                          <div className="flex flex-col w-1/4">
                            <h1 className="font-cardo text-[18px] text-[#031136]">Initiated {formattedDate}</h1>
                            <p className="font-inter text-[14px] text-[#031136] opacity-50">{timeAgo(bid.bid_time)}</p>
                          </div>

                          <div className="flex-grow ml-[100px]">
                            <Link to="/View/freelancer/proposal" state={{ bid }}>
                              <h1 className="font-cardo text-[18px] text-blue-600 hover:underline">{bid.project.title}</h1>
                            </Link>
                          </div>

                          <div className="flex flex-col w-1/4 items-end pr-4">
                            <p className="font-inter text-[16px] text-[#031136] opacity-50">{bid.project.category}</p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              <div className=" mx-auto">
                <img src={Bag} alt="" className="h-[10%] ml-[44%]" />
                <p className=" mt-5 font-cardo text-xl opacity-70 text-center mb-5">No Proposals Found</p>
              </div>
            )
          ) : (
            <div>
              {[...Array(8)].map((_) => {
                return (
                  <div className="flex mt-4">
                    <div className="ml-10 mr-60">
                      <Skeleton height={20} width={200} />
                      <Skeleton height={20} width={100} style={{ marginTop: 10 }} />
                    </div>
                    <Skeleton height={20} width={300} />
                    <Skeleton height={20} width={200} style={{ marginLeft: 180 }} />
                  </div>
                );
              })}
            </div>
          )}
          {totalBidPages > 1 && (
            <div className="flex justify-end items-center gap-6 m-4">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={Bidprev}
                disabled={currentBidPage === 1}
                style={{
                  backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                  border: "none",
                }}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
              </IconButton>

              {[...Array(totalBidPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <span
                    key={pageNumber}
                    className={`px-0 py-1 ${
                      currentBidPage === pageNumber
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold font-inter text-[14px] cursor-pointer"
                        : "text-[#0A142F] font-bold font-inter text-[14px] cursor-pointer"
                    }`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setCurrentBidPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </span>
                );
              })}

              <IconButton
                size="sm"
                variant="outlined"
                onClick={Bidnext}
                disabled={currentBidPage === totalBidPages}
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
        <div className="my-4 bg-[#FFFFFF] border border-[#E7E8F2]  text-left">
          <h1 className="font-inter text-[16px] font-bold text-[#031136] p-3">Pending Invitations ({hiringCount})</h1>
          {viewallhiring != null ? (
            viewallhiring.length > 0 ? (
              <div>
                {viewallhiring && (
                  <>
                    {viewallhiring.map((hire, index) => {
                      const hiredTime = new Date(hire.Received_time);

                      // Calculate the time difference
                      const currentTime = new Date();
                      // Options for formatting the date
                      const dateFormatOptions = {
                        day: "numeric",
                        month: "short", // Use 'short' for abbreviated month name
                        year: "numeric",
                      };
                      // Format the date as "23 Sep 2023"
                      const formattedDate = hiredTime.toLocaleDateString(undefined, dateFormatOptions);

                      return (
                        <div className="px-4 md:px-8 py-4 border-b border-gray-200 border-opacity-30 flex items-center" key={index}>
                          <div className="flex flex-col w-1/4">
                            <h1 className="font-cardo text-[18px] text-[#031136]">Received {formattedDate}</h1>
                            <p className="font-inter text-[14px] text-[#031136] opacity-50">{timeAgo(hire.Received_time)}</p>
                          </div>

                          <div className="flex-grow ml-[100px]">
                            <Link to="/view/hiring-detail" state={{ hire }}>
                              <h1 className="font-cardo text-[18px] text-blue-600 hover:underline">{hire.project_title}</h1>
                            </Link>
                          </div>

                          <div className="flex flex-col w-1/4 items-end pr-4">
                            <p className="font-inter text-[16px] text-[#031136] opacity-50">{hire.project_category}</p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              <div className=" mx-auto">
                <img src={Bag} alt="" className="h-[10%] ml-[44%]" />
                <p className=" mt-5 font-cardo text-xl opacity-70 text-center mb-5">No Invitations Found</p>
              </div>
            )
          ) : (
            <div>
              {[...Array(8)].map((_) => {
                return (
                  <div className="flex mt-4">
                    <div className="ml-10 mr-60">
                      <Skeleton height={20} width={200} />
                      <Skeleton height={20} width={100} style={{ marginTop: 10 }} />
                    </div>
                    <Skeleton height={20} width={300} />
                    <Skeleton height={20} width={200} style={{ marginLeft: 180 }} />
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

export default MyProposals;
