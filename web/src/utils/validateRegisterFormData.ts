
export function validateDataForRegister(values: any) {
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