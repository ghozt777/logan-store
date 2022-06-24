import { Flex } from "@chakra-ui/react"
interface ProductsCardProps {
    img: string;
    price: number;
    name: string;
}
export const ProductsCard: React.FC<{}> = () => {
    return (
        <Flex
            flexDirection={"column"}
            rounded='sm'
            shadow={'xs'}
            m='auto'
            h='370px'
            w='220px'
        >

        </Flex>
    )
}