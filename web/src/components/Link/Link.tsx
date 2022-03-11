import { Button, useMediaQuery } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import "./style.css"

interface LinkProps {
    name: string;
    to: string;
}

export const Link: React.FC<LinkProps> = ({ name, to }) => {
    const navigate = useNavigate();
    const themeState = useSelector((state: RootState) => state.theme);
    const [isLagerThan800] = useMediaQuery(`(min-width: 800px)`)
    return (
        <Button
            className="link"
            variant="link"
            onClick={() => navigate(to)}
            backgroundColor="transparent"
            color={themeState.theme === "light" ? "#0f172a" : "white"}
            fontSize={isLagerThan800 ? "1rem" : "0.8rem"}
        >{name}</Button>
    )
}