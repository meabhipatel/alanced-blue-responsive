import React, { useState, useEffect, useRef} from 'react'
import Navbar from '../../../components/Layout/Navbar'
import Footer from '../../../components/Layout/Footer'
import HomeSection4 from '../../../components/Layout/HomeSection4'
import { Link } from 'react-router-dom'
import CategoryList from '../AllSelectionData/CategoryList'
import SkillsList from '../AllSelectionData/SkillsList'
import { AddFreelancerSelfProjectAction } from '../../../redux/Freelancer/FreelancerAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddPortfolioForm = () => {

    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const [addFreelancerProject, setAddFreelancerProject] = useState('');
    const dispatch = useDispatch();
    const[cate] = useState(CategoryList)
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [skills, setSkills] = useState([]);
    const navigate = useNavigate();

    const AddProjects = () => {  
            
        const formData = new FormData();
            formData.append("project_title",addFreelancerProject.project_title);
            formData.append("project_description",addFreelancerProject.project_description);
            skills.forEach((skill, index) => {
                formData.append(`skills_used[${index}]`, skill);
            });
            // formData.append("skills_used",skills);
            // formData.append("skills_used", skills.join(','));
            formData.append("category",addFreelancerProject.category);
            formData.append("project_link",addFreelancerProject.project_link)
            formData.append("images_logo",selectedFile)
    
        // const x = {
        //     "project_title": addFreelancerProject.project_title,
        //     "project_description":addFreelancerProject.project_description,
        //     "skills_used":skills,
        //     "category":addFreelancerProject.category,
        //     "project_link":addFreelancerProject.project_link,
        //     ...(selectedFile !== undefined && { "images_logo": selectedFile }),

        // }    
            dispatch(AddFreelancerSelfProjectAction(formData,accessToken));
            navigate('/freelancer/edit-profile')
            console.log(formData,"check formdata")
        };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const file = event.target.files[0]
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreview(imageURL);
        }
        };

    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const stepsLabels = [
        'Add Portfolio',
        'Add Details',
        'Select Template',
        // 'Budget',
        // Add more step labels as needed
    ];

    const [error, setError] = useState('');
   
    

    const removeSkill = (index) => {
        const newSkills = skills.filter((_, idx) => idx !== index);
    
        setSkills(newSkills);
        setAddFreelancerProject(prevProject => ({
            ...prevProject,
            skills_used: newSkills
        }));
        setError('');
    };


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


    // const onChange = e => {
    //     setAddFreelancerProject({
    //       ...addFreelancerProject,
    //       [e.target.name]: e.target.value
    //     });
    //   };
    const onChange = e => {
        // const { name, value } = e.target;
        // setAddFreelancerProject(prevData => ({ ...prevData, [name]: value }));
        setAddFreelancerProject(prevProject => ({
            ...prevProject,
            [e.target.name]: e.target.value
        }));
      };

  return (
    <>
    <style>
    {`
    .catdropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 38%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
    }
    
    .catdropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .catdropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}
    {`
    .skilldropdown-list {
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
        margin-top:10px;
    }
    
    .skilldropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .skilldropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}
</style>
    <Navbar />
    
    <div className="container-sm px-40 mt-16">
        {/* Display the current step at the top */}
        {/* <h2 className="text-xl mb-4">{`Step ${step}/3: Add ${stepsLabels[step - 1]}`}</h2> */}

        {step === 1 && (
            <div>
                <div className=' flex flex-row'>
                    <div className=' basis-3/12'>
                    <div className=" w-56">
                    <ul className="text-left">
                        <li className="px-6 py-2 bg-blue-600 cursor-pointe rounded-lg text-white font-semibold text-base">Add Portfolio</li>
                        <li className="px-6 py-2  rounded-full font-semibold text-base  opacity-50 cursor-text"  disabled>Add Details</li>
                        <li className="px-6 py-2 rounded-full font-semibold text-bas opacity-50 cursor-text" disabled>Select Template</li>
                    </ul>
                    </div>
                    </div>
                    <div className=' basis-9/12'>
                        <div className='border border-[#E7E8F2] py-8 px-8 rounded-xl'>
                            <h1 className=' text-left font-cardo text-2xl font-normal'>Add portfolio project</h1>
                            <p className='text-left font-inter text-lg font-normal mt-8'>Project Title<span className=' text-md font-bold opacity-[50%] text-red-700'>*</span></p>
                            <p className='text-left mt-1 font-inter  text-[14px] text-black opacity-70'>Enter a brief but descriptive title.</p>
                            <input 
                                type="text" 
                                name="project_title"
                                value={addFreelancerProject.project_title}
                                onChange={onChange}
                                className='border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 font-inter text-sm' 
                                placeholder="Enter Project Heading" 
                            />
                            <p className=' text-left mt-8 font-inter text-lg font-normal'>Project Description<span className=' text-md font-bold opacity-[50%] text-red-700'>*</span></p>
                            <p className='text-left mt-1 font-inter text-[14px] text-black opacity-70'>Describe what you did on the project.</p>
                                <textarea id="message" name="project_description" value={addFreelancerProject.project_description} onChange={onChange}
                                required  class="mt-3 w-full  px-3 py-2 border font-inter rounded-lg text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-1 text-sm focus:ring-blue-600"  rows='7' placeholder="Enter Project Overview"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {step === 2 && (
            <div>
                <div className=' flex flex-row'>
                    <div className=' basis-3/12'>
                    <div className=" w-56">
                    <ul className="text-left">
                        <li className="px-6 py-2 rounded-full font-semibold text-bas opacity-50 cursor-text" disabled>Add Portfolio</li>
                        <li className="px-6 py-2 bg-blue-600 cursor-pointe rounded-lg text-white font-semibold text-base">Add Details</li>
                        <li className="px-6 py-2 rounded-full font-semibold text-bas opacity-50 cursor-text" disabled>Select Template</li>
                    </ul>
                    </div>
                    </div>
                    <div className=' basis-9/12'>
                        <div className='border border-[#E7E8F2] py-8 px-8 rounded-xl'>
                            <h1 className=' text-left font-cardo text-2xl font-normal'>Add Details</h1>
                            <p className='text-left font-inter  text-lg mt-8'>Select Category<span className=' text-md font-bold opacity-[50%] text-red-700'>*</span></p>
                            <p className='text-left mt-1 font-inter  text-[14px] text-black opacity-70'>Project Classification</p>
                            {/* <input 
                                type="text" 
                                name="title"
                                className='border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
                                placeholder="Describe What you did on the Project" 
                            /> */}
                                <select className='border mt-2  mb-6 py-1.5 px-2 rounded-md w-full font-inter text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white' name="category" value={addFreelancerProject.category} onChange={onChange}>
                                <option disabled selected  >Category</option>
                                {cate.map((cat, index) => (
                                    <option value={cat} className=' text-black'>{cat}</option>
                                ))}
                            </select>
                            <p className=' text-left mt-8 font-inter text-lg font-normal'>Skills Used<span className=' text-md font-bold opacity-[50%] text-red-700'>*</span></p>
                            <p className='text-left mt-1 font-inter text-[14px]  text-black opacity-70'> What expertise Applied in Project</p>
                            <div className="border rounded-md font-inter text-sm p-2 flex items-center flex-wrap my-3">
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
                                    <ul className="skilldropdown-list w-full">
                                        {filteredSkills.length > 0 ? (
                                        filteredSkills.map((skill, index) => (
                                            <li className='text-left ml-3'
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
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                    </div>
                    </div>
            </div>
        )}
        {step === 3 && (
            <div>
                <div className=' flex flex-row'>
                    <div className=' basis-3/12'>
                    <div className=" w-56">
                    <ul className="text-left">
                        <li className="px-6 py-2 rounded-full font-semibold text-bas opacity-50 cursor-text" disabled>Add Portfolio</li>
                        <li className="px-6 py-2 rounded-full font-semibold text-bas opacity-50 cursor-text" disabled>Add Details</li>
                        <li className="px-6 py-2 bg-blue-600 cursor-pointe rounded-lg text-white font-semibold text-base">Select Template</li>
                    </ul>
                    </div>
                    </div>
                    <div className=' basis-9/12'>
                        <div className='border border-[#E7E8F2] py-8 px-8 rounded-xl'>
                            <h1 className=' text-left font-cardo text-2xl font-normal'>Select Template</h1>
                            <p className='text-left font-inter text-lg font-normal mt-8'>Project URL<span className=' text-md font-bold opacity-[50%] text-red-700'>*</span></p>
                            <p className='text-left mt-1 font-inter text-[14px] text-black opacity-70'>Provide the Project Web Address</p>
                            <input 
                                type="text" 
                                name="project_link"
                                value={addFreelancerProject.project_link}
                                onChange={onChange}
                                className='border my-2 py-2 px-3 font-inter text-sm rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
                                placeholder="Enter Project Url" 
                            />
                            <p className=' text-left mt-8 font-inter text-lg font-normal'>Select Project Image<span className=' text-md font-bold opacity-[50%] text-red-700'>*</span></p>
                            {/* <p className='text-left mt-1 font-inter text-[14px] text-black opacity-70'>Provide the Project Web Address</p> */}
                            <input class="block border my-2 py-2 px-3 font-inter rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" id="default_size" type="file" name="images_logo" onChange={handleFileChange}></input>
                                
                        </div>
                    </div>
                    </div>
            </div>
        )}
        <div className="flex justify-between mt-5 ml-64">
            {step > 1 && <button onClick={() => {prevStep(); window.scrollTo(0,0)}} className="bg-gray-300 px-4 py-2 rounded">Back</button>}
            {/* {step < 3 && <button onClick={() => {nextStep(); window.scrollTo(0,0)}} className="text-white px-4 py-2 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-cardo">Next: {stepsLabels[step]}</button>} */}
            {step < 3 ? (
            <button onClick={() => {nextStep(); window.scrollTo(0,0)}} className="text-white px-4 py-2 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-cardo">Next: {stepsLabels[step]}</button>
            ) : (<button className="text-white px-4 py-2 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-cardo" onClick={AddProjects}>Add Project</button>)}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default AddPortfolioForm
