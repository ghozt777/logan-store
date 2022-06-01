import React, { createContext, useContext, useState } from "react";
import { NavBarDTO } from "./navbar.dto";

export const NavbarContext = createContext<NavBarDTO | null>(null);

export const useNavBar = () => useContext(NavbarContext);

export const NavBarProvider: React.FC<{}> = ({ children }) => {
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    return (
        <NavbarContext.Provider value={{
            isNavBarOpen,
            setIsNavBarOpen
        }} >
            {
                children
            }
        </NavbarContext.Provider>
    )
}





