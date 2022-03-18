import * as React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer, Slide, } from 'react-toastify';
import {
  LandingPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  LoginPage
} from "../pages/index"
import { Header } from '../components/Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config/config.json"

function App() {
  const productName = config.header['product-name'];
  const location = useLocation();
  return (
    <>
      <ToastContainer
        transition={Slide}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {location.pathname !== '/' && <Header title={productName} />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
}


export default App;
