import { Box, Flex, Grid, GridItem, Text, useMediaQuery } from "@chakra-ui/react"
import { useTheme } from "../../features/theme/themeSlice";

const GridContent: React.FC<{ r?: number, c?: number }> = ({ children, r, c }) => {
    return (
        <GridItem
            rowSpan={r ?? 0}
            colSpan={c ?? 0}
        >
            {
                children
            }
        </GridItem >
    )
}

const GridCard = () => {
    return (
        <Box
            h='100%'
            w='100%'
            p='4px'
            boxShadow='md'
            rounded='lg'
        >
        </Box>
    )
}

const DesktopView = () => {
    return (
        <>

            <GridContent r={2} c={1}>
                <GridCard />
            </GridContent>
            <GridContent c={2}>
                <GridCard />
            </GridContent>
            <GridContent c={2} >
                <GridCard />
            </GridContent>
            <GridContent c={4} >
                <GridCard />
            </GridContent>
        </>
    )
}

const MobileView = () => {
    return (
        <>
            <GridContent c={3}>
                <GridCard />
            </GridContent>
            <GridContent c={2}>
                <GridCard />
            </GridContent>
            <GridContent c={2} >
                <GridCard />
            </GridContent>
            <GridContent c={3} >
                <GridCard />
            </GridContent>
        </>
    )
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