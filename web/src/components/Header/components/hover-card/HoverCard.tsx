import { Box, Heading, Stack } from "@chakra-ui/react"
import { Fade } from "react-awesome-reveal";
import { useWindowSize } from "../../../../hooks/useWindowSize";


export const HoverCard: React.FC<{}> = () => {
    const [width] = useWindowSize();
    return (
        <Box
            position={"fixed"}
            h="15rem"
            left="0"
            bg="transparant"
            top="4rem"
            w={width}
        >   <Fade style={{ height: "100%" }} >
                <Stack
                    // bg="white"
                    mt="1rem"
                    bg="red"
                    h="90%"
                >

                    <Heading>Test Card</Heading>
                </Stack>
            </Fade>
        </Box>
    )
}