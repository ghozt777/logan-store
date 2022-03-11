import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import {
  LandingPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  LoginPage
} from "../pages/index"
import { Header } from '../components/Header/Header';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
      <Header title='Logan Store' />
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
