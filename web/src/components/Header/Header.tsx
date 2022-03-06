import { HamburgerIcon, SunIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Img, Text, theme, useMediaQuery } from "@chakra-ui/react";
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
    const [isLagerThan800] = useMediaQuery(`(min-width: 800px)`)

    return (
        <Box
            // bg={`main.${themeState.theme}`}
            bg="transparent"
            h='8vh'
            minHeight='100px'
            w='100%'
            display="flex"
            position="fixed"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                className='blur'
                h="100%"
                w="100%"
                p='20px'
                color="white"
                fontWeight='bold'
                fontFamily='sans-serif'
                fontSize='1.3rem'
                position='relative'
                justifyContent='flex-start'
                alignItems='center'
                gap='1rem'
                transition='350ms'
            // borderStyle={"solid"}
            // borderColor="red"
            // borderWidth={"1rem"}
            >
                <HamburgerIcon color={`text.${themeState.theme}`} cursor='pointer' />
                <Text fontWeight={700} className="title-text" color={`text.${themeState.theme}`} fontSize={isLagerThan800 ? '1rem' : 'sm'} cursor='pointer' >{title}</Text>
                <Text
                    fontSize={isLagerThan800 ? "0.8rem" : "0.6rem"}
                    color={`text.${themeState.theme}`}
                    className="title-tagline"
                // letterSpacing="4px"
                >Be a Maverick<span style={{ fontSize: isLagerThan800 ? "4rem" : "1rem" }}>.</span></Text>
                <Flex
                    ml='auto'
                    w='40%'
                    justifyContent='flex-end'
                    alignItems='center'
                    gap='20px'
                >
                    {!authState.isLoggedIn ? <Link to='/login' name='login' /> : <Box onClick={() => dispatch(logoutReducer(logout))} ><Link to='/' name='logout' /></Box>}
                    <Box color={`text.${themeState.theme}`} cursor='pointer' onClick={() => dispatch(changeTheme())} >
                        {
                            themeState.theme === 'dark' ? <TiWeatherNight /> : <TiWeatherSunny />
                        }
                    </Box>
                    <TriangleDownIcon
                        color={`text.${themeState.theme}`}
                        cursor='pointer'
                        transition='350ms'
                        transitionProperty={"transform"}
                        transform={isDropdownOpen ? 'rotate(-90deg)' : 'rotate(0deg)'}
                        onClick={() => setIsDropdownOpen(s => !s)}
                    />
                    <Dropdown isOpen={isDropdownOpen} />
                </Flex>
            </Flex >
        </Box>
    )
}

