import { Flex } from "@chakra-ui/react"
import { useState } from "react";
import { useNavBar } from "../../context/navbar";
import { Nav } from "./Components/Nav/Nav";

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = () => {

    const navBarContext = useNavBar();
    console.log('isNavBarOpen props: ', navBarContext?.isNavBarOpen);
    return (
        <Flex
            h='100vh'
            w='100%'
            backgroundColor='transparent'
            zIndex='69'
            position='fixed'
            onClick={() => navBarContext?.setIsNavBarOpen(false)}
        >
            <Nav />
        </Flex>
    )
}