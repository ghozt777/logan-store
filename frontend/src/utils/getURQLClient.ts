import { Client, createClient, dedupExchange, fetchExchange } from "urql";
import config from "../config/config.json"
import { cacheExchange } from '@urql/exchange-graphcache';

export const getURQLClient = (): Client => {
    let client = createClient({
        url: `${config.urql.host}:${config.urql.port}/graphql`,
        exchanges: [dedupExchange, cacheExchange({
            updates: {
                Mutation: {
                    logout: (result: any, args: any, cache: any, info: any) => {
                        // ...
                        console.log('logout mutation occured');
                    },
                }
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