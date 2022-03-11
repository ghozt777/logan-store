import { Flex } from "@chakra-ui/react"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import "./style.css"

interface CategoryBarProps { }

export const CategoryBar: React.FC<CategoryBarProps> = ({ children }) => {
    const themeState = useSelector((state: RootState) => state.theme)
    return (
        <Flex
            h="100%"
            w="50%"
            alignItems="center"
            justifyContent="space-evenly"
        >
            {children}
        </Flex>
    )
}