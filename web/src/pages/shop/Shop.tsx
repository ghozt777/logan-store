import { Flex, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Showcase } from "../../components/Showcase/Showcase"
import config from '../../config/config.json'
import { useGetProductsQuery } from "../../generated/graphql"


export const Shop: React.FC<{}> = () => {
    const themeState = useSelector((state: RootState) => state.theme)
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`]);
    const [productsQueryData] = useGetProductsQuery();
    const products = productsQueryData.data?.getProducts;
    console.log('products:', products);
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
            <Flex
                h={isLagerThan800 ? '95%' : '75%'}
                w='100%'
                mt='3rem'
            >
                <Showcase title='Trending' products={config["dummy-api"].trending.products} />
            </Flex>
        </Flex>
    )
}