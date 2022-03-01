import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { InputField } from "../../components"
import { useRegisterMutation } from "../../generated/graphql"
import { mapErrors } from "../../utils/mapErrors"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type RegisterPageProps = {}


export const RegisterPage: React.FC<RegisterPageProps> = () => {

    const [, register] = useRegisterMutation();
    const navigate = useNavigate();

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
        if (values.password.length < 8) errors.password = "password must contaim atlest 8 characters"
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


                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const validationErrors = validateData(values);
                    let errors = validationErrors;
                    if (Object.keys(validationErrors).length === 0) {
                        const response = await register(values);
                        const serverErrors = response.data?.register.errors;
                        console.log(serverErrors)
                        errors = mapErrors(serverErrors, validationErrors);
                        if (Object.keys(errors).length === 0) {
                            toast.success('user created successfully')
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