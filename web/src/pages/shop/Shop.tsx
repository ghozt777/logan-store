import { Flex, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Showcase } from "../../components/Showcase/Showcase"
import config from '../../config/config.json'


export const Shop: React.FC<{}> = () => {
    const themeState = useSelector((state: RootState) => state.theme)
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`]);
    return (
        <Flex
            h='100vh'
            minH='100vh'
            w='100%'
            pt='10vh'
            bg={`main.${themeState.theme}`}
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
        >
            <Flex
                h={isLagerThan800 ? '70%' : '50%'}
                w='100%'
            >
                <Showcase title='Trending' products={config["dummy-api"].trending.products} />
            </Flex>
        </Flex>
    )
}