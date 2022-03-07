import { Box, Heading, Stack } from "@chakra-ui/react"
import { Fade } from "react-awesome-reveal";

export const HoverCard: React.FC<{}> = () => {
    return (
        <Box
            position={"absolute"}
            top="2rem"
            h="10rem"
            w={"20rem"}
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