import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    useMediaQuery,
    useColorModeValue,
    useColorMode,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { useTheme } from "../../features/theme/themeSlice";
import "./style.css"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder?: string;
    variant?: "light" | "dark";
    textSize?: "sm" | "lg";
};

export const InputField: React.FC<InputFieldProps> = ({
    variant,
    label,
    textSize,
    size,
    ...props
}) => {
    const [field, { error }] = useField(props);
    const [isLagerThan800] = useMediaQuery(`(min-width: 800px)`)
    const themeState = useTheme();
    return (
        //   if there is an error isInvalid will be true
        <FormControl isInvalid={!!error}>
            <FormLabel
                fontSize={isLagerThan800 ? 'md' : 'sm'}
                className="label"
                color={variant === "light" ? "black" : "white"}
                htmlFor={props.name}
            >
                {label}
            </FormLabel>
            <Input
                autoComplete="on"
                color={themeState.theme === "light" ? "black" : "white"}
                size={isLagerThan800 ? "md" : "sm"}  {...field} {...props} id={field.name} />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
};