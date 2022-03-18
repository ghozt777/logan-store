import { Flex, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

export const Footer: React.FC<{}> = () => {
    const themeState = useSelector((state: RootState) => state.theme);
    return (
        <Flex
            h='8%'
            w='100%'
            position='sticky'
            bottom='0'
            p='10px'
            flexDir='column'
            alignItems='center'
            justifyContent='center'
            color={`text.${themeState.theme}`}
        >
            <Text fontSize='xs'>Made with <b>React</b> , <b>GraphQL</b> and ❤️</Text>
            <Text fontSize='xs'>© Logan Store {new Date().getFullYear()}</Text>
        </Flex>
    )
}