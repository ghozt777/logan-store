import { Box } from "@chakra-ui/react"

interface SeparatorProps {
    size: "sm" | "md" | "lg";
    color?: string;
    top?: number | string;
}

export const Separator: React.FC<SeparatorProps> = ({ size, color = "gray" ,top="0" }) => {
    const padding = size === "sm" ? "0.8px" : size === "md" ? "1px" : "2px"
    return (
        <Box
            w="70%"
            m="0 auto"
            p={padding}
            bg={color}
            position="absolute"
            top={top}
        ></Box>
    )
}