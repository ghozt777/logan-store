import { Flex } from "@chakra-ui/react"
import { useState } from "react";
import { useNavBar } from "../../context/navbar";
import { Nav } from "./Components/Nav/Nav";

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = () => {

    const navBarContext = useNavBar();
    return (
        <Flex
            h='100vh'
            w='100%'
            minH='500px'
            backgroundColor='transparent'
            zIndex={99999999}
            position='fixed'
            backdropFilter='blur(10px)'
            onClick={() => navBarContext?.setIsNavBarOpen(false)}
        >
            <Nav />
        </Flex>
    )
}