import { Box, Flex, Img, InputGroup, Text } from "@chakra-ui/react"
import { Carousel } from "../Carousel/Carousel";
import { v4 as uuidv4 } from 'uuid'

type Product = {
    productName: string;
    productImage: string;
    price: string;
    currency: string;
    logo: string;
    tagline: string;
}

interface ProductCardProps {
    product: Product;
    align: "left" | "right";
}

interface ShowcaseProps {
    products: Product[];
}

// NOTE : Implement BrandLOGO Feature ``

const ShowCaseCard: React.FC<ProductCardProps> = ({ product, align }) => {

    const { currency, productImage, logo, productName, tagline, price } = product;

    return (
        <Flex
            h='100%'
            w='100%'
            p='20px'
            alignItems='center'
            justifyContent='space-between'
            flexDirection={align === "left" ? "row" : "row-reverse"}
            bg='red'
        >
            <Flex
                className='heroContainer'
                h='80%'
                w='40%'
                alignItems='center'
                justifyContent='center'
            >
                <Img src={productImage} alt={productName} />
            </Flex>
            <Flex>
                <Text>{"Test"}</Text>
            </Flex>
        </Flex>
    )
}

export const Showcase: React.FC<ShowcaseProps> = ({ products }) => {
    return (
        <Flex
            w='100%'
            h='100%'
            alignItems='center'
            justifyContent='center'
            flexDir='column'
            gap='10px'
        >
            <Box w='80%' >
                <Text fontSize='lg' >Trending</Text>
            </Box>
            <Flex
                h='80%'
                w='80%'
            >
                <Carousel>
                    {
                        products.map(_product => {
                            return (
                                <ShowCaseCard product={_product} align={Math.random() > 0.5 ? "left" : "right"} />
                            )
                        })
                    }
                </Carousel>
            </Flex>
        </Flex>
    )
}