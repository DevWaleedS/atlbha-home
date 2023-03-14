import React from "react";
import "./ReviewBox.css";
const ReviewBox = ({ text, Img }) => {
    return (
        <div className="review-box">
            <div className="box-img">
                <img src={Img} alt="" />
            </div>
            <h5>{text}</h5>
        </div>
    );
};

export default ReviewBox;
