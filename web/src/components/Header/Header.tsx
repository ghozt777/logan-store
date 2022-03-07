import { HamburgerIcon, SunIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Img, Text, theme, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeTheme } from '../../features/theme/themeSlice'
import { Dropdown } from "../Dropdown/Dropdown";
import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti"
import "./style.css"
import { Link } from "../Link/Link";
import { useLogoutMutation } from "../../generated/graphql";
import { logout as logoutReducer } from "../../features/auth/authSlice"
import { CategoryBar } from "./components/category-bar/CategoryBar";
import { CategoryButton } from "./components/categor-button/CategoryButton";
import { HoverCard } from "./components/hover-card/HoverCard";


type NavbarProps = {
    title: string;
    // dropdown: JSX.Element;
    links?: JSX.Element[];
}

export const Header: React.FC<NavbarProps> = ({ title, links }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [, logout] = useLogoutMutation();
    const [isLagerThan800, isLagerThan1000] = useMediaQuery([`(min-width: 800px)`, `(min-width: 1000px)`])


    return (
        <Box
            bg="transparent"
            h='8vh'
            minHeight='100px'
            w='100%'
            position="fixed"
        >
            <Flex
                className='blur'
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
                    <Text fontWeight={700} className="title-text" color={`text.${themeState.theme}`} fontSize={isLagerThan800 ? '1rem' : '0.6rem'} cursor='pointer' >{title}</Text>
                    {isLagerThan1000 && <Text
                        fontSize={isLagerThan800 ? "0.8rem" : "0.6rem"}
                        color={`text.${themeState.theme}`}
                        className="title-tagline"
                    // letterSpacing="4px"
                    >Be a Maverick<span style={{ fontSize: isLagerThan800 ? "4rem" : "1rem" }}>.</span></Text>}
                </Flex>
                <CategoryBar>
                    <CategoryButton HoverCard={HoverCard} name="*Category1*" abbr="C1" />
                    <CategoryButton HoverCard={HoverCard} name="*Category2*" abbr="C1" />
                    <CategoryButton HoverCard={HoverCard} name="*Category3*" abbr="C1" />
                    <CategoryButton HoverCard={HoverCard} name="*Category4*" abbr="C1" />
                </CategoryBar>
                <Flex
                    ml='auto'
                    w='30%'
                    justifyContent='flex-end'
                    alignItems='center'
                    gap='20px'
                >
                    {!authState.isLoggedIn ? <Link to='/login' name='login' /> : <Box onClick={() => dispatch(logoutReducer(logout))} ><Link to='/' name='logout' /></Box>}
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

