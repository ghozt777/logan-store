import { Box, Heading, Stack } from "@chakra-ui/react"
import { Fade } from "react-awesome-reveal";

export const HoverCard: React.FC<{}> = () => {
    console.log(window.innerWidth)
    return (
        <Box
            position={"fixed"}
            top="5rem"
            h="10rem"
            left="0"
            w={window.innerWidth}
            bg="white"
        >
            <Fade>
                <Stack>
                    <Heading>Test Card</Heading>
                </Stack>
            </Fade>
        </Box>
    )
}