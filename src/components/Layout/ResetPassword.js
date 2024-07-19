import React from 'react'
import logo from '../../components/images/Alanced.png'
import chooseoption from '../../components/images/chooseoption.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ResetPasswordAction } from '../../redux/User/UserAction'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'

const ResetPassword = () => {

  const { uid, token } = useParams();

  const initialUserState = {
    password: '',
    password2:''
  }

  const [resetuserpass, setResetUserPass] = useState(initialUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetpass = useSelector(state => state.user.resetpass);
  const [show, toogleShow] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

    useEffect(() => {
      if (resetpass) {
          setResetUserPass(initialUserState); 
      }
  }, [resetpass]);

//   const Loader = () =>{
//     if(resetpass==false || resetpass == true){
//         toogleShow(false)
//         navigate('/login')
//     }
//     return(
//         <>
//         <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
//         </>
//     )
// }
  
  const ResetUserPassword = () => {

    if (!resetuserpass.password || !resetuserpass.password2) {
      toast.error("Both Fields are Required");
      return;
  }

    const formData = new URLSearchParams();
    formData.append("password",resetuserpass.password);
    formData.append("password2",resetuserpass.password2);
  

    dispatch(ResetPasswordAction(uid, token,formData));
    // toogleShow(true)
}

const onChange = e =>{
    setResetUserPass({
        ...resetuserpass,[e.target.name]: e.target.value
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
   <div class="bg-white shadow-lg p-10 pt-7 lg:w-[550px] lg:h-[340px] h-[460px] w-[350px] max-w-2xl border border-blue-300">
   <h3 className='text-center font-cardo mb-8 text-xl'>Reset Your Password</h3>
   <div className='text-left'>
   <label class="text-sm font-cardo">
      New Password <span class="text-red-500">*</span>
  </label>
   </div>
  <div class="relative">
      <input 
        type={showPassword1 ? "text" : "password"} 
        className='border mt-2 mb-5 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
        placeholder='•••••••••••' 
        name='password' 
        onChange={onChange} 
        value={resetuserpass.password}
      />
      <span onClick={togglePasswordVisibility1} class="absolute inset-y-0 mb-2.5 right-0 pr-3 flex items-center cursor-pointer">
        <i className={`fa ${showPassword1 ? 'fa-eye' : 'fa-eye-slash'} text-blue-600`}></i>
      </span>
    </div>
   {/* <input type="password" className='border mt-2 mb-5 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='•••••••••••' name='password' onChange={onChange} value={resetuserpass.password}/> */}
   <div className='text-left'>
   <label class="text-sm font-cardo">
     Confirm New Password <span class="text-red-500">*</span>
  </label>
   </div>
  <div class="relative">
      <input 
        type={showPassword2 ? "text" : "password"} 
        className='border mt-2 mb-5 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' 
        placeholder='•••••••••••' 
        name='password2' 
        onChange={onChange} 
        value={resetuserpass.password2}
      />
      <span onClick={togglePasswordVisibility2} class="absolute inset-y-0 mb-1 right-0 pr-3 flex items-center cursor-pointer">
      <i className={`fa ${showPassword2 ? 'fa-eye' : 'fa-eye-slash'} text-blue-600`}></i>
      </span>
    </div>
   {/* <input type="password" className='border mt-2 mb-5 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='•••••••••••' name='password2' onChange={onChange} value={resetuserpass.password2}/> */}
   <button onClick={ResetUserPassword}
    class="block w-full px-4 py-2 mt-2 text-sm leading-5 text-center transition-colors duration-150 border border-none rounded-md  focus:outline-none focus:shadow-outline-blue bg-gradient-to-r from-[#0909E9] to-[#00D4FF]  text-white font-semibold">Reset Password</button>
   </div>
</div>
  )
}

export default ResetPassword