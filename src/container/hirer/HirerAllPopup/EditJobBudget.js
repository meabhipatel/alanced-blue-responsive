import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const EditJobBudget = ({closeJobBudget,project}) => {

    const initialRate = project.Project_Rate === "Hourly" ? "Hourly" : "Fixed";
    const [selectedOption, setSelectedOption] = useState(initialRate);
    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const [jobrate, setJobRate] = useState(initialRate);
    const [jobfixedbudget, setJobFixedBudget] = useState(project.Project_Fixed_Budget);
    const [jobminhr, setJobMinHr] = useState(project.Project_Min_Hourly_Rate);
    const [jobmaxhr, setJobMaxHr] = useState(project.Project_Max_Hourly_Rate);
    const id = project.id;

    const selectOptionHandler = (option) => {
        setSelectedOption(option);
        setJobRate(option === 'Hourly' ? 'Hourly' : 'Fixed');
    };

    const handleSave = async () => {

        let fixedBudgetValue = jobrate === "Hourly" ? 0 : jobfixedbudget;
        let minHourlyRateValue = jobrate === "Fixed" ? 0 : jobminhr;
        let maxHourlyRateValue = jobrate === "Fixed" ? 0 : jobmaxhr;

        try {
            const response = await axios.put(`https://www.api.alanced.com/freelance/update/project/${id}`, {
                rate: jobrate,
                fixed_budget: fixedBudgetValue,
                min_hourly_rate: minHourlyRateValue,
                max_hourly_rate: maxHourlyRateValue
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.status === 200) {
                toast.success("Job Budget updated Successfully")
                closeJobBudget();
            } else {
                console.log(response.data.message || 'Error updating the Job Budget');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

  return (
    <>
    <div className="fixed z-10 inset-0 overflow-y-auto mt-12">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
                    <div className="flex justify-between items-center">
                        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Edit Project Budget</h1>
                        <button onClick={closeJobBudget} className="text-gray-500 hover:text-gray-700">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className='mt-8'>
                    <div className="flex-1">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full mb-8">
            <div 
                className={`flex sm:block items-center w-full sm:flex-1 p-4 border ${selectedOption === 'Hourly' ? 'border-blue-600' : ''} hover:border-blue-600 hover:shadow-md transition duration-300 cursor-pointer h-[120px] sm:h-auto`}
                onClick={() => selectOptionHandler('Hourly')}
            >
                <i className="bi bi-alarm text-3xl sm:-mt-3 mr-4 sm:mr-0 text-blue-600"></i>
                <h5 className='text-left font-cardo text-2xl lg:pt-3'>Hourly Rate</h5>
            </div>
            <div 
                className={`flex sm:block items-center w-full sm:flex-1 p-4 border ${selectedOption === 'Fixed' ? 'border-blue-600' : ''} hover:border-blue-600 hover:shadow-md transition duration-300 cursor-pointer h-[120px] sm:h-auto`}
                onClick={() => selectOptionHandler('Fixed')}
            >
                <i className="bi bi-tag-fill sm:-mt-3 mr-4 sm:mr-0 text-3xl text-blue-600"></i>
                <h5 className='text-left font-cardo text-2xl lg:pt-3'>Fixed Budget</h5>
            </div>
        </div>
        
        <div className="min-h-[200px]"> 
            {selectedOption === 'Hourly' && (
                <div>
                    <div className="flex space-x-16">
                        <div className="flex flex-col">
                            <label className="block text-xl mt-3 font-cardo" htmlFor="fromInput">From</label>
                            <div className="flex items-center">
                                <input id="fromInput" type="number" placeholder="" className="flex-1 w-full mr-1 p-2 border my-1 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" value={jobminhr} onChange={e => setJobMinHr(e.target.value)} />
                                <span>/hr</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-xl mt-3 font-cardo" htmlFor="toInput">To</label>
                            <div className="flex items-center">
                                <input id="toInput" type="number" placeholder="" className="flex-1 w-full mr-1 p-2 border my-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" value={jobmaxhr} onChange={e => setJobMaxHr(e.target.value)}/>
                                <span>/hr</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-lg opacity-50 font-cardo font-medium py-4">Set your Hourly Rate</p>
                </div>
            )}

            {selectedOption === 'Fixed' && (
                <div>
                    <label className="block text-xl mt-3 font-cardo" htmlFor="maxBudgetInput">Maximum Budget</label> 
                    <input id="maxBudgetInput" type="number" className='border my-2 p-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='' value={jobfixedbudget} onChange={e => setJobFixedBudget(e.target.value)}/>
                    <p className="text-lg opacity-50 font-cardo font-medium py-4">Set your Project Budget</p>
                </div>
            )}
        </div>
    </div>
                            <div className="flex justify-end">
                            <Link to='' onClick={handleSave} state={{project}}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeJobBudget}>
                                <Link to='' state={{project}}><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                            </div>     
                            </div>
                            </div>
                </div>
                    </div>
                </div>
    </>
  )
}

export default EditJobBudget