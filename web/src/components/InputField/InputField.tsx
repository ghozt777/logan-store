import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    ThemingProps,
    useMediaQuery,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import "./style.css"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder?: string;
    variant?: "light" | "dark";
};

export const InputField: React.FC<InputFieldProps> = ({
    variant,
    label,
    size,
    ...props
}) => {
    const [field, { error }] = useField(props);
    const [isLagerThan800] = useMediaQuery(`(min-width: 800px)`)
    return (
        //   if there is an error isInvalid will be true
        <FormControl isInvalid={!!error}>
            <FormLabel className="label" color={variant === "light" ? "black" : "white"} htmlFor={props.name}>{label}</FormLabel>
            <Input
                _focus={{
                    borderColor: variant === "light" ? "" : "#c084fc"
                }}
                _placeholder={{
                    color: variant === "light" ? "#94a3b8" : "#71717a"
                }}
                size={isLagerThan800 ? "sm" : "md"}  {...field} {...props} id={field.name} />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
};