import { createSlice } from '@reduxjs/toolkit'

export interface AuthSlice {
    currentState: string;
    isLoggedIn: boolean;
    isMakingRequest: boolean;
    error: string[];
}

const initialState: AuthSlice = {
    currentState: "INIT",
    isLoggedIn: false,
    isMakingRequest: false,
    error: []
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },

    extraReducers: {

    }
})

// export const { } = authSlice.actions;
export default authSlice.reducer;
