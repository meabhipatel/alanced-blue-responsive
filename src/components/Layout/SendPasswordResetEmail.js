import React from 'react'
import logo from '../../components/images/Alanced.png'
import chooseoption from '../../components/images/chooseoption.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ForgotPasswordAction } from '../../redux/User/UserAction'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'

const SendPasswordResetEmail = () => {

  const initialUserState = {
    email: ''
  }

  const [forgetuserpass, setForgetUserPass] = useState(initialUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgotpass = useSelector(state => state.user.forgotpass);
  const [show, toogleShow] = useState(false);

    useEffect(() => {
      if (forgotpass) {
          setForgetUserPass(initialUserState); 
      }
  }, [forgotpass]);

  const Loader = () =>{
    if( forgotpass==false || forgotpass == true){
        toogleShow(false)
        navigate('/reset-password')
    }
    return(
        <>
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
        </>
    )
}
  
  const ForgotPassword = () => {

    if (!forgetuserpass.email) {
      toast.error("Email is Required");
      return;
  }

    const formData = new URLSearchParams();
    formData.append("email",forgetuserpass.email);
  

    dispatch(ForgotPasswordAction(formData));
    toogleShow(true)
}

const onChange = e =>{
    setForgetUserPass({
        ...forgetuserpass,[e.target.name]: e.target.value
    });
}


  return (
    <div className="h-screen flex items-center justify-center relative" style={{ 
        backgroundImage: `url(${chooseoption})`,
        backgroundSize: '850px 550px',  
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}>
   <Link to='/' onClick={() => {window.scrollTo(0, 0);}}>
    <div className="absolute lg:rounded-tr lg:rounded-br lg:rounded-tl-none lg:rounded-bl-none top-[50px] left-1/2 sm:left-1/4 md:left-[331.2px] transform -translate-x-1/2 flex items-center space-x-2 lg:bg-white bg-[#E2F9EE] p-3">
        <img src={logo} alt="Logo" className="h-5 w-5 md:h-6 md:w-6" /> 
        <span className="font-semibold text-[15px] tracking-widest ml-2 font-poppins text-[#031136] md:text-[16px]">ALANCED</span>
    </div> 
</Link>
   <div class="bg-white shadow-lg p-10 pt-8 lg:w-[550px] lg:h-[340px] h-[460px] w-[350px] max-w-2xl flex flex-col items-center border border-blue-300">
   <h3 className='text-center font-cardo text-xl'>Reset Password</h3>
   <div class="w-32 mb-6 mt-1 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>
   <p className="text-md pt-2.5 font-cardo text-left">Enter your email address and we will send you a link to reset your password.</p>
   <input type="email" className='border my-5 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Email Address' name='email' onChange={onChange} value={forgetuserpass.email}/>
   <button onClick={ForgotPassword} 
    class="block w-full px-4 py-2 mt-4 text-sm leading-5 text-center transition-colors duration-150 border border-none rounded-md  focus:outline-none focus:shadow-outline-blue bg-gradient-to-r from-[#0909E9] to-[#00D4FF]  text-white font-semibold">{show ? <div><Loader/></div> : "Send Password Reset Email"}
</button>
   </div>
</div>
  )
}

export default SendPasswordResetEmail