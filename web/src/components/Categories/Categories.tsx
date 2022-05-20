import { Box, Flex, Grid, GridItem, Text, useMediaQuery } from "@chakra-ui/react"
import { useTheme } from "../../features/theme/themeSlice";

const DesktopView = () => {
    return (
        <>

            <GridItem rowSpan={2} colSpan={1} bg='tomato' />
            <GridItem colSpan={2} bg='papayawhip' />
            <GridItem colSpan={2} bg='papayawhip' />
            <GridItem colSpan={4} bg='tomato' />
        </>
    )
}

const MobileView = () => {
    return (<h1>Test </h1>)
}

export const Categories: React.FC<{}> = () => {
    const [isLargerThan800] = useMediaQuery([`(min-width: 800px)`]);
    const [isLargerThan1200] = useMediaQuery([`(min-width: 1200px)`]);
    const themeState = useTheme();
    return (
        <Flex
            h='80vh'
            w='100%'
            alignItems='center'
            justifyContent='flex-start'
            flexDirection='column'
            gap='1rem'
            color={`text.${themeState.theme}`}
        >
            <Flex
                mt={isLargerThan800 ? '0rem' : '3rem'}
                h='10%'
                w='90%'
            >
                <Text fontSize='lg'>Categories</Text>
            </Flex>
            <Box
                h='80%'
                w='90%'
                bg='red'
                p='10px'
            >
                <Grid
                    h='100%'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                    gap={4}
                >
                    {
                        isLargerThan1200 ? <DesktopView /> : <MobileView />
                    }
                </Grid>
            </Box>
        </Flex>
    )
}