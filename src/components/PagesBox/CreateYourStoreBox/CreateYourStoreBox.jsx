import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoHeader, PasswordField } from "../../index";
import { ReactComponent as Svgarrwos } from "../../../assets/Icons/icon-30-arrwos back1.svg";
import { ReactComponent as SvgComponent } from "../../../assets/Icons/Component 59 – 11.svg";
import { ReactComponent as SvgUser } from "../../../assets/Icons/icon-24-user.svg";
import "./CreateYourStoreBox.css";
const CreateYourStoreBox = () => {
    let navigate = useNavigate();
    let location = useLocation();

    return (
        <>
            <div className="create-store-box" dir="ltr">
                <div className="all-content" dir="rtl">
                    <div className="box-container-form">
                        <LogoHeader />
                        <div className="all">
                            <h2>أنشئ حسابك واستمتع بالتجارة الإلكترونية</h2>

                            <div className="user-info">
                                <button className="bt-main">تسجيل تاجر</button>
                                <button className="bt-main">تسجيل مندوب</button>
                            </div>

                            <div className="user-form">
                                <h4 className="title">بيانات المتجر</h4>

                                <div className="content">
                                    <form action="">
                                        <div>
                                            <h5>اسم المتجر</h5>
                                            <input
                                                type="text"
                                                placeholder="ادخل اسم المتجر"
                                            />
                                        </div>
                                        <div>
                                            <h5>الدومين</h5>
                                            <input
                                                type="email"
                                                placeholder="https:www.utlopha.sample.com"
                                            />
                                        </div>
                                        <div>
                                            <h5>البريد الإلكتروني</h5>
                                            <input
                                                type="email"
                                                placeholder="sapmle@gmail.com"
                                            />
                                        </div>
                                        <PasswordField />
                                        <div>
                                            <h5>الدوله</h5>
                                            <input
                                                type="text"
                                                placeholder="المملكة العربية السعودية"
                                            />
                                        </div>
                                        <div>
                                            <h5>المدينة</h5>
                                            <input
                                                type="text"
                                                value={"المدينة"}
                                            />
                                         
                                        </div>
                                        <div className="phone">
                                            <h5>رقم الجوال</h5>
                                            <input type="tel" />
                                        </div>
                                        <div>
                                            <h5>نوع الباقة</h5>
                                            
                                            <input
                                                type="text"
                                                value={"التاجر مجانيه"}
                                            />
                                        </div>
                                        <div>
                                            <h5>مدة الاشتراك</h5>
                                            <input
                                                type="text"
                                                value={"مدة الاشتراك"}
                                            />
                                            
                                        </div>
                                        <div>
                                            <h5>نشاط المتجر</h5>
                                            <input
                                                type="text"
                                                value={"نشاط المتجر"}
                                            />
                                          
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="owner-form">
                                <form action="">
                                    <h4>بيانات المتجر</h4>
                                    <div className="name">
                                        <h5>الاسم كامل</h5>
                                        <input type="text" />
                                        <span>
                                            <SvgUser />
                                        </span>
                                    </div>
                                    <div className="phone">
                                        <h5>رقم الجوال</h5>
                                        <input type="tel" />
                                    </div>
                                </form>
                                <div className="box-pay">
                                    <div className="top">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="flexCheckDefault"
                                            />
                                        </div>
                                        <h5>
                                            بتسجيلك فإنك توافق على سياسة الشروط
                                            والأحكام الخاصة بمنصة اطلبها
                                        </h5>
                                    </div>
                                    <button
                                        className="bt-main"
                                        onClick={() => {
                                            navigate("/openControlPanel");
                                        }}
                                    >
                                        أنشئ متجرك
                                    </button>
                                    <ul>
                                        <li>لديك حساب بالفعل ؟</li>
                                        <li
                                            onClick={() => {
                                                navigate("/signInPage");
                                            }}
                                        >
                                            قم بتسجيل الدخول
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box-form-banner">
                        <h5
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            <span>
                                <Svgarrwos />
                            </span>
                            الرئيسية
                        </h5>
                        <div className="info-svg">
                            <SvgComponent />
                        </div>
                        <div className="text">
                            <h1>منصة اطلبها</h1>
                            <h2>معنى جديد للتجارة الإلكترونية</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateYourStoreBox;
