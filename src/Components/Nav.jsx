import { useState, useEffect } from "react"
import { FaBars, FaBookReader, FaClock, FaHome, FaUserAlt, FaUserClock } from "react-icons/fa"
import { Link } from "react-router-dom"
const Nav = () => {
    const [nav, setNav] = useState(false)

    const handleToggleNav = () => {
        setNav(!nav)
    };

    const [time, setTime] = useState(new Date());

    //  console.log(time.toTimeString())
     useEffect(() => {
      setInterval(() => setTime(new Date()))
     }, [])

    return (
        <>
        <div>
            <nav className="flex justify-between mx-auto mt-1 rounded-lg w-[98%] px-5 lg:px-20 bg-white py-2 shadow items-center">
                <h2></h2>
                <h2 className="flex items-center gap-3"><FaClock size={15} color="gray"/>{time.toLocaleTimeString()}</h2>
                <FaBars className="cursor-pointer" onClick={handleToggleNav} size={25} color="black"/>
            </nav>

            <div>
                <ul className={nav ? "flex flex-col gap-6  absolute right-2 lg:right-20 shadow-lg rounded-lg bg-white w-52 px-4 items-end" : 'hidden'}>
                    
                    <Link to={'/adminDashboard'}>
                         <li className="flex items-center hover:bg-blue-500 w-[100%] justify-between transition duration-500 rounded-lg cursor-pointer hover:text-white gap-3 py-2 px-3">
                        Home
                        <FaHome size={20} color="blue"/>
                        </li>
                        </Link>

                        <Link to={'/lessonPlans'}>
                        <li className="flex gap-3 hover:bg-blue-500 w-[100%] justify-between transition duration-500 rounded-lg  hover:text-white py-2 cursor-pointer px-3">
                        Lesson Plans
                        <FaBookReader size={20} color="blue "/>
                        </li>
                        </Link>
                    

                    <Link to={'/users'}>
                    <li className="flex hover:bg-blue-500 w-[100%] justify-between transition duration-500 rounded-lg  hover:text-white gap-4 cursor-pointer py-2 px-3">
                        Users
                        <FaUserAlt size={20} color="blue "/>
                        </li>
                    </Link>
                    
                </ul>
            </div>
        </div>
        </>
    )
}
export default Nav