import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthSlice {
    isLoggedIn: boolean;
    isMakingRequest: boolean;
    errors: any[];
    token: string;
}


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
        successAuth: (state, action: PayloadAction<{ accessToken: string; }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.accessToken
            state.errors = []
            console.log(state)
            localStorage.setItem('auth', JSON.stringify(state))
        },
        faliureAuth: (state, action: PayloadAction<any>) => {
            state.isLoggedIn = false;
            state.errors = action.payload.errors
            state.token = ""
            localStorage.setItem('auth', JSON.stringify(state))
        }
    }
})

export const { successAuth, faliureAuth } = authSlice.actions;
export default authSlice.reducer;
