import React, { useEffect } from 'react';
import App from './app/App';
import { RootState, store } from './app/store'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import './index.css'
import { createClient, fetchExchange, Provider as URQLProvider, dedupExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache';
import { getURQLClient } from "./utils/getURQLClient"


export const Root = () => {

    const authState = useSelector((state: RootState) => state.auth);
    let client = getURQLClient();
    useEffect(() => {
        client = getURQLClient();
    }, [authState])


    return (
        <React.StrictMode>
            <URQLProvider value={client} >
                <BrowserRouter>
                    <ChakraProvider theme={theme}>
                        <App />
                    </ChakraProvider>
                </BrowserRouter>
            </URQLProvider>
        </React.StrictMode>
    );
}
