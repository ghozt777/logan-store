import { useEffect } from "react";
import { toast } from "react-toastify";
import { useHelloQuery } from "../generated/graphql"

export const usePingServer = () => {
    const [data] = useHelloQuery();
    useEffect(() => {
        if (data.fetching) {
            console.log('fetching data ..')
        }
        else {
            if (data.error) {
                toast.error(`Server Connection Lost ...`);
                console.log(data);
                console.error(`Error While Connecting to GraphQL Server ... with error ->${data.error.name} :  ${data.error.message}`)
            }
        }
    }, [data])
    return data;
}
