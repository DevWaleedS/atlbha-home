import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoHeader } from "../../index";
import { ReactComponent as SvgComponent } from "../../../assets/Icons/Component 59 – 11.svg";
import { ReactComponent as SvgKey } from "../../../assets/Icons/key.svg";
import "./PasswordBackBox.css";
const PasswordBackBox = () => {
    let navigate = useNavigate();

    return (
        <>
            <div className="password-back-box" dir="ltr">
                <div className="all-content" dir="rtl">
                    <div className="box-container-form">
                        <LogoHeader />
                        <div className="all">
                            <h2>قم بتسجيل الدخول الى حسابك</h2>
                            <div className="box">
                                <h5>البريد الالكتروني</h5>
                                <input
                                    type="text"
                                    placeholder="sample@gmail.com"
                                />
                            </div>
                            <button
                                className="bt-main"
                                onClick={() => {
                                    navigate("/sendPasswordPage");
                                }}
                            >
                                ارسال
                            </button>
                        </div>
                    </div>

                    <div className="box-form-banner">
                        <span className="over-info">
                            <SvgComponent />
                        </span>
                        <div className="info-svg">
                            <h4>استعادة كلمة المرور</h4>
                            <span>
                                <SvgKey />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordBackBox;
