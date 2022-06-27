import { Flex, Box, useMediaQuery, } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { ProductsCard } from "../../components/ProductsCard/ProductsCard";
import { useTheme } from "../../features/theme/themeSlice";
import styled from "styled-components";
import { useGetProductsQuery } from "../../generated/graphql";

const Grid = styled.div`
    display:grid ;
    width:100%;
    height:100%;
    display:grid;
    gap:16px;
    grid-template-columns: repeat(auto-fit , minmax(240px, 1fr));
    &::-webkit-scrollbar{
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: ${props => props.theme === "dark" ? "#111827" : "#D1D5DB"};
    }
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme === "dark" ? "#7C3AED" : "#1F2937"};
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme === "dark" ? "#A78BFA" : "#4B5563"};
    }
    @media (max-width:700px){
        grid-template-columns: repeat(2 ,1fr);
    }
`

const Controls: React.FC<{}> = () => {
    return (
        <Flex
            position={"fixed"}
            h='80vh'
            w='220px'
            minW='220px'
            left='20px'
        >

        </Flex>
    )
}

const ViewAllProducts: React.FC<{}> = () => {
    const themeState = useTheme()
    const [isLargerThan790] = useMediaQuery(`(min-width:790px)`);
    const [getProductsRes] = useGetProductsQuery();
    return (
        <Flex
            minH='900px'
            alignItems='flex-start'
            justifyContent='center'
            pb='4rem'
            w='100%'
            pl={isLargerThan790 ? '235px' : '0px'}
            pr={isLargerThan790 ? '4vw' : '0px'}
        >
            {isLargerThan790 && <Controls />}
            <Flex
                h='100%'
                w='100%'
                alignItems='center'
                justifyContent='center'
                maxW='1300px'
            >
                {
                    getProductsRes.fetching ? (
                        <h1>Loading...</h1>
                    ) : (
                        getProductsRes.data?.getProducts &&
                        <Grid
                            theme={themeState.theme}
                        >
                            {getProductsRes.data.getProducts.map(p => {
                                return (
                                    <ProductsCard img={p.images ? p.images[0].url : ""} name={p.name} price={100} />
                                )
                            })}
                        </Grid>
                    )
                }
            </Flex>
        </Flex>
    )
}

export const Products: React.FC<{}> = () => {
    const themeState = useTheme();
    const { productId } = useParams();

    return (
        <Box
            h='auto'
            minH='890px'
            w='100%'
            bg={`main.${themeState.theme}`}
            pt='11rem'
            pl='1rem'
            pr='1rem'
            pb='1rem'
            position={"relative"}
        >
            <ViewAllProducts />
        </Box>
    )
} 