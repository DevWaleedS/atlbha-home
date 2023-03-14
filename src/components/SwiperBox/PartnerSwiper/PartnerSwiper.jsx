// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import "./PartnerSwiper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PartnerBox from "./PartnerBox.jsx";
let PartnerSwiper = ({ PartnerDataSwiper }) => {
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={40}
                slidesPerGroup={1}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    200: {
                        slidesPerView: 1,
                    },
                    992: {
                        slidesPerView: 2,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                }}
                navigation={false}
                modules={[Pagination, Navigation, Autoplay]}
                className="swiper-partner"
            >
                {PartnerDataSwiper.length
                    ? PartnerDataSwiper.map((el) => {
                        return (
                            <SwiperSlide key={el.id}>
                                <PartnerBox Img={el.logo} />
                            </SwiperSlide>
                        );
                    })
                    : null}
            </Swiper>
        </>
    );
};
export default PartnerSwiper;
