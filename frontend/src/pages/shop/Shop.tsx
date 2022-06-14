import { Box, Flex, useMediaQuery, Text, background } from "@chakra-ui/react"
import { FaFireAlt } from "react-icons/fa"
import { useSelector } from "react-redux"
import { HashLoader } from "react-spinners"
import { toast } from "react-toastify"
import { RootState } from "../../app/store"
import { Categories } from "../../components/Categories/Categories"
import { ErrorCard } from "../../components/Error/Error"
import { Showcase } from "../../components/Showcase/Showcase"
import Lottie from 'react-lottie';
import * as animationData from './../../config/lottie-animation.json'
import { useGetProductsQuery, useGetTrendingProductsQuery } from "../../generated/graphql"

const Promo = () => {

    const LotteContainer: React.FC<{}> = () => {
        return (<Box
            position='absolute'
            zIndex={9999}
        >
            <Lottie
                height={400}
                width={200}
                options={{
                    loop: true,
                    autoplay: false,
                    animationData,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }} >
            </Lottie>
        </Box>)
    }


    const themeState = useSelector((state: RootState) => state.theme)
    return (
        <Flex
            h='10vh'
            w='90%'
            bg='#818cf8'
            rounded={'lg'}
            alignItems='center'
            justifyContent='space-between'
            p='14px'
            position={'relative'}
            cursor={'pointer'}
            onClick={() => {
                navigator.clipboard.writeText("HOT50")
                toast('PROMOCODE COPIED !', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: themeState.theme === "dark" ? "light" : "dark"
                });
            }}
        >
            <LotteContainer />
            <FaFireAlt size='3rem' color='orange' />
            <Box
                h='80%'
                w='80%'
            >
                <Text fontSize={'0.8rem'} color='white' fontWeight={'bold'} > USE PROMOCODE : <Text display={'inline'} color='orange' >HOT50</Text> TO GET 50 % OFF ON ANY TRENDING PRODUCTS </Text>
            </Box>
        </Flex>
    )
}

const TrendingSection = () => {
    const themeState = useSelector((state: RootState) => state.theme)
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`]);
    const [result] = useGetTrendingProductsQuery();
    const { fetching, data, error } = result;
    return (
        <Flex
            h='100vh'
            minH='100vh'
            w='100%'
            pt='10vh'
            bg={`main.${themeState.theme}`}
            flexDirection='column'
            alignItems='center'
            justifyContent={isLagerThan800 ? 'flex-start' : 'center'}
            scrollSnapAlign='start'
        >
            <Flex
                h={isLagerThan800 ? '95%' : '75%'}
                w='100%'
                mt='3rem'
                alignItems='center'
                justifyContent='center'
            >
                {fetching ? <HashLoader /> : data?.getTrendingProducts && <Showcase title='Trending 🔥' products={data.getTrendingProducts} />}
                {error && <ErrorCard message={error.message + error.networkError?.stack + "Please Check Your Internet Connection or contact our service center"} theme={themeState.theme} />}
            </Flex>
            {
                !isLagerThan800 && <Promo />
            }
        </Flex>
    )
}

const CategoriesSection = () => {
    const themeState = useSelector((state: RootState) => state.theme)
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`]);
    return (
        <Flex
            h='100vh'
            minH='800px'
            w='100%'
            pt='10vh'
            bg={`main.${themeState.theme}`}
            alignItems='center'
            justifyContent='flex-start'
            flexDirection='column'

        >
            <Flex
                h={isLagerThan800 ? '95%' : '75%'}
                w='100%'
                mt='3rem'
            >
                <Categories />
            </Flex>
        </Flex>
    )
}


export const Shop: React.FC<{}> = () => {
    const themeState = useSelector((state: RootState) => state.theme)
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`]);
    const [productsQueryData] = useGetProductsQuery();
    const products = productsQueryData.data?.getProducts;
    return (
        <Box
            minH={'100vh'}
            minW='100%'
            scrollSnapType='y mandatory'
        >
            <TrendingSection />
            <CategoriesSection />
        </Box>
    )
}