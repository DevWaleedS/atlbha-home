import React from "react";
import "./OwnerBox.css";
const OwnerBox = ({ ImgOwner, NameOwner, DateOwner }) => {
    return (
        <>
            <div className="owner-box">
                <div className="box">
                    <div className="box-img">
                        <img src={ImgOwner} alt="" />
                    </div>
                    <div className="info">
                        <h5>{NameOwner}</h5>
                        <h6>{DateOwner}</h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OwnerBox;
