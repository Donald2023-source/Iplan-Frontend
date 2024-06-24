import React, { useContext, useEffect, useState } from 'react';
import signup from '../../assets/landing-3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../Context/Context';
import { ThreeDots } from 'react-loader-spinner';
import check from '../../assets/check_3699516.png'

const LoginAdmin = () => {
  const { AdminLoginChange, handleAdminloginSubmit, AdminLoginForm, isLoading, isSuccess } = useContext(GeneralContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
        
        navigate('/adminDashboard')
    } else {
        console.log('error')
    }
  }, [])
  return (
    <>
      <div>
        <div className='flex lg:flex-row flex-col border lg:w-[75rem] lg:mt-10 shadow-xl rounded-xl md:flex-row mx-auto justify-center gap-10 items-center'>
          <div>
            <img className='h-[43rem] mt-3 rounded-lg' src={signup} alt="SignUp page" />
          </div>
          <form className='flex flex-col gap-10' onSubmit={handleAdminloginSubmit}>
            <h3 className='text-2xl font-bold mx-auto'>Welcome Back!</h3>
    
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
            

            <button type='submit' className='border p-2 w-32 mx-auto rounded-lg text-white bg-black'>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <div className='bg-black h-[43rem] lg:flex md:flex rounded-lg left-[18%] w-[28.8rem] opacity-70 absolute top-[3.3rem]' />
        <div>
          <h2 className='text-white absolute text-2xl left-[29.8%] top-[43%] lg:top-[43%]'>
            <Link to={'/adminSignUp'}>Sign Up</Link>
          </h2>
          <h2 className='text-orange-500 font-bold absolute text-2xl left-[30.8%] top-[43%] lg:top-[53%]'>
            <Link to={'/adminLogin'}>Login</Link>
          </h2>
          <h2 className='text-white absolute text-xl left-[30.8%] cursor-pointer underline top-[43%] lg:top-[80%]'>
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
