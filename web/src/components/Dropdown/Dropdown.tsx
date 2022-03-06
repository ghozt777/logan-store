import { Flex, useMediaQuery } from "@chakra-ui/react"
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux"
import { RootState } from "../../app/store";
import { Card } from "./components/Card";
import './style.css'

type DropDownProps = { 
    isOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Dropdown: React.FC<DropDownProps> = ({ isOpen , setIsDropdownOpen }) => {

    const themeState = useSelector((state: RootState) => state.theme)
    const [isGreaterThan800] = useMediaQuery(`(min-width: 800px)`)


    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                dropdownRef.current && dropdownRef.current.style.setProperty('display', 'none');
            }, 350)
        }
        else {
            dropdownRef.current && dropdownRef.current.style.setProperty('display', 'flex');
        }
    }, [isOpen])

    const dropdownRef = useRef<HTMLDivElement>(null);

    return (
        <Flex
            className={`card ${themeState.theme}`}
            ref={dropdownRef}
            h={isGreaterThan800 ? '10rem' : '7.5rem'}
            w={isGreaterThan800 ? '25rem' : '12rem'}
            flexDirection='column'
            alignItems='center'
            justifyContent='flex-start'
            gap='12px'
            bg={`dropdown.${themeState.theme}`}
            position='absolute'
            top='80%'
            right='5px'
            borderStyle='none'
            transition='350ms'
            opacity={isOpen ? 1 : 0}
        >
            <Card title="sup!" setIsDropdownOpen={setIsDropdownOpen}  />
        </Flex >
    )
}