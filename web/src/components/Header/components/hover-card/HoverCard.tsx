import { Box, Heading, Stack } from "@chakra-ui/react"
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { useWindowSize } from "../../../../hooks/useWindowSize";



export interface HoverCardProps {
    title: string;
    setIsHover?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const HoverCard: React.FC<HoverCardProps> = (props) => {
    const [width] = useWindowSize();
    const themeState = useSelector((state: RootState) => state.theme);
    return (
        <Box
            position={"fixed"}
            top="3.7rem"
            h="10rem"
            left="0"
            w={width}
            bg={`hover-card.${themeState.theme}`}
            shadow='lg'
            onMouseEnter={() => props.setIsHover && props.setIsHover(true)}
            onMouseLeave={() => props.setIsHover && props.setIsHover(false)}
        >
            <Fade>
                <Stack>
                    <Heading color={themeState.theme === 'dark' ? 'white' : 'black'}>{props.title}</Heading>
                </Stack>
            </Fade>
        </Box>
    )
}