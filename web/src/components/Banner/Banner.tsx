import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import './style.css'

export const Banner: React.FC<{}> = () => {
    const themeState = useSelector((state: RootState) => state.theme)
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`])

    return (
        <Flex
            h='80%'
            w='70%'
            m='auto'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            gap='10px'
        >
            <Flex
                w='100%'
                alignItems='center'
                justifyContent='center'
            >
                <Text fontWeight='600' color={`text.${themeState.theme}`} fontSize={isLagerThan800 ? '6xl' : '3xl'}>Less is More</Text>
            </Flex>
            <Flex
                w='100%'
                alignItems='center'
                justifyContent='center'
            >
                <Text fontWeight='400' color={`text.${themeState.theme}`} fontSize={isLagerThan800 ? '2xl' : 'lg'}>{isLagerThan800 ? "Live the minimal lifestyle. Choose from 1000+ products" : "Live the minimal lifestyle."}</Text>
            </Flex>
            <Flex
                h='10%'
                w='100%'
                alignItems='center'
                justifyContent='center'
            >
                <Button color='white' className='btn-gradient' >
                    <Text fontSize='md' >Shop Now</Text>
                </Button>
            </Flex>
        </Flex>
    )
}