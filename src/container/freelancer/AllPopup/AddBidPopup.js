import React from 'react'
import { Link } from 'react-router-dom';
import dollar from '../../../components/images/dollarshiedl.png'

const AddBidPopup = ({ isOpen, onClose }) => {
    
    if (!isOpen) {
        return null; 
      }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 mt-20">
        <div className="fixed inset-0 bg-black opacity-10"></div>
      {/* Dialog content goes here */}
      <div className="bg-white p-5 pt-2 rounded-lg shadow-xl w-2/4 h-[90%] z-20">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
       <div className=' flex flex-row mt-1'>
        <div className=' basis-8/12'>
            <h1 className=' text-3xl font-cardo font-semibold text-left'>Shopping Website</h1>
            <div className=' flex flex-row'>
                <div className=' basis-3/12 mt-5'><button type="button" class="focus:outline-none  bg-[#dffdee] hover:bg-[#dffdee]  rounded-xl text-sm font-semibold text-blue-900 px-3 py-[3px] dark:bg-[#dffdee] dark:hover:bg-[#dffdee]">Open</button></div>
                <div className=' basis-5/12 mt-5'><p className=' text-base font-normal font-inter'>Posted 22 hours ago</p></div>
                <div className=' basis-4/12 mt-5'><p className=' text-base font-normal font-inter'>Ends in 6 days</p></div>
            </div>
        </div>
        <div className=' basis-4/12'>
            <p className=' text-3xl font-cardo font-bold'>$15-25</p>
        </div>
       </div>
        <p className='font-inter text-[15px] font-normal text-[#797979] mt-3 text-left'>The primary goal of an online shopping site is to sell goods and services online. This project deals with developing an e- commerce website for online shopping. It provides the user with a catalogue of different goods and services available for purchase in the store.</p>
        <div className="text-left">
        <div className="mt-3 mr-3 bg-none inline-block opacity-60 rounded p-0 w-24 border border-black border-opacity-20">
            <p className=" text-center">Python</p>
        </div>
        <div className="mt-3 bg-none inline-block opacity-60 rounded p-0 w-24 border border-black border-opacity-20">
            <p className="text-center">React</p>
        </div>
        </div>
        <p className=' font-inter text-base font-semibold text-left mt-4 opacity-60'>Place Your Bid</p>
        <div className=' flex flex-row'>
        <div className=' basis-6/12'>
        <div class=" relative mt-4 mb-6">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <i class="bi bi-currency-dollar"></i></div>
        <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bid Amount"/>
        </div>
        <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"><i class="bi bi-text-paragraph"></i>
        </span>
        <input type="text" id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"/>
        </div>
        <div className=''>
        <button className='rounded h-10 w-80 text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF] mt-5 text-sm font-bold' onClick={onClose}>Send Proposal</button>
        </div>
        </div>
        <div className=' basis-6/12'>
            <img src={dollar} alt="" className=' h-52 w-52 mx-auto' />
        </div>
        </div>
      </div>
    </div>
  )
}

export default AddBidPopup
