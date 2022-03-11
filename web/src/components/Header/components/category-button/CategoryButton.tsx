import { Button, Text, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import './style.css'
import { InputHTMLAttributes, useState } from "react"


type CategoryBtnProps = InputHTMLAttributes<HTMLButtonElement> & {
    abbr: string;
    name: string;
    HoverCard: React.ComponentType;
}

export const CategoryButton: React.FC<CategoryBtnProps> = ({ name, abbr, HoverCard }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const [iseGreaterThan1100, iseGreaterThan600] = useMediaQuery([`(min-width: 1100px)`, `(min-width: 600px)`])
    const [isHover, setIsHover] = useState(false);
    return <>
        <Button
            className='btn-category-link'
            color={themeState.theme === "light" ? "black" : "white"}
            variant='link'
        >
            {
                iseGreaterThan600 && <Text onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='category-link' >{iseGreaterThan1100 ? name : abbr + "..."}</Text>
            }
            {
                isHover && <HoverCard />
            }
        </Button>
    </>

}