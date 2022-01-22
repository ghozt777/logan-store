import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
