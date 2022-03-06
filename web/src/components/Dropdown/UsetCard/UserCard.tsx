import { Box, Fade } from "@chakra-ui/react"

interface UserCardProps {
    isOpen: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ isOpen }) => {

    return (
        <Fade  in={isOpen}>
            <Box
                p='40px'
                color='white'
                mt='4'
                bg='teal.500'
                rounded='md'
                shadow='md'
            >
                Fade
            </Box>
        </Fade>
    )
}