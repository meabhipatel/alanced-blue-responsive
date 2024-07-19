import React from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { timeAgo } from "../freelancer/TimeFunctions";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useEffect } from "react";
import Bag from "../../components/images/experience.png";

const AllInvitations = () => {
  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken =
    useSelector((state) => state.login.accessToken) ||
    localStorage.getItem("jwtToken");
  const [viewallinvites, setViewallinvites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const queryParameters = [];

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(
        `https://www.api.alanced.com/freelance/View-all/hire-request?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setViewallinvites(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
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

  return (
    <>
      <div className="mt-2 mx-[10rem]">
        <h1 className="font-cardo text-[21px] text-[#031136] font-normal pt-4 text-left">
          All Invitations
        </h1>
        <div className="my-4 bg-[#FFFFFF] border border-[#E7E8F2]  text-left">
          {viewallinvites != null ? (
            viewallinvites.length > 0 ? (
              <div>
                {viewallinvites && (
                  <>
                    {viewallinvites.map((inv, index) => {
                      const inviteTime = new Date(inv.Received_time);
                      const currentTime = new Date();

                      const dateFormatOptions = {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      };

                      const formattedDate = inviteTime.toLocaleDateString(
                        undefined,
                        dateFormatOptions
                      );
                      return (
                        <>
                          <div className="px-4 md:px-8 py-4 border-b border-gray-200 border-opacity-30 flex items-center">
                            <div className="w-full md:w-2/4 p-2">
                              <h1 className="font-cardo text-[18px] text-[#031136]">
                                Received {formattedDate}
                              </h1>
                              <p className="font-inter text-[14px] text-[#031136] opacity-50">
                                {timeAgo(inv.Received_time)}
                              </p>
                            </div>
                            <div className="w-full md:w-2/4 p-2">
                              <h1 className="font-cardo text-[18px] text-blue-600">
                                {inv.project_title}
                              </h1>
                            </div>
                            <div className="w-full md:w-2/4 p-2">
                              <p className="font-inter text-[16px] text-[#031136] opacity-50">
                                {inv.hired_by}
                              </p>
                            </div>
                            <div className="w-full md:w-1/4 p-2">
                              {inv.freelancer_accepted ? (
                                <h1 className="font-cardo text-[18px] text-blue-600">
                                  Accepted
                                </h1>
                              ) : inv.freelancer_rejected ? (
                                <h1 className="font-cardo text-[18px] text-red-600">
                                  Rejected
                                </h1>
                              ) : (
                                <h1 className="font-cardo text-[18px] text-yellow-600">
                                  Pending
                                </h1>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              <div className=" mx-auto">
                <img src={Bag} alt="" className="h-[10%] ml-[44%] mt-10" />
                <p className=" mt-5 font-cardo text-xl opacity-70 text-center mb-8">
                  No Invitations Found
                </p>
              </div>
            )
          ) : (
            <div>
              {[...Array(8)].map((_) => {
                return (
                  <div className="flex mt-4">
                    <div className="ml-10 mr-60">
                      <Skeleton height={20} width={200} />
                      <Skeleton
                        height={20}
                        width={100}
                        style={{ marginTop: 10 }}
                      />
                    </div>
                    <Skeleton height={20} width={300} />
                    <Skeleton
                      height={20}
                      width={200}
                      style={{ marginLeft: 180 }}
                    />
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

export default AllInvitations;
