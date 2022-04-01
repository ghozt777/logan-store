import { Box, Flex } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../features/theme/themeSlice"
import { Text, Link as ChakraLink } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import React, { useEffect } from "react";

const Link: React.FC<{ title: string, isActive: boolean, path: string }> = ({ title, isActive, path }) => {
    const nvaigate = useNavigate();
    return isActive ? <ChakraLink whiteSpace='nowrap' fontSize='sm' onClick={() => nvaigate(path)}>{title}</ChakraLink> : <Text whiteSpace='nowrap' color='#a855f7' fontSize='sm' cursor={'default'} >{title}</Text>
}

const Slash = () => <Text
    fontSize='xs'
    p='1'
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
                isActive={true}
                title='Home'
                path="/"
            />
            <Slash />
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
                                    isActive={i != routes.length - 1}
                                    title={r}
                                    path={completeRoutes[i]}
                                />
                                {i != routes.length - 1 && <Slash />}
                            </Flex>
                        )
                    })
                }
            </Flex>
        </Flex>
    )
}