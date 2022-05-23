import { Box, Button, Flex, Stack, useMediaQuery } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { InputField } from "../../components"
import { useRegisterMutation } from "../../generated/graphql"
import { mapErrors } from "../../utils/mapErrors"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { validateDataForRegister } from "../../utils/validateRegisterFormData"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

type RegisterPageProps = {}


export const RegisterPage: React.FC<RegisterPageProps> = () => {

    const [, register] = useRegisterMutation();
    const navigate = useNavigate();
    const themeState = useSelector((state: RootState) => state.theme);
    const [isGreaterThan800] = useMediaQuery(`(min-width: 800px)`);
    return (
        <Flex
            h="100vh"
            w="100%"
            pt={'8vh'}
            alignItems="center"
            justifyContent="center"
            gap="1rem"
            bg={`main.${themeState.theme}`}
        >
            <Flex
                h="50%"
                boxShadow='base'
                alignItems='center'
                justifyContent='center'
                w={isGreaterThan800 ? "40%" : "90%"}
            >
                <Box
                    w='90%'
                    h='90%'
                >
                    <Formik

                        initialValues={{
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: ""
                        }}


                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            const validationErrors = validateDataForRegister(values);
                            let errors = validationErrors;
                            if (Object.keys(validationErrors).length === 0) {
                                const response = await register(values);
                                const serverErrors = response.data?.register.errors;
                                console.log(serverErrors)
                                errors = mapErrors(serverErrors, validationErrors);
                                if (Object.keys(errors).length === 0) {
                                    toast.success('user created successfully')
                                    navigate('/login')
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
                                        <Stack spacing={3} >
                                            <InputField
                                                variant={themeState.theme}
                                                name="username"
                                                placeholder="username"
                                                label="Username"
                                                type="text"
                                            />
                                            <InputField
                                                variant={themeState.theme}
                                                name="email"
                                                placeholder="email"
                                                label="email"
                                                type="email"
                                            />
                                            <InputField
                                                variant={themeState.theme}
                                                name="password"
                                                placeholder="password"
                                                label="password"
                                                type="password"
                                            />
                                            <InputField
                                                variant={themeState.theme}
                                                name="confirmPassword"
                                                placeholder="confirm password"
                                                label="confirm password"
                                                type="password"
                                            // size="md"
                                            />
                                            <Button
                                                colorScheme={`${themeState.theme === "light" ? "telegram" : "purple"}`}
                                                variant='solid'
                                                isLoading={isSubmitting}
                                                loadingText='Submitting'
                                                type="submit"
                                            >
                                                Register
                                            </Button>

                                        </Stack>
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