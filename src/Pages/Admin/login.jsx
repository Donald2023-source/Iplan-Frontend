import React, { useContext, useEffect, useState } from 'react';
import page from '../../assets/Page.jpg';
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
      if(isSuccess) {
        navigate('/lessonPlans')
      }
    }, [isSuccess, navigate])
  }
  return (
    <>
      <div className='bg-[#252b632f] h-screen flex px-2 items-center justify-center'>
      <div className='flex flex-col md:flex-row lg:flex-row justify-center gap-10 bg-white items-center md:p-3 p-10 lg:p-3 rounded-lg h-fit shadow-xl w-screen lg:w-[80%] lg:mx-auto'>
        <div className='flex flex-col w-screen px-4 lg:w-[60%]'>
          <h2 className='text-3xl font-medium text-center mb-4'>Welcome Back!</h2>
       
    <form className='flex flex-col gap-12 justify-center  lg:px-10' onSubmit={handleAdminloginSubmit}>
            <fieldset  className='flex flex-col gap-1'>
            <label className='font-bold ml-2'>Email</label>
              <input
                name="email"
                value={AdminLoginForm.email}
                onChange={AdminLoginChange}
                type="email"
                placeholder='Please enter your email'
                className='border-gray-200 border p-3 rounded-xl'
                required
              />
            </fieldset>

            <fieldset  className='flex flex-col gap-1'>
            <label className='font-bold ml-2'>Password</label>
              <input
                name="password"
                value={AdminLoginForm.password}
                onChange={AdminLoginChange}
                type="password"
                placeholder='Please enter your password'
                className='border-gray-200 border p-3 rounded-xl'
                required
              />
            </fieldset>

            
            <fieldset  className='flex flex-col gap-1'>
            <label className='font-bold ml-2'>Admin Key</label>
              <input
                name="adminKey"
                value={AdminLoginChange.adminKey}
                onChange={AdminLoginChange}
                type="text"
                placeholder='Please enter your admin Key'
                className='border-gray-200 border p-3 rounded-xl'
                required
              />
            </fieldset>
            

            <button
            onClick={redirectFunction}
              className='border mx-auto p-2 w-full lg:w-96 bg-[#252b63] text-white rounded-xl'
              type='submit'
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
  
          <div className='flex flex-col items-center gap-4 mt-4'>
            <span className='flex justify-center py-4 gap-5'>
              <h4>I don't have an Account?</h4>
              <Link to={'/signup'}>
                <h4 className='text-[#252b63] font-bold'>Sign Up</h4>
              </Link>
            </span>
            <Link to={'/adminSignup'}>
              <h4 className='text-center'>Admin?</h4>
            </Link>
          </div>

        <div className={isSuccess ? "h-screen inset-0 fixed opacity-70 bg-black" : 'hidden'}/>

        <div className='hidden lg:block md:block'>
          <img className='rounded-l-2xl h-[50rem]' src={page} alt="Login" />
          </div>

          </div>
</div>
        {isSuccess && (
       <div  className='flex absolute right-0 left-0 top-52 flex-col items-center gap-4  bg-white shadow-lg p-10 border w-[20rem] rounded-lg mx-auto'>
       <FaCheckCircle size={80} color='green'/>
         <h2 className='font-medium'>Sign Up SuccessFul!</h2>
          </div>
        )}
    
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
   
    </>
  );
}

export default LoginAdmin;
