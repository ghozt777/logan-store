import { Box } from "@chakra-ui/react";
import React from "react";
import { useTheme } from "../../features/theme/themeSlice";

export const Products: React.FC<{}> = () => {
    const themeState = useTheme();
    return (
        <Box
            h='100vh'
            minH='890px'
            w='100%'
            bg={`main.${themeState.theme}`}
        >
            
        </Box>
    )
} 