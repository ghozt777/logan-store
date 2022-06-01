import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    }
})

export const { successAuth, faliureAuth } = authSlice.actions;
export default authSlice.reducer;
