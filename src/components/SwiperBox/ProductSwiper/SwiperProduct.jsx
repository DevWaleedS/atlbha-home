import React from "react";
import "./SwiperProduct.css";
import { AiFillStar } from "react-icons/ai";

const SwiperProduct = ({ Img, Name, Evaluate, Mark }) => {
    return (
        <>
            <div className="swiper-product">
                <div className="box">
                    <div className="box-img">
                        <img src={Img} alt="" />
                    </div>
                    <hr />
                    <div className="content">
                        <h6>{Name}</h6>
                        <div className="info">
                            <span>
                                {Number(Evaluate).toFixed(1)}
                                <AiFillStar />
                            </span>
                            <bdi>{Mark} ر.س</bdi>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SwiperProduct;

