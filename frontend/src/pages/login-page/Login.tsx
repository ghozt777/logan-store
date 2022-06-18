import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Link, Stack, StackDivider, useMediaQuery, VStack } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { InputField } from "../../components"
import { useLoginMutation } from "../../generated/graphql"
import { mapErrors } from "../../utils/mapErrors"
import { toast } from "react-toastify"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { validateDataForLogin } from "../../utils/validateLoginFormData"
import { useDispatch, useSelector } from "react-redux"
import { faliureAuth, successAuth } from "../../features/auth/authSlice"
import { RootState } from "../../app/store"
import { useEffect } from "react"

type LoginPageProps = {}


export const LoginPage: React.FC<LoginPageProps> = () => {

    const [, login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const themeState = useSelector((state: RootState) => state.theme)
    const [isGreaterThan800] = useMediaQuery(`(min-width: 800px)`);
    const authState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (authState.isLoggedIn) navigate('/')
    }, [])

    return (
        <Flex
            h="100vh"
            minH='850px'
            w="100%"
            pt={'8vh'}
            alignItems="center"
            justifyContent="center"
            flexDirection={"column"}
            bg={`main.${themeState.theme}`}
        >
            <Flex
                h="40%"
                minH='300px'
                boxShadow='base'
                alignItems='center'
                justifyContent='center'
                w={isGreaterThan800 ? "40%" : "90%"}
                // bg={themeState.theme==='light'?'white':'#171717'}
                border={themeState.theme==='light'?'none':'solid'}
                borderColor='#8b5cf6'
                rounded={'md'}
            >
                <Box
                    h='90%'
                    w='90%'
                    position='relative'
                >
                    <Formik

                        initialValues={{
                            usernameOrEmail: "",
                            password: "",
                        }}


                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            const validationErrors = validateDataForLogin(values);
                            let errors = validationErrors;
                            if (Object.keys(validationErrors).length === 0) {
                                const response = await login(values);
                                const serverErrors = response.data?.login.errors;
                                console.log(serverErrors)
                                errors = mapErrors(serverErrors, validationErrors);
                                if (!response.error && Object.keys(errors).length === 0) {
                                    toast.success('user login success');
                                    dispatch(successAuth({ accessToken: response.data?.login.accessToken as string }))
                                    navigate('/shop');
                                } else {
                                    const errorMessage = response.error?.message ?? "" + " Login failed";
                                    toast.error(errorMessage);
                                    dispatch(faliureAuth({ errors }))
                                }
                            }
                            setErrors(errors)
                            setSubmitting(false)
                        }}
                    >
                        {
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            }) => {
                                return (
                                    <Form>
                                        <VStack
                                            spacing={'15px'}
                                            divider={<StackDivider borderColor='gray.200' />}
                                        >
                                            <InputField
                                                value={values.usernameOrEmail}
                                                variant={themeState.theme}
                                                name="usernameOrEmail"
                                                placeholder="enter your username or registered email"
                                                label="username or email"
                                                type="text"
                                            />
                                            <InputField
                                                value={values.password}
                                                variant={themeState.theme}
                                                name="password"
                                                placeholder="password"
                                                label="password"
                                                type="password"
                                            />
                                            <Button
                                                colorScheme={`${themeState.theme === "light" ? "telegram" : "purple"}`}
                                                variant='solid'
                                                isLoading={isSubmitting}
                                                loadingText='Submitting'
                                                type="submit"
                                                w='80%'
                                            >
                                                Login
                                            </Button>
                                            <Box
                                                w="100%"
                                            >
                                                <Flex
                                                    position='absolute'
                                                    bottom='10px'
                                                    right='10px'
                                                    ml="auto"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="flex-end"
                                                    size={isGreaterThan800 ? "md" : "sm"}
                                                    gap='1rem'
                                                >
                                                    <Button onClick={() => navigate('/register')} size={"xs"} variant={"solid"}>Register</Button>
                                                    <Button onClick={() => navigate('/forgot-password')} size={"xs"} variant={"link"}>forgot password</Button>
                                                </Flex>
                                            </Box>
                                        </VStack>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </Box>
            </Flex>
        </Flex >
    )
}