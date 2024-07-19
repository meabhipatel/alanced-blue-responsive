import React from "react";
import Navbar from "./Navbar";
import HomeSection4 from "./HomeSection4";
import Footer from "./Footer";

const TermsConditions = () => {
  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">
          Terms & Conditions
        </h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left py-5 px-8">
          <div className="flex items-center justify-between">
            <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold">
              Terms & Conditions for Alanced
            </h1>
            <div className="flex items-center space-x-2">
              <h1 className="font-inter text-md  text-[#031136] text-left font-semibold">
                Last Updated: <span className="font-normal">10-10-2023</span>
              </h1>
            </div>
          </div>
          <div class="w-72 mb-6 mt-1 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div class="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-4">
            The following terms and conditions govern all use of the Alanced
            website and all content, services, and products available at or
            through the website. By using the website, you agree to these Terms.
            If you disagree with any part of the terms, then you may not access
            the service.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">1.</span> Account Registration:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            Users must provide accurate, complete, and current information
            during the registration process. Failure to do so constitutes a
            breach of the Terms, which may result in immediate termination of
            your Alanced account.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">2.</span> User Responsibilities:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            Users are responsible for their own actions and the content they
            post. This includes ensuring they have rights to the content shared
            and that it does not infringe on any third-party rights or violate
            any laws.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">3.</span> Payment and Fees:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            Alanced may charge fees for access to the platform or certain
            services. It is the user's responsibility to check and understand
            the fees associated with any transaction. All payments must be made
            on time.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">4.</span> Confidentiality:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            All confidential information exchanged on the platform must remain
            confidential unless both parties agree otherwise. Unauthorized
            disclosure can result in account termination.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">5.</span> Disputes:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            In case of a dispute between users, Alanced encourages users to
            resolve the conflict amicably. Alanced may offer mediation services
            but is not obligated to resolve disputes. The platform is not liable
            for any damages resulting from user conflicts.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">6.</span> Termination:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            Alanced reserves the right to suspend or terminate user accounts for
            violations of these Terms. Upon termination, the user's right to use
            the platform will cease immediately.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">7.</span> Limitation of Liability:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            Alanced, its directors, employees, partners, agents, suppliers, or
            affiliates, shall not be liable for any loss or damage, direct or
            indirect, resulting from the use of the platform.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">8.</span> Intellectual Property:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            The platform and its original content, features, and functionality
            are owned by Alanced and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">9.</span> Third-Party Links:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            Alanced may contain links to third-party websites or services that
            are not owned or controlled by Alanced. We assume no responsibility
            for the content, privacy policies, or practices of any third-party
            websites or services.
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pb-2 pt-5">
            <span className="opacity-50">10.</span> Amendments:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40">
            Alanced reserves the right to update or change these Terms at any
            time, and users should check this page periodically. Your continued
            use of the service after any modifications indicates your acceptance
            of the updated Terms.
          </h1>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default TermsConditions;
