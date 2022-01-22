import { HamburgerIcon, MoonIcon, SunIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Img, Text, theme } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeTheme } from '../../features/theme/themeSlice'
import { Dropdown } from "../Dropdown/Dropdown";


type NavbarProps = {
    title: string;
    // dropdown: JSX.Element;
    // links: JSX.Element[];
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <Flex
            bg={`nav.${themeState.theme}`}
            h='60px'
            w='100%'
            p='20px'
            color={themeState.theme === 'dark' ? 'white' : 'black'}
            fontWeight='bold'
            fontFamily='sans-serif'
            fontSize='1.3rem'
            position='relative'
            justifyContent='flex-start'
            alignItems='center'
            gap='1rem'
            transition='350ms'
        >
            <HamburgerIcon cursor='pointer' />
            <Img src={'https://img.icons8.com/nolan/452/logan-paul-maverick.png'} h='100%' />
            <Text fontSize='lg' cursor='pointer' >{title}</Text>
            <Flex
                ml='auto'
                w='40%'
                justifyContent='flex-end'
                alignItems='center'
                gap='20px'
            >
                <Box cursor='pointer' onClick={() => dispatch(changeTheme())} >
                    {
                        themeState.theme === 'dark' ? <MoonIcon /> : <SunIcon />
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
        </Flex>
    )
}

