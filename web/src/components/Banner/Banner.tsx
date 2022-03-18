import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../app/store"
import config from './../../config/config.json'
import './style.css'

export const Banner: React.FC<{}> = () => {
    const themeState = useSelector((state: RootState) => state.theme)
    const [isLagerThan800] = useMediaQuery([`(min-width: 800px)`]);
    const navigate = useNavigate();

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
                <Text fontWeight='600' color={`text.${themeState.theme}`} fontSize={isLagerThan800 ? '6xl' : '3xl'}>{config["landing-page"].banner.title}</Text>

            </Flex>
            <Flex
                w='100%'
                alignItems='center'
                justifyContent='center'
            >
                <Text fontWeight='400' color={`text2.${themeState.theme}`} fontSize={isLagerThan800 ? '2xl' : 'lg'}>{isLagerThan800 ? config["landing-page"].banner["tagline-web"] : config["landing-page"].banner["tagline-mobile"]}</Text>
            </Flex>
            <Flex
                h='10%'
                w='100%'
                alignItems='center'
                justifyContent='center'
            >
                <Button color='white' className='btn-gradient' onClick={() => navigate('/shop')} >
                    <Text fontSize='md' >Shop Now</Text>
                </Button>
            </Flex>
        </Flex>
    )
}