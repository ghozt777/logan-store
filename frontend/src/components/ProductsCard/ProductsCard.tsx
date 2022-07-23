import { Box, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../features/theme/themeSlice";
import { Card } from "../Dropdown/components/Card/Card";
interface ProductsCardProps {
    img: string;
    price: number;
    name: string;
    productId: string;
}
export const ProductsCard: React.FC<ProductsCardProps> = ({ img, price, name, productId }) => {
    const themeState = useTheme();
    const navigate = useNavigate();
    const [sm, md, lg] = useMediaQuery([`(max-width:800px)`, `(min-width: 801px) and (max-width: 1000px)`, `(min-width:1001px)`])
    const cardWidth = sm ? '180px' : md ? '220px' : '300px';
    console.log('sizes', sm, md, lg)
    return (
        <Flex
            flexDirection={"column"}
            rounded='sm'
            boxShadow={'md'}
            h='330px'
            w={cardWidth}
            justifyContent='flex-start'
            alignItems='center'
            bg={`products-card.${themeState.theme}`}
            position='relative'
            cursor={'pointer'}
            onClick={() => {
                navigate(`/products/${productId}`);
            }}
        >
            <Img
                mt='10px'
                maxH='250px'
                maxW='98%'
                p='0px 2px'
                rounded={'lg'}
                src={img} alt={`product-image-${name}`}
                objectFit='contain'
            />
            <Flex
                h='15%'
                w='100%'
                p='0px 20px'
                flexDirection='column'
                justifyContent='space-evenly'
                position='absolute'
                bottom='8px'
            >
                <Box>
                    <Text
                        color={themeState.theme === 'light' ? 'black' : 'white'}
                        fontWeight={'bold'}
                        fontSize={'sm'} >{name}</Text>
                </Box>
                <Box>
                    <Text
                        color={themeState.theme === 'light' ? 'black' : 'white'}
                        fontSize={'xs'} >Rs:{price}</Text>
                </Box>
            </Flex>
        </Flex >
    )
}