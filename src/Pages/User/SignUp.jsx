import React, { useContext, useEffect, useState } from 'react';
import page from '../../assets/Page.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../Context/Context';
import { ThreeDots } from 'react-loader-spinner';
import { FaCheckCircle } from 'react-icons/fa';
import ErrorComponent from '../../Components/ErrorComponent';

const SignUp = () => {
        const {form, isLoading, isSuccess, handleChange, handleSubmit, message, isFailed} = useContext(GeneralContext)

        const navigate = useNavigate();

        useEffect(() => {
          if (isSuccess) {
            navigate('/userDashboard');
          }
        }, [isSuccess, navigate]);

    return (
        <>
       <div className='bg-[#252b632f] h-screen flex px-2 items-center justify-center'>
      <div className='flex flex-col md:flex-row lg:flex-row justify-center gap-10 bg-white items-center md:p-3 p-10 lg:p-3 rounded-lg h-fit shadow-xl w-screen lg:w-[80%] lg:mx-auto'>
        <div className='flex flex-col w-screen px-4 lg:w-[50%]'>
            <form className='flex flex-col gap-8 justify-center lg:px-10' onSubmit={handleSubmit} >
            <h2 className='text-3xl font-medium text-center lg:mb-4'>Sign Up</h2>

                    <fieldset className='flex flex-col gap-1'>
                    {/* <label className='font-normal'>First Name</label> */}
                        <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className='border-gray-200 border p-3 rounded-xl'
                            type="text"
                            placeholder='Please Enter Your First Name'
                            required
                        />
                    </fieldset>
                    <fieldset className='flex flex-col gap-1'>
                        {/* <label className='font-normal'>Last Name</label> */}
                        <input
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className='border-gray-200 border p-3 rounded-xl'
                            type="text"
                            placeholder='Please enter your last name'
                            required
                        />
                    </fieldset>
                    <fieldset className='flex flex-col gap-1'>
                        {/* <label className='font-normal'>Email</label> */}
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className='border-gray-200 border p-3 rounded-xl'
                            type="email"
                            placeholder='Please enter your email'
                            required
                        />
                    </fieldset>
                    <fieldset className='flex flex-col gap-1'>
                        {/* <label className='font-normal' >Password</label> */}
                        <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type="password"
                            className='border-gray-200 border p-3 rounded-xl'
                            placeholder='Please enter your password'
                            required
                        />
                    </fieldset>
                    <fieldset className='flex flex-col gap-1'>
                        {/* <label className='font-normal'>Staff Id</label> */}
                        <input
                            name="staffId"
                            value={form.staffId}
                            onChange={handleChange}
                           className='border-gray-200 border p-3 rounded-xl'
                            type="text"
                            placeholder='Please enter an ID'
                            maxLength={4}
                            required
                        />
                    </fieldset>
                    
            <button 
              className='border mx-auto p-2 w-full lg:w-96 bg-[#252b63] text-white rounded-xl'
              type='submit'
            >
              {isLoading ? 'Signing Up...' : 'SignUp'}
            </button>
         
                </form>

                <div className='flex flex-col items-center gap-4 mt-4'>
            <span className='flex justify-center py-4 gap-5'>
              <h4>Already have an Account?</h4>
              <Link to={'/userLogin'}>
                <h4 className='text-[#252b63] font-bold'>Login</h4>
              </Link>
            </span>
            <Link to={'/adminSignup'}>
              <h4 className='text-center'>Admin?</h4>
            </Link>
          </div>
</div>
<div className='hidden lg:block md:block'>
          <img className='rounded-l-2xl h-[40rem]' src={page} alt="Login" />
        </div>
</div>
</div>

        <div className={isSuccess ? "h-screen inset-0 fixed opacity-70 bg-black" : 'hidden'}/>

        <div  className={isSuccess ? 'flex absolute right-0 left-0 top-52 flex-col items-center gap-4 bg-white shadow-lg p-10 border w-[20rem] rounded-lg mx-auto' : 'hidden'}>
        <FaCheckCircle size={80} color='green'/>
        <h2 className='font-medium'>Sign Up SuccessFul!</h2>
            </div>

            {isFailed && (<ErrorComponent Error={message}/>)}
           
            {isLoading ? (
                 <div style={{"height": '100vh', 'width': '100vw', 'backgroundColor': 'black', 'opacity': '0.92', position : 'absolute', top: '0', display: "flex", justifyContent: 'center', alignItems:'center'}}>
            <ThreeDots visible={true} height="80" width="80" color="white" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}}wrapperClass=""/>
            </div>     
            ) : (console.log('Not Loading'))}
      
        </>
    );
};

export default SignUp;
