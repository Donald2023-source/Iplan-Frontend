import React, { useContext, useEffect } from 'react';
import page from '../../assets/Page.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../Context/Context';
import { ThreeDots } from 'react-loader-spinner';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';

const SignUp = () => {
    const { AdminForm, isLoading, isSuccess, adminChange, handleAdminSubmit } = useContext(GeneralContext);
        const navigate = useNavigate();

        const redirectFunction = () => {
         useEffect(() => {
            if (isSuccess) {
                navigate('/lessonPlans');
            }
        }, [isSuccess, navigate]);   
        }
        

    return (
        <>
          <div className='bg-[#252b632f] h-screen flex px-2 items-center justify-center'>
      <div className='flex flex-col md:flex-row lg:flex-row justify-center gap-10 bg-white items-center md:p-3 p-10 lg:p-3 rounded-lg h-fit shadow-xl w-screen lg:w-[80%] lg:mx-auto'>
        <div className='flex flex-col w-screen px-4 lg:w-[60%]'>
                <form onSubmit={handleAdminSubmit} className='flex flex-col gap-2'>
                    <h3 className='text-2xl py-3 font-bold mx-auto'>SIGN UP</h3>
                    <fieldset className='flex flex-col gap-1'>
                    <label className='font-medium'>First Name</label>
                        <input
                            name="firstName"
                            value={AdminForm.firstName}
                            onChange={adminChange}
                            type="text"
                            className='border-gray-200 border p-3 rounded-xl'
                            placeholder='Please Enter Your First Name'
                        />
                    </fieldset>

                    <fieldset className='flex flex-col gap-1'>
                    <label className='font-medium'>Last Name</label>
                        <input
                            name="lastName"
                            value={AdminForm.lastName}
                            onChange={adminChange}
                            type="text"
                            className='border-gray-200 border p-3 rounded-xl'
                            placeholder='Please enter your last name'
                        />
                    </fieldset>

                    <fieldset className='flex flex-col gap-1'>
                    <label className='font-medium'>Email</label>
                        <input
                            name="email"
                            value={AdminForm.email}
                            onChange={adminChange}
                            className='border-gray-200 border p-3 rounded-xl'
                            type="email"
                            placeholder='Please enter your email'
                        />
                    </fieldset>

                    <fieldset className='flex flex-col gap-1'>
                    <label className='font-medium'>Password</label>
                        <input
                            name="password"
                            value={AdminForm.password}
                            onChange={adminChange}
                            className='border-gray-200 border p-3 rounded-xl'
                            type="password"
                            placeholder='Please enter your password'
                        />
                    </fieldset>
                    <fieldset className='flex flex-col gap-1'>
                    <label className='font-medium'>Staff Id</label>
                        <input
                            name="staffId"
                            value={AdminForm.staffId}
                            onChange={adminChange}
                            className='border-gray-200 border p-3 rounded-xl'
                            type="text"
                            placeholder='Please enter an ID'
                            maxLength={4}
                        />
                    </fieldset>
                    <fieldset className='flex flex-col gap-1'>
                    <label className='font-medium'>Admin Key</label>
                        <input
                            name="adminKey"
                            value={AdminForm.adminKey}
                            onChange={adminChange}
                            className='border-gray-200 border p-3 rounded-xl'
                            type="text"
                            placeholder='Create your Admin key'
                            maxLength={4}
                        />
                    </fieldset>
                                 
            <button 
            onClick={redirectFunction}
              className='border mx-auto p-2 w-full lg:w-96 bg-[#252b63] text-white rounded-xl'
              type='submit'
            >
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
                </form>

                <div className='flex flex-col items-center gap-4 mt-4'>
            <span className='flex justify-center py-4 gap-5'>
              <h4>Already have an Account?</h4>
              <Link to={'/adminLogin'}>
                <h4 className='text-[#252b63] font-bold'>Login</h4>
              </Link>
            </span>
            <Link to={'/signUp'}>
              <h4 className='text-center'>User?</h4>
            </Link>
          </div>
          </div>

<div className='hidden lg:block md:block'>
          <img className='rounded-l-2xl h-[45rem]' src={page} alt="Login" />
        </div>
</div>
</div>
            
            <div className={isSuccess ? "h-screen inset-0 fixed opacity-70 bg-black" : 'hidden'}/>

                {isSuccess && (
                     <div  className='flex absolute right-0 left-0 top-52 flex-col items-center gap-4 bg-white shadow-lg p-10 border w-[20rem] rounded-lg mx-auto'>
                     <FaCheckCircle size={80} color='green'/>
                     <h2 className='font-medium'>Sign Up SuccessFul!</h2>
                     </div>
                )}

            {isLoading && (
                <div style={{ height: '100vh', width: '100vw', backgroundColor: 'black', opacity: '0.92', position: 'absolute', top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ThreeDots visible={true} height="80" width="80" color="white" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass=""/>
                </div>
            )}
        </>
    );
};

export default SignUp;
