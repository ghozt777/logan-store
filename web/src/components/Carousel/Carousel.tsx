import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper";
import styled from 'styled-components'
import 'swiper/css/effect-fade';
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import React from "react";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`

export const Carousel: React.FC<{}> = ({ children }) => {
    const themeState = useSelector((state: RootState) => state.theme);
    const childrenArray = React.Children.toArray(children);
    return (
        <Wrapper>
            <Swiper
                pagination={true}
                modules={[Pagination, EffectFade, Autoplay]}
                className="swpier"
                effect="fade"
                autoplay={true}
            >
                <>
                    {
                        childrenArray.map(Children => {
                            return (
                                <SwiperSlide className='swiper-slide'>
                                    {
                                        Children
                                    }
                                </SwiperSlide>
                            )
                        })
                    }
                </>
            </Swiper>
        </Wrapper>
    );
}