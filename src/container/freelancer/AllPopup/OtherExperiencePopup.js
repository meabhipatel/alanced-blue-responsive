import React from 'react'
import { Link } from 'react-router-dom'

const OtherExperiencePopup = ({ closeOtherExp }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-14">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
    <div className="flex justify-between items-center">
        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Add Other Experiences</h1>
        <button onClick={closeOtherExp} className="text-gray-500 hover:text-gray-700">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
    <div className='mt-10'>
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Subject</h1>
            <input type="text" className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'/>
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left mt-5">Description</h1>
            <textarea name="" id="" cols="30" rows="5" className='border my-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'></textarea>
            <div className="mt-8 flex justify-end">
            <Link to=''><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeOtherExp}>
                <Link to=''><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
            </div>     
            </div>
            </div>
</div>
    </div>
</div>
  )
}

export default OtherExperiencePopup