import React from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import search from "../../components/images/SearchOutlined.png";
import searchbtn from "../../components/images/searchbtn.png";
import { Link } from "react-router-dom";
import gradientdot from "../../components/images/gradientdot.png";
import threedot from "../../components/images/threedot.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDateInput, timeAgo } from "./TimeFunctions";
import axios from "axios";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import contractimg from "../../components/images/Frame.png";

const AllContracts = () => {
  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken =
    useSelector((state) => state.login.accessToken) ||
    localStorage.getItem("jwtToken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [viewallfreecontracts, setViewAllfreecontracts] = useState([]);

  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(
        `https://www.api.alanced.com/freelance/View-all/freelancer-contracts?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // setViewFreeBid(response.data.data);
        setViewAllfreecontracts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, [currentPage, searchQuery]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const isJobOpen = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return now < deadlineDate;
  };

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

  return (
    <>
      <div className="mt-5 container-sm px-40">
        <h1 className=" font-cardo font-normal text-2xl text-left">
          All Contracts
        </h1>
        <section className="flex items-center p-1 rounded-lg border border-[#E7E8F2] mt-4">
          <div className="flex items-center mr-1 space-x-1 w-full">
            <img src={search} alt="Search Icon" className="h-5 w-5" />
            <input
              className="w-full  h-7 font-normal lg:text-sm border-0 outline-none font-inter text-sm"
              placeholder="Search contracts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="rounded h-8 w-8 p-2 text-xs lg:text-sm font-semibold text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]">
            <img src={searchbtn} alt="Search Icon" />
          </button>
        </section>
        <div className="my-8  border border-[#E7E8F2] py-5 px-5 rounded">
          {viewallfreecontracts != null ? (
            <div>
              {/* {viewallfreecontracts && <>{viewallfreecontracts.map((contract,index) => { */}
              {viewallfreecontracts.length > 0 ? (
                viewallfreecontracts.map((contract, index) => (
                  <div className="my-5 bg-[#FFFFFF] border-b border-[#E7E8F2]">
                    <div className=" flex flex-row">
                      <div className=" basis-8/12">
                        <h1 className=" font-cardo text-lg font-normal text-left">
                          {highlightText(contract.project_title, searchQuery)}
                        </h1>
                        <p className="font-inter text-[14px] text-[#031136]  mt-3 text-left font-normal">
                          Budget:{" "}
                          <span className="opacity-50">
                            $
                            {highlightText(contract.hiring_budget, searchQuery)}{" "}
                            {highlightText(
                              contract.hiring_budget_type,
                              searchQuery
                            )}
                          </span>
                        </p>
                      </div>
                      <div className=" basis-3/12"></div>
                      <div className="basis-1/12">
                        <div
                          className={
                            isJobOpen(contract.project_deadline)
                              ? "text-blue-600 mt-1 font-semibold"
                              : "text-yellow-600 mt-1 font-semibold"
                          }
                        >
                          {isJobOpen(contract.project_deadline)
                            ? "Active"
                            : "Completed"}
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-row">
                      <div className=" basis-5/12">
                        <p className="font-inter text-[14px] text-[#031136] py-2 font-normal text-left">
                          Hired by:{" "}
                          <span className="opacity-50">
                            {highlightText(contract.hired_by, searchQuery)}
                          </span>
                        </p>
                      </div>
                      <div className=" basis-5/12">
                        <p className="font-inter text-[14px] text-[#031136] font-normal text-left">
                          Received:{" "}
                          <span className="text-[#0365c0]">
                            {formatDateInput(contract.Received_time)}
                          </span>
                        </p>
                      </div>
                      <div className=" basis-2/12">
                        <p className="font-inter text-[14px] text-[#031136] font-normal text-left">
                          Deadline:{" "}
                          <span className="text-[#0365c0]">
                            {formatDateInput(contract.project_deadline)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <img src={contractimg} alt="" className="mx-auto" />
                  <div className="px-4 md:px-8 py-5 text-center text-2xl opacity-50">
                    No Contracts Found
                  </div>
                </>
              )}
            </div>
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

export default AllContracts;
