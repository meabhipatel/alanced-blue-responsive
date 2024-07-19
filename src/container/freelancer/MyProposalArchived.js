import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link } from "react-router-dom";

const MyProposalArchived = () => {
  const [selectedButton, setSelectedButton] = useState("Archieved");
  const commonStyle =
    "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <>
      <div className="mt-2 container-sm px-40">
        <h1 className="font-cardo text-[21px] text-[#031136] font-normal pt-4 text-left">
          My proposals
        </h1>
        <div className="my-3 flex flex-wrap">
          <Link to="/my-proposals" className="flex-grow md:flex-none p-1">
            <span
              className={`${commonStyle} px-3 my-3 md:px-8 ${
                selectedButton === "Active"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white font-inter text-sm font-normal border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-50"
              } mr-3`}
              onClick={() => setSelectedButton("Active")}
            >
              Active
            </span>
          </Link>
          <Link
            to="/freelancer/view-referals"
            className="flex-grow md:flex-none p-1"
          >
            <span
              className={`${commonStyle} px-3 md:px-8 ${
                selectedButton === "Referrals"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white font-inter text-sm font-normal border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-50"
              } mr-3`}
              onClick={() => setSelectedButton("Referrals")}
            >
              Referrals
            </span>
          </Link>
          <Link
            to="/freelancer/view-archived"
            className="flex-grow md:flex-none p-1"
          >
            <span
              className={`${commonStyle} px-3 md:px-8 ${
                selectedButton === "Archieved"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white font-inter text-sm font-normal border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-50"
              } mr-3`}
              onClick={() => setSelectedButton("Archieved")}
            >
              Archieved
            </span>
          </Link>
        </div>
        <div className=" mt-10 border border-[#E7E8F2] py-7 px-7 rounded">
          <h1 className=" font-inter text-base font-semibold text-left">
            Archived proposals (826)
          </h1>
          <div className="flex flex-row mt-7">
            <div className=" basis-3/12 ml-3">
              <div>
                <h1 className=" font-cardo font-normal text-lg text-left">
                  Initiated Sep 1, 2023
                </h1>
              </div>
              <p className=" font-inter font-normal text-base opacity-[50%] mr-[75px] text-left mt-3">
                in 8 hours
              </p>
            </div>
            <div className=" basis-9/12 mt-4">
              <div className=" flex flex-row">
                <div className=" basis-6/12">
                  <h1 className=" font-cardo font-normal text-lg text-left">
                    Web designer for saas landing page
                  </h1>
                </div>
                <div className=" basis-3/12">
                  <p className=" font-inter font-normal text-base opacity-[50%] text-left">
                    Job is closed
                  </p>
                </div>
                <div className=" basis-3/12">
                  <p className=" font-inter font-normal text-base opacity-[50%]">
                    General Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-7">
            <div className=" basis-3/12 ml-3">
              <div>
                <h1 className=" font-cardo font-normal text-lg text-left">
                  Initiated Sep 2, 2023
                </h1>
              </div>
              <p className=" font-inter font-normal text-base opacity-[50%] mr-[75px] text-left mt-3">
                16 hours ago
              </p>
            </div>
            <div className=" basis-9/12 mt-4">
              <div className=" flex flex-row">
                <div className=" basis-6/12">
                  <h1 className=" font-cardo font-normal text-lg text-left">
                    Landing page design for a food delivery website
                  </h1>
                </div>
                <div className=" basis-3/12">
                  <p className=" font-inter font-normal text-base opacity-[50%] text-left">
                    Job is closed
                  </p>
                </div>
                <div className=" basis-3/12">
                  <p className=" font-inter font-normal text-base opacity-[50%]">
                    General Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-7">
            <div className=" basis-3/12 ml-3">
              <div>
                <h1 className=" font-cardo font-normal text-lg text-left">
                  Initiated Sep 1, 2023
                </h1>
              </div>
              <p className=" font-inter font-normal text-base opacity-[50%] mr-[75px] text-left mt-3">
                16 hours ago
              </p>
            </div>
            <div className=" basis-9/12 mt-4">
              <div className=" flex flex-row">
                <div className=" basis-6/12">
                  <h1 className=" font-cardo font-normal text-lg text-left">
                    Senior React/React Native Developer
                  </h1>
                </div>
                <div className=" basis-3/12">
                  <p className=" font-inter font-normal text-base opacity-[50%] text-left">
                    Job is closed
                  </p>
                </div>
                <div className=" basis-3/12">
                  <p className=" font-inter font-normal text-base opacity-[50%]">
                    General Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-7">
            <div className=" basis-3/12 ml-3">
              <div>
                <h1 className=" font-cardo font-normal text-lg text-left">
                  Initiated Sep 1, 2023
                </h1>
              </div>
              <p className=" font-inter font-normal text-base opacity-[50%] mr-[75px] text-left mt-3">
                1 day ago
              </p>
            </div>
            <div className=" basis-9/12 mt-4">
              <div className=" flex flex-row">
                <div className=" basis-6/12">
                  <h1 className=" font-cardo font-normal text-lg text-left">
                    Looking for UI/UX Designer
                  </h1>
                </div>
                <div className=" basis-3/12">
                  <p className=" font-inter font-normal text-base opacity-[50%] text-left">
                    Hired-view contract
                  </p>
                </div>
                <div className=" basis-3/12">
                  <p className=" font-inter font-normal text-base opacity-[50%]">
                    General Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center p-5">
            <div
              className="flex items-center justify-center w-8 h-8 text-black border border-gray-200 p-1 cursor-pointer"
              onClick={prev}
              disabled={active === 1}
            >
              <i class="bi bi-dash"></i>
            </div>
            <div className="flex border-t border-b border-gray-200 p-1 gap-4">
              {[...Array(5)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <span
                    key={pageNumber}
                    className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                      active === pageNumber
                        ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold font-inter text-white text-xs rounded-sm"
                        : "text-gray-500 font-bold font-inter text-xs"
                    }`}
                    onClick={() => setActive(pageNumber)}
                  >
                    {pageNumber}
                  </span>
                );
              })}
            </div>
            <div
              className="flex items-center justify-center w-8 h-8 text-black border border-gray-200 p-1 cursor-pointer"
              onClick={next}
              disabled={active === 5}
            >
              <i class="bi bi-plus"></i>
            </div>
          </div>
        </div>
        <div className=" mt-5 border border-[#E7E8F2] py-7 px-7 rounded">
          <h1 className=" font-inter text-base font-semibold text-left">
            Archived interviews (4)
          </h1>
          <div className="flex flex-row mt-7">
            <div className=" basis-4/12 ml-3">
              <div>
                <h1 className=" font-cardo font-normal text-lg text-left">
                  Received Aug 30, 2023
                </h1>
              </div>
              <p className=" font-inter font-normal text-base opacity-[50%] mr-[75px] text-left mt-3">
                3 days ago
              </p>
            </div>
            <div className=" basis-8/12 mt-4">
              <div className=" flex flex-row">
                <div className=" basis-7/12">
                  <h1 className=" font-cardo font-normal text-lg text-left">
                    No-Code developer
                  </h1>
                </div>
                <div className=" basis-5/12">
                  <p className=" font-inter font-normal text-base opacity-[50%]">
                    Declined by You
                  </p>
                </div>
                {/* <div className=' basis-3/12'>
                <p className=' font-inter font-normal text-base opacity-[50%]'>General Profile</p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-7">
            <div className=" basis-4/12 ml-3">
              <div>
                <h1 className=" font-cardo font-normal text-lg text-left">
                  Received Aug 22, 2023
                </h1>
              </div>
              <p className=" font-inter font-normal text-base opacity-[50%] mr-[75px] text-left mt-3">
                3 days ago
              </p>
            </div>
            <div className=" basis-8/12 mt-4">
              <div className=" flex flex-row">
                <div className=" basis-7/12">
                  <h1 className=" font-cardo font-normal text-lg text-left">
                    Create Low-Fidelity Wireframes in Figma
                  </h1>
                </div>
                <div className=" basis-5/12">
                  <p className=" font-inter font-normal text-base opacity-[50%]">
                    Declined by You
                  </p>
                </div>
                {/* <div className=' basis-3/12'>
                <p className=' font-inter font-normal text-base opacity-[50%]'>General Profile</p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-7">
            <div className=" basis-4/12 ml-3">
              <div>
                <h1 className=" font-cardo font-normal text-lg text-left">
                  Received Aug 2, 2023
                </h1>
              </div>
              <p className=" font-inter font-normal text-base opacity-[50%] mr-[75px] text-left mt-3">
                3 days ago
              </p>
            </div>
            <div className=" basis-8/12 mt-4">
              <div className=" flex flex-row">
                <div className=" basis-7/12">
                  <h1 className=" font-cardo font-normal text-lg text-left">
                    Eid Greeting Designs - 50 Units (1080 x 1080 Pixels)
                  </h1>
                </div>
                <div className=" basis-5/12">
                  <p className=" font-inter font-normal text-base opacity-[50%]">
                    Job is Closed
                  </p>
                </div>
                {/* <div className=' basis-3/12'>
                <p className=' font-inter font-normal text-base opacity-[50%]'>General Profile</p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-7">
            <div className=" basis-4/12 ml-3">
              <div>
                <h1 className=" font-cardo font-normal text-lg text-left">
                  Received Jul 19, 2023
                </h1>
              </div>
              <p className=" font-inter font-normal text-base opacity-[50%] mr-[75px] text-left mt-3">
                3 days ago
              </p>
            </div>
            <div className=" basis-8/12 mt-4">
              <div className=" flex flex-row">
                <div className=" basis-7/12">
                  <h1 className=" font-cardo font-normal text-lg text-left">
                    Instagram Post Editor
                  </h1>
                </div>
                <div className=" basis-5/12">
                  <p className=" font-inter font-normal text-base opacity-[50%]">
                    Declined by You
                  </p>
                </div>
                {/* <div className=' basis-3/12'>
                <p className=' font-inter font-normal text-base opacity-[50%]'>General Profile</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default MyProposalArchived;
