import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import config from '../../config/config.json'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const initialAuthentication = createAsyncThunk(
    'auth/initial',
    async () => {
        const auth = JSON.parse(localStorage.getItem('auth') as string);
        if (!auth) return false;
        const auth_gql = {
            "operationName": "CheckAuth",
            "variables": {},
            "query": "query CheckAuth {\n  checkAuth\n}\n"
        };
        const response = await axios({
            url: process.env.REACT_APP_URQL_HOST_ENV === 'prod' ? `${config.urql.prod.host}/graphql` : `${config.urql.development.host}:${config.urql.development.port}/graphql`,
            method: 'POST',
            headers: {
                "authorization": auth.token
            },
            data: auth_gql
        })
        return response.data.data.checkAuth ?? false;
    }
)

export interface AuthSlice {
    isLoggedIn: boolean;
    isMakingRequest: boolean;
    errors: any[];
    token: string;
}

export const logout = createAsyncThunk(`users/logout`, async (logoutQueryExe: any, thunkAPI) => {
    const res = await logoutQueryExe();
    return res;
})


const getInitialState = () => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const initialState: AuthSlice = {
        isLoggedIn: false,
        isMakingRequest: false,
        errors: [],
        token: ""
    }
    if (auth) {
        initialState.isLoggedIn = auth.isLoggedIn;
        initialState.token = auth.token;
    }
    return initialState
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        successAuth: (state: AuthSlice, action: PayloadAction<{ accessToken: string; }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.accessToken
            state.errors = []
            console.log(state)
            localStorage.setItem('auth', JSON.stringify(state))
        },
        faliureAuth: (state: AuthSlice, action: PayloadAction<any>) => {
            state.isLoggedIn = false;
            state.errors = action.payload.errors
            state.token = ""
            localStorage.setItem('auth', JSON.stringify(state))
        },

    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state, action) => {
            state.errors = [];
            state.isLoggedIn = false;
            state.token = "";
            state.isMakingRequest = false;
            if (action.payload.data.logout) {
                localStorage.removeItem('auth');
                console.log('logout success', state);
            }
        })
        builder.addCase(logout.rejected, (state, action) => {
            console.error('logout unsuccessful with response: ', action.payload);
        })

        builder.addCase(initialAuthentication.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload;
            if (!action.payload) {
                state.isLoggedIn = false;
                state.token = ""
                localStorage.setItem('auth', JSON.stringify(state))
            }
        })

        builder.addCase(initialAuthentication.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.token = ""
            localStorage.setItem('auth', JSON.stringify(state))
        })
    }
})

export const { successAuth, faliureAuth } = authSlice.actions;
export const useAuth = () => useSelector((state: RootState) => state.auth)
export default authSlice.reducer;
