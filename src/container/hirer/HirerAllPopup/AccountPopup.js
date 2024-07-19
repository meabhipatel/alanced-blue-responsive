import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { HirerUpdateAction, GetHirerSelfProfileAction } from '../../../redux/Hirer/HirerAction';


const HirerAccountPopup = ({ isAvailable,setIsAvailable,handleAccountClose }) => {

    const dispatch = useDispatch()
    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const hirerselfprofile = useSelector(state => state.hirer.hirerselfprofile)
    
    var hirerData = useState(null)
    if(hirerselfprofile != null){
        hirerData = hirerselfprofile
        console.log("hirer profile data on AccountPopup page : ",hirerData)
    }
    
    const [localAvailability, setLocalAvailability] = useState(isAvailable);
    const [first_Name, setfirst_Name] = useState(null)
    const [last_Name, setlast_Name] = useState(null)
    const [email, setemail] = useState(null)

    const handleSave = () => {
        setIsAvailable(localAvailability);
        dispatch(HirerUpdateAction({
            first_Name: first_Name,
            last_Name: last_Name,
            email: email,
            availableStatus: localAvailability
        }, accessToken));
        handleAccountClose();
        dispatch(GetHirerSelfProfileAction(accessToken))
    }


    return(
        <>
        <div className="fixed z-10 inset-0 overflow-y-auto mt-10">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 relative z-20">
                            <div className="text-right">
                                <button onClick={handleAccountClose} className="text-gray-500 hover:text-gray-700">
                                <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className='mx-8'>
                            <h1 className="font-cardo text-[21px] text-[#031136] font-normal text-left">Edit Account</h1>
                            <div className="flex flex-col items-center mt-4 mb-2">
                    <div className='flex gap-5 w-full'>
                    <div className='flex flex-col w-full'>
                    <span className='text-left'>First Name</span>
                    <input type="text" name='first_Name' defaultValue={hirerData.first_Name} onChange={e => {setfirst_Name(e.target.value)}} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder=''/>
                    </div>
                    <div className='flex flex-col w-full'>
                    <span className='text-left'>Last Name</span>
                    <input type="text" name='last_Name' defaultValue={hirerData.last_Name} onChange={e => {setlast_Name(e.target.value)}} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder=''/>
                    </div>
                    </div>
                    <div className='flex flex-col w-full'>
                    <span className='text-left'>Email</span>
                    <input type="text" name='email' defaultValue={hirerData.email} onChange={e => {setemail(e.target.value)}} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder=''/>
                    </div>
                    <div className="flex justify-start items-center space-x-4 gap-6 mt-3 mr-auto"> 
            <label className="flex items-center">
                <input type="radio" name="option" value="available" checked={localAvailability === 'available'} 
                onChange={() => setLocalAvailability('available')} className="mr-2 cursor-pointer"/>
                Available Now
            </label>
            <label className="flex items-center">
                <input type="radio" name="option" value="off" checked={localAvailability === 'off'} 
                onChange={() => setLocalAvailability('off')} className="mr-2 cursor-pointer"/>
                Off
            </label>
            </div>
                        </div>
                        
                            <div className="mt-8 flex justify-end">
                            <Link to='/hirer/profile-edit' onClick={handleSave}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold">Save</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]">
                                <Link to=''><button class="px-2 py-1 bg-white rounded-sm" onClick={handleAccountClose}><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                            </div>     
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default HirerAccountPopup