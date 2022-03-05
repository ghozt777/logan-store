import { Flex, Stack, Button } from "@chakra-ui/react";
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
    const navigate = useNavigate();

    return (
        <Flex
            h="100vh"
            w="100%"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
            bg={themeState.theme === "light" ? "" : "#171717"}
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
                                <Stack spacing={3} >
                                    <InputField
                                        name="email"
                                        placeholder="enter your registered email"
                                        label="email"
                                        type="email"
                                    />
                                    <Button
                                        colorScheme='teal'
                                        variant='solid'
                                        isLoading={isSubmitting}
                                        loadingText='Submitting'
                                        type="submit"
                                    >
                                        Send Email
                                    </Button>
                                </Stack>
                            </Form>
                        )
                    }
                }
            </Formik>
        </Flex >
    )
}