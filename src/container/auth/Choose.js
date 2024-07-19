import React, { useState } from 'react'
import chooseoption from '../../components/images/chooseoption.png'
import { Link } from 'react-router-dom'
import client from '../../components/images/client.png';
import freelancer from '../../components/images/freelancer.png';
import logo from '../../components/images/Alanced.png'

const Choose = () => {
  
  const [selectedOption, setSelectedOption] = useState('client');


  return (
    <div className="h-screen flex items-center justify-center relative" style={{ 
        backgroundImage: `url(${chooseoption})`,
        backgroundSize: '850px 550px',  
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}>
   <Link to='/' onClick={() => {window.scrollTo(0, 0);}}>
    <div className="absolute lg:rounded-tr lg:rounded-br lg:rounded-tl-none lg:rounded-bl-none top-[50px] left-1/2 sm:left-1/4 md:left-[331.2px] transform -translate-x-1/2 flex items-center space-x-2 lg:bg-white bg-[#E2F9EE] p-3">
        <img src={logo} alt="Logo" className="h-5 w-5 md:h-6 md:w-6" /> 
        <span className="font-semibold text-[15px] tracking-widest ml-2 font-poppins text-[#031136] md:text-[16px]">ALANCED</span>
    </div> 
</Link>
   <div class="bg-white shadow-lg p-10 pt-8 lg:w-[550px] lg:h-[340px] h-[460px] w-[350px] max-w-2xl flex flex-col items-center border border-blue-300">
    <h3 className='text-center font-cardo mb-8 text-xl'>Join As A Client or Freelancer</h3>

<div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full mb-8">
    <div 
        class={`flex sm:block items-center w-full sm:flex-1 p-6 border-2 ${selectedOption === 'client' ? 'border-blue-600' : ''} hover:border-blue-600 hover:shadow-md cursor-pointer h-[120px] sm:h-auto`}
        onClick={() => setSelectedOption('client')}
    >
        <img src={client} alt="" className='h-[50px] sm:-mt-3 mr-4 sm:mr-0'/>
        <h5 className='text-left font-cardo text-[16px] lg:py-1'>I’m A Client, Hiring 
For A Project</h5>
    </div>

    <div 
        class={`flex sm:block items-center w-full sm:flex-1 p-6 border-2 ${selectedOption === 'freelancer' ? 'border-blue-600' : ''} hover:border-blue-600 hover:shadow-md cursor-pointer h-[120px] sm:h-auto`}
        onClick={() => setSelectedOption('freelancer')}
    >
        <img src={freelancer} alt="" className='h-[50px] sm:-mt-3 mr-4 sm:mr-0'/>
        <h5 className='text-left font-cardo text-[16px] lg:py-1'>I’m A Freelancer, Looking
For Work</h5>
    </div>
</div>


   {selectedOption === 'freelancer' ?  <Link to='/freelancer/registration'><button 
        class="block w-[320px] px-4 py-2 -mt-2 text-sm leading-5 text-center transition-colors duration-150 border border-none rounded-lg  focus:outline-none focus:shadow-outline-blue bg-gradient-to-r from-[#0909E9] to-[#00D4FF]  text-white font-semibold">
       {selectedOption === 'client' ? 'Join as a Client' :'Join as a Freelancer'}
    </button></Link> :  <Link to='/hirer/registration'><button 
        class="block w-[320px] px-4 py-2 -mt-2 text-sm leading-5 text-center transition-colors duration-150 border border-none rounded-lg  focus:outline-none focus:shadow-outline-blue bg-gradient-to-r from-[#0909E9] to-[#00D4FF]  text-white font-semibold">
       {selectedOption === 'client' ? 'Join as a Client' :'Join as a Freelancer'}
    </button></Link> }
    <p className="text-xs pt-2.5 font-inter">Already have an account? <Link to='/login'><span className="text-yellow-400">Log In</span></Link></p>
</div>


</div>
  )
}

export default Choose