import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ResendVerifyEmail from '../pages/ResendVerifyEmail'
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/verify-email' element={<VerifyEmail/>}></Route>
            <Route path='/resend-verify-email' element={<ResendVerifyEmail/>}></Route>
            <Route path='/' element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router