import React from "react";
import Navbar from "../../../components/Layout/Navbar";
import HomeSection4 from "../../../components/Layout/HomeSection4";
import Footer from "../../../components/Layout/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import frame from "../../../components/images/Frame.png";
import rating from "../../../components/images/superstart.png";
import money from "../../../components/images/money.png";

const ViewProjectNewTab = () => {
  return (
    <>
      <div className="cursor-pointer text-left ml-[7%] mt-[5%]">
        <i class="bi bi-chevron-left font-bold text-black text-lg"></i>
      </div>
      <div className=" container-sm px-40">
        <div className=" flex flex-row mt-10">
          <div className=" basis-8/12 text-left">
            <h1 className="text-xl font-normal font-cardo">Graphic Designer</h1>
            <p className="mt-4 text-base font-normal font-cardo">
              Graphic Design
            </p>
            <div className="flex flex-row mt-2">
              <div className=" basis-6/12">
                <p className=" font-inter font-normal text-base text-[#797979]">
                  Posted in 11 hours
                </p>
              </div>
              <div className=" basis-6/12">
                <div className=" text-right font-inter text-base font-normal opacity-[50%]">
                  <i class="bi bi-geo-alt"></i> Worldwide
                </div>
              </div>
            </div>
            <div className="mt-12 font-inter font-normal text-base text-[#797979]">
              Job Description: Graphic Designer for Vogue Tourism in AjmerOnly
              for Ajmer (Rajasthan) OFFLINE
            </div>
            <div className="font-inter font-normal text-base text-[#797979]">
              Please Share Your Details On this Whatsapp No.+91 95094 98242{" "}
            </div>
            <div className="font-inter font-normal text-base text-[#797979] mt-5">
              Are you a talented and imaginative Graphic Designer with a flair
              for creating visually stunning and engaging designs? Vogue
              Tourism, a premier name in the travel and hospitality sector, is
              seeking a skilled Graphic Designer to join our team. If you're
              passionate about translating travel experiences into captivating
              visuals, we want to hear from you.
            </div>
            <div className="mt-5 font-inter font-normal text-base text-[#797979]">
              Responsibilities:
            </div>
            <div className="mt-5 font-inter font-normal text-base text-[#797979]">
              Collaborate with the marketing team to understand design
              requirements and objectives for various projects, including
              flyers, posters, social media graphics, and more.Create compelling
              visual content that aligns with our brand identity and resonates
              with our target audience.Develop original design concepts,
              graphics, and layouts that tell the story of unique travel
              destinations and experiences.Ensure that all designs adhere to
              branding guidelines and maintain a consistent visual identity.Use
              your creative expertise to enhance the overall aesthetic and
              impact of our marketing materials.
            </div>
            <div className=" flex flex-row mt-10">
              <div className=" basis-6/12">
                <div className=" flex flex-row">
                  <div className=" basis-2/12">
                    <img src={money} alt="" />
                  </div>
                  <div className=" basis-10/12">
                    <h1 className=" font-cardo font-normal text-lg text-left">
                      $10.00
                    </h1>
                    <p className=" font-inter font-normal text-base text-left opacity-[50%]">
                      Fixed-price
                    </p>
                  </div>
                </div>
              </div>
              <div className=" basis-6/12">
                <div className=" flex flex-row">
                  <div className=" basis-2/12">
                    <img src={rating} alt="" />
                  </div>
                  <div className=" basis-10/12">
                    <h1 className=" font-cardo font-normal text-lg text-left">
                      Expert
                    </h1>
                    <p className=" font-inter font-normal text-base text-left opacity-[50%]">
                      I am willing to pay higher rates for the most experienced
                      freelancers
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-16">
              <h1 className=" font-cardo font-normal text-lg text-left">
                Contract-to-hire opportunity
              </h1>
            </div>
            <div className=" flex flex-row mt-3">
              <div className=" basis-8/12">
                <p className=" font-inter font-normal text-base opacity-[50%]">
                  This lets talent know that this job could become full time.
                </p>
                <p className=" font-inter font-normal text-base opacity-[80%]">
                  Learn more
                </p>
              </div>
              <div className=" basis-4/12">
                <img src={frame} alt="" className="h-[80%]" />
              </div>
            </div>
            <div className=" mt-14">
              <h1 className=" font-inter font-normal text-base">
                Project Type:
                <span className=" opacity-[50%]"> Complex project</span>
              </h1>
            </div>
            <div className="mt-10 font-cardo text-lg font-normal text-[#031136]">
              Skills and Expertise
            </div>
            <div className=" mt-2 text-sm font-inter font-normal text-[#0A142F]">
              Graphic Design Deliverables
            </div>
            <div className=" flex flex-row space-x-6">
              <div className=" basis-4/12">
                <div className="mt-3 bg-white text-center border rounded-md p-1 font-inter text-base font-normal text-[#797979]  focus:border-none">
                  Social Media Imagery
                </div>
              </div>
              <div className=" basis-4/12">
                <div className="mt-3 bg-white text-center border rounded-md p-1 font-inter text-base font-normal text-[#797979]">
                  Infographic
                </div>
              </div>
              <div className=" basis-4/12">
                <div className="mt-3 bg-white text-center border rounded-md p-1 font-inter text-base font-normal text-[#797979] ">
                  Ebook
                </div>
              </div>
            </div>
            <div className=" mt-6 text-sm font-inter font-normal text-[#0A142F]">
              Other
            </div>
            <div className=" flex flex-row space-x-6">
              <div className=" basis-4/12">
                <div className="mt-3 bg-white text-center border rounded-md p-1 font-inter text-base font-normal text-[#797979]  focus:border-none">
                  Advertising Design
                </div>
              </div>
              <div className=" basis-4/12">
                <div className="mt-3 bg-white text-center border rounded-md p-1 font-inter text-base font-normal text-[#797979]">
                  Brand Identity Design
                </div>
              </div>
              <div className=" basis-4/12">
                <div className="mt-3 bg-white text-center border rounded-md p-1 font-inter text-base font-normal text-[#797979] ">
                  Business Card Design
                </div>
              </div>
            </div>
            <div className="mt-14 font-cardo text-lg font-normal text-[#031136]">
              Activity on this job
            </div>
            <div className=" mt-5">
              <h1 className=" font-inter font-normal text-base">
                Proposals:
                <span className=" opacity-[50%]"> Native or Bilingual</span>
              </h1>
            </div>
            <div className=" mt-2">
              <h1 className=" font-inter font-normal text-base">
                Interviewing:<span className=" opacity-[50%]"> 0</span>
              </h1>
            </div>
            <div className=" mt-2">
              <h1 className=" font-inter font-normal text-base">
                Invites sent:<span className=" opacity-[50%]"> 0</span>
              </h1>
            </div>
            <div className=" mt-2">
              <h1 className=" font-inter font-normal text-base">
                Unanswered invites:<span className=" opacity-[50%]"> 0</span>
              </h1>
            </div>
          </div>
          <div className=" basis-4/12">
            <div className="mt-6 ml-32">
              <Link to="">
                <span class="px-12 py-[15px] lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-inter text-base font-normal">
                  Apply Now
                </span>
              </Link>
            </div>
            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] mt-8 ml-32">
              <Link to="">
                <button class="px-2 py-1 bg-white">
                  <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-inter font-bold text-base py-[4px] px-8">
                    <i class="bi bi-suit-heart"></i> Save Job
                  </p>
                </button>
              </Link>
            </div>
            <div className="mt-8 text-sm font-inter font-normal text-[#0A142F] ml-28">
              <i class="bi bi-flag-fill"></i>
              <span className=" opacity-[50%] ml-2">Flag as inappropriate</span>
            </div>
            <div className="mt-2 text-sm font-inter font-normal text-[#0A142F] opacity-[50%] ml-28">
              Send a proposal for: 8 Connects
            </div>
            <div className="mt-2 text-sm font-inter font-normal text-[#0A142F]  opacity-[50%] ml-32">
              Available Connects: 10
            </div>
            <div className="mt-12 text-xl font-cardo font-normal text-[#0A142F] text-left ml-20">
              About the client
            </div>
            <div className="mt-3 text-sm font-inter font-normal text-[#0A142F] opacity-[50%] text-left ml-20">
              Payment method not verified
            </div>
            <div className="mt-5 text-base font-inter font-normal text-[#0A142F] text-left ml-20">
              India
            </div>
            <div className="mt-2 text-base font-inter font-normal text-[#0A142F] opacity-[50%] text-left ml-20">
              Ajmer 2:42 pm
            </div>
            <div className="mt-5 text-base font-inter font-normal text-[#0A142F] text-left ml-20">
              2 jobs posted
            </div>
            <div className="mt-2 text-base font-inter font-normal text-[#0A142F] opacity-[50%] text-left ml-20">
              Member since Aug 28, 2023
            </div>
            <div className=" mt-16 text-xl font-cardo font-normal text-[#0A142F] text-left ml-20">
              Job link
            </div>
            <div class="p-0.5 inline-block rounded bg-black opacity-[30%] mt-5 ml-14">
              <Link to="">
                <button class="px-1 py-1 bg-white">
                  <p class="font-inter font-normal text-sm py-[10px] px-4 opacity-[90%] text-black">
                    www.upwork.com/nx/find-work
                  </p>
                </button>
              </Link>
            </div>
            <div className=" mt-5 text-base font-cardo font-bold text-[#0A142F] text-left ml-20">
              Copy link
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default ViewProjectNewTab;
