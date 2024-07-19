import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetFreelancerSelfProfileAction, UpdateFreelancerProfileAction } from "../../../redux/Freelancer/FreelancerAction";

const EditHrRatePopup = ({ closeHrRate }) => {

  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
  const dispatch = useDispatch();
  const freelancerselfprofile = useSelector(state => state.freelancer.freelancerselfprofile);
  const [userInput, setUserInput] = useState('$0.00');
  const [hourlyRate, setHourlyRate] = useState(freelancerselfprofile && freelancerselfprofile[0] ? freelancerselfprofile[0].hourly_rate : 0);
  const [serviceFee, setServiceFee] = useState(0);
  const [totalAfterFee, setTotalAfterFee] = useState(0);

  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile[0]) {
      const initialRate = freelancerselfprofile[0]?.hourly_rate || 0;
      setHourlyRate(initialRate);
      setUserInput(`$${initialRate.toFixed(2)}`); // updating the userInput with the initial rate
    }
  }, [freelancerselfprofile]);
  
  useEffect(() => {
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

  const handleSave = () => {
    dispatch(UpdateFreelancerProfileAction({ hourly_rate: hourlyRate }, accessToken));
    closeHrRate();
    dispatch(GetFreelancerSelfProfileAction(accessToken));
  }

  // const accessToken = useSelector(state => state.login.accessToken);  

  // const [hourlyrate, setHourlyrate] = useState(""); 
  // const dispatch = useDispatch();
  // const freelancerselfprofile = useSelector(state => state.freelancer.freelancerselfprofile)
  // useEffect(() => {
  //     if (freelancerselfprofile && freelancerselfprofile[0]) {
  //         setHourlyRate(freelancerselfprofile[0].hourly_rate);
  //     }
  // }, [freelancerselfprofile]);

  // const handleSave = () => {
  //     dispatch(UpdateFreelancerProfileAction({ hourlyRate },accessToken));
  //     closeHrRate();
  // }

  // const [userInput, setUserInput] = useState('');
  // const [hourlyRate, setHourlyRate] = useState(freelancerselfprofile[0].hourly_rate);
  // const [serviceFee, setServiceFee] = useState(0);
  // const [totalAfterFee, setTotalAfterFee] = useState(0);

  // useEffect(() => {
  //   const parsedRate = parseFloat(userInput.replace("$", ""));
  //   if (!isNaN(parsedRate)) {
  //     setHourlyRate(parsedRate);
  //   }
  // }, [userInput]);

  // useEffect(() => {
  //   const fee = (10 / 100) * hourlyRate;
  //   setServiceFee(fee);
  //   setTotalAfterFee(hourlyRate - fee);
  // }, [hourlyRate]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-12">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
          <div className="flex justify-between items-center">
            <h1 className="font-cardo text-[26px] text-[#031136] font-normal">
              Change Hourly Rate
            </h1>
            <button
              onClick={closeHrRate}
              className="text-gray-500 hover:text-gray-700"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="mt-8">
            <p className="font-cardo text-[18px] text-[#031136] font-normal text-left">
              Please note that your new hourly rate will only apply to new
              contracts.
            </p>
            <p className="font-cardo text-[18px] text-[#031136] font-normal text-left opacity-50">
              Your profile Rate: ${freelancerselfprofile && freelancerselfprofile[0] ? freelancerselfprofile[0].hourly_rate : 0}/hr
            </p>
            <div>
              <div className="flex items-center mt-4">
                <div className="flex flex-col justify-center w-2/3">
                  <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">
                    Hourly Rate
                  </h1>
                  <p className="font-cardo text-[14px] text-[#031136] font-normal text-left opacity-50">
                    Total amount the client will see
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                <input
            type="text"
            className='border py-1.5 px-2 rounded-md w-56 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-right'
            value={userInput}
            onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, ''); 
                if (value === '' || isNaN(value)) {
                    setUserInput('$');
                } else {
                    setUserInput('$' + value);
                }
            }}
            placeholder="$0.00"
        /> 
                  <span>/Hr</span>
                </div>
              </div>

              <div className="border-b opacity-60 my-5"></div>

              <div className="flex items-center mt-4">
                <div className="flex flex-col justify-center w-2/3">
                  <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">
                    10% Service Fee
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="py-1.5 px-2 rounded-md w-56 border-none text-right bg-blue-50"
                    value={`-$${serviceFee.toFixed(2)}`}
                    disabled
                  />
                  <span>/Hr</span>
                </div>
              </div>

              <div className="border-b opacity-60 my-5"></div>

              <div className="flex items-center mt-4">
                <div className="flex flex-col justify-center w-2/3">
                  <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">
                    You'll Receive
                  </h1>
                  <p className="font-cardo text-[14px] text-[#031136] font-normal text-left opacity-50">
                    The estimated amount you'll receive after service fees
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="border py-1.5 px-2 rounded-md w-56 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-right"
                    value={`$${totalAfterFee.toFixed(2)}`}
                    disabled
                  />
                  <span>/Hr</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Link to="" onClick={handleSave}>
                <span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold">
                  Save
                </span>
              </Link>
              <div
                class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]"
                onClick={closeHrRate}
              >
                <Link to="">
                  <button class="px-2 py-1 bg-white">
                    <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
                      Cancel
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHrRatePopup;
