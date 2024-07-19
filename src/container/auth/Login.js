import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../redux/Auth/AuthAction";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../../components/images/loginimg.png";
import google from "../../components/images/google.png";
import logo from "../../components/images/Alanced.png";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = (props) => {
  const [authDetails, setAuthDetails] = React.useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, toogleShow] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);
  const login = useSelector((state) => state.login.Login);

  const Loader = () => {
    if (login == false || login == true) {
      toogleShow(false);
    }
    return (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
      </>
    );
  };

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const onChange = (e) => {
    setAuthDetails({ ...authDetails, [e.target.name]: e.target.value });
  };

  const LoginButton = async () => {
    const uname = document.getElementById("uname").value;
    const upass = document.getElementById("upass").value;
    // const login = await login
    if (uname.trim().length && upass.trim().length != 0) {
      toogleShow(true);
    } else if (!(uname.trim().length && upass.trim().length)) {
      toast.error("Email and password Both fields are required");
      return;
    } else {
      toogleShow(false);
    }
    localStorage.setItem("loginMethod", "traditional");
    toogleShow(true);
    dispatch(LoginAction(authDetails, navigate, rememberMe));
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expiry = new Date(localStorage.getItem("tokenExpiry"));

    if (token && new Date() < expiry) {
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiry");
    }
  }, []);

  // const checkEmailExists = async (email) => {
  //     const response = await axios.post('https://aparnawiz91.pythonanywhere.com/account/check-email/', { email });
  //     return response.data.exists;
  // };

  // const logins = useGoogleLogin({
  //     onSuccess: async respose => {
  //         try {
  //             const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //                 headers: {
  //                     "Authorization": `Bearer ${respose.access_token}`
  //                 }
  //             })

  //             const emailExists = await checkEmailExists(res.data.email);
  //             if (emailExists) {
  //                 navigate('/freelancer/profile');
  //                 localStorage.setItem('googleUserName', res.data.name);
  //                 localStorage.setItem('isLoggedIn', 'true');
  //                 localStorage.setItem('loginMethod', 'google');
  //                 console.log(res.data.email, "userinfo");
  //             } else {
  //                 toast.error("You're not a Registered user, Please signup first.");
  //             }

  //         } catch (err) {
  //             console.log(err)

  //         }

  //     }
  // });

  //----- updated code commented Below ,which is to be applied with checkemail-API updation -----

  // const checkEmailExists = async (email,type) => {
  //     const response = await axios.post('http://51.21.1.122:8000/account/check-email/', { email ,type });
  //     return response.data;
  // };

  // const logins = useGoogleLogin({
  //     onSuccess: async response => {
  //         try {
  //             const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //                 headers: {
  //                     "Authorization": `Bearer ${response.access_token}`
  //                 }
  //             });
  //             const emailCheckResponse = await checkEmailExists(res.data.email);

  //             if (emailCheckResponse.exists) {
  //                 localStorage.setItem('googleUserName', res.data.name);
  //                 localStorage.setItem('isLoggedIn', 'true');
  //                 localStorage.setItem('loginMethod', 'google');
  //                 localStorage.setItem('loginType', emailCheckResponse.type);
  //                 console.log(emailCheckResponse.type,"ckhfff")
  //                 // Navigate based on user type
  //                 if (emailCheckResponse.type === 'FREELANCER') {
  //                     navigate('/freelancer/profile');
  //                 } else if (emailCheckResponse.type === 'HIRER') {
  //                     navigate('/hirer/profile');
  //                 } else {
  //                     toast.error("Invalid user type. Please contact support.");
  //                 }

  //             } else {
  //                 toast.error("You're not a Registered user, Please signup first.");
  //             }

  //         } catch (err) {
  //             console.log(err);
  //             toast.error("Something went wrong. Please try again.");
  //         }
  //     }
  // });

  const checkEmailExists = async (email, type) => {
    const response = await axios.post("https://www.api.alanced.com/account/check-email/", { email, type });
    return response.data;
  };

  //   const handleGoogleLogin = async (response, userType) => {
  const logins = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const googleProfile = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });

        const emailCheckResponse = await checkEmailExists(googleProfile.data.email);

        if (emailCheckResponse.exists) {
          const payload = {
            email: googleProfile.data.email,
            type: emailCheckResponse.type,
          };

          const loginResponse = await axios.post("https://www.api.alanced.com/account/google-login/", payload);

          if (loginResponse.data.data && loginResponse.data.data.token.access) {
            const jwtToken = loginResponse.data.data.token.access;
            const logindata = loginResponse.data.data.login_data;
            console.log(logindata, "chklogindataafterlogin");

            localStorage.setItem("googleUserName", googleProfile.data.name);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loginMethod", "google");
            localStorage.setItem("loginType", emailCheckResponse.type);
            localStorage.setItem("jwtToken", jwtToken);
            localStorage.setItem("logindata", JSON.stringify(logindata));

            // Navigate based on user type
            if (emailCheckResponse.type === "FREELANCER") {
              navigate("/freelancer/profile");
            } else if (emailCheckResponse.type === "HIRER") {
              navigate("/hirer/profile");
            } else {
              toast.error("Invalid user type. Please contact support.");
            }
          } else {
            toast.error("Google login failed. Please try again.");
          }
        } else {
          toast.error("You're not a Registered user, Please signup first.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <>
      <div className="flex items-center w-full min-h-screen bg-gray-50">
        <div className="flex h-full lg:max-w-4xl w-full mx-auto bg-white">
          {/* <div className="flex flex-col md:flex-row"> */}
          <div className="relative w-full md:w-[45%] hidden lg:block">
            <img className="w-full h-full md:h-auto image" src={loginimg} alt="img" />
            <Link to="/">
              <div className="absolute rounded-tr rounded-br rounded-tl-none rounded-bl-none top-[29px] left-[18%] sm:left-1/4 md:left-[73.2px] transform -translate-x-1/2 flex items-center space-x-2 lg:bg-white bg-[#E2F9EE] p-3">
                <img src={logo} alt="Logo" className="h-5 w-5 md:h-6 md:w-6" />
                <span className="font-semibold text-[15px] tracking-widest ml-2 font-poppins text-[#031136] md:text-[16px]">ALANCED</span>
              </div>
            </Link>
          </div>

          <div className="w-full h-screen lg:h-auto flex items-center justify-center px-4 sm:px-14 lg:w-[55%] mt-8 md:mt-0">
            <div className="w-full">
              {/* <div> */}
              <Link className="lg:hidden block" to="/">
                <div className="w-full items-center justify-center mb-6 flex gap-2">
                  <img src={logo} alt="Logo" className="h-6 w-6" />
                  <span className="font-semibold text-[20px] tracking-widest ml-2 font-poppins text-[#031136]">ALANCED</span>
                </div>
              </Link>
              {/* </div> */}
              <div class="flex items-center float-end">
                <p className="inline-block text-nowrap text-xs">Don't have an account?</p>
                <Link to="/sign-up">
                  <span class="inline-block text-sm ml-4 mb-6 py-[10px] min-w-24 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded text-white font-semibold">
                    Sign Up
                  </span>
                </Link>
              </div>

              <h1 class="mb-4 text-xl text-left mt-10 font-cardo text-gray-700">
                Welcome Sign In to <br />
                Learn Encourage Share , Continue.
              </h1>
              <div>
                <label class="block text-sm text-left font-cardo">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  class="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="example@gmail.com"
                  id="uname"
                  onChange={onChange}
                  name="email"
                  required
                />
              </div>
              <div>
                <label class="block mt-4 text-sm text-left font-cardo">
                  Password <span class="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={inputType}
                    class="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="•••••••••••"
                    name="password"
                    id="upass"
                    onChange={onChange}
                    required
                  />
                  <button onClick={togglePasswordVisibility} className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <i className={`fa ${inputType === "password" ? "fa-eye-slash" : "fa-eye"} text-blue-600`}></i>
                  </button>
                </div>
              </div>
              <div class="mb-6 mt-4 text-left flex justify-between items-center">
                <label class="flex items-center font-inter">
                  <input class="mr-2 leading-tight accent-blue-600" type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} />
                  <span class="text-xs">Remember me</span>
                </label>
                <Link to="/reset-password">
                  <span class="text-xs font-inter text-yellow-400">Reset Password</span>
                </Link>
              </div>
              <button
                class="block w-full px-4 py-2 mt-4 text-sm leading-5 text-center transition-colors duration-150 border border-none rounded-lg  focus:outline-none focus:shadow-outline-blue bg-gradient-to-r from-[#0909E9] to-[#00D4FF]  text-white font-semibold"
                href="#"
                onClick={LoginButton}
              >
                {show ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div class="flex items-center">
                <div class="flex-1 border-t-2 my-8"></div>
                <span class="px-4 bg-white font-jost">or</span>
                <div class="flex-1 border-t-2 my-8"></div>
              </div>

              <button
                class=" w-full px-4 py-2 text-sm leading-5 text-center transition-colors duration-150 border border-gray-200 rounded-lg focus:outline-none focus:shadow-outline-blue bg-white text-black font-semibold flex items-center justify-center font-jost"
                onClick={logins}
              >
                <img src={google} alt="" class="mr-2" /> Sign In with Google
              </button>
              <p className="text-xs pt-2 font-inter">
                Don't have an account?{" "}
                <Link to="/sign-up">
                  <span className="text-yellow-400">Create an account</span>
                </Link>{" "}
                It takes less than a minute.
              </p>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
