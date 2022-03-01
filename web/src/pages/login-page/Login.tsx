import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { InputField } from "../../components"
import { useLoginMutation } from "../../generated/graphql"
import { mapErrors } from "../../utils/mapErrors"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { validateDataForLogin } from "../../utils/validateLoginFormData"

type LoginPageProps = {}


export const LoginPage: React.FC<LoginPageProps> = () => {

    const [, login] = useLoginMutation();
    const navigate = useNavigate();

    return (
        <Flex
            h="50vh"
            w="100%"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
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
                        if (Object.keys(errors).length === 0) {
                            toast.success('user login success')
                            navigate('/')
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
                                        name="usernameOrEmail"
                                        placeholder="enter your username or registered email"
                                        label="username or email"
                                        type="text"
                                    />
                                    <InputField
                                        name="password"
                                        placeholder="password"
                                        label="password"
                                        type="password"
                                    />
                                    <Button
                                        colorScheme='teal'
                                        variant='solid'
                                        isLoading={isSubmitting}
                                        loadingText='Submitting'
                                        type="submit"
                                    >
                                        Login
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