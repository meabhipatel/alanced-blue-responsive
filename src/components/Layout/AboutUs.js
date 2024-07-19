import React from "react";
import Navbar from "./Navbar";
import HomeSection4 from "./HomeSection4";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">About Us</h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left py-5 px-8">
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold">Welcome to Alanced: Your Freelance Ecosystem</h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-8">
            At Alanced, we believe in the power of balance. Balance between work and life, between dreams and reality, and between skills and
            opportunities. In today’s digital age, flexibility and innovation are more than just buzzwords; they're a way of life. And Alanced is here
            to make that way of life accessible to everyone.
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold">Our Story</h1>
          <div class="w-20 mt-1 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div class="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-8">
            Born out of the desire to bridge the gap between talented freelancers and businesses seeking their skills, Alanced was established to
            transform the way we think about freelancing. Our platform isn’t just a place to find work; it's a community where creativity meets
            opportunity.
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold">Why Choose Alanced?</h1>
          <div class="w-48 mb-6 mt-1 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div class="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            <span className="opacity-50">1.</span> Diverse Opportunities:{" "}
            <span className="font-normal opacity-40">
              From graphic design and web development to content creation and digital marketing, our platform showcases a myriad of projects suitable
              for every skill set.
            </span>
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            <span className="opacity-50">2.</span> Safe & Secure:{" "}
            <span className="font-normal opacity-40">
              Security is our topmost priority. With Alanced, freelancers and employers alike can be assured of transparent, safe, and secure
              transactions.
            </span>
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            <span className="opacity-50">3.</span> Community First:{" "}
            <span className="font-normal opacity-40">
              Beyond connecting freelancers with businesses, we foster a thriving community where members can exchange ideas, collaborate on projects,
              and grow together.
            </span>
          </h1>
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            <span className="opacity-50">4.</span> Fair & Balanced:{" "}
            <span className="font-normal opacity-40">
              We believe in fair compensation for every freelancer. Our platform promotes equitable pay, ensuring that talents are appropriately
              rewarded for their efforts.
            </span>
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-8">Our Mission</h1>
          <div class="w-28 mt-1 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div class="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-8">
            To empower freelancers worldwide by providing them with a platform that not only helps them showcase their skills but also finds them the
            perfect match for their expertise. Alanced is more than a freelancing website; it's a movement. A movement to balance the scales of work,
            opportunity, and life.
          </h1>
          <h1 className="font-inter text-xl  text-blue-600 text-left font-semibold">Join Us Now And Start Your Journey</h1>
          <div className="mt-8">
            <Link to="/projects">
              <span class="inline-block text-sm px-8 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-4 font-semibold">
                Find Work
              </span>
            </Link>
            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]">
              <Link to="/view-all/freelancer">
                <button class="px-8 py-1 bg-[#E2F9EE]">
                  <p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[6px]">
                    Find Talent
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default AboutUs;
