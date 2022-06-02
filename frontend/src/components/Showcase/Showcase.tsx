import { Box, Flex, Img, InputGroup, Text, useMediaQuery } from "@chakra-ui/react"
import { Carousel } from "../Carousel/Carousel";
import { v4 as uuidv4 } from 'uuid'
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import './style.css'
import { GetTrendingProductsQuery } from "../../generated/graphql";

type Product = { __typename?: 'Product', productId: string, name: string, SKU: string, upvotes: number, inventory?: { __typename?: 'Inventory', price: number, currency: string, stock: number } | null | undefined, brand?: { __typename?: 'Brand', name: string, brandLogo: string } | null | undefined, images?: Array<{ __typename?: 'Image', name: string, url: string, id: string }> | null | undefined }

interface ProductCardProps {
    product: Product;
    align: "left" | "right";
}

interface ShowcaseProps {
    products: Array<Product>;
    title: string;
}

// NOTE : Implement BrandLOGO Feature ``

const ShowCaseCard: React.FC<ProductCardProps> = ({ product, align }) => {
    console.log('product', product);
    const { name, SKU, images, brand, productId, upvotes, inventory } = product;
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`]);
    const themeState = useSelector((state: RootState) => state.theme);
    return (
        <Flex
            h='80%'
            w='100%'
            p={isLagerThan800 ? '20px' : '0px'}
            alignItems='center'
            justifyContent='space-between'
            flexDirection={isLagerThan800 ? align === "left" ? "row" : "row-reverse" : "column"}
            bg={`main.${themeState.theme}`}
            gap={4}
        >
            <Flex
                className='hero-container'
                h={isLagerThan800 ? '80%' : '59%'}
                w={isLagerThan800 ? '40%' : '95%'}
                alignItems='center'
                justifyContent='center'
                boxShadow={isLagerThan800 ? 'xl' : '0px'}
                border={isLagerThan800 ? '0px' : '1px'}
                borderColor={themeState.theme === 'light' ? 'gray.200' : 'gray.600'}
                p={isLagerThan800 ? '6' : '2'}
                rounded='lg'
                bg='white'
            >
                <Img
                    maxH='90%'
                    src={images ? images[0].url : 'www.google.com'}
                    alt={images ? images[0].name : 'NP'}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                />
            </Flex>
            <Flex
                h={isLagerThan800 ? '80%' : '40%'}
                w={isLagerThan800 ? '59%' : '95%'}
                alignItems='center'
                justifyContent='center'
                boxShadow={isLagerThan800 ? 'xl' : '0px'}
                border={isLagerThan800 ? '0px' : '1px'}
                borderColor={themeState.theme === 'light' ? 'gray.200' : 'gray.600'}
                p='6'
                rounded='lg'
                flexDir='column'
                transition="250ms"
                bg={`showcase.${themeState.theme}`}
                _hover={{
                    transform: "translateY(-5px) scale(1.1)"
                }}
            >
                <Box>
                    <Text fontSize={isLagerThan800 ? '3xl' : "xl"}>{name}</Text>
                </Box>
                <Box>
                    <Text color={`text2.${themeState.theme}`} fontSize={isLagerThan800 ? 'xl' : 'md'}><span>{inventory?.currency + " "} </span>{inventory?.price}</Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export const Showcase: React.FC<ShowcaseProps> = ({ products, title }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`]);
    return (
        <Flex
            w='100%'
            h='100%'
            alignItems='center'
            justifyContent='center'
            flexDir='column'
            gap='10px'
            color={`text.${themeState.theme}`}
            position="relative"
        >
            <Box w='80%'>
                <Text fontSize='lg' >{title}</Text>
            </Box>
            <Flex
                h='80%'
                w={isLagerThan800 ? '80%' : '100%'}
            >
                <Carousel>
                    {
                        products.map(_product => {
                            return (
                                <ShowCaseCard key={uuidv4()} product={_product} align={Math.random() > 0.5 ? "left" : "right"} />
                            )
                        })
                    }
                </Carousel>
            </Flex>
        </Flex>
    )
}