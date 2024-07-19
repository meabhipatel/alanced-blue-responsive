import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { useLocation } from "react-router-dom";

const ViewInvitationDetail = () => {
  const location = useLocation();
  const findinvite = location.state && location.state.inv;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const descriptionToShow = showFullDescription
    ? findinvite && findinvite.freelancer_description
      ? findinvite.freelancer_description
      : ""
    : findinvite.freelancer_description.slice(0, 400);

  return (
    <>
      <div className="container-sm px-36">
        <h1 className="font-inter text-2xl text-left mt-5">
          View Invitation Details
        </h1>
        <div className=" my-8  border border-[#E7E8F2] py-8 px-8 rounded-lg">
          <h1 className="text-3xl font-cardo font-semibold text-left">
            Invite Details
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xl font-medium font-cardo text-left mt-5">
                Hiring Budget :{" "}
                <span className="opacity-70">
                  $
                  {findinvite && findinvite.hiring_budget
                    ? findinvite.hiring_budget
                    : 0}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xl font-medium font-cardo text-left mt-5">
                Budget Type :{" "}
                <span className="opacity-70">
                  {findinvite && findinvite.hiring_budget_type
                    ? findinvite.hiring_budget_type
                    : ""}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xl font-medium font-cardo text-left mt-5">
                Invited Freelancer :{" "}
                <span className="opacity-70">
                  {findinvite && findinvite.freelancer_name
                    ? findinvite.freelancer_name
                    : ""}
                </span>
              </p>
            </div>
          </div>
          <div>
            <div>
              <p className="text-xl font-medium font-cardo text-left mt-4">
                Message :{" "}
                <span className="opacity-70">
                  {findinvite && findinvite.message ? findinvite.message : ""}
                </span>
              </p>
            </div>
            <p className="text-xl font-medium font-cardo text-left mt-4">
              Invite Status :{" "}
              <span className="opacity-70 inline-block">
                {findinvite && findinvite.freelancer_accepted ? (
                  <h1 className="font-cardo text-[18px] text-blue-600">
                    Accepted
                  </h1>
                ) : findinvite && findinvite.freelancer_rejected ? (
                  <h1 className="font-cardo text-[18px] text-red-600">
                    Rejected
                  </h1>
                ) : (
                  <h1 className="font-cardo text-[18px] text-yellow-600">
                    Pending
                  </h1>
                )}
              </span>
            </p>
          </div>
          <hr className="my-5" />
          <h1 className=" text-2xl font-cardo font-semibold text-left">
            Freelancer Details
          </h1>
          <div className=" flex flex-row mt-6">
            <div className=" basis-8/12">
              <h1 className=" text-xl font-cardo font-medium text-left">
                {findinvite && findinvite.freelancer_name
                  ? findinvite.freelancer_name
                  : ""}
              </h1>
              <div className=" flex flex-row text-left">
                <div className=" basis-4/12 mt-2">
                  <div class="text-sm font-semibold text-blue-800">
                    {findinvite && findinvite.freelancer_category
                      ? findinvite.freelancer_category
                      : ""}
                  </div>
                </div>
              </div>
              <p className="font-inter text-[15px] font-medium mt-3 text-left opacity-[70%]">
                {descriptionToShow}
              </p>
              {findinvite && findinvite.freelancer_description
                ? findinvite.freelancer_description.length > 400 && (
                    <p
                      className="mt-3 text-base font-semibold text-blue-600 text-left cursor-pointer"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "less" : "more"}
                    </p>
                  )
                : ""}
              <h1 className="text-xl font-medium font-cardo text-left mt-5">
                Skills
              </h1>
              <div className="text-left">
                {findinvite &&
                  findinvite.freelancer_skills &&
                  (() => {
                    try {
                      const skillsArray = JSON.parse(
                        findinvite.freelancer_skills.replace(/'/g, '"')
                      );
                      return skillsArray.map((skill, index) => (
                        <div
                          key={index}
                          className="mr-3 focus:outline-none bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full w-28 text-blue-800 px-3 py-[3px] my-1 text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]"
                        >
                          <p className="text-center">{skill}</p>
                        </div>
                      ));
                    } catch (error) {
                      console.error("Error parsing JSON:", error);
                      return null;
                    }
                  })()}
              </div>
            </div>
            <div className=" basis-1/12"></div>
            <div className=" basis-3/12 border-l border-[#E7E8F2]">
              <div className=" flex flex-row ml-4">
                <div className=" basis-3/12">
                  <i class="fa fa-user-secret" aria-hidden="true"></i>
                </div>
                <div className=" basis-6/12">
                  <p className=" text-[14px] font-normal text-left">
                    {findinvite && findinvite.freelancer_experience_level
                      ? findinvite.freelancer_experience_level.replace(
                          /_/g,
                          " "
                        )
                      : ""}
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
                    $
                    {findinvite && findinvite.freelancer_hourly_rate
                      ? findinvite.freelancer_hourly_rate
                      : 0}
                  </p>
                  <p className=" text-[12px] font-normal text-left opacity-50">
                    Hourly Rate
                  </p>
                </div>
              </div>
              <div className=" flex flex-row ml-4 mt-4">
                <div className=" basis-3/12">
                  <i class="bi bi-translate"></i>
                </div>
                <div className=" basis-8/12">
                  <p className=" text-[12px] font-normal text-left opacity-50">
                    Languages Known
                  </p>
                  {findinvite &&
                    findinvite.freelancer_language &&
                    (() => {
                      try {
                        const languageArray = JSON.parse(
                          findinvite.freelancer_language.replace(/'/g, '"')
                        );
                        return languageArray.map((language, index) => (
                          <div
                            key={index}
                            className="mt-2 text-blue-800 text-sm font-semibold text-left"
                          >
                            <p>{language}</p>
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
          <hr className=" my-6" />
          <h1 className=" text-2xl font-cardo font-semibold text-left">
            Project Details
          </h1>
          <h1 className=" text-xl font-cardo font-medium text-left mt-5">
            {findinvite && findinvite.project_title
              ? findinvite.project_title
              : ""}
          </h1>
          <div className=" flex flex-row text-left">
            <div className=" basis-4/12 mt-2">
              <div class="text-sm font-semibold text-blue-800">
                {findinvite && findinvite.project_category
                  ? findinvite.project_category
                  : ""}
              </div>
            </div>
          </div>
          <p className="font-inter text-[15px] font-medium mt-3 text-left opacity-[70%]">
            {findinvite && findinvite.project_description
              ? findinvite.project_description
              : ""}
          </p>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default ViewInvitationDetail;
