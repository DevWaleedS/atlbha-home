// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import "./ProductSwiper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperProduct from "./SwiperProduct";
let ProductSwiper = React.memo(({ productSwiperData }) => {
    return (
					<>
						<Swiper
							slidesPerView={6}
							spaceBetween={40}
							slidesPerGroup={1}
							centeredSlides={true}
							loopFillGroupWithBlank={true}
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

								992: {
									slidesPerView: 4,
								},
								1200: {
									slidesPerView: 5,
								},
								// 1400: {
								//     slidesPerView: 6,
								// },
							}}
							navigation={false}
							modules={[Pagination, Navigation, Autoplay]}
							className='mySwiper products_swiper'
						>
							{productSwiperData.map((el, index) => {
								return (
									<SwiperSlide key={el.id} id={el.id}>
										<SwiperProduct Img={el.cover} Name={el.name} Evaluate={el.productRating} Mark={el.selling_price} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</>
				);
});
export default ProductSwiper;
