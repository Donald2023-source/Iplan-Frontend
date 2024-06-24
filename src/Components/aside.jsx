import { FaCube, FaHeadphonesAlt , FaBook, FaUser } from "react-icons/fa"
import logo from '../assets/Logo.jpg'
import { Link } from "react-router-dom"
import { useState } from "react"
const Aside = () => {
  const[isActive, setIsActive] = useState(false)
  const updateActive = () => {
    setIsActive(!isActive)
  }
    return (
        <>
        <div>
        <aside className='w-[242px]  bg-[#dbdbdb76] h-screen lg:w-[20rem]'>
          <div className="flex items-center gap-4 py-6 justify-center">
            <img className="h-8 rounded-[50%]" src={logo} alt="" />
            <h2 className="font-medium text-2xl">Iplan</h2>
          </div>
<div className="flex flex-col justify-between h-[80%]">
          <ul className="flex flex-col gap-10 py-4">
            <li className="flex gap-6 px-3 py-2 ml-6 font-medium cursor-pointer transition duration-300 hover:text-[#FF5151] ease-in-out">
           <FaCube  color="gray" size={20}/>
              <h4>
                <Link to={"/adminDashboard"}>
                Dashboard
                </Link>
                </h4>
            </li>

            <li className="flex gap-6 px-3 py-2 ml-6 font-medium cursor-pointer transition duration-300 hover:text-[#FF5151] ease-in-out ">
              <FaBook  color="gray" size={20}/>
           <h4>  <Link to={"/lessonPlans"}>Lesson Plans</Link></h4>
            </li>

            <li className="flex gap-6 px-3 py-2 ml-6 font-medium cursor-pointer transition duration-300 hover:text-[#FF5151] ease-in-out">
              <FaUser color="gray" size={20}/>
              <h4>Users</h4>
            </li>
          </ul>
          <hr className="border border-[#00000054] mx-36" />

         <ul>
          <li className="flex items-center hover:text-[#FF5151] gap-6 ml-12 cursor-pointer">
            <FaHeadphonesAlt color="gray" size={20}/>
            Support</li>
         </ul>
         </div>
        </aside>
        </div>
        </>
    )
}
export default Aside