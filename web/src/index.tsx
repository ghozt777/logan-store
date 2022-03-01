import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import './index.css'
import { createClient, Provider as URQLProvider } from 'urql'
import { authExchange } from '@urql/exchange-auth'


const client = createClient({
  url: `${process.env.REACT_APP_URQL_HOST_URL}:${process.env.REACT_APP_URQL_HOST_PORT}/graphql`,
  fetchOptions: () => {
    const storedAuthState = JSON.parse(localStorage.getItem('auth') as string);
    if (storedAuthState) {
      return {
        headers: {
          "Authorization": storedAuthState.token
        }
      }
    }
    return {}
  }
})


ReactDOM.render(
  <React.StrictMode>
    <URQLProvider value={client} >
      <BrowserRouter>
        <Provider store={store} >
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </Provider>
      </BrowserRouter>
    </URQLProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
