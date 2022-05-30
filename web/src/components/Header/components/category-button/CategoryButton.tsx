import { Button, Text, useMediaQuery } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import './style.css'
import { InputHTMLAttributes, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


type CategoryBtnProps = InputHTMLAttributes<HTMLButtonElement> & {
    abbr: string;
    name: string;
    HoverCard: React.ComponentType<any>;
}

export const CategoryButton: React.FC<CategoryBtnProps> = ({ name, abbr, HoverCard }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const [iseGreaterThan1100, iseGreaterThan600] = useMediaQuery([`(min-width: 1100px)`, `(min-width: 600px)`])
    const [isHover, setIsHover] = useState(false);
    const [isHoverDisabled, setHoverDisabled] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => setHoverDisabled(false), 700);
        return () => clearTimeout(timer);
    })
    return <>
        <Button
            onClick={() => {
                navigate(`/collections/${name}`)
            }}
            className='btn-category-link'
            color={themeState.theme === "light" ? "black" : "white"}
            variant='link'
        >
            {
                iseGreaterThan600 && <Text onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='category-link' >{iseGreaterThan1100 ? name : abbr}</Text>
            }
            {
                !isHoverDisabled && isHover && <HoverCard setIsHover={setIsHover} />
            }
        </Button>
    </>

}