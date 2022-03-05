import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Routes } from "react-router-dom";
import { RootState } from "../../app/store";

type LaandingPageProps = {};

export const LandingPage: React.FC<LaandingPageProps> = () => {

    const themeState = useSelector((state: RootState) => state.theme)

    return (

        <Box
            bg={`main.${themeState.theme}`} w='100%' h='100vh' overflowX={"hidden"}
            backgroundImage="url('https://ik.imagekit.io/dnoyrwmg9i9o/photo-1627856013091-fed6e4e30025-min_ZbO2fciiS.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1646503804698')"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
        >

            <Routes>

            </Routes>
        </Box>
    )
}
