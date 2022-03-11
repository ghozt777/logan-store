import { Button, Text, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import './style.css'
import { InputHTMLAttributes, useState } from "react"


type CategoryBtnProps = InputHTMLAttributes<HTMLButtonElement> & {
    abbr: string;
    name: string;
    HoverCard: React.ComponentType<any>
}

export const CategoryButton: React.FC<CategoryBtnProps> = ({ name, abbr, HoverCard }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const [isGreaterThan1100, isGreaterThan600] = useMediaQuery([`(min-width: 1100px)`, `(min-width: 600px)`])
    const [isHover, setIsHover] = useState(false);
    return <>
        <Button
            className='btn-category-link'
            color={themeState.theme === "light" ? "black" : "white"}
            variant='link'
        >
            {
                isGreaterThan600 && <Text onMouseOver={() => setIsHover(true)} className='category-link' >{isGreaterThan1100 ? name : abbr + "..."}</Text>
            }
            {
                isHover && <Box onMouseLeave={() => setIsHover(false)} ><HoverCard /></Box>
            }
        </Button>
    </>

}

// onMouseLeave={() => setIsHover(false)}