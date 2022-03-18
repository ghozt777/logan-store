import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { changeTheme } from './../../features/theme/themeSlice'
import { MavSvg } from './../../assets/images/Mav.svg'
import config from './../../config/config.json'
import { useDispatch, useSelector } from "react-redux"
import './style.css'
import { RootState } from "../../app/store"
import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti"

export const LandingPageheader: React.FC<{}> = () => {

    const dispatch = useDispatch();
    const themeState = useSelector((state: RootState) => state.theme);
    const [isLagerThan800, isLagerThan1000] = useMediaQuery([`(min-width: 800px)`, `(min-width: 1000px)`])
    return (
        <Box mt='5px' h='10%' w='100%'>
            <Flex
                h='100%'
                w={isLagerThan1000 ? '80%' : '90%'}
                m='auto'
                alignItems='center'
                justifyContent='space-between'
            >
                <Flex w='50%' h='100%' alignItems='center' gap='10px' >
                    <Box h='50%'>
                        <MavSvg />
                    </Box>
                    <Text color={`text.${themeState.theme}`} className="title" >{config["landing-page"].header.title}</Text>
                </Flex>
                <Flex h='100%' alignItems='center' gap='10px'  >
                    {isLagerThan1000 && <Text color={`text.${themeState.theme}`} fontSize={"1rem"} className="tagline" >{config["landing-page"].header.tagline}</Text>}
                    <Box fontSize={isLagerThan1000 ? "1.4rem" : "1.2rem"} color={`text.${themeState.theme}`} cursor='pointer' onClick={() => dispatch(changeTheme())} >
                        {
                            themeState.theme === 'dark' ? <TiWeatherNight /> : <TiWeatherSunny />
                        }
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}