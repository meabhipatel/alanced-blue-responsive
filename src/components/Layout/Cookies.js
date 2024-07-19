import React from "react";
import Navbar from "./Navbar";
import HomeSection4 from "./HomeSection4";
import Footer from "./Footer";

const Cookies = () => {
  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">
          Cookie Policy
        </h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left py-5 px-8">
          <div className="flex items-center justify-between">
            <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold">
              Cookie Policy for Alanced
            </h1>
            <div className="flex items-center space-x-2">
              <h1 className="font-inter text-md  text-[#031136] text-left font-semibold">
                Last Updated: <span className="font-normal">10-10-2023</span>
              </h1>
            </div>
          </div>
          <div class="w-56 mb-6 mt-1 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div class="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-4">
            Welcome to Alanced! At Alanced, we believe in being transparent
            about how we collect and use data. This policy provides information
            about how and when we use cookies for these purposes. By using our
            website, you consent to the use of cookies as described in this
            Cookie Policy.
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-4">
            What are cookies?
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-2">
            Cookies are small pieces of text stored by your web browser on your
            computer, mobile, or other devices when you visit certain web pages.
            They can be used for various purposes such as remembering your
            preferences, tracking your visits to our website, and enhancing your
            browsing experience.
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-4">
            Why does Alanced use cookies?
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-2">
            We use cookies for several reasons:
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            <span className="opacity-50">1.</span> Essential Cookies:{" "}
            <span className="font-normal opacity-40">
              These are strictly necessary to provide you with the services
              available through our website and to use some of its features.
            </span>
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            <span className="opacity-50">2.</span> Performance Cookies:{" "}
            <span className="font-normal opacity-40">
              These help us analyze how our website is accessed, used, or is
              performing.
            </span>
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            <span className="opacity-50">3.</span> Functional Cookies:{" "}
            <span className="font-normal opacity-40">
              These allow us to remember choices you make to give you better
              functionality and personal features.
            </span>
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            <span className="opacity-50">4.</span> Advertising and Targeting
            Cookies:{" "}
            <span className="font-normal opacity-40">
              These cookies are used to deliver advertisements more relevant to
              you and your interests.
            </span>
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-6">
            How can I control cookies?
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal py-2">
            <span className="opacity-40">
              Most web browsers allow some control of most cookies through the
              browser settings. To find out more about cookies, including how to
              see what cookies have been set, visit
            </span>
            <a
              href="https://www.aboutcookies.org/"
              className="text-blue-400 hover:underline font-semibold"
            >
              www.aboutcookies.org
            </a>{" "}
            or{" "}
            <a
              href="http://www.allaboutcookies.org/"
              className="text-blue-400 hover:underline font-semibold"
            >
              www.allaboutcookies.org
            </a>
            .
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-2">
            If you want to clear all cookies left behind by the websites you
            have visited, here are links where you can download programs that
            clean out tracking cookies:
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pt-3">
            • For Windows:{" "}
            <a
              href="https://www.safer-networking.org/free-download/"
              className="text-blue-400 hover:underline"
            >
              {" "}
              http://www.spybot.info/en/download/index.html
            </a>
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pt-2">
            • For Mac:{" "}
            <a
              href="http://www.macscansecure.com/"
              className="text-blue-400 hover:underline"
            >
              {" "}
              http://www.macscansecure.com/
            </a>
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-6">
            Do we use any third-party cookies?
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-2">
            Yes, we use third-party cookies for several purposes, mainly to
            understand how our services are used, but also for advertising
            purposes. For instance, we might use external analytics services
            that use cookies to gather anonymous traffic and website trends.
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-6">
            Contacting Us
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal py-2">
            <span className="opacity-40">
              If you have any questions about our use of cookies, please contact
              us at
            </span>
            <span className="font-semibold"> info@wiz91.com</span>
          </h1>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default Cookies;
