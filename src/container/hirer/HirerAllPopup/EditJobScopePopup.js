import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const EditJobScopePopup = ({closeJobScope,project}) => {

    const formatToYYYYMMDD = (dateStr) => {
        if(!dateStr) return '';
        const [day, month, year] = dateStr.split("-");
        return `${year}-${month}-${day}`;
    }
    
    const formatToDDMMYYYY = (dateStr) => {
        if(!dateStr) return '';
        const [year, month, day] = dateStr.split("-");
        return `${day}-${month}-${year}`;
    }

    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const [jobexplevel, setJobexplevel] = useState(project.experience_level);
    const [jobDeadline, setJobDeadline] = useState(formatToYYYYMMDD(project.deadline));
    const dispatch = useDispatch();
    const id = project.id;

    const handleSave = async () => {
        try {
            const response = await axios.put(`https://www.api.alanced.com/freelance/update/project/${id}`, {
                experience_level: jobexplevel,
                deadline:jobDeadline
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.status === 200) {
                toast.success("Job Data updated Successfully")
                closeJobScope();
            } else {
                console.log(response.data.message || 'Error updating the job data');
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
                          <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Edit Scope</h1>
                          <button onClick={closeJobScope} className="text-gray-500 hover:text-gray-700">
                              <i class="bi bi-x-lg"></i>
                          </button>
                      </div>
                      <div className='mt-8'>
                              <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Deadline</h1>
                              <input 
    type="date" 
    className='border my-3 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
    placeholder='' 
    value={formatToYYYYMMDD(jobDeadline)} 
    onChange={e => setJobDeadline(formatToDDMMYYYY(e.target.value))}
/>

                        <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Experience Level</h1>
                        <select className="border mt-2 mb-6 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white opacity-50" value={jobexplevel} 
                        onChange={e => setJobexplevel(e.target.value)} >
                        <option value="Entry_Level">Entry Level</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                       </select>
                              <div className="mt-8 flex justify-end">
                              <Link to='' onClick={handleSave}  state={{project}}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                              <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeJobScope}>
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

export default EditJobScopePopup