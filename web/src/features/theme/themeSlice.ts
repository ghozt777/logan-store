import { createSlice } from "@reduxjs/toolkit";

export interface ThemeSlice {
    theme: "dark" | "light";
    setBy: "default" | "user";
}

const initialState: ThemeSlice = {
    theme: new Date().getHours() > 6 && new Date().getHours() < 18 ? "light" : "dark",
    setBy: "default"
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: state => {
            state.setBy = "user"
            state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light'
        }
    }
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer