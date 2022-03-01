export function validateDataForLogin(values: any) {
    const errors: any = {}
    if (!values.usernameOrEmail) errors.usernameOrEmail = "username or email required!"
    if (!values.password) errors.password = "password required!"
    console.log(errors)
    return errors;
}