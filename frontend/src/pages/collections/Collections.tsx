import { Box, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react"
import { useLocation, useParams } from "react-router-dom"
import { useTheme } from "../../features/theme/themeSlice";
import { CategoriesView } from "../../components/Categories/Categories";
import "./style.css"

const DesktopView = () => {
    const [isGreaterThan800] = useMediaQuery(`(min-width: 800px)`);
    const themeState = useTheme();
    return (
        <Flex
            h='100%'
            w='100%'
            alignItems='center'
            justifyContent='center'
        >
            <Flex
                mt={isGreaterThan800 ? '4rem' : '2rem'}
                h='80%'
                w='90%'
                flexDirection='row'
                alignItems='center'
                justifyContent='space-evenly'
                bg={`card.${themeState.theme}`}
                rounded='lg'
            >
                <Flex
                    h='90%'
                    w='20%'
                    bg='transparent'
                    alignItems='center'
                    justifyContent='center'
                    position='relative'
                >
                    <Flex
                        h='100px'
                        w='80vw'
                        position='absolute'
                        top="-3.5rem"
                        left="0"
                        alignItems='center'
                        justifyContent='flex-start'
                        zIndex={"10000"}
                    >
                        <Text
                            className='header-text'
                            fontSize='10rem'
                            color={themeState.theme === 'light' ? "black" : "white"}
                        >
                            Collections
                        </Text>
                    </Flex>
                    <Img
                        rounded={'lg'}
                        objectFit={"cover"}
                        h='90%'
                        w='90%'
                        alt='collections-hero-desktop-view'
                        src='https://ik.imagekit.io/dnoyrwmg9i9o/logan-store-categories/serhiy-hipskyy-O4pwbpzhKbw-unsplash_Ym7q6mtl2.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1654282401011'
                    />
                </Flex>
                <Flex
                    w='70%'
                    h='80%'
                >
                    <CategoriesView />
                </Flex>
            </Flex>
        </Flex>
    )
}

interface CollectionsPageProps { };
export const CollectionsPage: React.FC<CollectionsPageProps> = () => {
    const location = useLocation();
    const { collection } = useParams();
    const [isGreaterThan800] = useMediaQuery(`(min-width: 800px)`);
    const themeState = useTheme();
    console.log(location, collection);
    return (
        <Box
            h="100vh"
            w="100%"
            minH={"890px"}
            pt={'8vh'}
            bg={`main.${themeState.theme}`}
        >
            {isGreaterThan800 && <DesktopView />}
        </Box>
    )
}