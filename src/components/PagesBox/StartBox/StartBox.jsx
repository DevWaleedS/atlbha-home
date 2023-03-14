import React from "react";
import "./StartBox.css";
import VideoIMg from "../../../assets/Img/bannerstartvideo.png"
import leftIMg from "../../../assets/Img/bannerstart-left.png"
import rightIMg from "../../../assets/Img/bannerstart-right.png"
import { useNavigate } from "react-router-dom";
const StartBox = () => {
    let navigate = useNavigate();
    let goUpWindow = () => {
        window.scroll(0, 0)
    }

    return (
        <>
            <div className="start-box">
                <div className="all">
                    <div className="container">
                        <div className="start-hero">
                            <h2 >ابدأ مع أطلبها بوابتك للتجارة الإلكترونية</h2>
                        </div>
                        <div className="start-content">
                            <div className="top flex-column flex-lg-row">
                                <div className="box-right box" style={{ backgroundImage: `url(${rightIMg})` }} onClick={(e) => {
                                    navigate(
                                        `/detail/1`
                                    )
                                    goUpWindow()

                                }}>
                                    <h4>
                                        <span>كيف تبدأ مشروعك التجاري</span>
                                    </h4>
                                    <p>
                                        مجموعة أفكار مشاريع تبدأ فيها مشرروعك التجاري
                                    </p>
                                </div>
                                <div className="box-left box" style={{ backgroundImage: `url(${leftIMg})` }} onClick={(e) => {
                                    navigate(
                                        `/detail/2`
                                    )
                                    goUpWindow()
                                }}>
                                    <h4>
                                        <span> الخدمات المقدمة لنجاح مشروعك</span>
                                    </h4>
                                    <p>
                                        الخدمات التي تقدمها منصة اطلبها بعد انشاء متجرك التي ستتميز بها
                                    </p>
                                </div>
                            </div>
                            <div className="start-body">
                                <div className="info">
                                    <h4>
                                        <span>ليش تختار اطلبها</span>
                                    </h4>
                                </div>
                                <p>
                                    منصة اطلبها منصتك التجارية تتميز بتقديم االستشارات ودراسة الجدوى والدورات التدريبية وانشاء
                                    المتجر والسوق لعرض منتجاتك والتسويق عبر مشاهير السوشيال ميديا
                                </p>
                                <div className="box-video">
                                    <div className="box-img">
                                        <a href="http://www.youtube.com/channel/UCPypPqJuGFAGHz33RI7c5wg" target='blank'>
                                            <img src={VideoIMg} alt="" />
                                        </a>
                                    </div>
                                </div>
                                <button className="bt-main">
                                    ابدا رحلتك التجارية لتصل للثراء
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StartBox;
