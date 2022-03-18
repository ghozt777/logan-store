import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Banner } from "../../components/Banner/Banner";
import { Footer } from "../../components/Footer/Footer";
import { LandingPageheader } from "../../components/LangingPageHeader/LandingPageHeader";
import { usePingServer } from "../../hooks/pingServer";

type LaandingPageProps = {};

export const LandingPage: React.FC<LaandingPageProps> = () => {
    usePingServer();
    const themeState = useSelector((state: RootState) => state.theme)
    return (
        <Box
            bg={`main.${themeState.theme}`} w='100%' h='100vh' overflowX={"hidden"} minH='40rem'
        >
            <LandingPageheader />
            <Banner />
            <Footer />
        </Box>
    )
}
