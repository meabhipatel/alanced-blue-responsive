import React from "react";
import cupbook from "../images/cupbook.png";
import { Link } from "react-router-dom";

const HomeSection4 = () => {
  const accessToken = localStorage.getItem("accessToken");
  const googleUserName = localStorage.getItem("googleUserName");

  const isLoggedIn = Boolean(accessToken || googleUserName);

  return (
    <div>
      <div className="bg-[#F6FAFD]">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 px-4 lg:px-[145px]">
          <div className="flex-1 p-4 text-left">
            <h1 className="text-[26px] font-semibold pt-20 inline-block text-[#0A142F]">
              Get Book Copy Today!
              <div className="border-b-2 border-[#1B3764] w-1/6 my-4 opacity-62"></div>
            </h1>
            <p className="opacity-50 text-[13px]">
              This the first true value generator on the Internet. It uses alphas dictionary <br /> of over 200 Latin words. This unique collection
              not only highlights the beauty and depth of the Latin language.
            </p>
            <div className="mt-8">
              {!isLoggedIn ? (
                <Link to="/login">
                  <span className="text-sm px-4 py-[10px] lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold">
                    Sign In
                  </span>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex-1 p-4">
            <img src={cupbook} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection4;
