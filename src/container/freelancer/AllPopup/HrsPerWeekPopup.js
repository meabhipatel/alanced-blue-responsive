import React from 'react'
import { Link } from 'react-router-dom'

const HrsPerWeekPopup = ({ closeHrsperWeek }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-28">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
    <div className="flex justify-between items-center">
        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Availability</h1>
        <button onClick={closeHrsperWeek} className="text-gray-500 hover:text-gray-700">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
    <div className='mt-10'>
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Hours per week</h1>
            <p className="font-inter text-[14px] text-[#031136] font-normal text-left opacity-50 py-6">Knowing how much you can work helps Alanced find the right jobs for you. </p>
            <p className="font-inter text-[16px] text-[#031136] text-left font-semibold">I can currently work</p>
            <div className="flex flex-col space-y-4 mt-4">
            <label className="flex items-center">
                <input type="radio" name="option" value="option1" className="mr-2 cursor-pointer"/>
                More than 30 hrs/week
            </label>

            <label className="flex items-center">
                <input type="radio" name="option" value="option2" className="mr-2 cursor-pointer"/>
                Less than 30 hrs/week
            </label>

            <label className="flex items-center">
                <input type="radio" name="option" value="option3" className="mr-2 cursor-pointer"/>
                As needed - open to offers
            </label>

            <label className="flex items-center">
                <input type="radio" name="option" value="option4" className="mr-2 cursor-pointer"/>
                None
            </label>
            </div>
            <p className="font-inter text-[16px] text-[#031136] text-left font-semibold py-8">Contract-to-hire</p>
            <label class="flex items-center font-inter relative cursor-pointer">
                <input class="hidden" type="checkbox" />
                <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                  
                    <span class="checkmark hidden"><i class="bi bi-check-lg pr-2 pt-2"></i></span>
                </div>
                     <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                <span class="font-normal">I'm open to contract-to-hire opportunities</span>
            </label>
            <p className="font-inter text-[14px] text-[#031136] font-normal text-left opacity-50 py-3">This means you'll start with a contract and may later explore a full-time option</p>
            <div className="mt-8 flex justify-end">
            <Link to=''><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeHrsperWeek}>
                <Link to=''><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
            </div>     
            </div>
            </div>
</div>
    </div>
</div>
  )
}

export default HrsPerWeekPopup