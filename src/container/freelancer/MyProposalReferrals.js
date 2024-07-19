import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link } from "react-router-dom";
import refrel from "../../components/images/refrel.png";

const MyProposalReferrals = () => {
  const [selectedButton, setSelectedButton] = useState("Referrals");
  const commonStyle =
    "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

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
          {/* <Link to='/freelancer/view-archived'className="flex-grow md:flex-none p-1">
                <span className={`${commonStyle} px-3 md:px-8 ${selectedButton === 'Archieved' ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white font-inter text-sm font-normal border-none" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-3`}
                    onClick={() => setSelectedButton('Archieved')}>
                    Archieved
                </span>
            </Link> */}
        </div>
        <div className="border border-[#E7E8F2] py-12 mt-8">
          <img src={refrel} alt="" className=" mx-auto" />
          <h1 className=" font-inter font-semibold text-base text-center mt-3">
            You haven’t referred anyone yet
          </h1>
          <p className=" font-inter font-normal text-base text-center opacity-[50%] mt-2">
            When declining an invitation, you can make a referral to help other
            freelancers
          </p>
          <p className=" font-inter font-normal text-base text-center opacity-[50%] mt-1">
            succeed and help clients fill their job
          </p>
          <h1 className=" font-cardo font-normal text-lg text-center mt-2">
            Learn more about referring freelancers
          </h1>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default MyProposalReferrals;
