import React from "react";
import "./MainTitle.css";
const MainTitle = ({ text }) => {
    return (
        <>
            <div className="main-title justify-content-center justify-content-md-start">
                <h5 className="bt-main">{text}</h5>
            </div>
        </>
    );
};

export default MainTitle;
