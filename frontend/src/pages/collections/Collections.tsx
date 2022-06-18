import { Box, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react"
import { useLocation, useParams } from "react-router-dom"
import { useTheme } from "../../features/theme/themeSlice";
import { CategoriesView } from "../../components/Categories/Categories";
import config from '../../config/config.json'
import "./style.css"

const LandingDesktopView = () => {
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
                            fontSize='13vh'
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
                        src={config["collections-page"]["lading-hero"]}
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

const LandingMobileView = () => {
    return (
        <Flex
            h='100%'
            w='100%'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                w='90%'
                h='80%'
                mt='7rem'
            >
                <CategoriesView />
            </Box>
        </Flex>
    )
}

const CollectionsPageLanding = () => {
    const themeState = useTheme();
    const [isGreaterThan1000] = useMediaQuery(`(min-width: 1000px)`);
    return (
        <Box
            h="100%"
            w="100%"
            minH={`890px`}
            pt={'8vh'}
            bg={`main.${themeState.theme}`}
        >
            {isGreaterThan1000 ? <LandingDesktopView /> : <LandingMobileView />}
        </Box>
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
            h='100vh'
            w='100%'
        >
            {
                !collection && <CollectionsPageLanding />
            }
        </Box>
    )
}