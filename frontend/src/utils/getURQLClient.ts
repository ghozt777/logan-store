import { Client, createClient, dedupExchange, fetchExchange } from "urql";
import config from "../config/config.json"
import { cacheExchange } from '@urql/exchange-graphcache';
import { Product } from "../generated/graphql";
import { nanoid } from "@reduxjs/toolkit";

export const getURQLClient = (): Client => {
    console.log(process.env.REACT_APP_URQL_HOST_ENV);
    let client = createClient({
        url: process.env.REACT_APP_URQL_HOST_ENV === 'prod' ? `${config.urql.prod.host}/graphql` : `${config.urql.development.host}:${config.urql.development.port}/graphql`,
        exchanges: [dedupExchange, cacheExchange({
            updates: {
                Mutation: {
                    logout: (result: any, args: any, cache: any, info: any) => {
                        // ...
                        console.log('logout mutation occured');
                    },
                }
            },
            keys: {
                Product: (p: any) => p.productId,
                Inventory: () => nanoid(),
                Brand: (b: any) => b.name
            }
        }), fetchExchange],
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
    return client;
}