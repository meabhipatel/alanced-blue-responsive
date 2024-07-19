import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import HomeSection4 from "../../components/Layout/HomeSection4";
import Footer from "../../components/Layout/Footer";
import { Link } from "react-router-dom";
import thumbdown from "../../components/images/thumbdown.png";
import heart from "../../components/images/heart.png";
import verify from "../../components/images/verify.png";
import location from "../../components/images/location.png";
import search from "../../components/images/SearchOutlined.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchJobs = () => {
  const [selectedButton, setSelectedButton] = useState("Search");
  const commonStyle =
    "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  const [range, setRange] = useState([1, 100000]);

  const handleSliderChange = (newRange) => {
    setRange(newRange);
  };

  const handleInputChange = (index, newValue) => {
    const newRange = [...range];
    newRange[index] = newValue;
    setRange(newRange);
  };

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <div className="my-3 flex flex-wrap">
          <Link to="/saved-jobs" className="flex-grow md:flex-none p-1">
            <span
              className={`${commonStyle} px-3 my-3 md:px-8 font-inter font-normal text-sm text-[#797979] opacity-[50%] ${
                selectedButton === "Saved Jobs"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-50"
              } mr-3`}
              onClick={() => setSelectedButton("Saved Jobs")}
            >
              Saved Jobs
            </span>
          </Link>
          <Link to="/search-jobs" className="flex-grow md:flex-none p-1">
            <span
              className={`${commonStyle} px-3 md:px-8 text-base font-inter font-bold ${
                selectedButton === "Search"
                  ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
                  : "border border-gray-300 text-[#0A142F] opacity-50"
              } mr-3`}
              onClick={() => setSelectedButton("Search")}
            >
              Search
            </span>
          </Link>
        </div>
        <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-3"></div>
        <div class="flex flex-col md:flex-row my-5 mx-5">
          <div class="w-full md:w-[30%] pt-3 bg-[#FFFFFF] py-8 text-left">
            <p className="font-inter text-[14px] text-[#121212] font-normal">
              Filter By{" "}
              <i class="bi bi-chevron-down text-[#031136] text-[10px]"></i>
            </p>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4 font-normal">
                Category
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex items-center mr-1 space-x-1 border p-1 w-[293px] rounded-md">
              <img src={search} alt="Search Icon" className="h-5 w-5 mr-1" />
              <input
                className="w-28 lg:w-40 xl:w-[247px] h-7 text-sm lg:text-sm  font-inter font-normal outline-none "
                placeholder="Search"
              />
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] font-normal py-4">
                Experience level
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979] font-inter text-base">
                    Entry Level
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (22945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979] text-base font-inter">
                    Intermediate
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (10325)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979] text-base font-inter">
                    Expert
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (60302)
              </div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] font-normal text-[#031136] py-4">
                Job Type
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979] text-base">
                    Hourly
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div className="pt-4 w-[80%]">
              <Slider
                min={1}
                max={100000}
                step={1}
                range
                value={range}
                onChange={handleSliderChange}
                railStyle={{ background: "lightgray" }}
                className="ml-2.5"
                trackStyle={[
                  {
                    background: "linear-gradient(45deg, #0909E9, #00D4FF)",
                    borderColor: "#65a30d",
                  },
                ]}
                handleStyle={[
                  {
                    backgroundColor: "white",
                    borderColor: "transparent",
                    borderRadius: "50%",
                    borderImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                    borderImageSlice: 1,
                  },
                  {
                    backgroundColor: "white",
                    borderColor: "transparent",
                    borderRadius: "50%",
                    borderImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                    borderImageSlice: 1,
                  },
                ]}
              />
              <div className="flex flex-row mt-4">
                <div className="basis-5/12">
                  <input
                    type="text"
                    value={"$" + range[0]}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                    className="mt-3 bg-white text-center border rounded-md p-1 basis-6/12 font-inter text-base font-normal text-[#797979] w-28 focus:border-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-60
                focus:outline-none"
                  />
                </div>
                <div className="basis-2/12 m-auto mt-4 px-5">
                  <i class="bi bi-dash-lg text-[#475569]"></i>
                </div>
                <div className="basis-5/12">
                  <input
                    type="text"
                    value={"$" + range[1]}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                    className="mt-3 bg-white text-center border rounded-md p-1 basis-6/12 font-inter text-base font-normal text-[#797979] w-28 focus:border-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-60
                focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row my-6">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">Fixed Price</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div className="flex flex-row my-3 px-2">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    Less than $100(23222)
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-row my-3 px-2">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    $100 to $500 (23222)
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-row my-3 px-2">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    $500 - $1K (7076)
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-row my-3 px-2">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    $1K - $5K (8376)
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-row my-3 px-2">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">$5K+ (2425)</span>
                </label>
              </div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4">
                Number of proposals
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">Less than 5</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">5 to 10</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">10 to 15</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">15 to 20</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">20 to 50</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4">
                Client Info
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979] text-base font-inter">
                    My previous clients
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (112945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979] text-base font-inter">
                    Payment verified
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (117654)
              </div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4">
                Client History
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">No hires</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">1 to 9 hires</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (1945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">10+ hires</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (945)
              </div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4">
                Client Location
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex items-center mr-1 space-x-1 border p-1 w-[293px] rounded-md">
              <img src={search} alt="Search Icon" className="h-5 w-5 mr-1" />
              <input
                className="w-28 lg:w-40 xl:w-[247px] h-7 text-sm font-inter font-normal lg:text-sm outline-none"
                placeholder="Select client locations"
              />
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4">
                Client Time Zones
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex items-center mr-1 space-x-1 border p-1 w-[293px] rounded-md">
              <img src={search} alt="Search Icon" className="h-5 w-5 mr-1" />
              <input
                className="w-28 lg:w-40 xl:w-[247px] h-7 text-sm font-inter font-normal lg:text-sm outline-none"
                placeholder="Select client time zones"
              />
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4">
                Project Length
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    Less than one month
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (15765)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">1 to 3 months</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (16543)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">3 to 6 months</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (11945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    More than 6 months
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (7745)
              </div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4">
                Hours Per Week
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    Less than 30 hrs/week
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (1945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    More than 30 hrs/week
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (2945)
              </div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[20px] text-[#031136] py-4">
                Connects Needed
              </h1>
              <div className="flex items-center space-x-2">
                <i class="bi bi-chevron-down text-[#031136] pr-11 text-sm"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">
                    4 or less connects
                  </span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (15765)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">8 connects</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (16543)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">12 connects</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (11945)
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="basis-8/12">
                <label class="flex items-center font-inter relative cursor-pointer">
                  <input class="hidden" type="checkbox" />
                  <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                    <span class="checkmark hidden">
                      <i class="bi bi-check-lg pr-2 pt-2"></i>
                    </span>
                  </div>
                  <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span class="font-normal text-[#797979]">16 connects</span>
                </label>
              </div>
              <div className="basis-4/12 font-inter text-base font-normal text-[#797979] text-left">
                (7745)
              </div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200 opacity-30 mt-8 mr-6"></div>
          </div>
          <div class="w-full md:w-[70%] pt-3 bg-[#FFFFFF] py-8 border-l border-gray-200 border-opacity-30 text-left">
            <div className="px-4 md:px-8 py-5 bg-[#F6FAFD] border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                  Graphic Designer
                </p>
                <div className="flex items-center space-x-2">
                  <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                    <img src={thumbdown} alt="" className="mt-1" />
                  </div>
                  <Link to="">
                    <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                      <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours
              </p>
              <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                Job Description: Graphic Designer for Vogue Tourism in Ajmer
                Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details
                On this Whatsapp No.+91 95094 98242 Are you a talented and
                imaginative Graphic Designer with a flair for creating visually
                stunning and engaging designs? Vogue Tourism, a premier name in
                the travel and hospitality sector, is{" "}
                <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">
                  More
                </span>
              </p>
              <Link to="">
                <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] font-normal inline-block mr-2 my-2">
                  Social Media Imagery
                </span>
              </Link>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal py-1 mr-1">
                Proposals : <span className="opacity-50">Less than 5</span>
              </p>
              <img src={verify} alt="" className="inline-block h-5 w-5 mr-1" />
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                Payment verified
              </p>
              <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                ★★★★★
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1">
                $0
              </p>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block mr-3">
                Spent
              </p>
              {/* <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/> */}
              <i class="bi bi-geo-alt inline-block  mr-1"></i>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                India
              </p>
            </div>
            <div className="px-4 md:px-8 py-5 border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                  Graphic Designer
                </p>
                <div className="flex items-center space-x-2">
                  <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                    <img src={thumbdown} alt="" className="mt-1" />
                  </div>
                  <Link to="">
                    <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                      <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours
              </p>
              <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                Job Description: Graphic Designer for Vogue Tourism in Ajmer
                Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details
                On this Whatsapp No.+91 95094 98242 Are you a talented and
                imaginative Graphic Designer with a flair for creating visually
                stunning and engaging designs? Vogue Tourism, a premier name in
                the travel and hospitality sector, is{" "}
                <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">
                  More
                </span>
              </p>
              <Link to="">
                <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] font-normal inline-block mr-2 my-2">
                  Social Media Imagery
                </span>
              </Link>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal py-1 mr-1">
                Proposals : <span className="opacity-50">Less than 5</span>
              </p>
              <img src={verify} alt="" className="inline-block h-5 w-5 mr-1" />
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                Payment verified
              </p>
              <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                ★★★★★
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1">
                $0
              </p>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block mr-3">
                Spent
              </p>
              {/* <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/> */}
              <i class="bi bi-geo-alt inline-block  mr-1"></i>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                India
              </p>
            </div>
            <div className="px-4 md:px-8 py-5 border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                  Graphic Designer
                </p>
                <div className="flex items-center space-x-2">
                  <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                    <img src={thumbdown} alt="" className="mt-1" />
                  </div>
                  <Link to="">
                    <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                      <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours
              </p>
              <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                Job Description: Graphic Designer for Vogue Tourism in Ajmer
                Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details
                On this Whatsapp No.+91 95094 98242 Are you a talented and
                imaginative Graphic Designer with a flair for creating visually
                stunning and engaging designs? Vogue Tourism, a premier name in
                the travel and hospitality sector, is{" "}
                <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">
                  More
                </span>
              </p>
              <Link to="">
                <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] font-normal inline-block mr-2 my-2">
                  Social Media Imagery
                </span>
              </Link>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal py-1 mr-1">
                Proposals : <span className="opacity-50">Less than 5</span>
              </p>
              <img src={verify} alt="" className="inline-block h-5 w-5 mr-1" />
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                Payment verified
              </p>
              <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                ★★★★★
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1">
                $0
              </p>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block mr-3">
                Spent
              </p>
              {/* <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/> */}
              <i class="bi bi-geo-alt inline-block  mr-1"></i>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                India
              </p>
            </div>
            <div className="px-4 md:px-8 py-5 border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                  Graphic Designer
                </p>
                <div className="flex items-center space-x-2">
                  <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                    <img src={thumbdown} alt="" className="mt-1" />
                  </div>
                  <Link to="">
                    <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                      <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours
              </p>
              <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                Job Description: Graphic Designer for Vogue Tourism in Ajmer
                Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details
                On this Whatsapp No.+91 95094 98242 Are you a talented and
                imaginative Graphic Designer with a flair for creating visually
                stunning and engaging designs? Vogue Tourism, a premier name in
                the travel and hospitality sector, is{" "}
                <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">
                  More
                </span>
              </p>
              <Link to="">
                <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] font-normal inline-block mr-2 my-2">
                  Social Media Imagery
                </span>
              </Link>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal py-1 mr-1">
                Proposals : <span className="opacity-50">Less than 5</span>
              </p>
              <img src={verify} alt="" className="inline-block h-5 w-5 mr-1" />
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                Payment verified
              </p>
              <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                ★★★★★
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1">
                $0
              </p>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block mr-3">
                Spent
              </p>
              {/* <img src={location} alt="" className='inline-block h-5 w-5 mr-1'/> */}
              <i class="bi bi-geo-alt inline-block  mr-1"></i>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                India
              </p>
            </div>
            <div className="px-4 md:px-8 py-5 border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                  Graphic Designer
                </p>
                <div className="flex items-center space-x-2">
                  <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                    <img src={thumbdown} alt="" className="mt-1" />
                  </div>
                  <Link to="">
                    <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                      <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours
              </p>
              <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                Job Description: Graphic Designer for Vogue Tourism in Ajmer
                Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details
                On this Whatsapp No.+91 95094 98242 Are you a talented and
                imaginative Graphic Designer with a flair for creating visually
                stunning and engaging designs? Vogue Tourism, a premier name in
                the travel and hospitality sector, is{" "}
                <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">
                  More
                </span>
              </p>
              <Link to="">
                <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] font-normal inline-block mr-2 my-2">
                  Social Media Imagery
                </span>
              </Link>
              <p className="font-inter text-[#0A142F] text-[16px] py-1 mr-1 font-normal">
                Proposals : <span className="opacity-50">Less than 5</span>
              </p>
              <img src={verify} alt="" className="inline-block h-5 w-5 mr-1" />
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                Payment verified
              </p>
              <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                ★★★★★
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1">
                $0
              </p>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block mr-3">
                Spent
              </p>
              {/* <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/> */}
              <i class="bi bi-geo-alt inline-block  mr-1"></i>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                India
              </p>
            </div>
            <div className="px-4 md:px-8 py-5 border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                  Graphic Designer
                </p>
                <div className="flex items-center space-x-2">
                  <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                    <img src={thumbdown} alt="" className="mt-1" />
                  </div>
                  <Link to="">
                    <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                      <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours
              </p>
              <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                Job Description: Graphic Designer for Vogue Tourism in Ajmer
                Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details
                On this Whatsapp No.+91 95094 98242 Are you a talented and
                imaginative Graphic Designer with a flair for creating visually
                stunning and engaging designs? Vogue Tourism, a premier name in
                the travel and hospitality sector, is{" "}
                <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">
                  More
                </span>
              </p>
              <Link to="">
                <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] font-normal inline-block mr-2 my-2">
                  Social Media Imagery
                </span>
              </Link>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal py-1 mr-1">
                Proposals : <span className="opacity-50">Less than 5</span>
              </p>
              <img src={verify} alt="" className="inline-block h-5 w-5 mr-1" />
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                Payment verified
              </p>
              <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                ★★★★★
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1">
                $0
              </p>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block mr-3">
                Spent
              </p>
              {/* <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/> */}
              <i class="bi bi-geo-alt inline-block  mr-1"></i>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                India
              </p>
            </div>
            <div className="px-4 md:px-8 py-5 border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                  Graphic Designer
                </p>
                <div className="flex items-center space-x-2">
                  <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                    <img src={thumbdown} alt="" className="mt-1" />
                  </div>
                  <Link to="">
                    <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                      <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours
              </p>
              <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                Job Description: Graphic Designer for Vogue Tourism in Ajmer
                Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details
                On this Whatsapp No.+91 95094 98242 Are you a talented and
                imaginative Graphic Designer with a flair for creating visually
                stunning and engaging designs? Vogue Tourism, a premier name in
                the travel and hospitality sector, is{" "}
                <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">
                  More
                </span>
              </p>
              <Link to="">
                <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] font-normal inline-block mr-2 my-2">
                  Social Media Imagery
                </span>
              </Link>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal py-1 mr-1">
                Proposals : <span className="opacity-50">Less than 5</span>
              </p>
              <img src={verify} alt="" className="inline-block h-5 w-5 mr-1" />
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                Payment verified
              </p>
              <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                ★★★★★
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1">
                $0
              </p>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block mr-3">
                Spent
              </p>
              {/* <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/> */}
              <i class="bi bi-geo-alt inline-block  mr-1"></i>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                India
              </p>
            </div>
            <div className="px-4 md:px-8 py-5 border-t border-b border-gray-200 border-opacity-30 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-inter text-[#0A142F] text-[16px] font-medium">
                  Graphic Designer
                </p>
                <div className="flex items-center space-x-2">
                  <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                    <img src={thumbdown} alt="" className="mt-1" />
                  </div>
                  <Link to="">
                    <div className="p-1 w-8 h-8 bg-white rounded-full border border-gray-200">
                      <i class="fa fa-heart-o p-1" aria-hidden="true"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <p className="font-inter opacity-50 text-[#0A142F] text-[14px] font-normal py-3">
                Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours
              </p>
              <p className="font-inter text-opacity-50 text-[#0A142F] text-[16px] font-normal py-3">
                Job Description: Graphic Designer for Vogue Tourism in Ajmer
                Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details
                On this Whatsapp No.+91 95094 98242 Are you a talented and
                imaginative Graphic Designer with a flair for creating visually
                stunning and engaging designs? Vogue Tourism, a premier name in
                the travel and hospitality sector, is{" "}
                <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">
                  More
                </span>
              </p>
              <Link to="">
                <span className="border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[14px] font-normal inline-block mr-2 my-2">
                  Social Media Imagery
                </span>
              </Link>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal py-1 mr-1">
                Proposals : <span className="opacity-50">Less than 5</span>
              </p>
              <img src={verify} alt="" className="inline-block h-5 w-5 mr-1" />
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                Payment verified
              </p>
              <div className="text-[16px] text-[#FFC107] inline-block mx-3">
                ★★★★★
              </div>
              <p className="font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1">
                $0
              </p>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block mr-3">
                Spent
              </p>
              {/* <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/> */}
              <i class="bi bi-geo-alt inline-block  mr-1"></i>
              <p className="font-inter text-[#0A142F] text-[16px] font-normal opacity-50 inline-block">
                India
              </p>
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default SearchJobs;
