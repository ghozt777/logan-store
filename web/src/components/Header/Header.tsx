import { HamburgerIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeTheme } from '../../features/theme/themeSlice'
import { Dropdown } from "../Dropdown/Dropdown";
import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti"
import { Link } from "../Link/Link";
import { useLogoutMutation } from "../../generated/graphql";
import { logout as logoutReducer } from "../../features/auth/authSlice"
import { CategoryBar } from "./components/category-bar/CategoryBar";
import { CategoryButton } from "./components/category-button/CategoryButton";
import { HoverCard, HoverCardProps } from "./components/hover-card/HoverCard";
import { v4 as uuidv4 } from 'uuid';
import config from './../../config/config.json'
import "./style.css"

type NavbarProps = {
    title: string;
    // dropdown: JSX.Element;
    links?: JSX.Element[];
}

function EnhancedHoverCard(HoverCard: React.ComponentType<HoverCardProps>, props: React.PropsWithChildren<HoverCardProps>) {
    const Component: React.FC<{ setIsHover?: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsHover }) => {
        return (
            <HoverCard {...props} setIsHover={setIsHover} />
        )
    }
    return Component;
}

export const Header: React.FC<NavbarProps> = ({ title, links }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [, logout] = useLogoutMutation();
    const [isLagerThan800, isLagerThan1000] = useMediaQuery([`(min-width: 800px)`, `(min-width: 1000px)`])
    const catrgories = config.header.categories;
    const tagline = config.header.tagline;
    return (
        <Box
            bg="transparent"
            h='8vh'
            minHeight='100px'
            w='100%'
            position="fixed"
        >
            <Flex
                h="100%"
                w="100%"
                p='20px'
                fontWeight='bold'
                fontFamily='sans-serif'
                fontSize='1.3rem'
                position='relative'
                justifyContent='space-evenly'
                alignItems='center'
                transition='350ms'
            >
                <Flex
                    alignItems={"center"}
                    justifyContent="flex-start"
                    gap="1rem"
                    h="100%"
                    w="30%"
                >
                    <HamburgerIcon fontSize={isLagerThan1000 ? "1rem" : "0.7rem"} color={`text.${themeState.theme}`} cursor='pointer' />
                    <Text
                        fontWeight={700}
                        className="title-text"
                        color={`text.${themeState.theme}`}
                        fontSize={isLagerThan800 ? '1rem' : '0.6rem'}
                        cursor='pointer' >{title}
                    </Text>
                    {
                        isLagerThan1000 &&
                        <Text
                            fontSize={isLagerThan800 ? "0.8rem" : "0.6rem"}
                            color={`text.${themeState.theme}`}
                            className="title-tagline"
                        // letterSpacing="4px"
                        >{tagline}
                            <span style={{ fontSize: isLagerThan800 ? "4rem" : "1rem" }}>.</span>
                        </Text>
                    }
                </Flex>
                <CategoryBar>
                    {
                        catrgories.map(category => {
                            return (
                                <CategoryButton
                                    key={uuidv4()}
                                    HoverCard={EnhancedHoverCard(HoverCard, { title: category["hover-card"].title })}
                                    name={category["category-name"]}
                                    abbr="C1"
                                />
                            )
                        })
                    }
                </CategoryBar>
                <Flex
                    ml='auto'
                    w='30%'
                    justifyContent='flex-end'
                    alignItems='center'
                    gap='20px'
                >
                    {
                        !authState.isLoggedIn ? <Link to='/login' name='login' /> : <Box onClick={() => dispatch(logoutReducer(logout))} ><Link to='/' name='logout' /></Box>
                    }
                    <Box fontSize={isLagerThan1000 ? "1.2rem" : "1rem"} color={`text.${themeState.theme}`} cursor='pointer' onClick={() => dispatch(changeTheme())} >
                        {
                            themeState.theme === 'dark' ? <TiWeatherNight /> : <TiWeatherSunny />
                        }
                    </Box>
                    <TriangleDownIcon
                        fontSize={isLagerThan1000 ? "1rem" : "0.7rem"}
                        color={`text.${themeState.theme}`}
                        cursor='pointer'
                        transition='350ms'
                        transitionProperty={"transform"}
                        transform={isDropdownOpen ? 'rotate(-90deg)' : 'rotate(0deg)'}
                        onClick={() => setIsDropdownOpen(s => !s)}
                    />
                    <Dropdown isOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
                </Flex>
            </Flex >
        </Box>
    )
}

