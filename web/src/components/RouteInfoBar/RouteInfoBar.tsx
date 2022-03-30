import { Flex } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../features/theme/themeSlice"
import { Text, Link as ChakraLink } from '@chakra-ui/react'
import React from "react";

const Link: React.FC<{ title: string, isActive: boolean, path: string }> = ({ title, isActive, path }) => {
    const nvaigate = useNavigate();
    return isActive ? <ChakraLink fontSize='sm' onClick={() => nvaigate(path)}>{title}</ChakraLink> : <Text fontSize='sm' cursor={'default'} >{title}</Text>
}

export const RouteInfoBar: React.FC<{}> = () => {
    const themeState = useTheme();
    const location = useLocation();
    const routes = location.pathname.substring(1).split('/')
    return (
        <Flex
            h='3rem'
            w='90%'
            m='0.5rem auto'
            bg={`routeInfo-bar.${themeState.theme}`}
            boxShadow='base'
            rounded='md'
            alignItems='center'
            justifyContent='center'
        >
            <Link
                isActive={true}
                title='Home'
                path="/"
            />
        </Flex>
    )
}