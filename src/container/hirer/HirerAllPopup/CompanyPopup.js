import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { HirerUpdateAction, GetHirerSelfProfileAction } from '../../../redux/Hirer/HirerAction';

const HirerCompanyPopup = ({ handleDetailsClose }) => {

    const dispatch = useDispatch()
    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const hirerselfprofile = useSelector(state => state.hirer.hirerselfprofile)
    var hirerData = useState(null)
    if(hirerselfprofile != null){
        hirerData = hirerselfprofile
        console.log("hirer profile data on AccountPopup page : ",hirerData)
    }

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
    
    const [Company_Name, setCompany_Name] = useState("")
    const [Company_Establish, setCompany_Establish] = useState("")
    const [social_media, setsocial_media] = useState("")

    const handleSave = () => {
        dispatch(HirerUpdateAction({
            Company_Name: Company_Name,
            Company_Establish: Company_Establish,
            social_media: social_media,
        }, accessToken));
        handleDetailsClose();
        dispatch(GetHirerSelfProfileAction(accessToken))
    }

    return(
        <>
        <div className="fixed z-10 inset-0 overflow-y-auto mt-10">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 relative z-20">
                            <div className="text-right">
                                <button onClick={handleDetailsClose} className="text-gray-500 hover:text-gray-700">
                                <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className='mx-8'>
                            <h1 className="font-cardo text-[21px] text-[#031136] font-normal text-left">Edit Company Details</h1>
                            <div className="flex flex-col items-center mt-4 mb-2">
                    <div className='flex gap-5 w-full'>
                    <div className='flex flex-col w-full'>
                    <span className='text-left'>Company Name</span>
                    <input type="text" defaultValue={hirerData.Company_Name} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' onChange={e => {setCompany_Name(e.target.value)}} placeholder=''/>
                    </div>
                    <div className='flex flex-col w-full'>
                    <span className='text-left'>Establish</span>
                    <input type="date" defaultValue={hirerData.Company_Establish} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' onChange={e => {setCompany_Establish(formatToYYYYMMDD(e.target.value))}} placeholder=''/>
                    </div>
                    </div>
                    <div className='flex flex-col w-full'>
                    <span className='text-left'>Website</span>
                    <input type="text" defaultValue={hirerData.social_media} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' onChange={e => {setsocial_media(e.target.value)}} placeholder=''/>
                    </div>
                    
                        </div>
                        
                            <div className="mt-8 flex justify-end">
                            <Link to='' onClick={handleSave}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold">Save</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]">
                                <Link to=''><button class="px-2 py-1 bg-white rounded-sm" onClick={handleDetailsClose}><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                            </div>     
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default HirerCompanyPopup