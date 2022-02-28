import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
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
      <ToastContainer theme={`${themeState.theme === "light" ? "colored" : "dark"}`} />
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
