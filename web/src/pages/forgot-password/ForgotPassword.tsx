import { Flex, Stack, Button, Box, useMediaQuery, VStack, StackDivider } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { InputField } from "../../components";
import { useForgotPasswordMutation } from "../../generated/graphql";


interface ForgotPasswordProps { };
export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = () => {

    const themeState = useSelector((state: RootState) => state.theme);
    const [, forgotPassword] = useForgotPasswordMutation();
    const [isGreaterThan800] = useMediaQuery(`(min-width: 800px)`);
    const navigate = useNavigate();

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
                h={isGreaterThan800 ? "47%" : "70%"}
                boxShadow='base'
                alignItems='center'
                justifyContent='center'
                w={isGreaterThan800 ? "40%" : "90%"}
                position={"relative"}
            >
                <Box
                    h="50%"
                    w="90%"
                >
                    <Formik

                        initialValues={{
                            email: ""
                        }}


                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            setSubmitting(true);
                            if (values.email === "") setErrors({ email: "this field can't be empty" });
                            const response = await forgotPassword({ email: values.email });
                            if (response.data?.forgotPassword) {
                                toast.success('Email Sent !');
                                navigate('/');
                            }
                            else toast.warning('Email Not Sent ! Please check your email address');
                            setSubmitting(false);
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
                                                variant={themeState.theme}
                                                name="email"
                                                placeholder="enter your registered email"
                                                label="email"
                                                type="email"
                                            />
                                            <Button
                                                w='80%'
                                                colorScheme={`${themeState.theme === "light" ? "telegram" : "purple"}`}
                                                variant='solid'
                                                isLoading={isSubmitting}
                                                loadingText='Submitting'
                                                type="submit"
                                            >
                                                Send Email
                                            </Button>
                                            <Flex
                                                position='absolute'
                                                bottom='40px'
                                                right='40px'
                                                ml="auto"
                                                flexDirection="row"
                                                alignItems="center"
                                                justifyContent="flex-end"
                                                size={isGreaterThan800 ? "md" : "sm"}
                                                gap='1rem'
                                            >
                                                <Button onClick={() => navigate('/register')} size={"xs"} variant={"solid"}>Register</Button>
                                                <Button onClick={() => navigate('/login')} size={"xs"} variant={"link"}>login</Button>
                                            </Flex>
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