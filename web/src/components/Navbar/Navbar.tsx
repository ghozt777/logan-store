import { HamburgerIcon, SunIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Img, Text, theme, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeTheme } from '../../features/theme/themeSlice'
import { Dropdown } from "../Dropdown/Dropdown";
import { TiWeatherNight } from "react-icons/ti"
import "./style.css"


type NavbarProps = {
    title: string;
    // dropdown: JSX.Element;
    // links: JSX.Element[];
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLagerThan800] = useMediaQuery(`(min-width: 800px)`)

    return (
        <Box
            bg={`main.${themeState.theme}`}
            h='13vh'
            minHeight='100px'
            w='100%'
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                bg={`nav.${themeState.theme}`}
                h="80%"
                w="98%"
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
                borderStyle="none"
                borderRadius="10px"
                boxShadow={`0px 4px 4px -2px ${themeState.theme === "light" ? "#cbd5e1" : "#0C0705"}`} // 0C0705
            >
                <HamburgerIcon cursor='pointer' />
                <Text className="title-text" fontSize={isLagerThan800 ? 'lg' : 'md'} cursor='pointer' >{title}</Text>
                <Text
                    fontSize={isLagerThan800 ? "20px" : "12px"}
                    className="title-tagline"
                    letterSpacing="4px"
                >we believe in minimalism<span style={{ fontSize: isLagerThan800 ? "4rem" : "1rem" }}>.</span></Text>
                <Flex
                    ml='auto'
                    w='40%'
                    justifyContent='flex-end'
                    alignItems='center'
                    gap='20px'
                >
                    <Box cursor='pointer' onClick={() => dispatch(changeTheme())} >
                        {
                            themeState.theme === 'dark' ? <TiWeatherNight size={"1.6rem"} /> : <SunIcon />
                        }
                    </Box>
                    <TriangleDownIcon
                        cursor='pointer'
                        transition='350ms'
                        transform={isDropdownOpen ? 'rotate(-90deg)' : 'rotate(0deg)'}
                        onClick={() => setIsDropdownOpen(s => !s)}
                    />
                    <Dropdown isOpen={isDropdownOpen} />
                </Flex>
            </Flex >
        </Box>
    )
}

