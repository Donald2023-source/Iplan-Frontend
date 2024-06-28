import React, { useContext, useEffect, useState } from 'react';
import signup from '../../assets/landing-3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../Context/Context';
import { ThreeDots } from 'react-loader-spinner';
import check from '../../assets/check_3699516.png'
import { FaCheckCircle } from 'react-icons/fa';

const LoginAdmin = () => {
  const { AdminLoginChange, handleAdminloginSubmit, AdminLoginForm, isLoading, isSuccess } = useContext(GeneralContext);
  const navigate = useNavigate()

 const redirectFunction = () => {
  useEffect(() => {
    if (isSuccess) {        
        navigate('/lessonPlans')
    } else {
        console.log('error')
    }
  }, []);
 }


  return (
    <>
      <div>
        <div className='flex lg:flex-row flex-col border lg:w-[75rem] lg:mt-10 shadow-xl rounded-xl md:flex-row mx-auto justify-center lg:py-1 py-10 gap-10 items-center'>
          <div>
            <img className='h-[43rem] lg:block hidden mt-3 rounded-lg' src={signup} alt="SignUp page" />
          </div>
          <form className='flex flex-col gap-10' onSubmit={handleAdminloginSubmit}>
            <h3 className='text-2xl font-bold py-4 mx-auto'>Welcome Back!</h3>
    
            <fieldset>
              <input
                name="email"
                value={AdminLoginForm.email}
                onChange={AdminLoginChange}
                className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                type="email"
                placeholder='Please enter your email'
                required
              />
            </fieldset>

            <fieldset>
              <input
                name="password"
                value={AdminLoginForm.password}
                onChange={AdminLoginChange}
                className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                type="password"
                placeholder='Please enter your password'
                required
              />
            </fieldset>

            
            <fieldset>
              <input
                name="adminKey"
                value={AdminLoginChange.adminKey}
                onChange={AdminLoginChange}
                className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                type="text"
                placeholder='Please enter your admin Key'
                required
              />
            </fieldset>
            

            <button onClick={redirectFunction} type='submit' className='border p-2 w-32 mx-auto rounded-lg text-white bg-black'>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <div className={isSuccess ? "h-screen inset-0 fixed opacity-70 bg-black" : 'hidden'}/>

        {isSuccess && (
       <div  className='flex absolute right-0 left-0 top-52 flex-col items-center gap-4  bg-white shadow-lg p-10 border w-[20rem] rounded-lg mx-auto'>
       <FaCheckCircle size={80} color='green'/>
         <h2 className='font-medium'>Sign Up SuccessFul!</h2>
          </div>
        )}
    

        <div className='bg-black h-[43rem] lg:flex md:flex rounded-lg left-[18%] w-[28.8rem] hidden opacity-70 absolute top-[3.3rem]' />

        <div className='lg:block w-screen flex absolute top-36 justify-around'>
          <h2 className='lg:text-white lg:absolute lg:text-2xl left-[29.8%] top-[43%] lg:top-[43%]'>
            <Link to={'/adminSignUp'}>Sign Up</Link>
          </h2>
          <h2 className='text-orange-500 font-bold lg:absolute lg:text-2xl left-[30.8%] top-[43%] lg:top-[53%]'>
            <Link to={'/adminLogin'}>Login</Link>
          </h2>
          <h2 className='lg:text-white lg:absolute lg:text-xl left-[30.8%] cursor-pointer underline top-[43%] lg:top-[80%]'>
            <Link to={'/signUp'}>User</Link>
          </h2>
        </div>
      </div>
      {isSuccess ? (
        <div className='absolute top-5 left-[50%] bg-black text-white shadow-lg py-3 px-5 rounded'>
          <h2 className='flex items-center gap-2'><img className='h-5' src={check} alt="" />Login Successful</h2>
        </div>
      ) : null}

      {isLoading && (
        <div style={{ height: '100vh', width: '100vw', backgroundColor: 'black', opacity: '0.92', position: 'absolute', top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ThreeDots visible={true} height="80" width="80" color="white" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" />
        </div>
      )}
      <div>
      </div>
    </>
  );
}

export default LoginAdmin;
