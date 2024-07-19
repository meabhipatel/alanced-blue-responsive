import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dollarimg from "../../components/images/doller3.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddBidAmountAction } from "../../redux/Freelancer/FreelancerAction";
import { timeAgo } from "./TimeFunctions";
import useWebSocket, { ReadyState } from "react-use-websocket";

const AddBidAmount = () => {
  const location = useLocation();
  const projectData = location.state && location.state.projectData;
  // const logindata = useSelector(state => state.login.login_data);
  const logindata = useSelector((state) => state.login.login_data) || JSON.parse(localStorage.getItem("logindata"));
  console.log("project data :", projectData.project.project_owner, logindata.id);
  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  const addbid = useSelector((state) => state.freelancer.addbid);
  const [addBid, setAddBid] = useState("");
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  // console.log(addBid.bid_amount,"bid amount only")

  // const bid_rate = addBid.bid_amount

  const dispatch = useDispatch();
  const id = projectData.project.id;

  const BidAdd = () => {
    const prodata = {
      project_id: id,
      description: addBid.description,
      bid_amount: addBid.bid_amount,
      bid_type: addBid.bid_type,
    };
    //   console.log("/-/-/-/-/-/-/-/-/-/-/",prodata)
    dispatch(AddBidAmountAction(prodata, accessToken));
    if (prodata.bid_amount >= 0 && prodata.description != null && prodata.bid_type != null) {
      navigate("/View/bid-details", {
        state: { bidData: prodata, projectdetail: projectData },
      });
    }
    if (prodata.bid_amount < 0) {
      toast.error("Enter valid bid amount");
    } else if (prodata.bid_amount != null && prodata.description == null) {
      toast.error("Cover letter is required");
    }
  };

  const onChange = (e) => {
    setAddBid({
      ...addBid,
      [e.target.name]: e.target.value,
    });
    // setAddBid.project_id(id)
  };

  const isButtonEnabled = () => {
    return addBid.bid_amount > 0 && addBid.bid_type && addBid.description;
  };

  function createConversationName() {
    const names = [projectData.project.project_owner, logindata.id].sort();
    return `${names[0]}__${names[1]}`;
  }

  const { readyState, sendJsonMessage } = useWebSocket(`wss://api.alanced.com:8001/${createConversationName()}`, {
    onOpen: () => {
      console.log("Connected !");
    },
    onClose: () => {
      console.log("Disconnected !");
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      console.log("data :", data);
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log("connection status -------------- ", connectionStatus);

  function handleSubmit() {
    sendJsonMessage({
      type: "chat_message",
      message: "you have a bid from freelancer " + logindata.first_Name,
      name: logindata.id,
    });
  }

  const handleButtonClick = () => {
    if (!isButtonEnabled()) {
      toast.error("Please fill out all required fields.");
    } else {
      // Proceed with the action
      BidAdd();
      handleSubmit();
      window.scrollTo(0, 0);
    }
  };

  const [userInput, setUserInput] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [serviceFee, setServiceFee] = useState(0);
  const [totalAfterFee, setTotalAfterFee] = useState(0);

  useEffect(() => {
    // Set the initial value of userInput to bid_rate when component mounts
    setUserInput(addBid.bid_amount || ""); // Use an empty string as a fallback
  }, [addBid.bid_amount]);

  useEffect(() => {
    // Parse the userInput and update hourlyRate
    const parsedRate = parseFloat(userInput.replace("$", ""));
    if (!isNaN(parsedRate)) {
      setHourlyRate(parsedRate);
    }
  }, [userInput]);

  useEffect(() => {
    const fee = (10 / 100) * hourlyRate;
    setServiceFee(fee);
    setTotalAfterFee(hourlyRate - fee);
  }, [hourlyRate]);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const descriptionToShow = showFullDescription ? projectData.project.description : projectData.project.description.slice(0, 200);

  return (
    <>
      <div className=" container-sm px-36">
        <div className=" mt-10  border border-[#E7E8F2] py-10 px-10 rounded-lg">
          <h1 className=" text-2xl font-cardo font-semibold text-left">Job Details</h1>
          <div className=" flex flex-row mt-6">
            <div className=" basis-8/12">
              <h1 className=" text-xl font-inter font-medium text-left">{projectData.project.title}</h1>
              <div className=" flex flex-row">
                <div className=" basis-4/12 mt-5">
                  <div class="focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1]  rounded-xl text-sm font-semibold text-blue-800 py-[3px] dark:bg-[#dffdee] dark:hover:bg-[#dffdee]  w-[90%] bg-opacity-[60%]">
                    {projectData.project.category}
                  </div>
                </div>
                <div className=" basis-4/12 mt-5 ml-2">
                  <p className=" text-sm font-medium font-inter text-left opacity-[50%]">
                    Posted {timeAgo(projectData.project.project_creation_date)}
                  </p>
                </div>
              </div>
              <p className="font-inter text-[15px] font-medium mt-3 text-left opacity-[70%]">{descriptionToShow}</p>
              {projectData.project.description.length > 200 && (
                <p className="mt-3 text-base font-semibold text-blue-600 text-left cursor-pointer" onClick={toggleDescription}>
                  {showFullDescription ? "less" : "more"}
                </p>
              )}
              {/* <p className='font-inter text-[15px] font-medium mt-3 text-left opacity-[70%]'>{projectData.project.description}</p>
                <p className=' mt-3 text-base font-semibold text-blue-600 text-left'>more</p> */}
              {/* <p className='mb-5 mt-3 text-base font-semibold text-blue-600 text-left'>View more job details</p> */}
            </div>
            <div className=" basis-1/12"></div>
            <div className=" basis-3/12 border-l border-[#E7E8F2]">
              <div className=" flex flex-row ml-4">
                <div className=" basis-3/12">
                  <i class="fa fa-user-secret" aria-hidden="true"></i>
                </div>
                <div className=" basis-6/12">
                  <p className=" text-[14px] font-normal text-left">{projectData.project.experience_level}</p>
                  <p className=" text-[12px] font-normal text-left opacity-50">Experience level</p>
                </div>
              </div>
              <div className=" flex flex-row ml-4 mt-4">
                <div className=" basis-3/12">
                  <i class="bi bi-coin"></i>
                </div>
                <div className=" basis-6/12">
                  <p className=" text-[14px] font-normal text-left">
                    $
                    {projectData.project.rate == "Hourly"
                      ? projectData.project.min_hourly_rate + "/hr" + " - " + "$" + projectData.project.max_hourly_rate + "/hr"
                      : projectData.project.fixed_budget}
                  </p>
                  <p className=" text-[12px] font-normal text-left opacity-50">Project Budget</p>
                  {/* <p className=' text-[12px] font-normal text-left opacity-50'>{projectData.project.rate}</p> */}
                </div>
              </div>
              <div className=" flex flex-row ml-4 mt-4">
                <div className=" basis-3/12">
                  <i class="bi bi-clock-history"></i>
                </div>
                <div className=" basis-9/12">
                  <p className=" text-[14px] font-normal text-left">{projectData.project.rate}</p>
                  <p className=" text-[12px] font-normal text-left opacity-50">Budget Type</p>
                </div>
              </div>
              <div className=" flex flex-row ml-4 mt-4">
                <div className=" basis-3/12">
                  <i class="bi bi-calendar-check"></i>
                </div>
                <div className=" basis-8/12">
                  <p className=" text-[14px] font-normal text-left">{projectData.project.deadline}</p>
                  <p className=" text-[12px] font-normal text-left opacity-50">Project Deadline</p>
                </div>
              </div>
            </div>
          </div>
          <hr className=" mt-5" />
          <h1 className="text-base font-medium font-inter text-left mt-5">Skills & Experties</h1>
          <div className="text-left mt-5">
            {JSON.parse(projectData.project.skills_required.replace(/'/g, '"')).map((skill, index) => (
              <div className="mr-3 focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full   text-blue-800 px-5 py-[3px] text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]">
                <p className=" text-center">{skill}</p>
              </div>
            ))}
            {/* <div className="focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full  w-24 text-blue-800 px-3 py-[3px] font-semibold text-sm dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]">
                <p className="text-center">React</p>
            </div> */}
          </div>
        </div>
        <div className=" mt-10 border border-[#E7E8F2] py-10 px-10 rounded-lg">
          <h1 className=" text-2xl font-cardo font-semibold text-left">Add Bid</h1>
          <p className="text-base font-inter font-medium text-left mt-7">What is the rate you'd like to bid for this job?</p>
          <div className=" flex flex-row">
            <div className=" basis-8/12">
              <div>
                <div className="flex items-center mt-4">
                  <div className="flex flex-col justify-center w-2/3">
                    <h1 className="font-medium text-[18px] text-[#031136] font-cardo text-left">Rate Type</h1>
                    <p className="font-inter text-[14px] text-[#031136] font-normal text-left opacity-50">Choose Rate Type.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <input
                        type="text"
                        placeholder='$0.00'
                        className='border py-1.5 px-2 rounded-md w-56 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-right'
                        name='bid_amount'
                        value="Bid Rate"
                        // onChange={onChange}
                        // value={userInput}  // Use the userInput as value
                        // onChange={(e) => setUserInput(e.target.value)}
                    />  */}
                    <select
                      className="w-[220px] border py-1.5 px-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                      name="bid_type"
                      value={addBid.bid_type}
                      onChange={onChange}
                      required
                    >
                      <option disabled selected value="">
                        Choose
                      </option>
                      <option value="Hourly">Hourly</option>
                      <option value="Fixed">Fixed</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center mt-6">
                  <div className="flex flex-col justify-center w-2/3">
                    <h1 className="font-medium text-[18px] text-[#031136] font-cardo text-left">Bid Amount</h1>
                    <p className="font-inter text-[14px] text-[#031136] font-normal text-left opacity-50">Total amount the client will see</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="$0.00"
                      className="border py-1.5 px-2 rounded-md w-56 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-right"
                      name="bid_amount"
                      value={addBid.bid_amount}
                      onChange={onChange}
                      required
                      // value={userInput}  // Use the userInput as value
                      // onChange={(e) => setUserInput(e.target.value)}
                    />

                    {/* <span>/hr</span> */}
                    {/* <input type='text' name='project_id' value={addBid.project_id}
                    placeholder={id} defaultValue={id} onChange={onChange}/> */}
                  </div>
                </div>

                <div className="border-b opacity-60 my-5"></div>

                <div className="flex items-center mt-4">
                  <div className="flex flex-col justify-center w-2/3">
                    <h1 className="font-cardo text-[18px] text-[#031136] font-medium text-left">10% Alanced Service Fee</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="$0.00"
                      className="py-1.5 px-2 rounded-md w-56 border-none text-right cursor-not-allowed bg-none"
                      value={`-$${serviceFee.toFixed(2)}`}
                      disabled
                    />
                    {/* <span>/hr</span> */}
                  </div>
                </div>

                <div className="border-b opacity-60 my-5"></div>

                <div className="flex items-center mt-4">
                  <div className="flex flex-col justify-center w-2/3">
                    <h1 className="font-cardo text-[18px] text-[#031136] font-medium text-left">You'll Receive</h1>
                    <p className="font-inter text-[14px] text-[#031136] font-normal text-left opacity-50">
                      The estimated amount you'll receive after service fees
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="$0.00"
                      className="border py-1.5 px-2 rounded-md w-56 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-right cursor-not-allowed"
                      value={`$${totalAfterFee.toFixed(2)}`}
                      disabled
                    />
                    {/* <span>/hr</span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className=" basis-4/12">
              <img src={dollarimg} alt="" className=" h-28 w-28 mx-auto" />
              <p className=" opacity-[50%] font-normal text-sm mt-3">Includes Alanced Hourly Protection.</p>
            </div>
          </div>
        </div>
        {/* <div className=' mt-10 border border-[#E7E8F2] py-10 px-10 rounded-lg'>
            <h1 className='text-base font-inter font-medium text-left'>How long will this project take?</h1>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-[#797979] text-sm font-inter font-normal rounded-lg mt-4 focus:ring-blue-500 focus:border-blue-500 block w-[22%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Select a duration</option>
              <option value="">More than 6 months</option>
              <option value="">3 to 6 months</option>
              <option value="">1 to 3 months</option>
              <option value="">Less than 1 month</option>
            </select>
        </div> */}
        <div className=" mt-10 border border-[#E7E8F2] py-10 px-10 rounded-lg">
          <h1 className=" text-2xl font-cardo font-semibold text-left">Additional details</h1>
          <h1 className="text-base font-inter font-medium text-left mt-8">Cover Letter</h1>
          <div class="w-full mx-auto">
            <textarea
              id="message"
              name="description"
              value={addBid.description}
              onChange={onChange}
              required
              class="mt-3 w-full  px-3 py-2 border-2 rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              rows="15"
            ></textarea>
          </div>
        </div>
        <div className=" flex flex-row mt-5  mb-5">
          <div className=" basis-3/12">
            {/* <button className='h-10 w-52 text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF] mt-5 text-base font-semibold rounded' onClick={()=>{ BidAdd(); window.scrollTo(0, 0); }}>Send Proposal</button> */}
            <button
              className={`h-10 w-52 text-white text-base font-semibold mt-5 rounded ${
                isButtonEnabled() ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF]" : "bg-gray-300"
              }`}
              onClick={handleButtonClick}
              disabled={!isButtonEnabled()}
            >
              Send Proposal
            </button>
          </div>
          <div class="p-0.5 mt-5 rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]">
            <Link to="/freelancer/profile">
              <button class="px-2 py-1 bg-[#f8faf9] rounded-sm">
                <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-bold text-sm py-[4px] px-[16px]">Cancel</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showDialog && (
        <div className="fixed top-0 left-0 flex justify-center w-full z-50">
          <div className=" bg-blue-500 p-8 rounded-lg shadow-lg mt-24 text-black font-semibold">
            <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
            <p>Your proposal has been sent successfully.</p>
            <button className="mt-4 text-black font-bold bg-white hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default AddBidAmount;
