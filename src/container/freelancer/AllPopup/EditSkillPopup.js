import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { GetFreelancerSelfProfileAction, UpdateFreelancerProfileAction } from '../../../redux/Freelancer/FreelancerAction';
import SkillsList from '../AllSelectionData/SkillsList';

const EditSkillPopup = ({ closeEditSkill }) => {


  const freelancerselfprofile = useSelector(state => state.freelancer.freelancerselfprofile);
//   const accessToken = useSelector(state => state.login.accessToken); 
const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
  const dispatch = useDispatch();

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile[0] && freelancerselfprofile[0].skills) {
      setSkills(JSON.parse(freelancerselfprofile[0].skills.replace(/'/g, '"')));
    }
  }, [freelancerselfprofile]);

  // const addSkill = () => {
  //   if (currentSkill.trim() && skills.length < 15) {
  //     setSkills(prevSkills => [...prevSkills, currentSkill.trim()]);
  //     setCurrentSkill('');
  //     setError('');
  //   } else if (skills.length >= 15) {
  //     setError('You can add a maximum of 15 skills.');
  //   }
  // };

  const removeSkill = (index) => {
    setSkills(prevSkills => prevSkills.filter((_, idx) => idx !== index));
    setError('');
  };

  const formatSkillsForDispatch = (skillsArray) => {
    const formatted = {};
    skillsArray.forEach((skill, index) => {
      formatted[`skills[${index}]`] = skill;
    });
    return formatted;
  };

  const handleSave = () => {
    const formattedSkills = formatSkillsForDispatch(skills);
    dispatch(UpdateFreelancerProfileAction(formattedSkills, accessToken));
    closeEditSkill();
    dispatch(GetFreelancerSelfProfileAction(accessToken));
  };


//   const allSkills = [
//     'React','Angular','Vue','JavaScript','Python','Java','Ruby','C','C++','MongoDB','SQL','Postgresql','DBMS','Oracle','Django','HTML','CSS','Jquery','Bootstrap','Tailwind CSS','Wordpress','Shopify','Magento','Flutter','DRF','RestAPI'
// ];

const allSkills = SkillsList.sort();

const [searchTermSkill, setSearchTermSkill] = useState(''); 
const [isOpenSkill, setIsOpenSkill] = useState(false);
const wrapperRefSkill = useRef(null);

const filteredSkills = allSkills.filter(
    skill => skill.toLowerCase().includes(searchTermSkill.toLowerCase()) && !skills.includes(skill)
);

const handleClickOutsideSkill = (event) => {
    if (wrapperRefSkill.current && !wrapperRefSkill.current.contains(event.target)) {
        setIsOpenSkill(false);
    }
};

useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideSkill);
    return () => {
        document.removeEventListener('mousedown', handleClickOutsideSkill);
    };
}, []);

  return (
    <>
      <style>
    {`
    .dropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 100%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
        margin-top:11px;
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
        <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 px-8 relative z-20">
            <div className="flex justify-between items-center">
            <h1 className="font-cardo text-[26px] text-[#031136] font-normal">
    {skills && skills.length > 0 ? 'Edit Skills' : 'Add Skills'}
</h1>

                <button onClick={closeEditSkill} className="text-gray-500 hover:text-gray-700">
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="mt-10">
                <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Skills</h1>
                <div className="border rounded-md p-2 flex items-center flex-wrap my-3">
    {Array.isArray(skills) && skills.map((skill, index) => (
        <div key={index} className="bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border-none text-white font-semibold rounded px-2 py-1.5 mr-3 my-2 flex items-center">
            <span>{skill}</span>
            <button onClick={() => removeSkill(index)} className="ml-2 mt-1 pb-0.5 text-sm bg-white text-blue-500 rounded-full w-4 h-4 flex justify-center items-center">
                &times;
            </button>
        </div>
    ))}
    <div ref={wrapperRefSkill} className="relative w-full">
        <input 
            type="text" 
            value={searchTermSkill} 
            onClick={() => setIsOpenSkill(!isOpenSkill)} 
            onChange={e => setSearchTermSkill(e.target.value)} 
            className='outline-none w-full'
            placeholder="Search & Select Skills"
        />
        {isOpenSkill && (
            <ul className="dropdown-list w-full">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill, index) => (
                    <li 
                        key={index} 
                        onClick={() => {
                            if (skills.length < 15) {
                                setSkills(prev => [...prev, skill]);
                                setSearchTermSkill('');
                                setIsOpenSkill(false);
                            } else {
                                setError('You can add a maximum of 15 skills.');
                            }
                        }}
                    >
                        {skill}
                    </li>
                ))
                ) : (
                    <li>No results found</li>
                )}
            </ul>
        )}
    </div>
</div>
                {/* <div className="border rounded-md p-2 flex items-center flex-wrap my-3">
    {Array.isArray(skills) && skills.map((skill, index) => (
        <div key={index} className="bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border-none text-white font-semibold rounded px-2 py-1.5 mr-3 my-2 flex items-center">
            <span>{skill}</span>
            <button onClick={() => removeSkill(index)} className="ml-2 mt-1 pb-0.5 text-sm bg-white text-blue-500 rounded-full w-4 h-4 flex justify-center items-center">
                &times;
            </button>
        </div>
    ))}
    <div className="flex items-center relative w-full">
        <input 
            type="text" 
            value={currentSkill} 
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="Enter Skills here"
            className="outline-none w-full"
        />
        <span id="hiddenText" style={{visibility: 'hidden', whiteSpace: 'pre', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)'}}>{currentSkill}</span>
        <button 
            onClick={addSkill} 
            style={{position: 'absolute', left: `${document.getElementById("hiddenText")?.offsetWidth || 0}px`, top: '47%', transform: 'translateY(-50%)'}}
            className={`ml-4 mt-1 pb-0.5 text-sm bg-blue-500 text-white rounded-full w-4 h-4 flex justify-center items-center ${currentSkill.trim() ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        >
            +
        </button>
    </div>
</div> */}

                {/* <div className="border rounded-md p-2 flex items-center flex-wrap my-3">
                    {Array.isArray(skills) && skills.map((skill, index) => (
                        <div key={index} className="bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border-none text-white  font-semibold rounded px-2 py-1.5 mr-3 my-2 flex items-center">
                            <span>{skill}</span>
                            <button onClick={() => removeSkill(index)} className="ml-2 mt-1 pb-0.5 text-sm bg-white text-blue-500 rounded-full w-4 h-4 flex justify-center items-center">
                                &times;
                            </button>
                        </div>
                    ))}
                    <input 
                        type="text" 
                        value={currentSkill} 
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && currentSkill.trim()) {
                                addSkill();
                            }
                        }}
                        placeholder="Enter Skills here"
                        className="outline-none w-full"
                    />
                </div> */}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="mt-8 flex justify-end">
                <Link to="" onClick={handleSave}><span className="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                <div className="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeEditSkill}>
                    <Link to=''><button className="px-2 py-1 bg-white"><p className="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default EditSkillPopup