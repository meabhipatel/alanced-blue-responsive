import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import profilebg from '../../../components/images/profilebg.png'
import edit from '../../../components/images/edit.png'
import EditFreelancerProjectsPopup from './EditFreelancerProjectsPopup'

const FreelancerProjectsPopup = ({ closeFreeProject, project }) => {

    const [isEditFreeProjectOpen, setIsEditFreeProjectOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
  
    const openEditFreeProject = (project) => {
      setSelectedProject(project);
      setIsEditFreeProjectOpen(true);
  };
  
  const closeEditFreeProject = () => {
      setSelectedProject(null);
      setIsEditFreeProjectOpen(false);
  };

  return (
    <>
    <div className="fixed z-10 inset-0 overflow-y-auto mt-24">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg w-[90%] md:w-[55%] p-6 px-8 relative z-20">
                    <div className="flex justify-between items-center">
                        <h1 className="font-cardo text-[26px] text-[#031136] font-normal text-wrap">{project.project_title}</h1>
                        <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={() => openEditFreeProject(project)}>
                        <img src={edit} alt="edit" />
                        </div>
                        {isEditFreeProjectOpen && <EditFreelancerProjectsPopup project={selectedProject} closeEditFreeProject={closeEditFreeProject} />}
                        {/* <button onClick={closeFreeProject} className="text-gray-500 hover:text-gray-700">
                            <i class="bi bi-x-lg"></i>
                        </button> */}
                    </div>
                    <div className='mt-8'>
                        <img src={"https://www.api.alanced.com"+project.images_logo} alt="" className='w-full h-[300px]'/>
                        <h1 className="font-cardo text-lg text-[#031136] font-normal text-left pt-5">Skills and Deliverables</h1>
                        <div className="text-left mt-5">
                        {JSON.parse(project.skills_used.replace(/'/g, '"')).map((skill, index) => (
                <div className="mr-3 focus:outline-none  bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full  text-blue-800 px-4 py-1 my-2 text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]" key={index}>
                <p className=" text-center">{skill}</p>
            </div>))}
            </div> 
            <h1 className="font-cardo text-lg text-[#031136] font-normal text-left pt-6">Project Description</h1>
            <h1 className="font-inter text-sm font-normal text-left text-blue-700">{project.category.replace(/_/g, ' ')}</h1>
            <p className="font-inter text-sm text-[#031136] font-normal opacity-50 text-left py-4">{project.project_description}</p>
            <h1 className="font-inter text-sm text-[#031136] font-normal text-left">Project Link : <span className='text-blue-700'>{project.project_link}</span></h1>
            <div className="border-b opacity-70 my-5"></div>
                            <div className="mt-4 flex justify-end">
                            <Link to=''><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold" >Save</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]" onClick={closeFreeProject}>
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

export default FreelancerProjectsPopup;


