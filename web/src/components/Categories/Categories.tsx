import { Box, Flex, Grid, GridItem, Img, Text, useMediaQuery } from "@chakra-ui/react"
import { HashLoader } from "react-spinners";
import { cacheExchange } from "urql";
import { useTheme } from "../../features/theme/themeSlice";
import { GetCategoriesQuery, useGetCategoriesQuery } from '../../generated/graphql'
import { ErrorCard } from "../Error/Error";

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

const GridCard: React.FC<{ b?: string, name: string, img: string, c?: String }> = ({ b, name, img, c }) => {
    const color: string = c ? c as string : 'white';
    return (
        <Flex
            cursor={'pointer'}
            h='100%'
            w='100%'
            p='4px'
            boxShadow='md'
            rounded='lg'
            bg={b ?? 'white'}
            flexDirection='column'
            alignItems='center'
            justifyContent='space-evenly'
        >
            <Box
                h='10%'
                w='80%'
                textAlign={'center'}
            >
                <Text color={color} fontSize='lg' >{name}</Text>
            </Box>
            <Img maxH='200px' maxW='200px' h='auto' w='80%' borderRadius={'1rem'} src={img} />
        </Flex>
    )
}

const DesktopView: React.FC<{ categories?: GetCategoriesQuery }> = ({ categories: data }) => {
    const categories = data?.getCategories;
    return (
        <>
            {
                categories && categories.map((category, i) => {
                    return (
                        <GridContent r={i === 0 ? 2 : 0} c={i === 0 ? 1 : i === 3 ? 4 : 2}>
                            <GridCard
                                c={i === 0 || i === 2 ? 'black' : 'white'}
                                b={
                                    i === 0 ? 'white' :
                                        i === 1 ? '#0F1012' :
                                            i === 2 ? '#B3E140' : '#343537'
                                }
                                name={category.name}
                                img={category.imageUrl ?? 'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2'}
                            />
                        </GridContent>
                    )
                })
            }
        </>
    )
}



const MobileView: React.FC<{ categories?: GetCategoriesQuery }> = ({ categories: data }) => {
    const categories = data?.getCategories;
    return (
        <>
            {
                categories && categories.map((category, i) => {
                    return (<GridContent c={i === 0 || i == 3 ? 3 : 2} >
                        <GridCard
                            b={
                                i === 0 ? 'white' :
                                    i === 1 ? '#0F1012' :
                                        i === 2 ? '#B3E140' : '#343537'
                            }
                            c={i != 0 ? 'white' : 'black'}
                            name={category.name}
                            img={category.imageUrl ?? 'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=590&h=800&7E4B4CAD-CAE1-4726-93D6A160C2B068B2'}
                        />
                    </GridContent>)
                })
            }
        </>
    )
}

export const Categories: React.FC<{}> = () => {
    const [isLargerThan800] = useMediaQuery([`(min-width: 800px)`]);
    const [isLargerThan1200] = useMediaQuery([`(min-width: 1200px)`]);
    const [result] = useGetCategoriesQuery();
    const { data, fetching, error } = result
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
                mt='3rem'
                h='10%'
                w='90%'
            >
                <Text fontSize='lg'>Categories</Text>
            </Flex>
            <Flex
                h='80%'
                w='90%'
                p='10px'
                alignItems='center'
                justifyContent='center'
            >
                {
                    error ?
                        <ErrorCard theme={themeState.theme} message={error.message} /> :
                        fetching ?
                            <HashLoader /> :
                            <Grid
                                h='100%'
                                w='100%'
                                templateRows='repeat(2, 1fr)'
                                templateColumns='repeat(5, 1fr)'
                                gap={4}
                            >
                                {
                                    isLargerThan1200 ? <DesktopView categories={data} /> : <MobileView categories={data} />
                                }
                            </Grid>

                }
            </Flex>
        </Flex>
    )
}