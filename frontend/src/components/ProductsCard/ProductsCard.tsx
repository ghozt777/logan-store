import { Box, Flex, Img, Text } from "@chakra-ui/react"
import { useTheme } from "../../features/theme/themeSlice";
import { Card } from "../Dropdown/components/Card/Card";
interface ProductsCardProps {
    img: string;
    price: number;
    name: string;
}
export const ProductsCard: React.FC<ProductsCardProps> = ({ img, price, name }) => {
    const themeState = useTheme();
    return (
        <Flex
            flexDirection={"column"}
            rounded='sm'
            boxShadow={'md'}
            m='auto'
            h='330px'
            w='220px'
            justifyContent='flex-start'
            alignItems='center'
            bg={`products-card.${themeState.theme}`}
            position='relative'
        >
            <Img
                mt='10px'
                maxH='250px'
                maxW='200px'
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
                        fontWeight={'bold'}
                        fontSize={'sm'} >{name}</Text>
                </Box>
                <Box>
                    <Text
                        fontSize={'xs'} >Rs:{price}</Text>
                </Box>
            </Flex>
        </Flex >
    )
}