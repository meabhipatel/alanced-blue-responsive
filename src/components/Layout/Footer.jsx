import React, { useEffect } from "react";
import logo from "../images/Alanced-footer.png";
import linkedin from "../images/linkedin.png";
import twitter from "../images/twitter.png";
import fb from "../images/fb.png";
import arrow from "../images/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AddUserSubscriptionAction } from "../../redux/User/UserAction";
import { toast } from "react-toastify";

const Footer = () => {
  const initialUserState = {
    email: "",
  };

  const [addUserSub, setAddUserSub] = useState(initialUserState);
  const dispatch = useDispatch();

  const addsub = useSelector((state) => state.user.addsub);

  useEffect(() => {
    if (addsub) {
      setAddUserSub(initialUserState);
    }
  }, [addsub]);

  const AddUserSubscribe = () => {
    if (!addUserSub.email) {
      toast.error("Email is Required");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("email", addUserSub.email);

    dispatch(AddUserSubscriptionAction(formData));
  };

  const onChange = (e) => {
    setAddUserSub({
      ...addUserSub,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer className="footer-1 bg-whit py-8 sm:py-12 ">
      <div className="w-full px-5 lg:px-10">
        {/* ---> footer navigations  */}
        <div className="w-full grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <div className="p-1 md:p-4 text-left">
            <h5 className="text-xl font-bold mb-6">Company Info</h5>
            <ul className="list-none footer-links text-gray-500">
              <Link to="/about-us">
                <li className="mb-2 hover:text-blue-600 hover:underline">About us</li>
              </Link>
              <Link to="/contact-us">
                <li className="mb-2 hover:text-blue-600 hover:underline">Contact us</li>
              </Link>
              <Link to="/safety-security" onClick={() => window.scroll(0, 0)}>
                <li className="mb-2 hover:text-blue-600 hover:underline">Safety & Security</li>
              </Link>
            </ul>
          </div>
          <div className="p-1 md:p-4 text-left">
            <h5 className="text-xl font-bold mb-6">About</h5>
            <ul className="list-none footer-links text-gray-500">
              <Link to="/enterprises">
                <li className="mb-2 hover:text-blue-600 hover:underline">Enterprise </li>
              </Link>
              <Link to="/FAQ">
                <li className="mb-2 hover:text-blue-600 hover:underline">FAQ</li>
              </Link>
              <Link to="/why-alanced">
                <li className="mb-2 hover:text-blue-600 hover:underline">Alanced Foundation</li>
              </Link>
            </ul>
          </div>
          <div className="p-1 md:p-4 text-left">
            <h5 className="text-xl font-bold mb-6">Policies</h5>
            <ul className="list-none footer-links text-gray-500">
              <Link to="/terms">
                <li className="mb-2 hover:text-blue-600 hover:underline">Terms</li>
              </Link>
              <Link to="/privacy-policy">
                <li className="mb-2 hover:text-blue-600 hover:underline">Privacy</li>
              </Link>
              <Link to="/cookies">
                <li className="mb-2 hover:text-blue-600 hover:underline">Cookies</li>
              </Link>
            </ul>
          </div>
          <div className="p-1 md:p-4 col-span-2">
            <div className="w-full bg-[#F4F5F9] p-2 -mt-6">
              <h5 className="text-xl font-bold pt-[22px] text-start ml-[23px]">Subscribe</h5>
              <div className="w-full flex items-center px-2 mt-5">
                <input
                  type="email"
                  className="w-full h-10 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Email Address"
                  name="email"
                  onChange={onChange}
                  value={addUserSub.email}
                />
                <button
                  className="w-12 h-10 inline-block text-sm px-4 py-[12px] lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold"
                  onClick={AddUserSubscribe}
                >
                  <img src={arrow} alt="" />
                </button>
              </div>

              <p className="text-[14px] pt-3 text-left pl-6 opacity-50">
                Hello, we are Lift Media. Our goal is to translate <br />
                the positive effects from revolutionizing how <br /> companies engage with their clients & their <br /> team.
              </p>
            </div>
          </div>
        </div>

        <hr className="mx-4 my-6 sm:mx-5" />
        {/* ---> footer copyrights text  */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 px-4 ">
          <div className="flex-1 flex justify-start p-4 pl-0 pt-1">
            <Link to="/">
              <div className="md:w-1/6 flex items-center flex-shrink-0">
                <img src={logo} alt="" />
                <span className="font-semibold text-[23px] tracking-widest ml-2 text-[#031136]">ALANCED</span>
              </div>
            </Link>
          </div>
          <div className="flex-1 flex justify-center p-4 pt-1">
            <p className="font-bold text-sm">
              Copyrights © 2024 Alanced <br /> Proudly Created by
              <a href="https://wiz91.com/" target="_blank" className="hover:underline text-orange-600">
                {" "}
                Wiz91 Technologies
              </a>
            </p>
          </div>
          <div className="flex-1 flex justify-end p-4 pr-0 pt-1">
            <div className="flex sm:justify-center xl:justify-start md:justify-end">
              <a
                href="https://in.linkedin.com/company/wiz91-technologies"
                target="blank(_blank)"
                className="w-8 h-8 border-2 border-gray-400 rounded-full text-center py-1 text-gray-600 duration-1000 hover:text-white hover:bg-gradient-to-r from-[#0909E9] to-[#00D4FF] hover:border-[#6f7cf3] "
              >
                <img src={linkedin} alt="" className="ml-2 mt-1" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="blank(_blank)"
                className="w-8 h-8 border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-gradient-to-r from-[#0909E9] to-[#00D4FF] hover:border-[#6f7cf3] duration-300"
              >
                <img src={fb} alt="" className="ml-2.5 mt-1" />
              </a>
              <a
                href="https://twitter.com/"
                target="blank(_blank)"
                className="w-8 h-8 border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-gradient-to-r from-[#0909E9] to-[#00D4FF] hover:border-[#6f7cf3] duration-1000"
              >
                <img src={twitter} alt="" className="ml-2 mt-1.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
