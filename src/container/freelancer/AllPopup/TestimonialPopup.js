import React from 'react'
import { Link } from 'react-router-dom'
import testimonial from '../../../components/images/testimonial.png'

const TestimonialPopup = ({ closeTestimonial }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-24">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg w-[90%] md:w-[65%] p-6 px-8 relative z-20">
                    <div className="flex justify-between items-center">
                        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Request a client testimonial </h1>
                        <button onClick={closeTestimonial} className="text-gray-500 hover:text-gray-700">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className='mt-8'>
                    <div class="flex gap-3">
                    <div class="flex-none w-2/6 bg-[#E4EBE4] py-3 rounded-md px-6">
                    <img src={testimonial} alt="" className='mx-auto mt-5'/>
                    <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left py-8">Strengthen your profile with client testimonials</h1>
                    <p className="font-cardo text-[16px] text-[#031136] font-normal text-left py-1"><i class="bi bi-check-circle mr-1 text-blue-500"></i> Highlight external client achievements.</p>
                           <p className="font-cardo text-[16px] text-[#031136] font-normal text-left py-1"><i class="bi bi-check-circle mr-1 text-blue-500"></i> Clients receive testimonial instructions.</p>
                           <p className="font-cardo text-[16px] text-[#031136] font-normal text-left py-1"><i class="bi bi-check-circle mr-1 text-blue-500"></i> Verified testimonials appear on your Alanced profile.</p>
                           <p className="font-cardo text-[16px] text-[#031136] font-normal text-left py-1"><i class="bi bi-check-circle mr-1 text-blue-500"></i> Showcase expertise with real-world feedback.</p>
                           <p className="font-cardo text-[16px] text-[#031136] font-normal text-left py-1"><i class="bi bi-check-circle mr-1 text-blue-500"></i> Build trust with potential clients faster.</p>
                    </div>
                    <div class="flex-grow p-4 w-4/6">
                    <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Add your client’s contact details</h1>
                    <div className="flex justify-between space-x-6 mt-4"> 
           <div className="flex-1">
           <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">First Name</h1>
         <input type="text" className='border mt-1 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='First Name'/>
    </div>
    <div className="flex-1">
    <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">Last Name</h1>
        <input type="text" className='border mt-1 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Last Name'/>
    </div>
</div>
<div className="flex justify-between space-x-6"> 
           <div className="flex-1">
           <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">Business Email Address</h1>
         <input type="text" className='border mt-1 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='example@gmail.com'/>
    </div>
    <div className="flex-1">
    <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">Client's LinkedIn Profile</h1>
        <input type="text" className='border mt-1 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='https://www.linkedin.com/in/your-name-here/
'/>
    </div>
</div>
<div className="flex justify-between space-x-6"> 
           <div className="flex-1">
           <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">Client's Title</h1>
         <input type="text" className='border mt-1 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Ex: Director of Development'/>
    </div>
    <div className="flex-1">
    <h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">Project Type</h1>
        <input type="text" className='border mt-1 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Ex: Web Development'/>
    </div>
</div>
<h1 className="font-cardo text-[18px] text-[#031136] font-normal text-left">Message to Client</h1>
<textarea name="" id="" cols="30" rows="3" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder="Hi, I enjoyed our recent collaboration! Could you provide a short testimonial about my work for my Alanced profile? It'd greatly support my freelancing journey. Thanks!"></textarea>
                            <div className="mt-5 flex justify-end">
                            <Link to=''><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold" >Request Testimonial</span></Link>
                            </div>
                    </div>
                    </div>

                           
                            </div>
                </div>
                    </div>
                </div>
  )
}

export default TestimonialPopup