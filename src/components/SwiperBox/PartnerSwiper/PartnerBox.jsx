import React from "react";
import "./PartnerBox.css";
const PartnerBox = ({ Img }) => {
    return (
        <div className="partner-box">
            <div className="box-img">
                <img src={Img} alt="" />
            </div>
        </div>
    );
};

export default PartnerBox;
