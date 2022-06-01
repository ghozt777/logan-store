import { WarningTwoIcon } from "@chakra-ui/icons";
import { Flex, Text, Box } from "@chakra-ui/react";
import React from "react";

interface ErrorCardProps {
    theme: 'light' | 'dark',
    message: string
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ theme, message }) => {
    return (
        <Flex
            h='50%'
            w='90%'
            bg={`showcase.${theme}`}
            p='30px'
            alignItems='center'
            justifyContent='space-evenly'
            boxShadow={theme === 'light' ? 'base' : 'none'}
        >
            <WarningTwoIcon color='red' h='20%' w='20%' maxH={'40px'} maxW='40px' />
            <Box w='60%' textAlign={'center'}>
                <Text color={`text2.${theme}`} fontSize='md' >{message}</Text>
            </Box>
        </Flex>
    )
}