import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetFreelancerSelfProfileAction, UpdateFreelancerProfileAction } from '../../../redux/Freelancer/FreelancerAction';

const EditExperienceLevelPopup = ({ closeExperienceLevel }) => {

//   const accessToken = useSelector(state => state.login.accessToken);  
const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');

  const [experiencelevel, setexperiencelevel] = useState(""); 
  const dispatch = useDispatch();
  const freelancerselfprofile = useSelector(state => state.freelancer.freelancerselfprofile)
  useEffect(() => {
      if (freelancerselfprofile && freelancerselfprofile[0]) {
          setexperiencelevel(freelancerselfprofile[0].experience_level);
      }
  }, [freelancerselfprofile]);

  const handleSave = () => {
      dispatch(UpdateFreelancerProfileAction({ experience_level:experiencelevel },accessToken));
      closeExperienceLevel();
      dispatch(GetFreelancerSelfProfileAction(accessToken));
  }



  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-8">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg w-[90%] md:w-[53%] p-6 px-8 relative z-20">
    <div className="flex justify-between items-center">
        <h1 className="font-cardo text-[26px] text-[#031136] font-normal">{experiencelevel && experiencelevel.length > 0 ? 'Edit Experience Level' : 'Add Experience Level'}</h1>
        <button onClick={closeExperienceLevel} className="text-gray-500 hover:text-gray-700">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
    <div className='mt-10'>
            {/* <input type="text" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' value={experiencelevel} onChange={e => setexperiencelevel(e.target.value)}/> */}
            <select className="border mt-2 mb-6 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white opacity-50" value={experiencelevel} onChange={e => setexperiencelevel(e.target.value)}>
            <option value="Entry_Level">Entry Level</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
        </select>
            <div className="mt-8 flex justify-end">
            <Link to='' onClick={handleSave}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeExperienceLevel}>
                <Link to=''><button class="px-2 py-1 bg-white"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
            </div>     
            </div>
            </div>
</div>
    </div>
</div>
  )
}

export default EditExperienceLevelPopup