import React from 'react'
import SignupPage from '../Pages/SignupPage'
import LoginPage from '../Pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import ProfilePage from '../Pages/ProfilePage'
import PrivateRoute from '../Components/PrivateRoute'
import MyStorePage from '../Pages/MyStorePage'
import AllProductsPage from '../Pages/AllProductsPage'

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
      <Route path={"/profile"} element={
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      } />
      <Route path={"/mystore"} element={
        <PrivateRoute>
          <MyStorePage />
        </PrivateRoute>
      } />
      <Route path={"/allProducts"} element={
        <PrivateRoute>
          <AllProductsPage />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default AllRoutes