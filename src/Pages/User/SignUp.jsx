import React, { useContext, useState } from 'react';
import signup from '../../assets/landing-3.jpg';
import { Link } from 'react-router-dom';
import { GeneralContext } from '../../Context/Context';
import { ThreeDots } from 'react-loader-spinner';

const SignUp = () => {
        const {form, isLoading, isSuccess, handleChange, handleSubmit} = useContext(GeneralContext)
    return (
        <>
            <div className='flex lg:flex-row flex-col border lg:w-[75rem] lg:mt-10 shadow-xl rounded-xl md:flex-row mx-auto justify-center gap-10 items-center'>
                <div>
                    <img className='h-[43rem]  mt-3 rounded-lg' src={signup} alt="SignUp page" />
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                    <h3 className='text-2xl font-bold mx-auto'>SIGN UP</h3>
                    <fieldset>
                        <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="text"
                            placeholder='Please Enter Your First Name'
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="text"
                            placeholder='Please enter your last name'
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="email"
                            placeholder='Please enter your email'
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="password"
                            placeholder='Please enter your password'
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="staffId"
                            value={form.staffId}
                            onChange={handleChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="text"
                            placeholder='Please enter an ID'
                            maxLength={4}
                        />
                    </fieldset>
                    <button type='submit' className='border p-2 w-32 mx-auto rounded-lg text-white bg-black'>Sign Up</button>
                </form>
            </div>
            <div className='bg-black h-[43rem] lg:flex md:flex rounded-lg left-[18%] w-[28.8rem] opacity-70 absolute top-[3.3rem]' />
            <div>
                <h2 className='text-orange-500 font-bold absolute text-2xl left-[29.8%] top-[43%] lg:top-[43%]'><Link to={'/signup'}>Sign Up</Link></h2>
                <h2 className='text-white absolute text-2xl left-[30.8%] top-[43%] lg:top-[53%]'><Link to={'/userlogin'}>Login</Link></h2>
                <h2 className='text-white absolute text-xl left-[30.8%] cursor-pointer underline top-[43%] lg:top-[80%]'><Link to={'/adminsignup'}>Admin</Link></h2>
            </div>
            {isSuccess ?  <div>
                <h2>SuccessFul</h2>
            </div> : '' }
           
            {isLoading ? (
                 <div style={{"height": '100vh', 'width': '100vw', 'backgroundColor': 'black', 'opacity': '0.92', position : 'absolute', top: '0', display: "flex", justifyContent: 'center', alignItems:'center'}}>
            <ThreeDots visible={true} height="80" width="80" color="white" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}}wrapperClass=""/>
            </div>     
            ) : (console.log('Not Loading'))}
      
        </>
    );
};

export default SignUp;
