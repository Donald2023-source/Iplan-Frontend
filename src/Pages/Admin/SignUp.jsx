import React, { useContext, useEffect } from 'react';
import signup from '../../assets/landing-3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../Context/Context';
import { ThreeDots } from 'react-loader-spinner';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';

const SignUp = () => {
    const { AdminForm, isLoading, isSuccess, adminChange, handleAdminSubmit } = useContext(GeneralContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/lessonPlans');
        }
    }, [isSuccess, navigate]);

    return (
        <>
            <div className='flex lg:flex-row flex-col border lg:w-[75rem] lg:mt-10 shadow-xl rounded-xl md:flex-row mx-auto justify-center gap-10 items-center'>
                <div>
                    <img className='h-[43rem] lg:block hidden mt-3 rounded-lg' src={signup} alt="SignUp page" />
                </div>
                <form onSubmit={handleAdminSubmit} className='flex flex-col gap-8'>
                    <h3 className='text-2xl py-3 font-bold mx-auto'>SIGN UP</h3>
                    <fieldset>
                        <input
                            name="firstName"
                            value={AdminForm.firstName}
                            onChange={adminChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="text"
                            placeholder='Please Enter Your First Name'
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="lastName"
                            value={AdminForm.lastName}
                            onChange={adminChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="text"
                            placeholder='Please enter your last name'
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="email"
                            value={AdminForm.email}
                            onChange={adminChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="email"
                            placeholder='Please enter your email'
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="password"
                            value={AdminForm.password}
                            onChange={adminChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="password"
                            placeholder='Please enter your password'
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="staffId"
                            value={AdminForm.staffId}
                            onChange={adminChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="text"
                            placeholder='Please enter an ID'
                            maxLength={4}
                        />
                    </fieldset>
                    <fieldset>
                        <input
                            name="adminKey"
                            value={AdminForm.adminKey}
                            onChange={adminChange}
                            className='p-4 w-[23rem] md:w-[20rem] lg:w-[30rem] rounded-lg border border-gray-400'
                            type="text"
                            placeholder='Create your Admin key'
                            maxLength={4}
                        />
                    </fieldset>
                    <button type='submit' className='border p-2 w-32 mx-auto rounded-lg text-white bg-black'>Sign Up</button>
                </form>
            </div>
            <div className={isSuccess ? "h-screen inset-0 fixed opacity-70 bg-black" : 'hidden'}/>

                {isSuccess && (
                     <div  className='flex absolute right-0 left-0 top-52 flex-col items-center gap-4 bg-white shadow-lg p-10 border w-[20rem] rounded-lg mx-auto'>
                     <FaCheckCircle size={80} color='green'/>
                     <h2 className='font-medium'>Sign Up SuccessFul!</h2>
                     </div>
                )}
           

            <div className='bg-black h-[43rem] lg:flex md:flex rounded-lg left-[18%] hidden w-[28.8rem] opacity-70 absolute top-[3.3rem]' />
            <div className='absolute top-20 md:block flex justify-around w-screen py-3 lg:block'>
                <h2 className='text-orange-500 font-bold lg:absolute lg:text-2xl left-[29.8%] top-[43%] lg:top-[43%]'><Link to={'/signup'}>Sign Up</Link></h2>
                <h2 className='lg:text-white lg:absolute lg:text-2xl left-[30.8%] top-[43%] lg:top-[53%]'><Link to={'/adminLogin'}>Login</Link></h2>
                <h2 className='lg:text-white lg:absolute lg:text-xl left-[30.8%] cursor-pointer underline top-[43%] lg:top-[80%]'><Link to={'/signUp'}>User</Link></h2>
            </div>
            {isLoading && (
                <div style={{ height: '100vh', width: '100vw', backgroundColor: 'black', opacity: '0.92', position: 'absolute', top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ThreeDots visible={true} height="80" width="80" color="white" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass=""/>
                </div>
            )}
        </>
    );
};

export default SignUp;
