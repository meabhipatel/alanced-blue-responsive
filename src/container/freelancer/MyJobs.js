import React from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import gradientdot from "../../components/images/gradientdot.png";
import search from "../../components/images/SearchOutlined.png";
import threedot from "../../components/images/threedot.png";
import { Link } from "react-router-dom";

const MyJobs = () => {
  return (
    <>
      <div className="mt-2 mx-[10rem]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="font-cardo text-[24px] text-[#031136] font-normal pt-4 text-left">
              My Jobs
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal pt-4 text-left opacity-50 mr-1">
              Earnings available now:
            </h1>
            <h1 className="font-cardo text-[19px] text-[#031136] font-bold pt-4 text-left mr-2">
              $0.00
            </h1>
            <div class="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 mt-4">
              <img src={gradientdot} alt="" />
            </div>
          </div>
        </div>
        <div className="px-5 py-5 mt-8 bg-[#FFFFFF] border border-[#E7E8F2] rounded text-left">
          <div className="px-4 md:px-2 py-4 border-b border-gray-200 border-opacity-30">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="font-inter text-[16px] font-semibold text-[#031136] p-3">
                  Active Contracts
                </h1>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-1 space-x-1 border p-1 w-[200px] rounded-md">
                  <img
                    src={search}
                    alt="Search Icon"
                    className="h-4 w-4 mr-1"
                  />
                  <input
                    className="w-28 lg:w-40 xl:w-[160px] h-7 text-sm lg:text-sm outline-none"
                    placeholder="Search Contracts"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 md:px-8 py-4 border-b border-gray-200 border-opacity-30">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="font-cardo text-[18px] text-[#031136]">
                  UI UX design for Education Resources Mobile App
                </h1>
              </div>
              <div className="flex items-center">
                <Link to="">
                  <span className="inline-block text-sm py-[6px] px-4 mt-4 lg:mt-0 border rounded font-inter font-semibold bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none mr-2">
                    See Timesheet
                  </span>
                </Link>
                <div class="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 mt-1">
                  <img src={gradientdot} alt="" />
                </div>
              </div>
            </div>
            <p className="font-inter text-[14px] text-[#031136] pt-1">
              Staffed by:{" "}
              <span className="opacity-50">AMIT B. at Wiz91 Technologies</span>
            </p>
            <div className="flex justify-between items-center">
              <p className="font-inter text-[14px] text-[#031136] py-2">
                Hired by: <span className="opacity-50">Aloha Apps</span>
              </p>

              <p className="font-inter text-[14px] text-[#031136]">
                Active: <span className="text-[#03C058]">5:10 hrs</span>{" "}
                <span className="opacity-50 text-[#0A142F]">this week</span>
              </p>

              <p className="font-inter text-[14px] text-[#0A142F] opacity-50">
                Aug 31 - Present
              </p>
            </div>
          </div>
          <div className="px-4 md:px-8 py-4 border-b border-gray-200 border-opacity-30">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="font-cardo text-[18px] text-[#031136]">
                  UI UX design for Education Resources Mobile App
                </h1>
              </div>
              <div className="flex items-center">
                <Link to="">
                  <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] inline-block mr-2 my-2">
                    See Timesheet
                  </span>
                </Link>
                <div class="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 mt-1">
                  <img src={threedot} alt="" />
                </div>
              </div>
            </div>
            <p className="font-inter text-[14px] text-[#031136] pt-1">
              Staffed by:{" "}
              <span className="opacity-50">AMIT B. at Wiz91 Technologies</span>
            </p>
            <div className="flex justify-between items-center">
              <p className="font-inter text-[14px] text-[#031136] py-2">
                Hired by: <span className="opacity-50">Aloha Apps</span>
              </p>

              <p className="font-inter text-[14px] text-[#031136]">
                Active: <span className="text-[#03C058]">5:10 hrs</span>{" "}
                <span className="opacity-50 text-[#0A142F]">this week</span>
              </p>

              <p className="font-inter text-[14px] text-[#0A142F] opacity-50">
                Aug 31 - Present
              </p>
            </div>
          </div>
          <div className="px-4 md:px-8 py-4 border-b border-gray-200 border-opacity-30">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="font-cardo text-[18px] text-[#031136]">
                  UI UX design for Education Resources Mobile App
                </h1>
              </div>
              <div className="flex items-center">
                <Link to="">
                  <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] inline-block mr-2 my-2">
                    See Timesheet
                  </span>
                </Link>
                <div class="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 mt-1">
                  <img src={threedot} alt="" />
                </div>
              </div>
            </div>
            <p className="font-inter text-[14px] text-[#031136] pt-1">
              Staffed by:{" "}
              <span className="opacity-50">AMIT B. at Wiz91 Technologies</span>
            </p>
            <div className="flex justify-between items-center">
              <p className="font-inter text-[14px] text-[#031136] py-2">
                Hired by: <span className="opacity-50">Aloha Apps</span>
              </p>

              <p className="font-inter text-[14px] text-[#031136]">
                Active: <span className="text-[#03C058]">5:10 hrs</span>{" "}
                <span className="opacity-50 text-[#0A142F]">this week</span>
              </p>

              <p className="font-inter text-[14px] text-[#0A142F] opacity-50">
                Aug 31 - Present
              </p>
            </div>
          </div>
          <div className="px-4 md:px-8 py-4 border-b border-gray-200 border-opacity-30">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="font-cardo text-[18px] text-[#031136]">
                  UI UX design for Education Resources Mobile App
                </h1>
              </div>
              <div className="flex items-center">
                <Link to="">
                  <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] inline-block mr-2 my-2">
                    See Timesheet
                  </span>
                </Link>
                <div class="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 mt-1">
                  <img src={threedot} alt="" />
                </div>
              </div>
            </div>
            <p className="font-inter text-[14px] text-[#031136] pt-1">
              Staffed by:{" "}
              <span className="opacity-50">AMIT B. at Wiz91 Technologies</span>
            </p>
            <div className="flex justify-between items-center">
              <p className="font-inter text-[14px] text-[#031136] py-2">
                Hired by: <span className="opacity-50">Aloha Apps</span>
              </p>

              <p className="font-inter text-[14px] text-[#031136]">
                Active: <span className="text-[#03C058]">5:10 hrs</span>{" "}
                <span className="opacity-50 text-[#0A142F]">this week</span>
              </p>

              <p className="font-inter text-[14px] text-[#0A142F] opacity-50">
                Aug 31 - Present
              </p>
            </div>
          </div>
          {/* <div className='px-4 md:px-8 py-6 border-b border-gray-200 border-opacity-30'>
<Link to='/freelancer/all-contracts'><span class="text-sm py-[8px] lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold lg:px-[402px] px-6">View All Contracts</span></Link>
</div> */}
          <Link
            to="/freelancer/all-contracts"
            onClick={() => window.scroll(0, 0)}
          >
            <div className=" bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg mt-5 ml-5 mr-5">
              <p className="py-2 text-center text-sm text-white font-semibold">
                View All Contracts
              </p>
            </div>
          </Link>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default MyJobs;
