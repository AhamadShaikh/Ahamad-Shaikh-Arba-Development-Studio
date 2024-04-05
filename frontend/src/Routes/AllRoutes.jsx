import React from 'react'
import SignupPage from '../Pages/SignupPage'
import LoginPage from '../Pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import ProfilePage from '../Pages/ProfilePage'
import CartPage from '../Pages/CartPage'
import PrivateRoute from '../Components/PrivateRoute'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/signup"} element={<SignupPage />} />
      <Route path={"/"} element={<LoginPage />} />
      <Route path={"/home"} element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      } />
      <Route path={"/profile"} element={<ProfilePage />} />
      <Route path={"/cart"} element={<CartPage />} />
    </Routes>
  )
}

export default AllRoutes