import * as React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer, Slide, } from 'react-toastify';
import {
  LandingPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  LoginPage,
  Shop,
  MarketPlacePage
} from "../pages/index"
import { Header } from '../components/Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config/config.json"
import { NavBar } from '../components/Navbar/Navbar';
import { useNavBar } from '../context/navbar';

function App() {
  const productName = config.header['product-name'];
  const location = useLocation();
  const navBarContext = useNavBar();
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
        limit={3}
      />
      {location.pathname !== '/' && <Header title={productName} />}
      {navBarContext?.isNavBarOpen && <NavBar />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/marketplace/*' element={<MarketPlacePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
}


export default App;
