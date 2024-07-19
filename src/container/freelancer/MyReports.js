import React from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import report from "../../components/images/report.png";
import calender from "../../components/images/calender.png";

const MyReports = () => {
  return (
    <>
      <div className="mt-5 container-sm px-40">
        <h1 className=" font-cardo font-normal text-2xl text-left">
          My Payments
        </h1>
        <div className="mt-8  border border-[#E7E8F2] py-5 px-5 rounded">
          <div className=" flex flex-row">
            <div className=" basis-10/12">
              <h1 className=" font-cardo text-lg font-normal text-left">
                Weekly summary
              </h1>
              <div className=" text-left mt-2">
                <i class="fa fa-calendar opacity-[50%]" aria-hidden="true">
                  <span className="font-inter font-base font-normal ml-3">
                    Current week
                  </span>
                </i>
              </div>
            </div>
            <div className=" basis-2/12">
              <div class="p-2 w-8 h-8 bg-white rounded-full border border-gray-400 mt-1 ml-auto">
                <img src={report} alt="" />
              </div>
            </div>
          </div>
          <div className=" flex flex-row mt-5">
            <div className=" basis-10/12">
              <h1 className=" font-cardo text-lg font-normal text-left">
                Weekly summary
              </h1>
              <div className=" text-left mt-2">
                <i class="fa fa-calendar opacity-[50%]" aria-hidden="true">
                  <span className="font-inter font-base font-normal ml-3">
                    Current week
                  </span>
                </i>
              </div>
            </div>
            <div className=" basis-2/12">
              <div class="p-2 w-8 h-8 bg-white rounded-full border border-gray-400 mt-1 ml-auto">
                <img src={report} alt="" />
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

export default MyReports;
