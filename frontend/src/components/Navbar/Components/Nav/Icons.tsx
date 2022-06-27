import { FiShoppingBag } from 'react-icons/fi'
import { FaTshirt } from 'react-icons/fa'
import { FcFolder } from 'react-icons/fc'
import { RiFileList3Line } from 'react-icons/ri'

export const IconsMap = new Map([
    ["products", <FaTshirt color='#67e8f9' size="2rem" />],
    ["collection", <FcFolder size="2rem" />],
    ["cart", <FiShoppingBag color='#f97316' size="2rem" />],
    ["orders", <RiFileList3Line color='#854d0e' size="2rem" />]
]);