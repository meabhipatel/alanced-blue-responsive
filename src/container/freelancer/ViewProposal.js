import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import HomeSection4 from "../../components/Layout/HomeSection4";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ViewProposal = () => {
  const location = useLocation();
  const findbid = location.state && location.state.bid;
  console.log(findbid, "find bid");

  const normaltime = format(
    new Date(findbid.project.created_at),
    "yyyy-MM-dd HH:mm"
  );

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const descriptionToShow = showFullDescription
    ? findbid.project.description
    : findbid.project.description.slice(0, 200);

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

  return (
    <>
      <div className=" container-sm px-36">
        <div className=" w-full mt-10 bg-[#d9f3e6] h-[60px] rounded-xl">
          <h1 className=" text-left font-inter text-base p-5 mr-8">
            <span>
              <i class="bi bi-check-circle mr-[25px] text-blue-600"></i>
            </span>
            Your Proposal was submitted
          </h1>
        </div>
        <h1 className="font-inter text-2xl text-left mt-5">Proposal Details</h1>
        <div className=" flex flex-row">
          <div className=" basis-9/12">
            <div className=" mt-8  border border-[#E7E8F2] py-8 px-8 rounded-lg">
              <h1 className=" text-2xl font-cardo font-semibold text-left">
                Job Details
              </h1>
              <div className=" flex flex-row mt-6">
                <div className=" basis-8/12">
                  <h1 className=" text-xl font-inter font-medium text-left">
                    {findbid.project.title}
                  </h1>
                  <div className=" flex flex-row">
                    <div className=" basis-4/12 mt-5">
                      <div class="focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1]  rounded-xl text-sm font-semibold text-blue-800 py-[3px] dark:bg-[#dffdee] dark:hover:bg-[#dffdee]  w-[90%] bg-opacity-[60%]">
                        {findbid.project.category}
                      </div>
                    </div>
                    <div className=" basis-4/12 mt-5 ml-2">
                      <p className=" text-sm font-medium font-inter text-left opacity-[50%]">
                        Posted {timeAgo(findbid.project.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="font-inter text-[15px] font-medium mt-3 text-left opacity-[70%]">
                    {descriptionToShow}
                  </p>
                  {findbid.project.description.length > 200 && (
                    <p
                      className="mt-3 text-base font-semibold text-blue-600 text-left cursor-pointer"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "less" : "more"}
                    </p>
                  )}
                  {/* <p className='font-inter text-[15px] font-medium mt-3 text-left opacity-[70%]'>{findbid.project.description}</p>
                    <p className=' mt-3 text-base font-semibold text-blue-600 text-left'>more</p> */}
                  {/* <p className='mb-5 mt-5 text-base font-semibold text-blue-600 text-left'>View job posting</p> */}
                </div>
                <div className=" basis-1/12"></div>
                <div className=" basis-3/12 border-l border-[#E7E8F2]">
                  <div className=" flex flex-row ml-4">
                    <div className=" basis-3/12">
                      <i class="fa fa-user-secret" aria-hidden="true"></i>
                    </div>
                    <div className=" basis-6/12">
                      <p className=" text-[14px] font-normal text-left">
                        {findbid.project.Project_experience_level.replace(
                          /_/g,
                          " "
                        )}
                      </p>
                      <p className=" text-[12px] font-normal text-left opacity-50">
                        Experience level
                      </p>
                    </div>
                  </div>
                  <div className=" flex flex-row ml-4 mt-4">
                    <div className=" basis-3/12">
                      <i class="bi bi-tag-fill"></i>
                    </div>
                    <div className=" basis-9/12">
                      <p className=" text-[14px] font-normal text-left">
                        porpose your terms
                      </p>
                      <p className=" text-[12px] font-normal text-left opacity-50">
                        {findbid.project.Project_rate}
                      </p>
                    </div>
                  </div>
                  <div className=" flex flex-row ml-4 mt-4">
                    <div className=" basis-3/12">
                      <i class="bi bi-calendar2-check-fill"></i>
                    </div>
                    <div className=" basis-8/12">
                      <p className=" text-[14px] font-normal text-left">
                        Project Deadline
                      </p>
                      <p className=" text-[12px] font-normal text-left opacity-50">
                        {findbid.project.deadline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className=" mt-5" />
              <h1 className="text-base font-medium font-inter text-left mt-5">
                Skills & Experties
              </h1>
              <div className="text-left mt-5">
                {JSON.parse(
                  findbid.project.skills_required.replace(/'/g, '"')
                ).map((skill, index) => (
                  <div className="mr-3 focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full  w-28 text-blue-800 px-3 py-[3px] text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%] mt-4">
                    <p className=" text-center">{skill}</p>
                  </div>
                ))}
                {/* <div className="focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full  w-24 text-blue-800 px-3 py-[3px] font-semibold text-sm dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]">
                    <p className="text-center">React</p>
                </div>
                <div className="focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full  w-24 ml-3 text-blue-800 px-3 py-[3px] font-semibold text-sm dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]">
                    <p className="text-center">Django</p>
                </div> */}
              </div>
              <hr className=" mt-8" />
              <div className=" flex flex-row">
                <div className=" basis-6/12">
                  <p className="text-base font-medium font-inter text-left mt-5">
                    Your proposed terms
                  </p>
                </div>
                <div className=" basis-6/12">
                  <p className="text-base font-medium opacity-50 font-inter text-right mt-5">
                    Client's budget: $
                    {findbid.project.Project_rate == "Hourly"
                      ? findbid.project.Project_min_hourly_rate +
                        "/hr" +
                        " - " +
                        "$" +
                        findbid.project.Project_max_hourly_rate +
                        "/hr"
                      : findbid.project.Project_budget}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[15px] font-medium font-inter text-left mt-5">
                  How do you want to be paid?
                </p>
                <p className="text-[15px] font-medium font-inter text-left opacity-70">
                  By Project
                </p>
                <p className="text-[15px] font-medium font-inter text-left mt-5">
                  Total price of project
                </p>
                <p className="text-[15px] font-medium font-inter text-left opacity-70">
                  This includes all milestones, and is the amount your client
                  will see.
                </p>
                <p className="text-base font-medium font-inter text-left mt-5 opacity-70">
                  {findbid.bid_amount}
                </p>
                <hr className=" mt-5" />
                <p className="text-[15px] font-medium font-inter text-left mt-5">
                  You'll Receive
                </p>
                <p className="text-[15px] font-medium font-inter text-left opacity-70">
                  The estimated payment, after service fees.
                </p>
                <p className="text-base font-medium font-inter text-left mt-5 opacity-70">
                  $ {findbid.bid_amount - findbid.bid_amount / 10}
                </p>
                {/* <div className=' flex flex-row mt-5  mb-5'>
            <div className=' basis-3/12' ><button className='h-10 w-40 text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF] mt-5 text-base font-semibold rounded'>Change Terms</button></div>
            <div class="p-0.5 mt-5 rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] ml-5">
            <button class="px-2 py-1 bg-[#f8faf9] rounded"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-bold text-sm py-[4px] px-[8px]">Withdraw Proposal</p></button>
            </div>
            </div> */}
              </div>
            </div>
            <div className="mt-8  border border-[#E7E8F2] py-8 px-8 rounded-lg">
              <h1 className=" text-xl font-inter font-medium text-left">
                Cover Letter
              </h1>
              <p className="font-inter text-[15px] font-medium mt-7 text-left opacity-[70%]">
                {findbid.description}
              </p>
            </div>
          </div>
          <div className=" basis-3/12">
            <div className="mt-8 ml-7">
              <p className=" text-[17px] font-inter font-normal text-left">
                About the client
              </p>
              <p className="text-[15px] font-inter font-normal opacity-75 mt-2 text-left">
                Payment method not verified
              </p>
            </div>
            <div className="mt-5 ml-7">
              <p className=" text-[17px] font-inter font-normal text-left">
                Owner Name
              </p>
              <p className="text-[15px] font-inter font-normal opacity-75 mt-2 text-left">
                {findbid.project.project_owner_Name}
              </p>
              {/* <p className='text-[15px] font-inter font-normal opacity-75  text-left'>kathmandu 04:42 PM</p> */}
            </div>
            <div className="mt-5 ml-7">
              <p className=" text-[17px] font-inter font-normal text-left">
                Location
              </p>
              <p className="text-[15px] font-inter font-normal opacity-75 mt-2 text-left">
                {findbid.project.project_owner_location}
              </p>
              {/* <p className='text-[15px] font-inter font-normal opacity-75  text-left'>kathmandu 04:42 PM</p> */}
            </div>
            <div className="mt-5 ml-7">
              <p className=" text-[17px] font-inter font-normal text-left">
                History
              </p>
              {/* <p className='text-[15px] font-inter font-normal opacity-75 mt-2 text-left'>20 to 50 proposals<span className=' ml-3 text-blue-600'><i class="bi bi-question-circle-fill"></i></span></p>
                        <p className='text-[14px] font-inter font-normal opacity-75 mt-2 text-left'>1 job posted</p> */}
              <p className="text-[12px] font-inter font-normal opacity-75 mt-2 text-left">
                Member since {findbid.project.project_owner_date_of_creation}
              </p>
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default ViewProposal;
