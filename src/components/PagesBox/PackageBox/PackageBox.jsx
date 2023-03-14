import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoHeader, } from "../../index";
import { ReactComponent as Svghappy } from "../../../assets/Icons/icon-38-happy emojy.svg";
import { IoCheckmarkSharp } from "react-icons/io5";
import { ImArrowRight } from "react-icons/im";

import { ReactComponent as Svgemojy2 } from "../../../assets/Icons/icon-38-emojy2.svg";
import { ReactComponent as Svgemojy } from "../../../assets/Icons/icon-38-emojy.svg";
import { PackageThunk } from "../../../RTK/Thunk/PackageThunk";
import "./PackageBox.css";
import { useNavigate } from "react-router-dom";
const PackageBox = () => {
    let [getTypePackage, setTypePackage] = useState(false);
    let { packageDataMonthly, packageDataYearly } = useSelector(
        (state) => state.PackageReducer
    );
    let dispatch = useDispatch();

    const shouldData = useRef(true);

    useEffect(() => {
        if (shouldData.current) {
            dispatch(PackageThunk());

            // ===========
            shouldData.current = false;
        }
    }, [dispatch]);
    let navigate = useNavigate();

    return (
        <>
            <div className="package-box p-main">
                <div className="all-package-box">
                    <div className="container">
                        <LogoHeader />
                        <div className="title">
                            <span
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                <ImArrowRight />
                            </span>
                            <div>
                                <h3>مقارنة الباقات</h3>
                            </div>
                        </div>
                        <div className="all">
                            <ul>
                                <li>سنوي/ 6 شهور</li>
                                <li>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span
                                            className="slider"
                                            onClick={() =>
                                                setTypePackage(!getTypePackage)
                                            }
                                        />
                                    </label>
                                </li>
                            </ul>

                            {getTypePackage ? (
                                packageDataYearly !== null ? (
                                    <div className="content-package ">
                                        <div className="box">
                                            <h3>
                                                التاجر المبتدأ
                                                <Svghappy />
                                            </h3>
                                            <h2>
                                                <span>
                                                    {
                                                        packageDataYearly
                                                            .startUp.price
                                                    }
                                                </span>
                                                <span>ر.س</span>
                                                <span>
                                                    {packageDataYearly.type}
                                                </span>
                                            </h2>
                                            <ul>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    100منتج
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    10تصنيفات
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    دعم فني 24
                                                </li>
                                                <li className="not-active">
                                                    <IoCheckmarkSharp />
                                                    تجربة مجانية
                                                </li>
                                                <li className="not-active">
                                                    <IoCheckmarkSharp />
                                                    تجربة مجانية
                                                </li>
                                                <li className="not-active">
                                                    <IoCheckmarkSharp />
                                                    تخصيص القالب
                                                </li>
                                                <li className="not-active">
                                                    <IoCheckmarkSharp />
                                                    خدمات الاستشارة
                                                </li>
                                            </ul>

                                            <button>مجانية</button>
                                        </div>
                                        <div className="box">
                                            <h3>
                                                العلامة التجارية
                                                <Svgemojy2 />
                                            </h3>
                                            <h2>
                                                <span>
                                                    {
                                                        packageDataYearly.brand
                                                            .price
                                                    }
                                                </span>
                                                <span>ر.س</span>
                                                <span>
                                                    {packageDataYearly.type}
                                                </span>
                                            </h2>
                                            <ul>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    100منتج
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    10تصنيفات
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    دعم فني 24
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    تجربة مجانية
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    تجربة مجانية
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    تخصيص القالب
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    خدمات الاستشارة
                                                </li>
                                            </ul>

                                            <button>مدفوعة</button>
                                        </div>
                                        <div className="box">
                                            <h3>
                                                التاجر المحترف <Svgemojy />
                                            </h3>
                                            <h2>
                                                <span>
                                                    {
                                                        packageDataYearly
                                                            .professional.price
                                                    }
                                                </span>
                                                <span>ر.س</span>
                                                <span>
                                                    {packageDataYearly.type}
                                                </span>
                                            </h2>
                                            <ul>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    100منتج
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    10تصنيفات
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    دعم فني 24
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    تجربة مجانية
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    تجربة مجانية
                                                </li>
                                                <li>
                                                    <IoCheckmarkSharp />
                                                    تخصيص القالب
                                                </li>
                                                <li className="not-active">
                                                    <IoCheckmarkSharp />
                                                    خدمات الاستشارة
                                                </li>
                                            </ul>

                                            <button>مدفوعة</button>
                                        </div>
                                    </div>
                                ) : null
                            ) : packageDataMonthly !== null ? (
                                <div className="content-package">
                                    <div className="box">
                                        <h3>
                                            التاجر المبتدأ
                                            <Svghappy />
                                        </h3>
                                        <h2>
                                            <span>
                                                {
                                                    packageDataMonthly.startUp
                                                        .price
                                                }
                                            </span>
                                            <span>ر.س</span>
                                            <span>
                                                {packageDataMonthly.type}
                                            </span>
                                        </h2>
                                        <ul>
                                            <li>
                                                <IoCheckmarkSharp />
                                                100منتج
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                10تصنيفات
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                دعم فني 24
                                            </li>
                                            <li className="not-active">
                                                <IoCheckmarkSharp />
                                                تجربة مجانية
                                            </li>
                                            <li className="not-active">
                                                <IoCheckmarkSharp />
                                                تجربة مجانية
                                            </li>
                                            <li className="not-active">
                                                <IoCheckmarkSharp />
                                                تخصيص القالب
                                            </li>
                                            <li className="not-active">
                                                <IoCheckmarkSharp />
                                                خدمات الاستشارة
                                            </li>
                                        </ul>

                                        <button>مجانية</button>
                                    </div>
                                    <div className="box">
                                        <h3>
                                            العلامة التجارية
                                            <Svgemojy2 />
                                        </h3>
                                        <h2>
                                            <span>
                                                {packageDataMonthly.brand.price}
                                            </span>
                                            <span>ر.س</span>
                                            <span>
                                                {packageDataMonthly.type}
                                            </span>
                                        </h2>
                                        <ul>
                                            <li>
                                                <IoCheckmarkSharp />
                                                100منتج
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                10تصنيفات
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                دعم فني 24
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                تجربة مجانية
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                تجربة مجانية
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                تخصيص القالب
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                خدمات الاستشارة
                                            </li>
                                        </ul>

                                        <button>مدفوعة</button>
                                    </div>
                                    <div className="box">
                                        <h3>
                                            التاجر المحترف <Svgemojy />
                                        </h3>
                                        <h2>
                                            <span>
                                                {
                                                    packageDataMonthly
                                                        .professional.price
                                                }
                                            </span>
                                            <span>ر.س</span>
                                            <span>
                                                {packageDataMonthly.type}
                                            </span>
                                        </h2>
                                        <ul>
                                            <li>
                                                <IoCheckmarkSharp />
                                                100منتج
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                10تصنيفات
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                دعم فني 24
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                تجربة مجانية
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                تجربة مجانية
                                            </li>
                                            <li>
                                                <IoCheckmarkSharp />
                                                تخصيص القالب
                                            </li>
                                            <li className="not-active">
                                                <IoCheckmarkSharp />
                                                خدمات الاستشارة
                                            </li>
                                        </ul>

                                        <button>مدفوعة</button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PackageBox;
