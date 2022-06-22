import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer, Slide, } from 'react-toastify';
import {
  LandingPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  LoginPage,
  Shop,
  CollectionsPage,
  MarketPlacePage,
  Products,
  NotFound
} from "../pages/index"
import { Header } from '../components/Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config/config.json"
import { NavBar } from '../components/Navbar/Navbar';
import { useNavBar } from '../context/navbar';
import { useAuth } from '../features/auth/authSlice';
import { AppDispatch } from './store';

function App() {
  const productName = config.header['product-name'];
  const location = useLocation();
  const navBarContext = useNavBar();
  const authState = useAuth();

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
        <Route path="*" element={<NotFound />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/login' element={
          authState.isLoggedIn ? <Navigate to='/shop' replace /> : <LoginPage />
        } />
        <Route path='/marketplace/*' element={<MarketPlacePage />} />
        <Route path='/register' element={
          authState.isLoggedIn ? <Navigate to='/shop' replace /> : <RegisterPage />
        } />
        <Route path='/collections' element={<CollectionsPage />}>
          <Route path=':collection' element={<CollectionsPage />} />
        </Route>
        <Route path='/forgot-password' element={
          authState.isLoggedIn ? <Navigate to='/shop' replace /> : <ForgotPasswordPage />
        } />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='/products' element={<Products />} >
          <Route path=':productId' element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;
