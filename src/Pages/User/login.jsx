import React, { useContext, useEffect, useState } from 'react';
import page from '../../assets/Page.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../Context/Context';

const LoginUser = () => {
  const { setUser, isLoading, isSuccess, setIsSuccess, setIsLoading } = useContext(GeneralContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/lessonPlans');
    }
  }, [isSuccess, navigate]);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login Successful:', data);
        setIsLoading(false);
        setIsSuccess(true);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/userDashboard');
      } else {
        console.error('Error logging in user:', data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-[#252b632f] h-screen flex px-2 items-center justify-center'>
      <div className='flex flex-col md:flex-row lg:flex-row justify-center gap-10 bg-white items-center md:p-3 p-10 lg:p-3 rounded-lg h-fit shadow-xl w-screen lg:w-[80%] lg:mx-auto'>
        <div className='flex flex-col w-screen px-4 lg:w-[60%]'>
          <h2 className='text-3xl font-medium text-center mb-4'>Welcome Back!</h2>
          <form className='flex flex-col gap-12 justify-center  lg:px-10' onSubmit={handleSubmit}>
            <fieldset className='flex flex-col gap-1'>
              <label className='font-bold ml-2'>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder='Please enter your email'
                className='border-gray-200 border p-3 rounded-xl'
                required
              />
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <label className='font-bold ml-2'>Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder='Please enter your password'
                className='border-gray-200 border p-3 rounded-xl'
                required
              />
            </fieldset>

            <button
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
        </div>

        <div className='hidden lg:block md:block'>
          <img className='rounded-l-2xl h-[40rem]' src={page} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
