import { useEffect } from "react";
import { toast } from "react-toastify";
import { useHelloQuery } from "../generated/graphql"

export const usePingServer = () => {
    const data = useHelloQuery();
    useEffect(() => {
        if (data[0].fetching) {
            console.log('fetching data ..')
        }
        else {
            if (data[0].error) {
                toast.error(`Server Connection Lost ...`);
                console.error(`Error While Connecting to GraphQL Server ... with error ->${data[0].error.name} :  ${data[0].error.message}`)
            }
        }
    }, [data])
}