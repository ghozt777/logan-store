import { Button, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { useWhoAmIQuery } from "../../../generated/graphql"

interface CardProps {
    title: string
}

export const Card: React.FC<CardProps> = ({ title }) => {
    const authState = useSelector((state: RootState) => state.auth)
    const [isGreaterThan800] = useMediaQuery(`(min-width: 800px)`)
    const res = useWhoAmIQuery()

    return (
        <Flex
            h="100%"
            w="100%"
            p="10px"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-evenly"
            fontSize={isGreaterThan800 ? "1.2rem" : "0.8rem"}
        >
            <Text>{title}</Text>
            {
                authState.isLoggedIn ? (
                    <Text>Currently Logged in as:
                        {
                            res[0].fetching ? "Loading ..." : res[0].data?.whoami.username
                        }
                    </Text>
                ) : (
                    <>
                        <Button>Login</Button>
                        <Button>Register</Button>
                    </>
                )
            }
        </Flex>
    )
}