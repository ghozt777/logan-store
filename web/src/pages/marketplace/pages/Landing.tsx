import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { useTheme } from "../../../features/theme/themeSlice"
export const MarketPlaceLandingPage = () => {
    const themeState = useTheme();
    const [isLangerThan800] = useMediaQuery(`(min-width: 800px)`)
    return (
        <Flex
            h='100vh'
            minH='100vh'
            w='100%'
            pt='10vh'
            bg={`main.${themeState.theme}`}
            alignItems='center'
            justifyContent='flex-start'
            flexDirection='column'
        >
            <Box
                h='100%'
                w='100%'
                pt={isLangerThan800 ? '3rem' : '5rem'}
            >
                <Text color='black' fontSize='lg' >Hi There from marketplace</Text>
            </Box>
        </Flex>
    )
}