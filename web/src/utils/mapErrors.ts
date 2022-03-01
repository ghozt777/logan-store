import { Errors } from "../generated/graphql";

export function mapErrors(serverErrors: Errors[] | undefined, frontEndErrors: any) {
    const errMap: Record<string, string[]> = {};
    serverErrors?.forEach(({ field, message }) => {
        errMap[field] ? errMap[field].push(message) : errMap[field] = [message]
    })
    console.log('errmap', serverErrors);
    const errors: Record<string, string> = {};
    Object.keys(errMap).map(field => {
        let message = "";
        message = errMap[field].join(', ');
        if (frontEndErrors[field]) message += " and " + frontEndErrors[field]
        errors[field] = message
    })
    console.log('errors', errors)
    return errors
}