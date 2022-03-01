import { Route, Routes } from 'react-router-dom'
import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { Navbar } from '../components/index';
import 'react-toastify/dist/ReactToastify.css';
import {
  LandingPage,
  LoginPage,
  RegisterPage
} from "../pages/index"
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { usePingServer } from '../hooks/pingServer';


function App() {
  const themeState = useSelector((state: RootState) => state.theme)
  usePingServer();
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
      // theme={`${themeState.theme === "light" ? "colored" : "dark"}`} 
      />
      <Navbar title='Logan Store' />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </>
  );
}


export default App;
