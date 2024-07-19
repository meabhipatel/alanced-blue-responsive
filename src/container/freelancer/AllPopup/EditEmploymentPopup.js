import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetFreelancerSelfProfileAction } from '../../../redux/Freelancer/FreelancerAction';
import DesignationList from '../AllSelectionData/DesignationList';

const EditEmploymentPopup = ({ closeEditEmployment, employment }) => {

    const dispatch = useDispatch()

    const formatToYYYYMMDD = (dateStr) => {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split("-");
        return `${year}-${month}-${day}`;
    }

    const formatToDDMMYYYY = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split("-");
        return `${day}-${month}-${year}`;
    }

    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(!employment.Company_Leaving_date);

    const id = employment.emp_id
    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const [companyname, setCompanyname] = useState(employment.Freelancer_Company_Name || '');
    const [designation, setDesignation] = useState(employment.Company_Designation || '');
    const [joindate, setJoindate] = useState(
        formatToDDMMYYYY(employment.Company_Joining_date || '')
    );
    const [leavedate, setLeavedate] = useState(
        formatToDDMMYYYY(employment.Company_Leaving_date || '')
    );

    useEffect(() => {
        setIsCurrentlyWorking(!leavedate);
    }, [leavedate]);

    const handleSave = async () => {
        try {
            const updatedData = {
                Freelancer_Company_Name: companyname,
                Company_Designation: designation,
                Company_Joining_date: joindate,
                Company_Leaving_date: isCurrentlyWorking ? null : leavedate
            };

            const response = await axios.put(`https://www.api.alanced.com/freelance/update/Freelancer/Employment/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.status === 200) {
                toast.success("Employment Data Updated");
                closeEditEmployment();
                dispatch(GetFreelancerSelfProfileAction(accessToken));
            } else {
                console.log(response.data.message || 'Error updating the employment');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const[cate] = useState(DesignationList)

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto mt-14">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg w-[90%] md:w-[61%] p-6 px-8 relative z-20">
                    <div className="flex justify-between items-center">
                        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Edit Employment</h1>
                        <button onClick={closeEditEmployment} className="text-gray-500 hover:text-gray-700">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className='mt-10'>
                        <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Company Name</h1>
                        <input type="text" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Ex: Wiz91' onChange={e => setCompanyname(e.target.value)} name='Freelancer_Company_Name' value={companyname}/>
                        <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Designation</h1>
                        {/* <input type="text" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Python Developer' onChange={e => setDesignation(e.target.value)} name='Company_Designation' value={designation}/> */}
                        <select onChange={e => setDesignation(e.target.value)} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white' name='Company_Designation' value={designation}>
                    <option disabled selected value="">Select a Role</option>
                    {cate.map((cat, index) => (
                        <option value={cat}>{cat}</option>
                    ))}
                </select>
                        <div className="flex items-center justify-between">
                            <div className="flex-1 mr-2">
                                <p className="font-cardo text-[18px] text-[#031136] font-normal text-left opacity-50">From</p>
                                <input 
                                    type="date" 
                                    className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
                                    placeholder='Start Date'
                                    name='Company_Joining_date'
                                    value={formatToYYYYMMDD(joindate)}
                                    onChange={e => setJoindate(formatToDDMMYYYY(e.target.value))}
                                />
                            </div>
                            <div className="flex-1 ml-2">
                                <p className="font-cardo text-[18px] text-[#031136] font-normal text-left opacity-50">To</p>
                                <input 
                                    type="date" 
                                    className={`border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 ${isCurrentlyWorking ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                                    placeholder='End Date'
                                    name='Company_Leaving_date'
                                    disabled={isCurrentlyWorking}
                                    value={formatToYYYYMMDD(leavedate)}
                                    onChange={e => setLeavedate(formatToDDMMYYYY(e.target.value))}
                                />
                            </div>
                        </div>

                        <label className="flex items-center font-inter relative cursor-pointer mb-4">
                            <input
                                className="hidden"
                                type="checkbox"
                                onChange={() => setIsCurrentlyWorking(!isCurrentlyWorking)}
                                checked={isCurrentlyWorking}
                            />
                            <div className="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                                <span className="checkmark hidden"><i className="bi bi-check-lg pr-2 pt-2"></i></span>
                            </div>
                            <span className="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                            <span className="font-normal opacity-50">I Currently Work Here</span>
                        </label>
                        <div className="mt-8 flex justify-end">
                            <Link to='' onClick={handleSave}><span className="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                            <div className="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeEditEmployment}>
                                <Link to=''><button className="px-2 py-1 bg-white"><p className="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmploymentPopup
