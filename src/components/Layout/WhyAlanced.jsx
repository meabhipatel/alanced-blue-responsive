import React from "react";
import Footer from "./Footer";
import HomeSection4 from "./HomeSection4";
import { Link } from "react-router-dom";
import topimg from "../images/searchg.png";
import create from "../images/screate.png";
import earn from "../images/searn.png";
import pay from "../images/spay.png";
import call from "../images/call1.jpg";

const WhyAlanced = () => {
  return (
    <>
      <div className="px-5 lg:px-32">
        {/* ---> Page header  */}
        <div className=" flex flex-row border border-gray-200 rounded">
          <div className="w-full sm:basis-8/12 p-4 md:p-8">
            <h1 className=" text-left  text-[26px] mt-6 font-semibold text-blue-600">Take part in the global job market platform.</h1>
            <div class="w-36   mt-1 relative">
              <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
              <div class="border-gray-600 border-b-2 rounded-lg"></div>
            </div>
            <p className="text-[15px] mt-4 opacity-[70%] text-left">
              Are you geared up to take your business
              <br /> or career to the next level?.{" "}
            </p>
            <div className=" flex flex-row mt-3">
              <Link to="/view-all/freelancer">
                <div className=" basis-2/12">
                  <button className="h-10 w-28 text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF] mt-5 text-base font-semibold rounded">
                    Find Talent
                  </button>
                </div>
              </Link>
              <Link to="/projects">
                <div class="p-0.5 mt-5 rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] ml-5">
                  <button class="px-2 py-1 bg-[#f8faf9] rounded">
                    <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-bold text-sm py-[4px] px-[8px]">Find Work</p>
                  </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="hidden sm:block basis-4/12">
            <img src={topimg} alt="" className="h-28 md:h-40 mt-[6%] mb-[5%] mx-auto" />
          </div>
        </div>

        {/* ---> Page section 1 */}
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex flex-col md:flex-row">
            <div className="basis-3/12">
              <img src={create} alt="" className="h-36 ml-1 mx-auto" />
            </div>
            <div className="basis-9/12 mt-5">
              <h1 className="  font-semibold text-left text-[22px]">Create your profile (it’s free)</h1>
              <p className="  text-[15px] mt-3 opacity-50 text-left mb-5">
                Include only your professional skills and experience that are relevant to the job you're targeting. This is especially helpful if your
                skills and work history differ from your current career goals because it enables you to showcase the related expertise that hiring
                managers are looking for.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="basis-3/12">
              <img src={earn} alt="" className="h-32 ml-1 mx-auto" />
            </div>
            <div className="basis-9/12 mt-5">
              <h1 className="  font-semibold text-left text-[22px]">Foster financial growth</h1>
              <p className="  text-[15px] mt-3 opacity-50 text-left mb-5">
                Foster financial growth" refers to the deliberate actions or strategies aimed at nurturing and encouraging the expansion of one's
                financial resources, investments, or wealth. This can involve activities such as saving, investing, or pursuing opportunities to
                increase income.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="basis-3/12">
              <img src={pay} alt="" className="h-32 ml-1 mx-auto" />
            </div>
            <div className="basis-9/12 mt-5">
              <h1 className="  font-semibold text-left text-[22px]">Safe and Reliable payment method.</h1>
              <p className="  text-[15px] mt-3 opacity-50 text-left mb-5">
                A secure and reliable payment method refers to a financial transaction process that safeguards sensitive data, such as personal and
                financial information, while ensuring that payments are processed accurately and in a timely manner.
              </p>
            </div>
          </div>
        </div>

        {/* ---> Page section 2 */}
        <div className=" flex flex-col gap-1 md:flex-row border border-gray-200 rounded mt-12">
          <div className=" basis-6/12 p-3 md:ml-16 md:border-r  border-gray-200">
            <h1 className=" text-[24px] mt-8 text-left font-semibold">Create a job posting and hire talent.</h1>
            <div class="w-32  mt-2 relative">
              <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
              <div class="border-gray-600 border-b-2 rounded-lg"></div>
            </div>
            <h1 className=" text-[18px] mt-3 opacity-70 text-left">
              Discover the perfect talent match in our Talent <br />
              Marketplace.
            </h1>
            <p className=" text-[15px] mt-4 opacity-70 text-left">
              Publish your job listing on the global job market and <br /> anticipate a wave of proposals from skilled
              <br /> individuals spanning the globe
            </p>
            <p className=" text-[15px] mt-4 opacity-70 text-left">
              Our cutting-edge algorithms assist in identifying <br /> top candidates tailored to your needs.You have <br /> the opportunity to
              thoroughly review profiles,
              <br /> portfolios, and feedback before granting
              <br /> approval.
            </p>
            <div className=" text-left mb-8">
              {" "}
              <Link to="/view-all/freelancer" onClick={() => window.scroll(0, 0)}>
                <span class="inline-block text-[16px] px-5 py-[10px] mt-8 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-2 text-base font-semibold ">
                  Talents
                </span>
              </Link>
            </div>
          </div>
          <div className=" basis-6/12 p-3 md:ml-16 border-t">
            <h1 className=" text-[24px] mt-8 text-left font-semibold">Explore projects and get opportunities.</h1>
            <div class="w-32  mt-2 relative">
              <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
              <div class="border-gray-600 border-b-2 rounded-lg"></div>
            </div>
            <h1 className=" text-[18px] mt-3 opacity-70 text-left">
              Initiate essential tasks without delay using Project
              <br /> Catalog.
            </h1>
            <p className=" text-[15px] mt-4 opacity-70 text-left">
              Dive into a world of projects and unlock valuable work.
              <br /> discover a realm of possibilities and embark on <br />
              your journey to new horizons.
            </p>
            <p className=" text-[15px] mt-4 opacity-70 text-left">
              Our platform offers a gateway to a world of diverse <br />
              projects, where you can explore, engage, and <br />
              embark on new ventures. Whether you're a seasoned
              <br /> professional looking to expand your horizons or a<br /> fresh talent eager to make your mark.
            </p>
            <div className=" text-left mb-8">
              {" "}
              <Link to="/projects" onClick={() => window.scroll(0, 0)}>
                <span class="inline-block text-[16px] px-7 py-[10px] mt-8 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-2 font-semibold text-base">
                  Works
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ---> Page section 3 */}
        <div className=" flex flex-col-reverse md:flex-row mt-12 mb-5">
          <div className=" basis-9/12 ml-4">
            <h1 className="text-left  text-[26px] mt-6 font-semibold">We are available 24/7</h1>
            <div class="w-32  mt-2 relative">
              <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
              <div class="border-gray-600 border-b-2 rounded-lg"></div>
            </div>
            <p className="  text-[15px] mt-4 opacity-[70%] text-left">
              Our availability is unwavering, ensuring your access to our services around the clock, 24 hours a day, 7 days a week. Whenever you need
              assistance, support, or have inquiries, we're here to respond promptly, no matter the time or day. Our commitment to round-the-clock
              availability means you can rely on us for assistance, guidance, and peace of mind at any hour, making your experience seamless and
              convenient.
            </p>
          </div>
          <div className="basis-3/12">
            <img src={call} alt="" className="h-40 mx-auto mt-5" />
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default WhyAlanced;
