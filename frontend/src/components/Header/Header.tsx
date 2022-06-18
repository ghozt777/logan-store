import { HamburgerIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { FaHamburger } from 'react-icons/fa'
import { Avatar, Box, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeTheme } from '../../features/theme/themeSlice'
import { Dropdown } from "../Dropdown/Dropdown";
import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti"
import { Link } from "../Link/Link";
import { useGetCategoriesQuery, useLogoutMutation, useWhoAmIQuery } from "../../generated/graphql";
import { logout as logoutReducer } from "../../features/auth/authSlice"
import { CategoryBar } from "./components/category-bar/CategoryBar";
import { CategoryButton } from "./components/category-button/CategoryButton";
import { HoverCard, HoverCardProps } from "./components/hover-card/HoverCard";
import { v4 as uuidv4 } from 'uuid';
import config from './../../config/config.json'
import "./style.css"
import { useNavBar } from "../../context/navbar";
import { RouteInfoBar } from "../RouteInfoBar/RouteInfoBar";
import { useNavigate } from "react-router-dom";
import { getAavatarUrl } from "../../utils/getAvatarUrl";
import { RiShoppingBag2Line } from 'react-icons/ri'

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
    const [isLagerThan800, isLagerThan1000] = useMediaQuery([`(min-width: 800px)`, `(min-width: 1000px)`]);
    const navBarContext = useNavBar();
    const setIsNavBarOpen = navBarContext?.setIsNavBarOpen;
    const navigate = useNavigate();
    // const catrgories = config.header.categories;
    const [result] = useGetCategoriesQuery();
    const { data, fetching, error } = result;
    const categories = fetching || error ? [] : data?.getCategories;
    const tagline = config.header.tagline;
    const [res, retrigger] = useWhoAmIQuery()
    let url: string = getAavatarUrl(res.data?.whoami.username.split(' ')[0] ?? "unknown")
    return (
        <Box
            h='8vh'
            minHeight='100px'
            w='100%'
            position="fixed"
            zIndex={9999}
            bg={`dropdown.${themeState.theme}`}
        >
            <Flex
                h="100%"
                w="100%"
                p={`20px ${isLagerThan800 ? "8%" : '20px'}`}
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
                    <FaHamburger
                        cursor={'pointer'}
                        onClick={() => setIsNavBarOpen && setIsNavBarOpen(s => !s)}
                        className='hamburger'
                        color={themeState.theme === 'dark' ? 'white' : 'black'}
                    />
                    <Text
                        fontWeight={600}
                        className="title-text"
                        color={`text.${themeState.theme}`}
                        fontSize={isLagerThan800 ? '1.6rem' : '1.2rem'}
                        cursor='pointer'
                        whiteSpace='nowrap'
                    >{title}
                    </Text>
                    {
                        isLagerThan1000 &&
                        <Text
                            fontSize={"1.4rem"}
                            color={`text.${themeState.theme}`}
                            className="title-tagline"
                            whiteSpace='nowrap'
                        >{tagline}
                            <span style={{ fontSize: isLagerThan800 ? "4rem" : "1rem" }}>.</span>
                        </Text>
                    }
                </Flex>
                <CategoryBar>
                    {
                        categories && categories.map(category => {
                            return (
                                <CategoryButton
                                    key={uuidv4()}
                                    HoverCard={EnhancedHoverCard(HoverCard, { title: category.name })}
                                    name={category.name}
                                    abbr={category.name}
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
                    {
                        !res.fetching && authState.isLoggedIn && <Avatar onClick={() => navigate('/profile')} iconLabel={res.data?.whoami.username ?? "unknown"} bg='white' cursor='pointer' size='md' name={res.data?.whoami.username} src={url} />
                    }
                    <RiShoppingBag2Line
                        cursor='pointer'
                        size={'30px'}
                        color='#a78bfa'
                        onClick={() => navigate('/cart')}
                    />
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
            <RouteInfoBar />
        </Box>
    )
}

