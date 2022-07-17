import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { useTheme } from "../../features/theme/themeSlice"
import { RiFileWarningLine } from 'react-icons/ri'

interface NotFoundCardProps {
    msg: string;
    parameter: string;
    variant?: 'warning' | 'danger',
    errMessage: string;
}

export const NotFoundCard: React.FC<NotFoundCardProps> = ({ msg, parameter, errMessage, variant = 'warning' }) => {
    const themeState = useTheme();
    const [isGreaterThan800] = useMediaQuery(`(min-width:800px)`)
    console.error(errMessage);
    return (
        <Flex
            h='100%'
            w='100%'
            rounded={'md'}
            boxShadow='base'
            alignItems='center'
            justifyContent='space-evenly'
            flexDirection={isGreaterThan800 ? 'row' : 'column'}
            bg={`error-card.${themeState.theme}`}
            border={themeState.theme === 'light' ? 'none' : 'solid'}
            borderColor={variant === 'warning' ? 'orange' : 'red'}
        >
            <Box>
                <RiFileWarningLine
                    size={'5rem'}
                    color={variant === 'warning' ? 'orange' : 'red'}
                />
            </Box>
            <Box>
                <Text color={themeState.theme === 'dark' ? 'white' : 'black'} fontWeight='bold' fontSize={'1.7em'} >{msg}</Text>
            </Box>
        </Flex>
    )
}