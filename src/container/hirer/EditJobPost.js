import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import edit from "../../components/images/edit.png";
import { Link, useLocation } from "react-router-dom";
import EditJobTitlePopup from "./HirerAllPopup/EditJobTitlePopup";
import EditJobDescPopup from "./HirerAllPopup/EditJobDescPopup";
import EditCategoryPopup from "./HirerAllPopup/EditCategoryPopup";
import EditJobSkillsPopup from "./HirerAllPopup/EditJobSkillsPopup";
import EditJobScopePopup from "./HirerAllPopup/EditJobScopePopup";
import EditJobBudget from "./HirerAllPopup/EditJobBudget";

const EditJobPost = () => {
  const location = useLocation();
  const project = location.state && location.state.project;
  const [isJobTitleOpen, setIsJobTitleOpen] = useState(false);
  const [isJobDescOpen, setIsJobDescOpen] = useState(false);
  const [isJobCategoryOpen, setIsJobCategoryOpen] = useState(false);
  const [isJobSkillsOpen, setIsJobSkillsOpen] = useState(false);
  const [isJobScopeOpen, setIsJobScopeOpen] = useState(false);
  const [isJobBudgetOpen, setIsJobBudgetOpen] = useState(false);

  const openJobTitle = () => {
    setIsJobTitleOpen(true);
  };

  const closeJobTitle = () => {
    setIsJobTitleOpen(false);
  };

  const openJobBudget = () => {
    setIsJobBudgetOpen(true);
  };

  const closeJobBudget = () => {
    setIsJobBudgetOpen(false);
  };

  const openJobScope = () => {
    setIsJobScopeOpen(true);
  };

  const closeJobScope = () => {
    setIsJobScopeOpen(false);
  };

  const openJobDesc = () => {
    setIsJobDescOpen(true);
  };

  const closeJobDesc = () => {
    setIsJobDescOpen(false);
  };

  const openJobCategory = () => {
    setIsJobCategoryOpen(true);
  };

  const closeJobCategory = () => {
    setIsJobCategoryOpen(false);
  };

  const openJobSkills = () => {
    setIsJobSkillsOpen(true);
  };

  const closeJobSkills = () => {
    setIsJobSkillsOpen(false);
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">Edit Job Post</h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left">
          <div className="border-b border-gray-200 border-opacity-30 py-5 px-8 flex justify-between items-center">
            <h1 className="font-inter text-xl text-[#031136] text-left font-semibold">{project.title}</h1>
            <div
              className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer flex-shrink-0"
              onClick={() => openJobTitle(project)}
            >
              <img src={edit} alt="more" />
            </div>
            {isJobTitleOpen && <EditJobTitlePopup closeJobTitle={closeJobTitle} project={project} />}
          </div>
          <div className="border-b border-gray-200 border-opacity-30 py-5 px-8 flex justify-between items-center">
            <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">{project.description}</h1>
            <div
              className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer flex-shrink-0"
              onClick={() => openJobDesc(project)}
            >
              <img src={edit} alt="more" />
            </div>
            {isJobDescOpen && <EditJobDescPopup closeJobDesc={closeJobDesc} project={project} />}
          </div>
          <div className="border-b border-gray-200 border-opacity-30 py-5 px-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="font-inter text-lg text-[#031136] font-semibold text-left">category</h1>
                <h1 className="font-inter text-md opacity-50 text-[#031136] font-normal text-left py-1">{project.category.replace(/_/g, " ")}</h1>
              </div>
              <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={() => openJobCategory(project)}>
                <img src={edit} alt="more" />
              </div>
              {isJobCategoryOpen && <EditCategoryPopup closeJobCategory={closeJobCategory} project={project} />}
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-col">
                <h1 className="font-inter text-lg text-[#031136] font-semibold text-left">Skills</h1>
                <div className="text-left my-3">
                  {project.skills_required &&
                    (() => {
                      try {
                        const skillsArray = JSON.parse(project.skills_required.replace(/'/g, '"'));
                        return skillsArray.map((skill, index) => (
                          <div
                            key={index}
                            className="mr-3 my-2 focus:outline-none bg-[#b4d3c3] hover:bg-[#c1e2d1] inline-block rounded-full  text-blue-800 px-4 py-1 text-sm font-semibold dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee] bg-opacity-[60%]"
                          >
                            <p className="text-center">{skill}</p>
                          </div>
                        ));
                      } catch (error) {
                        console.error("Error parsing JSON:", error);
                        return null;
                      }
                    })()}
                </div>
              </div>
              <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={() => openJobSkills(project)}>
                <img src={edit} alt="more" />
              </div>
              {isJobSkillsOpen && <EditJobSkillsPopup closeJobSkills={closeJobSkills} project={project} />}
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-col">
                <h1 className="font-inter text-lg text-[#031136] font-semibold text-left pb-2">Scope</h1>
                <h1 className="font-inter text-md opacity-50 text-[#031136] font-normal text-left py-1">
                  Project Deadline : {formatDate(project.deadline)}
                </h1>
                <h1 className="font-inter text-md opacity-50 text-[#031136] font-normal text-left py-1">
                  Experience Level : {project.experience_level.replace(/_/g, " ")}{" "}
                </h1>
              </div>
              <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={() => openJobScope(project)}>
                <img src={edit} alt="more" />
              </div>
              {isJobScopeOpen && <EditJobScopePopup closeJobScope={closeJobScope} project={project} />}
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-col">
                <h1 className="font-inter text-lg text-[#031136] font-semibold text-left pb-2">Budget</h1>
                <h1 className="font-inter text-md opacity-50 text-[#031136] font-normal text-left py-1">
                  $
                  {project.Project_Rate == "Hourly"
                    ? project.Project_Min_Hourly_Rate + "/hr" + " - " + "$" + project.Project_Max_Hourly_Rate + "/hr"
                    : project.Project_Fixed_Budget}
                </h1>
                <h1 className="font-inter text-md opacity-50 text-[#031136] font-normal text-left py-1">{project.Project_Rate} Rate</h1>
              </div>
              <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={() => openJobBudget(project)}>
                <img src={edit} alt="more" />
              </div>
              {isJobBudgetOpen && <EditJobBudget closeJobBudget={closeJobBudget} project={project} />}
            </div>
          </div>
          <div className="flex justify-end m-5">
            <Link to="/View/Job-post" state={{ project }}>
              <span class="text-sm px-6 py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold">
                Save Job Post
              </span>
            </Link>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default EditJobPost;
