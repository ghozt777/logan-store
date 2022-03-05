import { Flex, Stack, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { InputField } from "../../components";
import { useResetPasswordMutation } from "../../generated/graphql";
import { mapErrors } from "../../utils/mapErrors";

interface ResetPasswordProps { };

export const ResetPasswordPage: React.FC<ResetPasswordProps> = () => {
    const themeState = useSelector((state: RootState) => state.theme);
    const [, resetPassword] = useResetPasswordMutation();
    const { token } = useParams();
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
                    pass: "",
                    confirmPassword: ""
                }}


                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    setSubmitting(true);
                    let errors: any = {};
                    if (values.pass !== values.confirmPassword) {
                        errors.pass = "passwords don't match";
                    }
                    if (Object.keys(errors).length === 0 && token) {
                        const response = await resetPassword({ newPassword: values.confirmPassword, token });
                        const serverErrors = response.data?.resetPassword.errors;
                        console.log(serverErrors)
                        errors = mapErrors(serverErrors, {});
                        if (Object.keys(errors).length === 0) {
                            toast.success('password reset succesful');
                            navigate('/')
                        } else {
                            console.error('reset password failed with response : ', response.data?.resetPassword);
                            let errorMessage = "";
                            const errs: string[] = []
                            Object.keys(errors).map(k => {
                                errs.push(errors[k]);
                            })
                            errorMessage = errs.length > 0 ? errs.join(', ') : "Unknown Error !";
                            toast.warning(errorMessage);
                        }
                    } else {
                        setErrors(errors);
                        if (!token) toast.error('token not found');
                    }
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
                                        name="pass"
                                        placeholder="enter a new password"
                                        label="password"
                                        type="password"
                                        value={values.pass}
                                    />
                                    <InputField
                                        name="confirmPassword"
                                        placeholder="enter the same password"
                                        label="confirm password"
                                        type="password"
                                    />
                                    <Button
                                        colorScheme='teal'
                                        variant='solid'
                                        isLoading={isSubmitting}
                                        loadingText='Submitting'
                                        type="submit"
                                    >
                                        Reset Password
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