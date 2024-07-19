import React from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import frame from "../../components/images/Frame.png";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { timeAgo, formatDateInput, getCurrentTime, formatDate } from "../freelancer/TimeFunctions";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ViewJobPost = () => {
  const location = useLocation();
  const project = location.state && location.state.project;
  const viewhirerselfproject = useSelector((state) => state.hirer.viewhirerselfproject);
  const [bidcount, setBidCount] = useState(0);
  const [invitescount, setInvitesCount] = useState(0);
  const id = project.id;
  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");

  const [viewhirerProjectcount, setViewhirerProjectCount] = useState(0);

  useEffect(() => {
    axios
      .get(`https://www.api.alanced.com/freelance/view/hirer-self/Project`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setViewhirerProjectCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://www.api.alanced.com/freelance/View/bids/${id}`)
      .then((response) => {
        setBidCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://www.api.alanced.com/freelance/View/project-invitations-count/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setInvitesCount(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  }, []);

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">{project.title}</h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
          <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-[70%] bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
              <div className="border-b border-gray-200 border-opacity-30 py-6 px-8">
                <p className="font-inter text-blue-700 text-[16px] font-medium">{project.category}</p>
                <p className="font-inter text-[#031136] opacity-50 text-sm font-medium py-1">posted {timeAgo(project.Project_created_at)}</p>
                <p className="font-inter text-[#031136] text-sm font-normal py-3">
                  <i class="bi bi-geo-alt-fill text-blue-700"></i> Worldwide
                </p>
              </div>
              <div className="border-b border-gray-200 border-opacity-30 py-6 px-8">
                <p className="font-inter text-[#031136] text-md font-medium opacity-50">{project.description}</p>
              </div>
              <div className="border-b border-gray-200 border-opacity-30 py-6 px-8">
                <div className="flex">
                  <div className="flex-1 py-4 flex">
                    <i class="bi bi-coin flex-shrink-0 mr-3"></i>
                    <div>
                      <p className="font-inter text-[#031136] text-md font-medium">
                        {" "}
                        $
                        {project.Project_Rate == "Hourly"
                          ? project.Project_Min_Hourly_Rate + "/hr" + " - " + "$" + project.Project_Max_Hourly_Rate + "/hr"
                          : project.Project_Fixed_Budget}
                      </p>
                      <p className="font-inter text-[#031136] text-sm font-medium opacity-50">{project.Project_Rate}</p>
                    </div>
                  </div>

                  <div className="flex-1 py-4 flex">
                    <i class="bi bi-mortarboard-fill flex-shrink-0 mr-3"></i>
                    <div>
                      <p className="font-inter text-[#031136] text-md font-medium">{project.experience_level.replace(/_/g, " ")}</p>
                      <p className="font-inter text-[#031136] text-sm font-medium opacity-50">Experience Level</p>
                    </div>
                  </div>
                  <div className="flex-1 py-4 flex">
                    <i class="bi bi-calendar-minus flex-shrink-0 mr-3"></i>
                    <div>
                      <p className="font-inter text-[#031136] text-md font-medium">{formatDate(project.deadline)}</p>
                      <p className="font-inter text-[#031136] text-sm font-medium opacity-50">Project Deadline</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200 border-opacity-30 py-6 px-8 flex items-center">
                <div className="flex-1">
                  <p className="font-inter text-[#031136] text-lg font-medium">Contract-to-hire opportunity</p>
                  <p className="font-inter text-[#031136] opacity-50 text-md font-medium py-2">
                    This lets talent know that this job could become full time.
                  </p>
                </div>
                <div className="ml-4">
                  <img src={frame} alt="" className="h-32 w-32" />
                </div>
              </div>
              <div className="border-b border-gray-200 border-opacity-30 py-6 px-8">
                <p className="font-inter text-[#031136] text-lg font-medium">Skills and Expertise</p>
                <div className="text-left mt-5">
                  {JSON.parse(project.skills_required.replace(/'/g, '"')).map((skill, index) => (
                    <div className="mr-3 my-2 focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full text-blue-800 px-4 py-1 text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]">
                      <p className=" text-center">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-gray-200 border-opacity-30 py-6 px-8">
                <p className="font-inter text-[#031136] text-lg font-medium py-4">Activity on this job</p>
                <p className="font-inter text-[#031136] text-md font-medium py-1">
                  Proposals : <span className="opacity-50">{bidcount ? bidcount : 0}</span>
                </p>
                <p className="font-inter text-[#031136] text-md font-medium py-1">
                  Messaged : <span className="opacity-50"> {invitescount ? invitescount : 0}</span>
                </p>
                <p className="font-inter text-[#031136] text-md font-medium py-1">
                  Invitations : <span className="opacity-50"> {invitescount ? invitescount : 0}</span>
                </p>
              </div>
            </div>
            <div class="w-full md:w-[30%] bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
              <div className="border-b border-gray-200 border-opacity-30 py-4 px-8">
                <Link to="/edit/Job-post" state={{ project }}>
                  <p className="font-inter text-blue-700 text-md font-normal py-1">
                    <i class="bi bi-pencil mr-1"></i> Edit Job Post
                  </p>
                </Link>
                <Link to="/View/Job-post" state={{ project }}>
                  <p className="font-inter text-blue-700 text-md font-normal py-1">
                    <i class="bi bi-eye mr-1"></i> View Job Post
                  </p>
                </Link>
                {/* <p className="font-inter text-blue-700 text-md font-normal py-1"><i class="bi bi-trash mr-1"></i> Delete Job Post</p> */}
              </div>
              <div className="border-b border-gray-200 border-opacity-30 py-4 px-8">
                <p className="font-inter text-[#031136] text-lg font-medium py-4">About the client</p>
                <p className="font-inter text-[#031136] opacity-50 text-md font-medium py-2 mr-2 inline-block">Payment method not verified</p>
                <i class="bi bi-question-circle-fill text-blue-700 inline-block"></i>
                <p className="font-inter text-[#031136] text-md font-medium py-2">{project.project_owner_name}</p>
                <p className="font-inter text-[#031136] text-md font-medium">{project.project_owner_address}</p>
                <p className="font-inter text-[#031136] opacity-50 text-md font-medium">{getCurrentTime()}</p>
                <p className="font-inter text-[#031136] text-md font-medium py-2">{viewhirerProjectcount} job posted</p>
                <p className="font-inter text-[#031136] text-sm font-medium opacity-50">
                  Member since {formatDateInput(project.project_owner_created)}
                </p>
              </div>
              <div className="border-b border-gray-200 border-opacity-30 py-4 px-8">
                <p className="font-inter text-[#031136] text-lg font-medium py-4">Job link</p>
                <input
                  type="text"
                  className="border my-2 py-1.5 px-2 rounded-md w-full bg-[#E4EBE4] cursor-not-allowed"
                  disabled
                  placeholder="https://www.alanced.com/jobs"
                />
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

export default ViewJobPost;
