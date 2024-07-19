import React from "react";
import Navbar from "./Navbar";
import HomeSection4 from "./HomeSection4";
import Footer from "./Footer";
import { useState } from "react";

const InformationWeCollectContent = () => (
  <>
    <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-2">
      Information We Collect
    </h1>
    <div class="w-48 mb-6 mt-1 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">1.1</span> Account Information
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      When you sign up for an Alanced account, we collect personal information
      such as your name, email address, username, and password. You may also
      choose to provide additional details in your profile, such as your
      location, skills, and a profile picture.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">1.2</span> Payment Information
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      If you use our platform to make or receive payments, we will collect
      payment information, such as your billing address, credit card number, or
      other financial details. Please note that we do not store your payment
      card information on our servers; it is securely processed by our trusted
      payment processors.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">1.3</span> Communications
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We may collect and store communications between you and other users, such
      as messages, chat history, and emails sent through our platform.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">1.4</span> Usage Data
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We automatically collect information about your interactions with Alanced,
      including your IP address, browser type, device information, and the pages
      you visit. We may also use cookies and similar tracking technologies to
      gather this data.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">1.5</span> User Content
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      Any content you create or upload to our platform, including portfolio
      items, project descriptions, reviews, and messages, is stored on our
      servers.
    </h1>
  </>
);

const HowWeUseYourInformationContent = () => (
  <>
    <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-2">
      How We Use Your Information
    </h1>
    <div class="w-64 mb-6 mt-1 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">2.1</span> Providing Services
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We use your information to facilitate your use of Alanced, including
      matching freelancers with clients, processing payments, and facilitating
      communications between users.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">2.2</span> Improving Services
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We use your data to analyze and improve our services, personalize your
      experience, and develop new features and functionality.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">2.3</span> Communication
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We may send you notifications, updates, promotional materials, and other
      communications related to your use of Alanced, as well as for marketing
      purposes. You can opt out of these communications at any time through your
      account settings.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">2.4</span> Compliance and
      Legal Obligations
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We may use your information to comply with legal obligations, resolve
      disputes, and enforce our Terms of Service.
    </h1>
  </>
);

const SharingYourInformation = () => (
  <>
    <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-2">
      Sharing Your Information
    </h1>
    <div class="w-52 mb-6 mt-1 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">3.1</span> Service Providers
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We may share your information with third-party service providers who
      assist us in delivering our services, such as payment processors, customer
      support providers, and data analytics services.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">3.2</span> Legal and Safety
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We may disclose your information in response to legal requests, to protect
      the rights and safety of Alanced, our users, or others, or to comply with
      applicable laws and regulations.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">3.3</span> Business Transfers
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      In the event of a merger, acquisition, or sale of assets, your information
      may be transferred as part of the transaction. We will notify you of any
      such transfer and any changes to this Privacy Policy.
    </h1>
  </>
);

const YourChoices = () => (
  <>
    <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-2">
      Your Choices
    </h1>
    <div class="w-28 mb-6 mt-1 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
      You have the following rights regarding your information
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">4.1</span> Access and Update
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      You can access and update your account information by logging into your
      Alanced account and making the necessary changes.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">4.2</span> Data Deletion
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      You can request the deletion of your account and associated data by
      contacting our support team. Note that some information may be retained
      for legal and operational purposes.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">4.3</span> Cookies
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      You can manage cookies and similar technologies through your browser
      settings.
    </h1>
  </>
);

const Security = () => (
  <>
    <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-2">
      Security
    </h1>
    <div class="w-20 mb-6 mt-1 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
      At Alanced, we are deeply committed to ensuring the safety and protection
      of your personal data. We implement a range of security measures, both
      technical and organizational, to safeguard your information against
      unauthorized access, alteration, disclosure, or destruction.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">5.1</span> Encryption
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We use strong encryption methods to ensure that your data remains
      confidential and protected as it travels over the internet.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">5.2</span> Regular Audits
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      Our systems undergo regular security reviews and audits to identify and
      mitigate potential vulnerabilities.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">5.3</span> Staff Training
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      Our staff receives training on data protection best practices, ensuring
      that your information is handled with care and professionalism.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">5.4</span> Incident Response
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      In the unlikely event of a security breach, we have protocols in place to
      promptly address and mitigate any potential impact.
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-5">
      However, please note that no online service can guarantee complete
      security. We encourage you to help enhance security by using a unique and
      strong password, changing it regularly, and avoiding sharing it or
      re-using it across services.
    </h1>
  </>
);

const ChangestothisPrivacyPolicy = () => (
  <>
    <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-2">
      Changes to this Privacy Policy
    </h1>
    <div class="w-64 mb-6 mt-1 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
      As our platform evolves and our practices change, we may need to update
      our Privacy Policy to reflect those changes.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">6.1</span> Notification
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      While we will always post the most recent version on our website, we will
      also notify our users of any significant changes that might affect their
      rights or the way we handle personal data, either through email or a
      prominent notice on our platform.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">6.2</span> Feedback
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      We encourage our users to review the updated Privacy Policy and reach out
      with any concerns or feedback.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">6.3</span> Periodic Reviews
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      Our team is dedicated to periodically reviewing and updating our privacy
      practices to ensure they align with industry standards and best practices.
    </h1>
  </>
);

const ContactUs = () => (
  <>
    <h1 className="font-inter text-lg text-[#031136] text-left font-semibold pt-2">
      Contact Us
    </h1>
    <div class="w-24 mb-6 mt-1 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
      Your privacy is paramount to us, and we are always open to hearing from
      you.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">7.1</span> Queries & Feedback
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      Should you have any questions about this Privacy Policy, or if you have
      any feedback or concerns regarding the way we handle your data, we welcome
      you to reach out to our dedicated privacy team.
    </h1>
    <h1 className="font-inter text-md  text-blue-600 text-left font-semibold pt-5 cursor-pointer">
      <span className="opacity-50 text-[#031136]">7.2</span> Reach Out
    </h1>
    <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 pt-2">
      You can connect with us via{" "}
      <span className="font-semibold">info@wiz91.com</span>. Our team aims to
      address any inquiries or concerns promptly and efficiently.
    </h1>
  </>
);

const PrivacyPolicy = () => {
  const [selectedSection, setSelectedSection] = useState(
    "Information We Collect"
  );

  const renderContent = () => {
    switch (selectedSection) {
      case "Information We Collect":
        return <InformationWeCollectContent />;
      case "How We Use Your Information":
        return <HowWeUseYourInformationContent />;
      case "Sharing Your Information":
        return <SharingYourInformation />;
      case "Your Choices":
        return <YourChoices />;
      case "Security":
        return <Security />;
      case "Changes to this Privacy Policy":
        return <ChangestothisPrivacyPolicy />;
      case "Contact Us":
        return <ContactUs />;
      default:
        return null;
    }
  };

  const getLinkColor = (section) => {
    return selectedSection === section
      ? "text-gray-500"
      : "text-blue-600 hover:text-blue-700";
  };

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">
          Privacy Policy
        </h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left py-5 px-8">
          <div className="flex items-center justify-between">
            <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold">
              Privacy Policy for Alanced
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
            Welcome to Alanced, an online platform that connects freelancers
            with clients seeking various services. At Alanced, we take your
            privacy seriously and are committed to protecting your personal
            information. This Privacy Policy outlines how we collect, use, and
            safeguard your information when you use our website and services. By
            accessing or using Alanced, you consent to the practices described
            in this Privacy Policy.
          </h1>
          <h1 className="font-cardo text-lg  text-[#031136] text-left font-semibold mt-4">
            TABLE OF CONTENTS
          </h1>
          <div class="w-48 mb-6 mt-1 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div class="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <div class="flex">
            <div class="flex-[30%] p-4">
              <h1
                className={`font-inter text-md ${getLinkColor(
                  "Information We Collect"
                )} text-left font-semibold pt-2 cursor-pointer`}
                onClick={() => setSelectedSection("Information We Collect")}
              >
                <span className="opacity-50 text-[#031136]">1.</span>{" "}
                Information We Collect
              </h1>
              <h1
                className={`font-inter text-md ${getLinkColor(
                  "How We Use Your Information"
                )} text-left font-semibold pt-2 cursor-pointer`}
                onClick={() =>
                  setSelectedSection("How We Use Your Information")
                }
              >
                <span className="opacity-50 text-[#031136]">2.</span> How We Use
                Your Information
              </h1>
              <h1
                className={`font-inter text-md ${getLinkColor(
                  "Sharing Your Information"
                )} text-left font-semibold pt-2 cursor-pointer`}
                onClick={() => setSelectedSection("Sharing Your Information")}
              >
                <span className="opacity-50 text-[#031136]">3.</span> Sharing
                Your Information
              </h1>
              <h1
                className={`font-inter text-md ${getLinkColor(
                  "Your Choices"
                )} text-left font-semibold pt-2 cursor-pointer`}
                onClick={() => setSelectedSection("Your Choices")}
              >
                <span className="opacity-50 text-[#031136]">4.</span> Your
                Choices
              </h1>
              <h1
                className={`font-inter text-md ${getLinkColor(
                  "Security"
                )} text-left font-semibold pt-2 cursor-pointer`}
                onClick={() => setSelectedSection("Security")}
              >
                <span className="opacity-50 text-[#031136]">5.</span> Security
              </h1>
              <h1
                className={`font-inter text-md ${getLinkColor(
                  "Changes to this Privacy Policy"
                )} text-left font-semibold pt-2 cursor-pointer`}
                onClick={() =>
                  setSelectedSection("Changes to this Privacy Policy")
                }
              >
                <span className="opacity-50 text-[#031136]">6.</span> Changes to
                this Privacy Policy
              </h1>
              <h1
                className={`font-inter text-md ${getLinkColor(
                  "Contact Us"
                )} text-left font-semibold pt-2 cursor-pointer`}
                onClick={() => setSelectedSection("Contact Us")}
              >
                <span className="opacity-50 text-[#031136]">7.</span> Contact Us
              </h1>
            </div>
            <div class="flex-[70%] p-4 border border-gray-200 rounded-md">
              <h1 className="font-cardo text-2xl  text-blue-600 text-left font-semibold pt-4 pb-6">
                Privacy Policy
              </h1>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
