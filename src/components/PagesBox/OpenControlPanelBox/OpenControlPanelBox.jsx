import React from "react";
import { LogoHeader } from "../../index";
import "./OpenControlPanelBox.css";
const OpenControlPanelBox = () => {
    return (
        <>
            <div className="open-Control-Panel">
                <div className="container">
                    <LogoHeader />
                </div>
                <div className="container">
                    <h1>يتم فتح لوحة تحكم التاجر</h1>
                </div>
            </div>
        </>
    );
};

export default OpenControlPanelBox;
