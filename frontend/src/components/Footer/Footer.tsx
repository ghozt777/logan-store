import { Flex, ResponsiveValue, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
interface FooterProps {
    position?: string,
    variant: "default" | "pazzaz"
}
export const Footer: React.FC<FooterProps> = ({ position, variant: v }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const p: any = position ?? "sticky"
    return (
        <Flex
            h='8%'
            w='100%'
            position={p}
            bottom='0'
            flexDir='row'
            alignItems='center'
            justifyContent='center'
            color={`text.${themeState.theme}`}
            bg={`main.${themeState.theme}`}
            pb='20px'
        >
            <Flex
                h='100%'
                p='10px'
                rounded='lg'
                w={v === "default" ? "100%" : "98%"}
                bg={v === 'default' ? "transparent" : `footer.${themeState.theme}`}
                alignItems='center'
                justifyContent='center'
            >
                <Text fontSize='xs'>Made with <b>React</b> , <b>GraphQL</b> and ❤️ <pre style={{ display: "inline-block" }}> </pre> by <a href="https://www.instagram.com/dontsleeponcustard/" ><b>ghozt777</b></a> </Text>
                <Text fontSize='xs'> © Logan Store {new Date().getFullYear()} </Text>
            </Flex>
        </Flex>
    )
}