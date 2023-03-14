import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoHeader } from "../../index";
import { ReactComponent as SvgComponent } from "../../../assets/Icons/Component 59 – 11.svg";
import { ReactComponent as SvgKey } from "../../../assets/Icons/key.svg";
import { ReactComponent as Svgtrue } from "../../../assets/Icons/icon-24- true.svg";
import "./SendPasswordBox.css";
const SendPasswordBox = () => {
    let navigate = useNavigate();
    let location = useLocation();

    return (
        <>
            <div className="send-password-back-box" dir="ltr">
                <div className="all-content" dir="rtl">
                    <div className="box-container-form">
                        <LogoHeader />
                        <div className="all">
                            <h2>قم بتسجيل الدخول الى حسابك</h2>
                            <div className="box">
                                <h5>استعادة كلمة المرور</h5>
                                <div className="info">
                                    <span>
                                        <Svgtrue />
                                    </span>
                                    <h3>
                                        تم إرسال تفاصيل استعادة كلمة السر الخاصة
                                        بك إلى بريدك الإلكتروني
                                    </h3>
                                </div>
                            </div>
                            <button
                                className="bt-main"
                                onClick={() => {
                                    navigate("/signInPage");
                                }}
                            >
                                تسجيل الدخول
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

export default SendPasswordBox;
