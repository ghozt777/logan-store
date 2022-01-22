import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Routes } from 'react-router-dom'
import { Navbar } from '../components/Navbar/Navbar';
import { RootState } from './store';

function App() {

  const themeState = useSelector((state: RootState) => state.theme)

  return (
    <Box bg={`main.${themeState.theme}`} w='100vw' h='100vh' overflowX={"hidden"}>
      <Navbar title='Logan Store' />
      <Routes>

      </Routes>
    </Box>
  );
}


export default App;
