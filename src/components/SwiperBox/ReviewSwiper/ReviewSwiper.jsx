// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import "./ReviewSwiper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewBox from "./ReviewBox.jsx";
let ReviewSwiper = ({ DataReviewSwiper }) => {
    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={40}
                slidesPerGroup={1}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    200: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                }}
                navigation={false}
                modules={[Pagination, Navigation, Autoplay]}
                className="swiper-review"
            >
                {DataReviewSwiper.length
                    ? DataReviewSwiper.map((el) => {
                        return (
                            <SwiperSlide key={el.id}>
                                <ReviewBox Img={el.user.image} text={el.comment_text} />
                            </SwiperSlide>
                        );
                    })
                    : null}

            </Swiper>
        </>
    );
};
export default ReviewSwiper;
