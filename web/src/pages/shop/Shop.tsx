import { Flex } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

export const Shop: React.FC<{}> = () => {
    const themeState = useSelector((state: RootState) => state.theme)
    return (
        <Flex
            h='100vh'
            w='100%'
            pt='8vh'
            bg={`main.${themeState.theme}`}
        >
            <h3>Shop page</h3>
        </Flex>
    )
}