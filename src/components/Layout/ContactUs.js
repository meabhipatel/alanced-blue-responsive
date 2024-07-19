import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import HomeSection4 from "./HomeSection4";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddUserContactAction } from "../../redux/User/UserAction";
import { toast } from "react-toastify";

const ContactUs = () => {
  const initialUserState = {
    Applicant_Name: "",
    Applicant_Email: "",
    Applicant_Contact: "",
    Message: "",
  };

  const [addUser, setAddUser] = useState(initialUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adduser = useSelector((state) => state.user.adduser);
  const [show, toogleShow] = useState(false);

  useEffect(() => {
    if (adduser) {
      setAddUser(initialUserState);
    }
  }, [adduser]);

  const Loader = () => {
    if (adduser == false || adduser == true) {
      toogleShow(false);
      navigate("/contact-us");
    }
    return (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
      </>
    );
  };

  const validateContact = (contact) => {
    if (isNaN(contact)) {
      return false;
    }
    if (contact.length !== 10) {
      return false;
    }
    return true;
  };

  const AddUserContact = () => {
    if (
      !addUser.Applicant_Name ||
      !addUser.Applicant_Email ||
      !addUser.Applicant_Contact ||
      !addUser.Message
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!validateContact(addUser.Applicant_Contact)) {
      toast.error("Enter a valid Contact Number with 10 digits");
      return;
    }

    if (!addUser.Applicant_Email) {
      toast.error("Email is Required");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("Applicant_Email", addUser.Applicant_Email);
    formData.append("Applicant_Name", addUser.Applicant_Name);
    formData.append("Applicant_Contact", addUser.Applicant_Contact);
    formData.append("Message", addUser.Message);

    dispatch(AddUserContactAction(formData));
    toogleShow(true);
  };

  const onChange = (e) => {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">
          Contact Us
        </h1>
        <div className="my-2 bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left py-5 px-8">
          <h1 className="font-inter text-md  text-[#031136] text-left font-semibold py-2">
            Welcome to alanced -{" "}
            <span className="font-normal opacity-40">
              where freelancing finds balance. Whether you're a business looking
              to hire top-notch talent or a freelancer seeking exciting
              opportunities, we're here to help.
            </span>
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-5">
            For Freelancers:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-1">
            If you have questions about signing up, profile optimization, or any
            other queries, please don’t hesitate to reach out.
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-5">
            For Businesses:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-1">
            Looking for the perfect freelancer or have a question about posting
            a job? Let us know, and we’ll guide you through it.
          </h1>
          <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-5">
            General Inquiries:
          </h1>
          <h1 className="font-inter text-md text-[#031136] text-left font-normal opacity-40 py-1">
            For any general inquiries, partnership opportunities, or feedback,
            we're all ears.
          </h1>
          <h1 className="font-cardo text-[26px] text-[#031136] text-left font-semibold pt-4">
            Get Started
          </h1>
          <div class="w-28 mt-1 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
            <div class="border-gray-600 border-b-2 rounded-lg"></div>
          </div>
          <div class="md:flex my-4">
            <div class="flex-1 py-4">
              <input
                type="text"
                className="border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Your Name"
                name="Applicant_Name"
                onChange={onChange}
                value={addUser.Applicant_Name}
              />
              <input
                type="text"
                className="border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Email"
                name="Applicant_Email"
                onChange={onChange}
                value={addUser.Applicant_Email}
              />
              <input
                type="text"
                className="border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Phone"
                name="Applicant_Contact"
                onChange={onChange}
                value={addUser.Applicant_Contact}
              />
              <textarea
                id=""
                cols="30"
                rows="4"
                className="border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Your Message"
                name="Message"
                onChange={onChange}
                value={addUser.Message}
              ></textarea>
              <Link to="/contact-us" onClick={AddUserContact}>
                <span class="w-full inline-block px-8 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-4 font-semibold text-center text-md">
                  {show ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </span>
              </Link>
            </div>
            <div class="flex-1 px-8">
              <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-5">
                Reach Out Directly:
              </h1>
              <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pt-4">
                <i class="bi bi-telephone-fill text-blue-600 mr-1"></i> Phone:{" "}
                <span className="font-normal opacity-40">+91 907-498-7922</span>
              </h1>
              <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pt-1">
                <i class="bi bi-envelope-at text-blue-600 mr-1"></i> Email:{" "}
                <span className="font-normal opacity-40">info@wiz91.com</span>
              </h1>
              <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-5">
                Our Location:
              </h1>
              <h1 className="font-inter text-md text-[#031136] text-left font-normal pt-4">
                <i class="bi bi-geo-alt-fill text-blue-600 mr-1"></i>
                <span className="opacity-40">
                  {" "}
                  Wiz91 Technologies, 202, Krishna Classic, AB Rd, above AXIS
                  Bank, Phadnis Colony, Indore, Madhya Pradesh 452001
                </span>
                {/* <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-5">Business Hours:</h1>
  <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pt-4"><i class="bi bi-alarm text-blue-600 mr-1"></i> Monday - Friday: <span className='font-normal opacity-40'>9am - 6pm</span></h1>
  <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pt-1"><i class="bi bi-bell-slash text-blue-600 mr-1"></i> Saturday & Sunday:  <span className='font-normal opacity-40'>Closed</span></h1> */}
                <h1 className="font-inter text-lg  text-[#031136] text-left font-semibold pt-5">
                  Stay Connected:
                </h1>
                <h1 className="font-inter text-md text-[#031136] text-left font-normal pt-3 opacity-40">
                  Follow us on WhatsApp for the latest updates and news from
                  alanced.
                </h1>
                <h1 className="font-inter text-md  text-[#031136] text-left font-semibold pt-4">
                  <i class="bi bi-whatsapp text-blue-600 mr-1"></i> WhatsApp:{" "}
                  <span className="font-normal opacity-40">
                    +91 860-269-4727
                  </span>
                </h1>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default ContactUs;
