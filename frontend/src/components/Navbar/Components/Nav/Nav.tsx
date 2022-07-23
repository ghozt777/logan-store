import { Avatar, Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import styled from "styled-components";
import { Fade } from 'react-awesome-reveal'
import { MavSvg } from "../../../../assets/images/Mav.svg";
import { useTheme } from "../../../../features/theme/themeSlice"
import { useWhoAmIQuery } from "../../../../generated/graphql";
import { getAavatarUrl } from "../../../../utils/getAvatarUrl";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import config from '../../../../config/config.json'
import './style.css'
import { useNavBar } from "../../../../context/navbar";
import { IconsMap } from "./Icons";

const Categories = styled.div`
    height: 60% ;
    width: 100% ;
    display: flex ;
    flex-direction: column ;
    justify-content: space-evenly ;
`

const Separator: React.FC<{ theme: "light" | "dark" }> = ({ theme }) => <Box rounded='lg' h='2px' w='80%' m='0 auto' bg={theme === 'light' ? 'grey' : 'white'} />

const Banner = () => {
    const themeState = useTheme();
    return (
        <Flex
            h='10%'
            w='100%'
            pb='3rem'
            alignItems='center'
            justifyContent='space-between'
            flexDirection='column'
        >
            <Flex
                mt='3rem'
                h='40%'
                w='90%'
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'
            >
                {
                    themeState.theme === 'dark' ?
                        (
                            <Flex
                                rounded={'lg'}
                                shadow="lg"
                                pt='2px'
                                bg='#ddd6fe'
                                alignItems={'center'}
                                justifyContent='center'
                            >
                                <MavSvg />
                            </Flex>
                        ) : (
                            <Flex
                                pt='2px'
                                bg='transparent'
                                alignItems={'center'}
                                justifyContent='center'
                            >
                                <MavSvg />
                            </Flex>
                        )
                }
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='5rem'
                    w='50%'
                >
                    <Text
                        color={themeState.theme === 'dark' ? 'white' : 'black'}
                        fontSize={"2.1rem"}
                        className="asthetic-text-ii"
                    >
                        Logan Store
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

const UserInfo = () => {
    const themeState = useTheme();
    const [res] = useWhoAmIQuery()
    let url: string = getAavatarUrl(res.data?.whoami.username.split(' ')[0] ?? "unknown")
    return (
        <Flex
            h='10%'
            w='100%'
            position='absolute'
            bottom='0'
            p='10px 20px'
            mb='20px'
            alignItems='center'
            justifyContent='space-evenly'
        >
            <Avatar boxShadow='lg' src={url} />
            <Flex
                h='90%'
                w='60%'
                textAlign='center'
                justifyContent='space-evenly'
                boxShadow='lg'
                flexDirection='column'
                rounded='md'
                color={themeState.theme === 'dark' ? 'white' : 'black'}
            >
                <Text>{res.data?.whoami.username ?? "guest"}</Text>
                <Separator theme={themeState.theme} />
                <Text>{res.data?.whoami.email ?? "----"}</Text>
            </Flex>
        </Flex>
    )
}

interface NavCardProps {
    title: string;
    to: string;
    icon: string;
}

const NavCard: React.FC<NavCardProps> = ({ title, to, icon }) => {
    const navigate = useNavigate();
    const themeState = useTheme();
    const navContext = useNavBar();
    const setIsNavBarOpen = navContext?.setIsNavBarOpen
    return (
        <Flex
            h='10%'
            w='80%'
            bg={themeState.theme === 'light' ? '#f9fafb' : '#a78bfa'}
            shadow={'base'}
            rounded='md'
            alignItems='center'
            justifyContent='space-evenly'
            cursor={'pointer'}
            onClick={() => {
                setIsNavBarOpen && setIsNavBarOpen(false)
                navigate(to)
            }}
        >
            {IconsMap.get(icon)}
            <Box
                w='70%'
                textAlign={'center'}
            >
                <Text
                    className='asthetic-text'
                    color={themeState.theme === 'dark' ? 'white' : 'black'}
                    fontWeight='bold'
                    fontSize='xl'
                >{title}</Text>
            </Box>
        </Flex >
    )
}

const NavMenu: React.FC<{}> = (props) => {
    return (
        <Flex
            h='75%'
            w='100%'
            alignItems='center'
            justifyContent={'space-evenly'}
            flexDir='column'
        >
            {props.children}
        </Flex>
    )
}

export const Nav: React.FC<{}> = ({ children: categories }) => {
    const themeState = useTheme();
    const [isGreaterThen1200, isGreaterThan800] = useMediaQuery([`(min-width: 1200px)`, `(min-width: 800px)`]);
    const navItems = config["navbar-items"]
    return (
        <Box
            h='100%'
            w={isGreaterThan800 ? isGreaterThen1200 ? '25%' : '40%' : '65%'}
        >
            <Fade
                duration={500}
                style={{
                    height: "100%",
                    width: "100%"
                }}
            >
                <Flex
                    position='relative'
                    h='100%'
                    w='100%'
                    bg={`main-nav.${themeState.theme}`}
                    flexDir='column'
                    boxShadow='lg'
                    onClick={(e: any) => e.stopPropagation()}
                >
                    <Banner />
                    <NavMenu>
                        {
                            navItems.map(navItem => <NavCard title={navItem.name} to={navItem.path} icon={navItem.icon} />)
                        }
                    </NavMenu>
                    <UserInfo />
                </Flex>
            </Fade>
        </Box>
    )
}