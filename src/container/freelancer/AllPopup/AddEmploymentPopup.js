import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { AddFreelancerEmploymentAction } from '../../../redux/Freelancer/FreelancerAction';
import CategoryList from '../../freelancer/AllSelectionData/CategoryList';
import DesignationList from '../AllSelectionData/DesignationList';

const AddEmploymentPopup = ({ closeAddEmployment }) => {

    const [AddEmployment, setAddEmployment] = useState('');
    

    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const addemp = useSelector(state => state.freelancer.addemp);
    const dispatch = useDispatch();

    const AddEmploymentData = () => {
        const formData = new URLSearchParams();
        formData.append("Freelancer_Company_Name", AddEmployment.Freelancer_Company_Name);
        formData.append("Company_Designation", AddEmployment.Company_Designation);
        formData.append("Company_Joining_date", AddEmployment.Company_Joining_date);
        formData.append("Company_Leaving_date", AddEmployment.Company_Leaving_date);


        const empdata = {
            "Freelancer_Company_Name": AddEmployment.Freelancer_Company_Name,
            "Company_Designation":AddEmployment.Company_Designation,
            "Company_Joining_date":AddEmployment.Company_Joining_date,
            "Company_Leaving_date":AddEmployment.Company_Leaving_date,
        }
      
        dispatch(AddFreelancerEmploymentAction(empdata, accessToken));
        closeAddEmployment();
      };

      const onChange = e => {
        let value = e.target.value;
    
        if(e.target.name === 'Company_Joining_date') {
            value = formatToDDMMYYYY(value);
        }
        if(e.target.name === 'Company_Leaving_date') {
            value = formatToDDMMYYYY(value);
        }
    
        setAddEmployment(prevEmployment => ({
            ...prevEmployment,
            [e.target.name]: value
        }));
    };


    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(true);

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

    const[cate] = useState(DesignationList)
    console.log(cate,"category")

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-14">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg w-[90%] md:w-[61%] p-6 px-8 relative z-20">
    <div className="flex justify-between items-center">
        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Add Employment</h1>
        <button onClick={closeAddEmployment} className="text-gray-500 hover:text-gray-700">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
    <div className='mt-10'>
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Company Name</h1>
            <input type="text" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Ex: Wiz91' onChange={onChange} name='Freelancer_Company_Name'/>
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Designation</h1>
            {/* <input type="text" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Python Developer' onChange={onChange} name='Company_Designation'/> */}
            <select onChange={onChange} className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white' name='Company_Designation'>
                    {/* <option disabled selected value="">Role</option> */}
                    <option disabled selected value="">Select a Role</option>
                    {cate.map((cat, index) => (
                        <option value={cat}>{cat}</option>
                    ))}
                    {/* <option value="">Select an address</option>
                    <option value="Indore">Indore</option>
                    <option value="Ujjain">Ujjain</option>
                    <option value="Bhopal">Bhopal</option> */}
                </select>
            <div className="flex items-center justify-between">
    <div className="flex-1 mr-2">
        <p className="font-cardo text-[18px] text-[#031136] font-normal text-left opacity-50">From</p>
        <input 
            type="date" 
            className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
            placeholder='Start Date'
            onChange={onChange}
            name='Company_Joining_date'
        />
    </div>
    {/* <div className="flex-1 ml-2">
        <p className="font-cardo text-[18px] text-[#031136] font-normal text-left opacity-50">To</p>
        <input 
            type="date" 
            className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
            placeholder='End Date'
        />
    </div> */}
    <div className="flex-1 ml-2">
    <p className="font-cardo text-[18px] text-[#031136] font-normal text-left opacity-50">To</p>
    <input 
        type="date" 
        className={`border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 ${isCurrentlyWorking ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
        placeholder='End Date'
        onChange={onChange}
        name='Company_Leaving_date'
        disabled={isCurrentlyWorking}
    />
</div>

</div>


<label class="flex items-center font-inter relative cursor-pointer mb-4">
                <input class="hidden" type="checkbox"  defaultChecked={true}
    onChange={() => setIsCurrentlyWorking(prev => !prev)}  />
                <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                  
                    <span class="checkmark hidden"><i class="bi bi-check-lg pr-2 pt-2"></i></span>
                </div>
                     <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                <span class="font-normal opacity-50">I Currently Work Here</span>
            </label>
            <div className="mt-8 flex justify-end">
            <Link to='' onClick={AddEmploymentData}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Add</span></Link>
            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeAddEmployment}>
                <Link to=''><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
            </div>     
            </div>
            </div>
</div>
    </div>
</div>
  )
}

export default AddEmploymentPopup