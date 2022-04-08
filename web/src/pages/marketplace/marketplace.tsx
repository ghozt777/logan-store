import { Route, Routes } from "react-router-dom";
import { MarketPlaceLandingPage } from "./pages/Landing";

export const MarketPlacePage = () => {
    return (
        <Routes>
            <Route path='/' element={<MarketPlaceLandingPage />} />
        </Routes>
    )
}