import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddReviewPopup = ({closeReview,contract}) => {

    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const proid =contract.project_id
    const [ProjectId, setProjectId] = useState(proid);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const id = contract.freelancer_id
    console.log(id,'chkfreelancerrriddddd')
    

    const handleSave = async () => {

        if (!rating || !review) {
            toast.error("Both fields are required");
            return;
        }

        try {
            const response = await axios.post(`https://www.api.alanced.com/freelance/Add/Review/${id}`, {
                projects:ProjectId,
                rating:rating,
                review:review
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.status === 200) {
                toast.success("Review Added Successfully")
                closeReview();
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err.response.data.message);
            toast.error(err.response.data.message);
        }
    };  


  return (
    <>
     <div className="fixed z-10 inset-0 overflow-y-auto mt-16">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
                    <div className="flex justify-between items-center">
                        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Add Review</h1>
                        <button onClick={closeReview} className="text-gray-500 hover:text-gray-700">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className='mt-8'>
                            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Rating <span class="text-red-500">*</span></h1>
                            <select
                            className="w-full border my-2 py-1.5 px-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                            name="rating" value={rating} onChange={e => setRating(e.target.value)} required>
                            <option disabled selected value="">Choose Rating</option>
                            <option value="1.0">1.0</option>
                            <option value="1.5">1.5</option>
                            <option value="2.0">2.0</option>
                            <option value="2.5">2.5</option>
                            <option value="3.0">3.0</option>
                            <option value="3.5">3.5</option>
                            <option value="4.0">4.0</option>
                            <option value="4.5">4.5</option>
                            <option value="5.0">5.0</option>
                            </select>
                            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left pt-5">Review <span class="text-red-500">*</span></h1>
                          <textarea id="" cols="30" rows="5" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' name="review" value={review} onChange={e => setReview(e.target.value)} required></textarea> 
                            <div className="mt-8 flex justify-end">
                            <button onClick={handleSave}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Submit</span></button>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeReview}>
                                <button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button>
                            </div>     
                            </div>
                            </div>
                </div>
                    </div>
                </div>
    </>
  )
}

export default AddReviewPopup