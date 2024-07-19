import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { HirerUpdateAction, GetHirerSelfProfileAction } from '../../../redux/Hirer/HirerAction';
import CityList from '../../freelancer/AllSelectionData/CityList';


const HirerContactPopup = ({ handleContactsClose }) => {

    const dispatch = useDispatch()
    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const hirerselfprofile = useSelector(state => state.hirer.hirerselfprofile)
    var hirerData = useState(null)
    if(hirerselfprofile != null){
        hirerData = hirerselfprofile
        console.log("hirer profile data on AccountPopup page : ",hirerData)
    }

    const [contact, setcontact] = useState('')
    const [Address, setAddress] = useState('')

    const handleSave = () => {
        dispatch(HirerUpdateAction({
            contact: contact,
            Address: Address,
        }, accessToken));
        handleContactsClose();
        dispatch(GetHirerSelfProfileAction(accessToken))
    }

    const[city] = useState(CityList)
    console.log(city,"city")

    return(
        <>
        <div className="fixed z-10 inset-0 overflow-y-auto mt-10">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white rounded-lg w-[90%] md:w-[36%] p-4 relative z-20">
                            <div className="text-right">
                                <button onClick={handleContactsClose} className="text-gray-500 hover:text-gray-700">
                                <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className='mx-8'>
                            <h1 className="font-cardo text-[21px] text-[#031136] font-normal text-left">Edit Company Contacts</h1>
                            <div className="flex flex-col items-center mt-4 mb-2">
                    <div className='flex gap-5 w-full'>
                    {/* <div className='flex flex-col w-full'>
                    <span className='text-left'>Owner</span>
                    <input type="text" defaultValue={'sachin'} disabled='true' className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder=''/>
                    </div> */}
                    <div className='flex flex-col w-full'>
                    <span className='text-left'>Phone</span>
                    <input type="tel" defaultValue={hirerData.contact} onChange={e => {setcontact(e.target.value)}} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder=''/>
                    </div>
                    </div>
                    <div className='flex flex-col w-full'>
                    <span className='text-left'>Address</span>
                    {/* <input type="text" defaultValue={hirerData.Address} onChange={e => {setAddress(e.target.value)}} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder=''/> */}
                    <select defaultValue={hirerData.Address} onChange={e => setAddress(e.target.value)} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'>
                    <option disabled selected value="">City</option>
                    {city.map((location, index) => (
                        <option value={location}>{location}</option>
                    ))}
                    {/* <option value="">Select an address</option>
                    <option value="Indore">Indore</option>
                    <option value="Ujjain">Ujjain</option>
                    <option value="Bhopal">Bhopal</option> */}
                </select>
                    </div>
                        </div>
                        
                            <div className="mt-8 flex justify-end">
                            <Link to='' onClick={handleSave}><span class="inline-block text-sm px-6 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold">Save</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]">
                                <Link to=''><button class="px-2 py-1 bg-white rounded-sm" onClick={handleContactsClose}><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                            </div>     
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default HirerContactPopup