import { Badge, Box, Button, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import { useWhoAmIQuery } from "../../../../generated/graphql"
import { getAavatarUrl } from "../../../../utils/getAvatarUrl"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { CloseButton } from '@chakra-ui/react'
import "./style.css"

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
            <Flex
                position={"absolute"}
                top="10%"
                right="10%"
                w="40%"
                flexDirection={"row"}
                alignItems="center"
                justifyContent="space-between"
            >
                <Text className="title" >{title}</Text>
                <CloseButton
                    size={isGreaterThan800 ? "md" : "sm"}
                    onClick={() => setIsDropdownOpen(s => !s)}
                />
            </Flex>
            <Flex
                h="100%"
                w="60%"
                flexDirection={"row"}
                alignItems="center"
                justifyContent="space-evenly"
            >
                <Img h={"40%"} src={url} alt='profile' />
                <Flex
                    w="100%"
                    h="40%"
                    flexDirection={"column"}
                    justifyContent={"space-evenly"}
                    alignItems="center"
                >
                    <Text className='details'>{res.fetching ? "Loading..." : res.data?.whoami.username ?? "not signed in"}</Text>
                    <Text className='details'>{res.fetching ? "Loading..." : res.data?.whoami.email}</Text>
                </Flex>
            </Flex>
            <Flex>
                {
                    <AiOutlineShoppingCart />
                }
            </Flex>
        </Flex>
    )
}