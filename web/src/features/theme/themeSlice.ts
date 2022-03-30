import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export interface ThemeSlice {
    theme: "dark" | "light";
    setBy: "default" | "user";
}

const initialState: ThemeSlice = {
    theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme') as string).theme : new Date().getHours() > 6 && new Date().getHours() < 18 ? "light" : "dark",
    setBy: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme') as string).setBy : "default"
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: state => {
            state.setBy = "user"
            state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light'
            localStorage.setItem('theme', JSON.stringify(state));
        }
    }
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer
export const useTheme = () => useSelector((state: RootState) => state.theme)