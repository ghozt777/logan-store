import { Flex } from "@chakra-ui/react"
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux"
import { RootState } from "../../app/store";

type DropDownProps = { isOpen: boolean; }

export const Dropdown: React.FC<DropDownProps> = ({ isOpen }) => {

    const themeState = useSelector((state: RootState) => state.theme)

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
            ref={dropdownRef}
            h='20rem'
            w='15rem'
            flexDirection='column'
            alignItems='center'
            justifyContent='flex-start'
            gap='12px'
            bg={`dropdown.${themeState.theme}`}
            position='absolute'
            top='52px'
            right='5px'
            borderStyle='none'
            borderRadius='10px'
            transition='350ms'
            opacity={isOpen ? 1 : 0}
        >
            DropDown
        </Flex >
    )
}