import React from 'react'
import LandingPage from './Components/LandingPage'
import './App.css'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import SignUp from './Pages/User/SignUp'
import { GeneralProvider } from './Context/Context'

import AdminSignUp from './Pages/Admin/SignUp'
import AdminLogin from './Pages/Admin/login'
import LoginUser from './Pages/User/login'
import UserDashboard from './Pages/User/UserDashboard'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import LessonPlans from './Pages/Admin/LessonPlans'
import Users from './Pages/Admin/Users'
const App = () => {
  return (
    <>
    <GeneralProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/userlogin' element={<LoginUser/>}/>
        <Route path='/adminsignup' element={<AdminSignUp/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/userDashboard' element={<UserDashboard/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/lessonPlans' element={<LessonPlans/>}/>
        <Route path='/users' element={<Users/>}/>
        
      </Routes>
    </BrowserRouter>
    </GeneralProvider>
    </>
  )
}

export default App