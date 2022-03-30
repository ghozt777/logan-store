import { Flex } from "@chakra-ui/react"

export const Nav: React.FC<{}> = () => {
    return (
        <Flex
            h='100%'
            w='20%'
            bg='red'
            onClick={e => e.stopPropagation()}
        >
        </Flex>
    )
}