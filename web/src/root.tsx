import React, { useMemo } from 'react';
import App from './app/App';
import { RootState } from './app/store'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { Provider as URQLProvider, dedupExchange } from 'urql'
import { getURQLClient } from "./utils/getURQLClient"
import { NavBarProvider } from './context/navbar';


export const Root = () => {

    const authState = useSelector((state: RootState) => state.auth);
    /*eslint-disable */
    const client = useMemo(() => getURQLClient(), [authState]); // client creation optimization
    /*eslint-enable */
    return (
        <React.StrictMode>
            <URQLProvider value={client ?? getURQLClient()} >
                <NavBarProvider>
                    <BrowserRouter>
                        <ChakraProvider theme={theme}>
                            <App />
                        </ChakraProvider>
                    </BrowserRouter>
                </NavBarProvider>
            </URQLProvider>
        </React.StrictMode>
    );
}
