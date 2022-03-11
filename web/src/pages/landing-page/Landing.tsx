import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Routes } from "react-router-dom";
import { RootState } from "../../app/store";
import { HoverCard } from "../../components/Header/components/hover-card/HoverCard";
import { usePingServer } from "../../hooks/pingServer";

type LaandingPageProps = {};

export const LandingPage: React.FC<LaandingPageProps> = () => {
    usePingServer();
    const themeState = useSelector((state: RootState) => state.theme)

    return (

        <Box
            bg={`main.${themeState.theme}`} w='100%' h='100vh' overflowX={"hidden"}
        >

        </Box>
    )
}
