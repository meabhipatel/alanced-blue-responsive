import React from "react";
import Navbar from "./Navbar";
import HomeSection4 from "./HomeSection4";
import Footer from "./Footer";
import coinbase from "../images/coinbase.png";
import slack from "../images/slack.png";
import adobe from "../images/adobe.png";
import spotify from "../images/spotify.png";
import webflow from "../images/webflow.png";
import zoom from "../images/zoom.png";

const SafetyAndSecurity = () => {
  return (
    <>
      <div className="mt-6 mx-[9%]">
        <h1 className="font-cardo text-4xl text-blue-600 text-left font-semibold p-3">
          Safety and security
        </h1>
        <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-6 px-3">
          At Alanced, we prioritize your safety, trust, and the security of your
          data above all else. We understand that in the world of freelancing,
          you're not just working with us – you're entrusting us with your
          projects, your professional reputation, and your personal data. Here's
          how we're committed to keeping that trust.
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 px-3 mt-5 cursor-pointer items-center">
          <h4 className="font-cardo text-2xl text-blue-600 font-bold text-left col-span-1 md:col-span-2 lg:col-span-1">
            Trusted by
          </h4>
          <div class="p-4 col-span-1">
            <img src={coinbase} alt="" />
          </div>
          <div class="p-4 col-span-1">
            <img src={spotify} alt="" />
          </div>
          <div class="p-4 col-span-1">
            <img src={slack} alt="" />
          </div>
          <div class="p-4 col-span-1">
            <img src={adobe} alt="" />
          </div>
          <div class="p-4 col-span-1">
            <img src={webflow} alt="" />
          </div>
          <div class="p-4 col-span-1">
            <img src={zoom} alt="" />
          </div>
        </div>

        <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-12 px-3">
          Protecting Your Data is Our Top Priority
        </h1>
        <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-6 px-3">
          In the digital realm of Alanced, your data's sanctity stands
          paramount. We intertwine advanced security measures with an unwavering
          commitment, ensuring that every byte of your information remains
          shielded and strictly confidential. Your trust drives our protective
          endeavors.
        </h1>
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div class="bg-[#F2F7F2] hover:bg-[#D5E0D5] shadow-md rounded p-6">
              <h1 className="font-inter text-lg  text-[#031136] font-semibold mb-4">
                End-to-End Encryption
              </h1>
              <h1 className="font-inter text-md text-[#031136] font-normal opacity-40">
                Ensuring all data is encrypted, providing safety from origin to
                destination, safeguarding your valuable information.
              </h1>
            </div>
            <div class="bg-[#F2F7F2] hover:bg-[#D5E0D5] shadow-md rounded p-6">
              <h1 className="font-inter text-lg  text-[#031136] font-semibold mb-4">
                Regular Audits
              </h1>
              <h1 className="font-inter text-md text-[#031136] font-normal opacity-40">
                We proactively conduct third-party security checks, ensuring our
                platform aligns with the latest safety standards.
              </h1>
            </div>
            <div class="bg-[#F2F7F2] hover:bg-[#D5E0D5] shadow-md rounded p-6">
              <h1 className="font-inter text-lg  text-[#031136] font-semibold mb-4">
                Data Usage Transparency
              </h1>
              <h1 className="font-inter text-md text-[#031136] font-normal opacity-40">
                Your data is paramount. We're clear about its use, emphasizing
                user rights and transparent practices.
              </h1>
            </div>
          </div>
        </div>
        <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-8 px-3">
          {" "}
          Access and Authentication
        </h1>
        <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-6 px-3">
          Ensuring secure entry and verification is paramount to Alanced. Our
          robust systems guarantee that only authenticated users can access
          their accounts, safeguarding your information and fostering trust in
          our platform.
        </h1>
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div class="bg-[#EEF8F9] shadow-md rounded p-6">
              <i class="bi bi-person-lock text-5xl text-[#70C3C3]"></i>
              <h1 className="font-inter text-lg  text-[#031136] font-semibold my-4">
                Two-Factor Authentication
              </h1>
              <h1 className="font-inter text-md text-[#031136] font-normal opacity-40">
                A double layer of security requiring both a password and a
                unique code, ensuring unauthorized access is prevented.
              </h1>
            </div>
            <div class="bg-[#FEF8F8] shadow-md rounded p-6">
              <i class="bi bi-shield-lock text-5xl text-[#ECCBCB]"></i>
              <h1 className="font-inter text-lg  text-[#031136] font-semibold my-4">
                Secure Password Protocols
              </h1>
              <h1 className="font-inter text-md text-[#031136] font-normal opacity-40">
                Complex password combinations and monitoring deter malicious
                activities, safeguarding your account at all times.
              </h1>
            </div>
            <div class="bg-[#EEECF7] shadow-md rounded p-6">
              <i class="bi bi-globe text-5xl text-[#ABA6FA]"></i>
              <h1 className="font-inter text-lg  text-[#031136] font-semibold my-4">
                Session Monitoring
              </h1>
              <h1 className="font-inter text-md text-[#031136] font-normal opacity-40">
                Active session tracking and control, allowing you to manage and
                end your sessions for enhanced security.
              </h1>
            </div>
          </div>
        </div>
        <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-8 px-3">
          Stay Informed and Protected
        </h1>
        <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-6 px-3">
          Our commitment to your safety and security is unwavering. As
          technology evolves, so do our efforts to ensure that Alanced remains a
          trusted and secure platform for freelancers everywhere. We invite you
          to reach out with any questions or feedback, and thank you for being a
          valued member of the Alanced community.
        </h1>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default SafetyAndSecurity;
