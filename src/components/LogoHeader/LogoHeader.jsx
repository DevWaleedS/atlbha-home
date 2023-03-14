import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../../assets/Icons/logo svg.svg";
import "./LogoHeader.css";

const LogoHeader = () => {
    let navigate = useNavigate();
    return (
        <>
            <div className="logo-header">
                <div
                    className="box-logo"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <LogoSvg />
                </div>
            </div>
        </>
    );
};

export default LogoHeader;
