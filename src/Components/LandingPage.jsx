import React from 'react'
import image1 from '../assets/landing.jpg'
import image2 from '../assets/landing-2.jpg'
import image3 from '../assets/landing-3.jpg'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation' 
const LandingPage = () => {
  return (
    <>
    <div>
        <div className='flex h-screen relative overflow-hidden'>
            
            <img className='' src={image1} alt="" />
            <img className='' src={image1} alt="" />
            <img className='' src={image1} alt="" />
        </div>
        <div className='bg-black absolute top-0 opacity-80 h-screen w-screen'/>

        <div className='absolute lg:left-[24%] top-[40%] flex flex-col gap-2 items-center px-2 text-white'>
            <h4 className='lg:text-4xl text-xl lg:text-center'><TypeAnimation
      sequence={[
        'Welcome to Iplan',
        5000,
        ''
       ]}
      wrapper="span"
      speed={10}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  </h4>
            <p className='py-3 lg:text-lg text-sm text-center'>A suitable Platform to help to submit and keep record of your educational schedule for each session</p>
            <button className='flex lg:mx-auto shadow-xl w-fit bg-black rounded-lg text-white p-3 hover:scale-100'>
              <Link to={'/userLogin'}>
              Get Started
              </Link>
              </button>
        </div>
    </div>
    </>
  )
}

export default LandingPage