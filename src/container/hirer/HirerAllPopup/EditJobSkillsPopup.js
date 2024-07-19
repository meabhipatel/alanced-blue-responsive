import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SkillsList from '../../freelancer/AllSelectionData/SkillsList';

const EditJobSkillsPopup = ({closeJobSkills,project}) => {

    // const accessToken = useSelector(state => state.login.accessToken); 
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
  
    // const [jobskills, setJobSkills] = useState(project.skills_required);
    const [jobskills, setJobSkills] = useState(() => {
        try {
            return JSON.parse(project.skills_required.replace(/'/g, '"'));
        } catch (error) {
            return [];
        }
    });
    const [currentSkills, setCurrentSkills] = useState('');
    const [error, setError] = useState('');
  
    // useEffect(() => {
    //     setJobSkills(JSON.parse(project.skills_required.replace(/'/g, '"')));
    // }, []);
  
    const addSkill = () => {
      if (currentSkills.trim() && jobskills.length < 15) {
        setJobSkills(prevSkills => [...prevSkills, currentSkills.trim()]);
        setCurrentSkills('');
        setError('');
      } else if (jobskills.length >= 15) {
        setError('You can add a maximum of 15 skills.');
      }
    };
  
    const removeSkill = (index) => {
      setJobSkills(prevSkills => prevSkills.filter((_, idx) => idx !== index));
      setError('');
    };
  
    const formatSkillsForDispatch = (skillsArray) => {
      const formatted = {};
      skillsArray.forEach((skill, index) => {
        formatted[`jobskills[${index}]`] = skill;
      });
      return formatted;
    };
  
    const id = project.id;

    const handleSave = async () => {
        try {
            const response = await axios.put(`https://www.api.alanced.com/freelance/update/project/${id}`, {
                skills_required: jobskills,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.status === 200) {
                toast.success('Job Skills Updated Successfully')
                closeJobSkills();
            } else {
                console.log(response.data.message || 'Error updating the job Skills');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const allSkills = SkillsList.sort();

const [searchTermSkill, setSearchTermSkill] = useState(''); 
const [isOpenSkill, setIsOpenSkill] = useState(false);
const wrapperRefSkill = useRef(null);

const filteredSkills = allSkills.filter(
    skill => skill.toLowerCase().includes(searchTermSkill.toLowerCase()) && !jobskills.includes(skill)
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
                  <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Edit Skills</h1>
                  <button onClick={closeJobSkills} className="text-gray-500 hover:text-gray-700">
                      <i className="bi bi-x-lg"></i>
                  </button>
              </div>
              <div className="mt-10">
                  <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Edit Your Required Job Skills</h1>
                  <div className="border rounded-md p-2 flex items-center flex-wrap my-3">
      {Array.isArray(jobskills) && jobskills.map((skill, index) => (
          <div key={index} className="bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border-none text-white font-semibold rounded px-2 py-1.5 mr-3 my-2 flex items-center">
              <span>{skill}</span>
              <button onClick={() => removeSkill(index)} className="ml-2 mt-1 pb-0.5 text-sm bg-white text-blue-500 rounded-full w-4 h-4 flex justify-center items-center">
                  &times;
              </button>
          </div>
      ))}
      {/* <div className="flex items-center relative w-full">
          <input 
              type="text" 
              value={currentSkills} 
              onChange={(e) => setCurrentSkills(e.target.value)}
              placeholder="Enter Skills here"
              className="outline-none w-full"
          />
          <span id="hiddenText" style={{visibility: 'hidden', whiteSpace: 'pre', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)'}}>{currentSkills}</span>
          <button 
              onClick={addSkill} 
              style={{position: 'absolute', left: `${document.getElementById("hiddenText")?.offsetWidth || 0}px`, top: '47%', transform: 'translateY(-50%)'}}
              className={`ml-4 mt-1 pb-0.5 text-sm bg-blue-500 text-white rounded-full w-4 h-4 flex justify-center items-center ${currentSkills.trim() ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          >
              +
          </button>
      </div>
  </div> */}
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
                            if (jobskills.length < 15) {
                                setJobSkills(prev => [...prev, skill]);
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
                  {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
              <div className="mt-8 flex justify-end">
                  <Link to="" onClick={handleSave} state={{project}}><span className="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                  <div className="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeJobSkills}>
                      <Link to='' state={{project}}><button className="px-2 py-1 bg-white"><p className="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Cancel</p></button></Link>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </>
    )
  }
  

export default EditJobSkillsPopup