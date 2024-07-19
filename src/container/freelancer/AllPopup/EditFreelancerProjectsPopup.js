import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import edit from '../../../components/images/edit.png'
import { useSelector } from 'react-redux';
import axios from 'axios';
import SkillsList from '../AllSelectionData/SkillsList';
import { toast } from 'react-toastify';
import CategoryList from '../AllSelectionData/CategoryList';

const EditFreelancerProjectsPopup = ({closeEditFreeProject,project}) => {

    
    const id = project.project_id
    // const accessToken = useSelector(state => state.login.accessToken);
    const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
    const [title, setTitle] = useState(project.project_title || '');
    const [category, setCategory] = useState(project.category || '');
    const [projectLink, setProjectLink] = useState(project.project_link || '');
    const [description, setDescription] = useState(project.project_description || '');
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [error, setError] = useState('');




    useEffect(() => {
        if (project.skills_used) {
          setSkills(JSON.parse(project.skills_used.replace(/'/g, '"')));
        }
      }, [project]);
  
  
    const removeSkill = (index) => {
      setSkills(prevSkills => prevSkills.filter((_, idx) => idx !== index));
      setError('');
    };
    
    const [uploadedImage, setUploadedImage] = useState("https://www.api.alanced.com" + project.images_logo);

    const fileInputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null); 

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result);  // set the Data URL for preview purposes
            setUploadedFile(file);  // store the File object
        }
        reader.readAsDataURL(file);
    }
};

    const handleEditIconClick = () => {
        fileInputRef.current.click();
    };

    const handleSave = async () => {
        try {
            let formData = new FormData();
        
            // If an image file has been uploaded, append it
            if (uploadedFile) {
                formData.append('images_logo', uploadedFile);
            }
        
            formData.append('project_title', title);
            formData.append('category', category);
            formData.append('project_link', projectLink);
            
            // Appending skills_used as an array of strings
            skills.forEach((skill, index) => {
                formData.append(`skills_used[${index}]`, skill);
            });
    
            formData.append('project_description', description);
        
            const response = await axios.put(`https://www.api.alanced.com/freelance/update/Freelancer/Self-project/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        
            if (response.data.status === 200) {
                toast.success("Portfolio Data Updated Successfully")
                closeEditFreeProject();
            } else {
                console.log(response.data.message || 'Error updating the project');
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    
    const allSkills = SkillsList;
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

    const [categories] = useState(CategoryList);


const [searchTerm, setSearchTerm] = useState(category || ""); 
const [isOpen, setIsOpen] = useState(false);
const wrapperRef = useRef(null);

const filteredCategories = categories.filter(
    category => category.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
    }
};

useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
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
    {`
    .cat-dropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 91%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
    }
    
    .cat-dropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .cat-dropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}
</style>
    <div className="fixed z-10 inset-0 overflow-y-auto mt-24">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg w-[90%] md:w-[55%] p-6 px-8 relative z-20">
                    <div className="flex justify-between items-center">
                        <h1 className="font-cardo text-[26px] text-[#031136] font-normal text-wrap">Edit Portfolio</h1>
                        <button onClick={closeEditFreeProject} className="text-gray-500 hover:text-gray-700">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className='mt-8'>
<div className="relative">
                <img src={uploadedImage || "https://www.api.alanced.com" + project.images_logo} alt="" className='w-[500px] h-[250px] mb-4 mx-auto' />
                <div className="absolute top-2 right-2 p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={handleEditIconClick}>
                    <img src={edit} alt="edit" />
                </div>
            </div>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
                    <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Title</h1>
                    <input type="text" value={title}
                onChange={(e) => setTitle(e.target.value)} className='border mb-3 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 opacity-50' placeholder=''/>
                    <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Category</h1>
                    <div ref={wrapperRef}>
    <input 
        type="text" 
        value={category} 
        onClick={() => setIsOpen(!isOpen)} 
        onChange={e => {
            setSearchTerm(e.target.value);
            setCategory(e.target.value);
            setIsOpen(true);
        }} 
        className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
        placeholder="Select Category" 
    />
    {isOpen && (
    <ul className="cat-dropdown-list">
        {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, index) => (
                <li 
                    key={index} 
                    onClick={() => {
                        setSearchTerm(cat);
                        setCategory(cat);
                        setIsOpen(false);
                    }}
                >
                    {cat}
                </li>
            ))
        ) : (
            <li>No results found</li>
        )}
    </ul>
)}

</div>
                
                <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Project Link</h1>
                    <input type="text" value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)} className='border mb-3 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 opacity-50' placeholder=''/>
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
{error && <p className="text-red-500 mt-2">{error}</p>}
                <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Description</h1>
                    <textarea name="" id="" cols="30" rows="5" className='border mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 opacity-50' value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
                            <div className="mt-4 flex justify-end">
                            <Link to='' onClick={handleSave}><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeEditFreeProject}>
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

export default EditFreelancerProjectsPopup;