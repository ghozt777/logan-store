import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { InputField } from "../../components"

type RegisterPageProps = {}


export const RegisterPage: React.FC<RegisterPageProps> = () => {


    function validateData(values: any) {
        const errors: any = {}
        if (!values.username) errors.username = "username required!"
        if (!values.email) errors.email = "email required!"
        if (!values.password) errors.password = "password required!"
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = "not a valid email address"
        if (values.username.includes('@')) errors.username = "username cant contain @ !"
        if (values.password != values.confirmPassword) {
            errors.password = "password and confirm-password dont match"
            errors.confirmPassword = "password and confirm-password dont match"
        }
        console.log(errors)
        return errors;
    }



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
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}


                onSubmit={(values, { setSubmitting, setErrors }) => {
                    const errors = validateData(values);
                    setErrors(errors)
                    setTimeout(() => {
                        console.log("formik values", values)
                    }, 3000)
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
                                        name="username"
                                        placeholder="username"
                                        label="Username"
                                        type="text"
                                    />
                                    <InputField
                                        name="email"
                                        placeholder="email"
                                        label="email"
                                        type="email"
                                    />
                                    <InputField
                                        name="password"
                                        placeholder="password"
                                        label="password"
                                        type="password"
                                    />
                                    <InputField
                                        name="confirmPassword"
                                        placeholder="confirm password"
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
                                        Register
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