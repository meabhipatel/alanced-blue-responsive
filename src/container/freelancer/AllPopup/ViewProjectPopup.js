import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import frame from "../../../components/images/Frame.png";
import money from "../../../components/images/money.png";
import rating from "../../../components/images/superstart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddBidAmount from "../AddBidAmount";
// import { GetFreelancerSelfBidAction } from '../../../redux/Freelancer/FreelancerAction'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { toast } from 'react-toastify';
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import Navbar from "../../../components/Layout/Navbar";
import HomeSection4 from "../../../components/Layout/HomeSection4";
import Footer from "../../../components/Layout/Footer";
import { toast } from "react-toastify";
import { timeAgo } from "../TimeFunctions";
import { useEffect } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";

function ViewProjectPopup() {
  // console.log(project,"project")
  const location = useLocation();
  const project = location.state && location.state.project;
  const id = project.id;
  // console.log(findproject,"send_praposal")
  const projectData = { project };
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  // const accessToken = useSelector(state => state.login.accessToken);
  //   const freelancerselfbid = useSelector(state => state.freelancer.freelancerselfbid)
  //   console.log(freelancerselfbid,"/*/*/*/*/*/*/*/*/*/*/*/*/*/*/")
  const [BidCount, setBidCount] = useState(0);

  const [AllProposals, setAllProposals] = useState("");
  var clickable = false;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doc API
        const response1 = await axios.get("https://www.api.alanced.com/freelance/view/freelancer-all-self/bid", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAllProposals(response1.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/Main", AllProposals);
  if (project != null && AllProposals != "") {
    for (const key in AllProposals) {
      // console.log("++++++++++++++++++",key,AllProposals[key].project_id)
      if (project.id == AllProposals[key].project_id) {
        // toast.error('bid is applied on this project....')
        clickable = true;
      }
    }
  }
  //   console.log("=-=-=-=-=-=-=",AllProposals[0].project_id)
  // React.useEffect(() => {
  //     dispatch(GetFreelancerSelfBidAction(accessToken))
  // }, [])

  const toggleSaveProject = async (project) => {
    try {
      let response;

      if (project.isSaved) {
        response = await axios.delete(`https://www.api.alanced.com/freelance/saved-projects/${project.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        response = await axios.post(
          `https://www.api.alanced.com/freelance/saved-projects/${project.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      const updatedJob = response.data;

      localStorage.setItem(`isSaved_${project.id}`, JSON.stringify(updatedJob.isSaved));

      if (updatedJob.isSaved) {
        toast.success("Job saved successfully!");
        navigate("/view-project/full-detail");
      } else {
        toast.success("Job unsaved successfully!");
        navigate("/view-project/full-detail");
      }

      // const updatedProjects = projectsToDisplay.map(p => {
      //     if (p.id === updatedJob.id) {
      //         return updatedJob;
      //     }
      //     return p;
      // });

      // projectsToDisplay(updatedProjects);
    } catch (error) {
      console.error("Error toggling job save state", error);
    }
  };

  const handleClick = (event, project) => {
    event.stopPropagation();
    event.preventDefault();
    toggleSaveProject(project);
  };

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

  // if (!isOpen) {
  //   return null;
  // }
  return (
    <>
      {/* <div className="fixed inset-0 bg-black opacity-10"></div> */}
      {/* Dialog content goes here */}
      {/* <div className='flex flex-row'>
            <div className='basis-6/12 cursor-pointer'><i class="bi bi-chevron-left font-bold text-black text-lg"></i></div>
            
        </div> */}

      <div className=" container-sm px-40">
        {clickable ? (
          <div className="h-16 mt-4 bg-blue-100 pl-5 rounded-md pt-2 text-left">
            <LightbulbOutlinedIcon />
            <span className="ml-4">You have already submitted a proposal for this project.</span>
            <br />
            <span className="text-blue-700 font-bold ml-10">
              <Link to="/view/SelfBidProject" state={{ project }}>
                View Proposal
              </Link>
            </span>
          </div>
        ) : (
          ""
        )}
        {project.is_hired && !clickable ? (
          <div className="h-16 mt-4 bg-blue-100 pl-5 rounded-md pt-2 text-left">
            <DoDisturbAltOutlinedIcon />
            <span className="ml-4">This project is closed ,you can't add proposal now</span>
          </div>
        ) : (
          ""
        )}
        <div className=" flex flex-row my-6">
          <div className=" basis-8/12 text-left">
            <h1 className="text-xl font-normal font-cardo">{project.title}</h1>
            <p className="mt-4 text-base font-normal font-cardo">{project.category}</p>
            <div className="flex flex-row mt-2">
              <div className=" basis-6/12">
                <p className=" font-inter font-normal text-base text-[#797979]">Posted {timeAgo(project.project_creation_date)}</p>
              </div>
              <div className=" basis-6/12">
                <div className=" text-right font-inter text-base font-normal opacity-[50%]">
                  <i class="bi bi-geo-alt"></i> Worldwide
                </div>
              </div>
            </div>
            <div className="mt-8 font-inter font-normal text-base text-[#797979]">Job Description: {project.description}</div>
            <div className="font-inter font-normal text-base text-[#797979]">
              Please Share Your Details On this Whatsapp No.+
              {project.project_owner_contact ? project.project_owner_contact : "NA"}{" "}
            </div>
            <div className="font-inter font-normal text-base text-[#797979] mt-5">
              Are you a talented and imaginative Graphic Designer with a flair for creating visually stunning and engaging designs? Vogue Tourism, a
              premier name in the travel and hospitality sector, is seeking a skilled Graphic Designer to join our team. If you're passionate about
              translating travel experiences into captivating visuals, we want to hear from you.
            </div>
            <div className="mt-5 font-inter font-normal text-base text-[#797979]">Responsibilities:</div>
            <div className="mt-5 font-inter font-normal text-base text-[#797979]">
              Collaborate with the marketing team to understand design requirements and objectives for various projects, including flyers, posters,
              social media graphics, and more.Create compelling visual content that aligns with our brand identity and resonates with our target
              audience.Develop original design concepts, graphics, and layouts that tell the story of unique travel destinations and
              experiences.Ensure that all designs adhere to branding guidelines and maintain a consistent visual identity.Use your creative expertise
              to enhance the overall aesthetic and impact of our marketing materials.
            </div>
            <div className=" flex flex-row mt-10">
              <div className=" basis-6/12">
                <div className=" flex flex-row">
                  <div className=" basis-2/12">
                    <img src={money} alt="" />
                  </div>
                  <div className=" basis-10/12">
                    <h1 className=" font-cardo font-normal text-lg text-left">
                      $
                      {project.rate == "Hourly"
                        ? project.min_hourly_rate + "/hr" + " - " + "$" + project.max_hourly_rate + "/hr"
                        : project.fixed_budget}
                    </h1>
                    <p className=" font-inter font-normal text-base text-left opacity-[50%]">{project.rate}</p>
                  </div>
                </div>
              </div>
              <div className=" basis-6/12">
                <div className=" flex flex-row">
                  <div className=" basis-2/12">
                    <img src={rating} alt="" />
                  </div>
                  <div className=" basis-10/12">
                    <h1 className=" font-cardo font-normal text-lg text-left">{project.experience_level.replace(/_/g, " ")}</h1>
                    <p className=" font-inter font-normal text-base text-left opacity-[50%]">Experience Level</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=' mt-16'><h1 className=' font-cardo font-normal text-lg text-left'>Contract-to-hire opportunity</h1></div>
                    <div className=' flex flex-row mt-3'>
                        <div className=' basis-8/12'>
                            <p className=' font-inter font-normal text-base opacity-[50%]'>This lets talent know that this job could become full time.</p>
                            <p className=' font-inter font-normal text-base opacity-[80%]'>Learn more</p>
                        </div>
                        <div className=' basis-4/12'><img src={frame} alt="" className='h-[80%]' /></div>
                    </div> */}
            <div className=" flex flex-row mt-16">
              <div className=" basis-8/12">
                <h1 className=" font-cardo font-normal text-lg text-left">Contract-to-hire opportunity</h1>
                <p className=" font-inter font-normal text-base opacity-[50%] mt-3">This lets talent know that this job could become full time.</p>
                {/* <p className=' font-inter font-normal text-base opacity-[80%]'>Learn more</p> */}
              </div>
              <div className=" basis-4/12">
                <img src={frame} alt="" className="h-[80%]" />
              </div>
            </div>
            <div className=" mt-14">
              <h1 className=" font-inter font-normal text-base">
                Project Type:
                <span className=" opacity-[50%]">{project.category}</span>
              </h1>
            </div>
            <div className="mt-10 font-cardo text-lg font-normal ">Skills and Expertise</div>
            <div className=" mt-2 text-sm font-inter font-normal ">{project.category} Deliverables</div>
            {JSON.parse(project.skills_required.replace(/'/g, '"')).map((skill, index) => (
              <span className="border px-5 py-1 border-gray-300 rounded font-inter text-[#797979] text-base inline-block mr-4 my-3 focus:border-none">
                {skill}
              </span>
            ))}

            <div className=" mt-6 text-sm font-inter font-normal text-[#0A142F]">Other</div>
            {JSON.parse(project.skills_required.replace(/'/g, '"')).map((skill, index) => (
              <span className="border px-5 py-1 border-gray-300 rounded font-inter text-[#797979] text-base inline-block mr-4 my-3 focus:border-none">
                {skill}
              </span>
            ))}
            <div className="mt-14 font-cardo text-lg font-normal text-[#031136]">Activity on this job</div>
            <div className=" mt-5">
              <h1 className=" font-inter font-normal text-base">
                Proposals:
                <span className=" opacity-[50%]"> {BidCount ? BidCount : 0}</span>
              </h1>
            </div>
            {/* <div className=' mt-2'><h1 className=' font-inter font-normal text-base'>Interviewing:<span className=' opacity-[50%]'> 0</span></h1></div>
                    <div className=' mt-2'><h1 className=' font-inter font-normal text-base'>Invites sent:<span className=' opacity-[50%]'> 0</span></h1></div>
                    <div className=' mt-2'><h1 className=' font-inter font-normal text-base'>Unanswered invites:<span className=' opacity-[50%]'> 0</span></h1></div> */}
          </div>
          <div className=" basis-4/12">
            <div className="mt-6 ml-[16%]">
              <Link
                to="/freelancer/add-bid"
                style={{
                  pointerEvents: clickable || project.is_hired ? "none" : "",
                }}
                state={{ projectData }}
              >
                <span
                  class={
                    clickable || project.is_hired
                      ? "px-12 py-[15px] lg:mt-0 bg-slate-200 border rounded border-none text-white font-inter text-base font-normal"
                      : "px-12 py-[15px] lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-inter text-base font-normal"
                  }
                >
                  Apply Now
                </span>
              </Link>
            </div>
            {/* <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] mt-8 ml-[30%]">
                <button class="rounded-sm px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-inter font-bold text-base py-[4px] px-8" onClick={(event) => handleClick(event,project)}>{ 
        localStorage.getItem(`isSaved_${project.id}`) === 'true' 
        ? <><i className="fa fa-heart p-1 text-blue-600"></i> Unsave Job</>
        : <><i className="fa fa-heart-o p-1"></i> Save Job</> 
    }</p></button>
                </div>  */}
            {/* <div className='mt-8 text-sm font-inter font-normal text-[#0A142F] text-center ml-9'><i class="bi bi-flag-fill"></i><span className=' opacity-[50%] ml-2'>Flag as inappropriate</span></div>
                <div className='mt-2 text-sm font-inter font-normal text-[#0A142F] text-center ml-9 opacity-[50%]'>Send a proposal for: 8 Connects</div>
                <div className='mt-2 text-sm font-inter font-normal text-[#0A142F] text-center ml-9 opacity-[50%]'>Available Connects: 10</div> */}
            <div className="mt-12 text-xl font-cardo font-normal text-[#0A142F] ml-10">About the client</div>
            <div className="mt-3 text-sm font-inter font-normal text-[#0A142F] ml-10 opacity-[50%]">Payment method not verified</div>
            <div className="mt-5 text-base font-inter font-normal text-[#0A142F] ml-10">Owner Name</div>
            <div className="mt-2 text-base font-inter font-normal text-[#0A142F] ml-10 opacity-[50%]">{project.project_owner_name}</div>
            <div className="mt-5 text-base font-inter font-normal text-[#0A142F] ml-10">Location</div>
            <div className="mt-2 text-base font-inter font-normal text-[#0A142F] ml-10 opacity-[50%]">
              {project.project_owner_location ? project.project_owner_location : "NA"}
            </div>
            <div className="mt-5 text-base font-inter font-normal text-[#0A142F] ml-10">History</div>
            <div className="mt-2 text-base font-inter font-normal text-[#0A142F] ml-10 opacity-[50%]">
              Member since {project.project_owner_date_of_creation}
            </div>
            <div className=" mt-16 text-xl font-cardo font-normal text-[#0A142F] ml-10">Job link</div>
            <div class="p-0.5 inline-block rounded bg-black opacity-[30%] mt-5 ml-10">
              <button class="px-1 py-1 bg-white">
                <p class="font-inter font-normal text-sm py-[10px] px-4 opacity-[90%] text-black cursor-not-allowed bg-[#E4EBE4]">
                  https://www.alanced.com/find-work
                </p>
              </button>
            </div>
            {/* <div className=' mt-5 text-base font-cardo font-bold text-[#0A142F] ml-10'>Copy link</div> */}
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
}

export default ViewProjectPopup;
