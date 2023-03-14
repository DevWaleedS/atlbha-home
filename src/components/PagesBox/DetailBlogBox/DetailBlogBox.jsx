import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BlogHero, LoadingBox, NotFoundData, OwnerBox } from "../../index";
import ImgCenterBanner from "../../../assets/Img/banner main blog.png";
import ImgPerssona from "../../../assets/Img/persona.png";
import "./DetailBlogBox.css";

import { ReactComponent as SvgBack } from "../../../assets/Icons/icon-30-arrwos back.svg";
import { useDispatch, useSelector } from "react-redux";
import { BlogDetailsThunk } from "../../../RTK/Thunk/BlogDetailsThunk";
const DetailBlogBox = () => {
    // let location = useLocation();
    let param = useParams();
    let navigate = useNavigate();
    let { detailLoading,
        blogDetailAllData,
        detailPages,
        detailCategory, } = useSelector(
            (state) => state.BlogDetailsReducer
        );
    let dispatch = useDispatch();
    useEffect(() => {
        if (!isNaN(param.id)) {

            dispatch(BlogDetailsThunk({ id: param.id }));
        }
        else {
            navigate('/blog')
        }

    }, [param.id, navigate, dispatch]);
    let goUpWindow = () => {
        window.scroll(0, 0)
    }
    return (
        <>
            <div className="detail-blog p-main">
                <BlogHero />
                <div className="container"  >
                    {

                        detailLoading ? (<LoadingBox />) : (detailPages.length ? (
                            <div className="all">
                                <div className="row">
                                    <div className="col-md-12 col-lg-3  col-xxl-2 ">
                                        <div className="box-right">
                                            <ul>
                                                <span onClick={() => {
                                                    navigate(-1)
                                                    goUpWindow()
                                                }}>
                                                    <SvgBack />
                                                </span>
                                                <h6>الكل</h6>
                                                {
                                                    detailCategory.length && (detailCategory.map((el) => {
                                                        return (
                                                            <li className={el.status === 'active' ? 'active' : ''} key={el.id}>
                                                                {el.name}
                                                            </li>

                                                        )
                                                    }))

                                                }


                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xxl-8">
                                        <div className="box-center">
                                            <div className="box-img">
                                                {/* <img src={ImgCenterBanner} alt="" /> */}
                                                <img src={detailPages[0]?.image} alt="" />

                                            </div>
                                            <h1>
                                                {/* كيف تقوم بإنشاء متجرك الإلكتروني وإدارة
                                                المنتجات باحترافية عالية */}

                                                {detailPages[0]?.title}

                                            </h1>
                                            <div dangerouslySetInnerHTML={{ __html: detailPages[0]?.page_content }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-3 col-xxl-2">
                                        <div className="box-left">
                                            <OwnerBox
                                                NameOwner={detailPages[0]?.user.name}
                                                ImgOwner={detailPages[0]?.user.image}
                                                DateOwner={detailPages[0]?.user.updated_at}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : (<NotFoundData />))}

                </div>

            </div>
        </>
    );
};

export default DetailBlogBox;

