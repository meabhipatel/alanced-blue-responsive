import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { GetFreelancerSelfProfileAction, UpdateFreelancerProfileAction } from '../../../redux/Freelancer/FreelancerAction';
import CityList from '../AllSelectionData/CityList';

const AvailableOffPopup = ({ isAvailable,setIsAvailable,closeAvailableOff }) => {

    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');  
    const dispatch = useDispatch();
    const freelancerselfprofile = useSelector(state => state.freelancer.freelancerselfprofile);

    const [localAvailability, setLocalAvailability] = useState(isAvailable);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (freelancerselfprofile && freelancerselfprofile[0]) {
            setFirstName(freelancerselfprofile[0].first_Name);
            setLastName(freelancerselfprofile[0].last_Name);
            setAddress(freelancerselfprofile[0].Address);
        }
    }, [freelancerselfprofile]);

    const handleSave = () => {
        setIsAvailable(localAvailability);
        dispatch(UpdateFreelancerProfileAction({
            first_Name: firstName,
            last_Name: lastName,
            Address: address,
            availableStatus: localAvailability
        }, accessToken));
        closeAvailableOff();
        dispatch(GetFreelancerSelfProfileAction(accessToken));
    }

    // const [cities] = useState([
    //     'Indore','Ujjain','Bhopal','Delhi','Gujarat','Pune','Surat','Punjab','Mumbai','Bombay','Bengaluru','Kolkata','Chennai','Hyderabad','Ahmedabad','Jaipur'
    //   ]);

    const [cities] = useState(CityList.sort())
    
      const [searchTermAddress, setSearchTermAddress] = useState(address || "");
      const [isOpenAddress, setIsOpenAddress] = useState(false);
      const wrapperRefAddress = useRef(null);
    
      const filteredCities = cities.filter(
        city => city.toLowerCase().includes(searchTermAddress.toLowerCase())
      );
    
      const handleClickOutsideAddress = (event) => {
        if (wrapperRefAddress.current && !wrapperRefAddress.current.contains(event.target)) {
          setIsOpenAddress(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideAddress);
        return () => {
          document.removeEventListener('mousedown', handleClickOutsideAddress);
        };
      }, []);
    

    // const [localAvailability, setLocalAvailability] = useState(isAvailable);
    // const handleSave = () => {
    //   setIsAvailable(localAvailability);
    //   closeAvailableOff(); 
    // }

  return (
    <>
     <style>
    {`
    .dropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 86%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
    }
    
    .dropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .dropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}
</style>
            <div className="fixed z-10 inset-0 overflow-y-auto mt-10">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg w-[90%] md:w-[37%] p-6 px-8 relative z-20">
            <div className="flex justify-between items-center">
                <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Edit Profile</h1>
                <button onClick={closeAvailableOff} className="text-gray-500 hover:text-gray-700">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div className='mt-10'>
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">First Name</h1>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='John'/>

            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Last Name</h1>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Doe'/>

            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Location</h1>
            {/* <input type="text" value={address} onChange={e => setAddress(e.target.value)} className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='123 Elm St, Springfield'/> */}
            <div ref={wrapperRefAddress}>
      <input 
        type="text" 
        value={address} 
        onClick={() => setIsOpenAddress(!isOpenAddress)} 
        onChange={e => {
            setSearchTermAddress(e.target.value);
            setAddress(e.target.value);
            setIsOpenAddress(true);
        }} 
        className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
        placeholder="Select City" 
      />
      {isOpenAddress && (
        <ul className="dropdown-list">
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
                <li 
                    key={index} 
                    onClick={() => {
                        setSearchTermAddress(city);
                        setAddress(city);
                        setIsOpenAddress(false);
                    }}
                >
                    {city}
                </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      )}
    </div>
  
            <div className="flex justify-start items-center space-x-4 gap-6 mt-3"> 
            <label className="flex items-center">
                <input type="radio" name="option" value="available" checked={localAvailability === 'available'} 
                onChange={() => setLocalAvailability('available')}  className="mr-2 cursor-pointer"/>
                Available Now
            </label>
            <label className="flex items-center">
                <input type="radio" name="option" value="off" checked={localAvailability === 'off'} 
                onChange={() => setLocalAvailability('off')} className="mr-2 cursor-pointer"/>
                Off
            </label>
            </div>


            <div className="mt-8 flex justify-end">
            <Link to=''><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" onClick={handleSave}>Save</span></Link>
            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeAvailableOff}>
                <Link to=''><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
            </div>     
            </div>
            </div>
            </div>
                </div>
            </div>
            </>
  )
}

export default AvailableOffPopup