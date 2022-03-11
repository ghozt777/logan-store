import { Box, Heading, Stack } from "@chakra-ui/react"
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { useWindowSize } from "../../../../hooks/useWindowSize";



export interface HoverCardProps  {
    title : string ;
}

export const HoverCard: React.FC<HoverCardProps> = (props) => {
    const [width] = useWindowSize() ;
    const themeState = useSelector((state: RootState) => state.theme) ;
    return (
        <Box
            position={"fixed"}
            top="5rem"
            h="15rem"
            left="0"
            w={width}
            bg="white"
        >
            <Fade>
                <Stack>
                    <Heading color="black" >{props.title}</Heading>
                </Stack> 
            </Fade>
        </Box>
   )
}