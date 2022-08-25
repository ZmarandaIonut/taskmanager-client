import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/verify-email' element={<VerifyEmail/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router