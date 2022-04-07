import { Box, Flex } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../features/theme/themeSlice"
import { Text, Link as ChakraLink } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import React, { useEffect } from "react";

const Link: React.FC<{ title: string, isActive: boolean, path: string, dark: boolean }> = ({ title, isActive, path, dark }) => {
    const nvaigate = useNavigate();
    return isActive ? <ChakraLink color={dark ? "white" : "black"} whiteSpace='nowrap' fontSize='sm' onClick={() => nvaigate(path)}>{title}</ChakraLink> : <Text whiteSpace='nowrap' color={dark ? "#c084fc" : '#a855f7'} fontSize='sm' cursor={'default'} >{title}</Text>
}

const Slash: React.FC<{ dark: boolean }> = ({ dark }) => <Text
    fontWeight='bold'
    fontSize='xs'
    p='1'
    color={dark ? "whiteAlpha.600" : "grey"}
>/</Text>

export const RouteInfoBar: React.FC<{}> = () => {
    const themeState = useTheme();
    let location = useLocation();
    let routes = location.pathname.substring(1).split('/').filter(r => r.length > 0);
    const completeRoutes: Array<string> = [];
    let prefix = ''
    routes.forEach(r => {
        const completeRoute = prefix.concat('/', r);
        completeRoutes.push(completeRoute);
        prefix = completeRoute
    })
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
                dark={themeState.theme === "dark"}
                isActive={true}
                title='Home'
                path="/"
            />
            <Slash dark={themeState.theme === "dark"} />
            <Flex
                alignItems='center'
                justifyContent='center'
            >
                {
                    routes.map((r, i) => {
                        return (
                            <Flex
                                key={uuidv4()}
                                flexDirection='row'
                                alignItems='center'
                            >
                                <Link
                                    dark={themeState.theme === "dark"}
                                    isActive={i != routes.length - 1}
                                    title={r}
                                    path={completeRoutes[i]}
                                />
                                {i != routes.length - 1 && <Slash dark={themeState.theme === "dark"} />}
                            </Flex>
                        )
                    })
                }
            </Flex>
        </Flex>
    )
}