import { Box, Button, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { useWhoAmIQuery } from "../../../generated/graphql"
import { getAavatarUrl } from "../../../utils/getAvatarUrl"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { CloseButton } from '@chakra-ui/react'

interface CardProps {
    title: string,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Card: React.FC<CardProps> = ({ title, setIsDropdownOpen }) => {
    const authState = useSelector((state: RootState) => state.auth)
    const [isGreaterThan800] = useMediaQuery(`(min-width: 800px)`)
    const [res, retrigger] = useWhoAmIQuery()
    const themeState = useSelector((state: RootState) => state.theme);
    let url: string = getAavatarUrl(res.data?.whoami.username.split(' ')[0] ?? "unknown")
    return (
        <Flex
            h="100%"
            w="100%"
            p="10px"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
            fontSize={isGreaterThan800 ? "1.2rem" : "0.8rem"}
            color={themeState.theme === 'light' ? "black" : "white"}
            position="relative"
        >
            <CloseButton
                position={"absolute"}
                top="10%"
                right="10%"
                size={isGreaterThan800 ? "md" : "sm"}
                onClick={() => setIsDropdownOpen(s => !s)}
            />
            <Img h={"40%"} src={url} alt='profile' />
            <Flex
                h="100%"
                w="60%"
                flexDirection={"column"}
                alignItems="center"
                justifyContent="space-evenly"
            >
                <Text>{title}</Text>
                {
                    authState.isLoggedIn &&
                    <Flex
                        gap="20%"
                    >
                        <Box><AiOutlineShoppingCart /></Box>
                        <Box><AiOutlineShoppingCart /></Box>
                        <Box><AiOutlineShoppingCart /></Box>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}