import React, { useEffect, useRef } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddProjectAction } from "../../redux/Hirer/HirerAction";
import CategoryList from "../freelancer/AllSelectionData/CategoryList";
import SkillsList from "../freelancer/AllSelectionData/SkillsList";

const AddJobPost = () => {
  const [addProject, setAddProject] = useState("");

  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken =
    useSelector((state) => state.login.accessToken) ||
    localStorage.getItem("jwtToken");
  const dispatch = useDispatch();

  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedOption, setSelectedOption] = useState("hourly");

  const selectOptionHandler = (option) => {
    setSelectedOption(option);

    if (option === "hourly") {
      setAddProject((prev) => ({
        ...prev,
        rate: "Hourly",
        fixed_budget: null,
        min_hourly_rate: "",
        max_hourly_rate: "",
      }));
    } else if (option === "fixed") {
      setAddProject((prev) => ({
        ...prev,
        rate: "Fixed",
        fixed_budget: "",
        min_hourly_rate: null,
        max_hourly_rate: null,
      }));
    }
  };

  const AddProjects = () => {
    const projectData = { ...addProject };

    // If rate is not set, default it to "Hourly"
    if (!projectData.rate) {
      projectData.rate = "Hourly";
    }

    const formData = new URLSearchParams();
    formData.append("title", projectData.title);
    formData.append("description", projectData.description);
    formData.append("deadline", projectData.deadline);
    formData.append("skills_required", projectData.skills_required);
    formData.append("category", projectData.category);
    formData.append("rate", projectData.rate);
    formData.append("fixed_budget", projectData.fixed_budget);
    formData.append("min_hourly_rate", projectData.min_hourly_rate);
    formData.append("max_hourly_rate", projectData.max_hourly_rate);
    formData.append("experience_level", projectData.experience_level);

    const x = {
      title: projectData.title,
      description: projectData.description,
      deadline: projectData.deadline,
      skills_required: skills,
      category: selectedCategory,
      rate: projectData.rate,
      fixed_budget: projectData.fixed_budget,
      min_hourly_rate: projectData.min_hourly_rate,
      max_hourly_rate: projectData.max_hourly_rate,
      experience_level: projectData.experience_level,
    };

    dispatch(AddProjectAction(x, accessToken));
  };

  const [currentSkill, setCurrentSkill] = useState("");
  const [error, setError] = useState("");

  const [categories] = useState(CategoryList.sort());

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isValid, setIsValid] = useState(false);

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const stepsLabels = [
    "Job Title",
    "Job Description",
    "Skills",
    "Budget",
    "Deadline",
  ];

  const onChange = (e) => {
    let value = e.target.value;

    // Convert the date format if the input is the 'deadline' input
    if (e.target.name === "deadline") {
      value = formatToDDMMYYYY(value);
    }

    setAddProject((prevProject) => ({
      ...prevProject,
      [e.target.name]: value,
    }));
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, idx) => idx !== index);

    setSkills(newSkills);
    setAddProject((prevProject) => ({
      ...prevProject,
      skills_required: newSkills,
    }));
    setError("");
  };

  const allSkills = SkillsList.sort();

  const [searchTermSkill, setSearchTermSkill] = useState("");
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const wrapperRefSkill = useRef(null);

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTermSkill.toLowerCase()) &&
      !skills.includes(skill)
  );

  const handleClickOutsideSkill = (event) => {
    if (
      wrapperRefSkill.current &&
      !wrapperRefSkill.current.contains(event.target)
    ) {
      setIsOpenSkill(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSkill);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSkill);
    };
  }, []);

  useEffect(() => {
    switch (step) {
      case 1:
        if (addProject.title && selectedCategory) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
        break;
      case 2:
        if (addProject.description) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
        break;
      case 3:
        if (skills.length > 0) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
        break;
      case 4:
        if (
          addProject.fixed_budget ||
          (addProject.min_hourly_rate && addProject.max_hourly_rate)
        ) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
        break;
      case 5:
        if (addProject.deadline && addProject.experience_level) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
        break;
      default:
        setIsValid(false);
        break;
    }
  }, [step, addProject, selectedCategory, skills]);

  const formatToYYYYMMDD = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatToDDMMYYYY = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
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

      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">
          Add Job Post
        </h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-100 text-left">
          <div className="p-8">
            <h2 className="text-xl mb-4 font-cardo">{`${step}/5`}</h2>
            <div className="py-1">
              {step === 1 && (
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4 my-5">
                    <h1 className="text-4xl text-blue-600 font-cardo font-semibold">
                      Your Job Post Title
                    </h1>
                    <p className="text-lg opacity-50 font-cardo font-medium py-4">
                      Make it Shine, Attract the Right Candidates, <br />
                      Land the Best Talent
                    </p>
                  </div>
                  <div className="flex-1">
                    <label
                      className="block text-xl mt-3 font-cardo"
                      htmlFor="jobCategory"
                    >
                      Job Title
                    </label>
                    <input
                      type="text"
                      onChange={onChange}
                      name="title"
                      value={addProject.title || ""}
                      className="border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="Add Job title"
                    />
                    <label
                      className="block text-xl mt-3 font-cardo"
                      htmlFor="jobCategory"
                    >
                      Job Category
                    </label>
                    <div ref={wrapperRef}>
                      <input
                        type="text"
                        value={searchTerm || ""}
                        onClick={() => setIsOpen(!isOpen)}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setIsOpen(true);
                        }}
                        className="border my-2 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Select Category"
                      />

                      {isOpen && (
                        <ul className="catdropdown-list">
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((cat, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  setSelectedCategory(cat);
                                  setSearchTerm(cat);
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
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4 my-5">
                    <h1 className="text-4xl text-blue-600 font-cardo font-semibold">
                      Your Job Description
                    </h1>
                    <p className="text-lg opacity-50 font-cardo font-medium py-4">
                      Post Your Job Description To Find Top Talent
                    </p>
                  </div>
                  <div className="flex-1">
                    <label
                      className="block text-xl mt-3 font-cardo"
                      htmlFor="jobCategory"
                    >
                      Job Description
                    </label>
                    <textarea
                      name="description"
                      id=""
                      cols="30"
                      rows="5"
                      className="border py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="Write Your Job Description Here"
                      onChange={onChange}
                      value={addProject.description || ""}
                    ></textarea>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4 my-5">
                    <h1 className="text-4xl text-blue-600 font-cardo font-semibold">
                      Your Job Skills
                    </h1>
                    <p className="text-lg opacity-50 font-cardo font-medium py-4">
                      What are the main skills required for your work?
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="border rounded-md p-2 flex items-center flex-wrap my-3">
                      {Array.isArray(skills) &&
                        skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border-none text-white font-semibold rounded px-2 py-1.5 mr-3 my-2 flex items-center"
                          >
                            <span>{skill}</span>
                            <button
                              onClick={() => removeSkill(index)}
                              className="ml-2 mt-1 pb-0.5 text-sm bg-white text-blue-500 rounded-full w-4 h-4 flex justify-center items-center"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      <div ref={wrapperRefSkill} className="relative w-full">
                        <input
                          type="text"
                          value={searchTermSkill}
                          onClick={() => setIsOpenSkill(!isOpenSkill)}
                          onChange={(e) => setSearchTermSkill(e.target.value)}
                          className="outline-none w-full"
                          placeholder="Search & Select Skills"
                        />
                        {isOpenSkill && (
                          <ul className="skilldropdown-list w-full">
                            {filteredSkills.length > 0 ? (
                              filteredSkills.map((skill, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    if (skills.length < 15) {
                                      setSkills((prev) => [...prev, skill]);
                                      setSearchTermSkill("");
                                      setIsOpenSkill(false);
                                    } else {
                                      setError(
                                        "You can add a maximum of 15 skills."
                                      );
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
              )}
              {step === 4 && (
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4 my-5">
                    <h1 className="text-4xl text-blue-600 font-cardo font-semibold">
                      Tell us about your budget
                    </h1>
                    <p className="text-lg opacity-50 font-cardo font-medium py-4">
                      This will help us match you to talent within your range.
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full mb-4">
                      <div
                        className={`flex sm:block items-center w-full sm:flex-1 p-4 border ${
                          selectedOption === "hourly" ? "border-blue-600" : ""
                        } hover:border-blue-600 hover:shadow-md transition duration-300 cursor-pointer h-[120px] sm:h-auto`}
                        // onClick={() => setSelectedOption('hourly')}
                        onClick={() => selectOptionHandler("hourly")}
                      >
                        <i className="bi bi-alarm text-3xl sm:-mt-3 mr-4 sm:mr-0 text-blue-600"></i>
                        <h5 className="text-left font-cardo text-2xl lg:pt-3">
                          Hourly Rate
                        </h5>
                      </div>
                      <div
                        className={`flex sm:block items-center w-full sm:flex-1 p-4 border ${
                          selectedOption === "fixed" ? "border-blue-600" : ""
                        } hover:border-blue-600 hover:shadow-md transition duration-300 cursor-pointer h-[120px] sm:h-auto`}
                        // onClick={() => setSelectedOption('fixed')}
                        onClick={() => selectOptionHandler("fixed")}
                      >
                        <i className="bi bi-tag-fill sm:-mt-3 mr-4 sm:mr-0 text-3xl text-blue-600"></i>
                        <h5 className="text-left font-cardo text-2xl lg:pt-3">
                          Fixed Budget
                        </h5>
                      </div>
                    </div>

                    <div className="min-h-[160px]">
                      {selectedOption === "hourly" && (
                        <div>
                          <div className="flex space-x-16">
                            <div className="flex flex-col">
                              <label
                                className="block text-xl mt-3 font-cardo"
                                htmlFor="fromInput"
                              >
                                From
                              </label>
                              <div className="flex items-center">
                                <input
                                  id="fromInput"
                                  type="number"
                                  placeholder=""
                                  className="flex-1 w-36 mr-1 p-2 border my-1 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                  onChange={onChange}
                                  name="min_hourly_rate"
                                  value={addProject.min_hourly_rate || ""}
                                />
                                <span>/hr</span>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                className="block text-xl mt-3 font-cardo"
                                htmlFor="toInput"
                              >
                                To
                              </label>
                              <div className="flex items-center">
                                <input
                                  id="toInput"
                                  type="number"
                                  placeholder=""
                                  className="flex-1 w-36 mr-1 p-2 border my-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                  onChange={onChange}
                                  name="max_hourly_rate"
                                  value={addProject.max_hourly_rate || ""}
                                />
                                <span>/hr</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-lg opacity-50 font-cardo font-medium py-2">
                            Set your Hourly Rate
                          </p>
                        </div>
                      )}

                      {selectedOption === "fixed" && (
                        <div>
                          <label
                            className="block text-xl mt-3 font-cardo"
                            htmlFor="maxBudgetInput"
                          >
                            Maximum Budget
                          </label>
                          <input
                            id="maxBudgetInput"
                            type="number"
                            className="border my-2 p-2 rounded-md w-52 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder=""
                            onChange={onChange}
                            name="fixed_budget"
                            value={addProject.fixed_budget || ""}
                          />
                          <p className="text-lg opacity-50 font-cardo font-medium py-2">
                            Set your Project Budget
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {step === 5 && (
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4 my-5">
                    <h1 className="text-4xl text-blue-600 font-cardo font-semibold">
                      Your Deadline And Experience Level
                    </h1>
                    <p className="text-lg opacity-50 font-cardo font-medium py-4">
                      Post Your Job Deadline And Experience Level
                    </p>
                  </div>
                  <div className="flex-1">
                    <label
                      className="block text-xl mt-3 font-cardo"
                      htmlFor="jobCategory"
                    >
                      Deadline
                    </label>
                    <input
                      id=""
                      name="deadline"
                      type="date"
                      className="border my-2 p-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={onChange}
                      value={formatToYYYYMMDD(addProject.deadline || "")}
                    />
                    <label
                      className="block text-xl mt-3 font-cardo"
                      htmlFor="jobCategory"
                    >
                      Experience Level
                    </label>
                    <select
                      className="border mt-2 mb-6 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white opacity-50"
                      onChange={onChange}
                      name="experience_level"
                      value={addProject.experience_level || ""}
                    >
                      <option value="" selected disabled>
                        Select Experience Level
                      </option>
                      <option value="Entry_Level">Entry Level</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] mr-2">
                  <Link
                    to=""
                    onClick={() => {
                      window.scrollTo(0, 0);
                      prevStep();
                    }}
                  >
                    <button class="px-6 py-1 bg-white">
                      <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
                        Back
                      </p>
                    </button>
                  </Link>
                </div>
              ) : (
                <div
                  class="p-0.5 inline-block rounded mr-2"
                  style={{ visibility: "hidden" }}
                >
                  <button class="px-6 py-1 bg-white">
                    <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
                      Back
                    </p>
                  </button>
                </div>
              )}

              {step < 5 ? (
                <Link
                  to=""
                  onClick={(e) => {
                    if (!isValid) {
                      e.preventDefault();
                      return;
                    }
                    window.scrollTo(0, 0);
                    nextStep();
                  }}
                >
                  <span
                    class={`text-sm px-6 py-[10px] ${
                      isValid
                        ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"
                        : "bg-gray-400 cursor-not-allowed"
                    } border rounded border-none text-white font-semibold`}
                  >
                    Next: {stepsLabels[step]}
                  </span>
                </Link>
              ) : (
                <Link
                  to={isValid ? "/View-all/Job-post" : "#"}
                  onClick={(e) => {
                    if (!isValid) {
                      e.preventDefault();
                      return;
                    }
                    AddProjects();
                    window.scrollTo(0, 0);
                  }}
                >
                  <span
                    class={`text-sm px-6 py-[10px] ${
                      isValid
                        ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"
                        : "bg-gray-400 cursor-not-allowed"
                    } border rounded border-none text-white font-semibold`}
                  >
                    Post A Job
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default AddJobPost;
