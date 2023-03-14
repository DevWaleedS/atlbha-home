import React, { useEffect, useRef, useState } from "react";
import { BlogHero, LoadingBox, NotFoundData, OwnerBox } from "../../index";
import "./BlogBox.css";
import IMgTop from "../../../assets/Img/image blog1.png";
import ImgOwner from "../../../assets/Img/persona2.png";
// =================redux======
import { useDispatch, useSelector } from "react-redux";
import { blogType } from "../../../RTK/Reducer/BlogDataReducer";
import { PageIncrease } from "../../../RTK/Reducer/BlogDataReducer";
import { useNavigate } from "react-router-dom";
import { BlogDataThunk } from "../../../RTK/Thunk/BlogDataThunk";
// =========================================================================
const BlogBox = () => {
    let [getTypeBlog, setTypeBlog] = useState("all");
    let dispatch = useDispatch();

    // ================
    let { BlogLoadingData, postCategory, pagesTargetData } = useSelector(
        (state) => state.BlogDataReducer
    );
    // ================

    const shouldData = useRef(true);
    useEffect(() => {
        if (shouldData.current) {
            dispatch(BlogDataThunk());
            // ===========
            shouldData.current = false;
        }
    }, [dispatch]);
    useEffect(() => {
        dispatch(blogType({ type: getTypeBlog }));

    }, [getTypeBlog, dispatch]);
    // ===============
    let changeActiveMenu = (e) => {
        e.currentTarget.parentElement
            .querySelector(".active")
            .classList.remove("active");
        e.currentTarget.classList.add("active");
    };
    let goUpWindow = () => {
        window.scroll(0, 0)
    }
    let navigate = useNavigate();
    return (
        <>
            <div className="blog-box">
                <BlogHero />
                <div className="container">
                    <div className="header-blog">
                        <ul className=" justify-content-end justify-content-lg-center">
                            <li
                                className="bt-main active"
                                onClick={(e) => {
                                    changeActiveMenu(e);
                                    setTypeBlog("all");
                                }}
                            >
                                الكل
                            </li>
                            {
                                (postCategory.length ? (
                                    postCategory.map((el) => {
                                        return (
                                            <li
                                                className="bt-main"
                                                onClick={(e) => {
                                                    changeActiveMenu(e);
                                                    setTypeBlog(el.name);
                                                }}
                                                key={el.id}
                                            >
                                                {el.name}
                                            </li>


                                        )


                                    })
                                ) : null)

                            }
                        </ul>
                    </div>

                    {BlogLoadingData ? (
                        <LoadingBox />
                    ) : pagesTargetData.length ? (
                        <div className="content-blog">
                            <div
                                id={pagesTargetData[0].id}
                                className="box-top flex-column flex-lg-row align-items-center align-items-lg-start"
                                onClick={() => {
                                    navigate(
                                        `/detail/${pagesTargetData[0].id}`
                                    )
                                    goUpWindow()
                                }
                                }
                            >
                                <div className="box-img" >
                                    <img src={pagesTargetData[0].image} alt="" style={{ minHeight: '250px' }} />
                                </div>
                                <div className="box-left">
                                    <h5>{pagesTargetData[0].postCategory.name}</h5>
                                    <h2>{pagesTargetData[0].title}</h2>
                                    {/* <h2>page_content</h2> */}
                                    <p>{pagesTargetData[0]?.page_desc}</p>
                                    <OwnerBox
                                        NameOwner={pagesTargetData[0].user.name}
                                        DateOwner={pagesTargetData[0].user.created_at}
                                        ImgOwner={pagesTargetData[0].user.image}
                                    />
                                </div>
                            </div>
                            <div className="box-body">
                                {pagesTargetData.map((el) => {
                                    return (
                                        <div
                                            className="box"
                                            id={el.id}
                                            key={el.id}

                                        >
                                            <div className="order" onClick={() => {
                                                navigate(
                                                    `/detail/${el.id}`
                                                )
                                                goUpWindow()
                                            }
                                            }>
                                                <div className="box-img">
                                                    <img
                                                        src={el.image}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="box-order">
                                                    <h6>{el.postCategory.name}</h6>
                                                    <h4>{el.title}</h4>
                                                    <p>{el?.page_desc}</p>
                                                    <OwnerBox
                                                        NameOwner={el.user.name}
                                                        DateOwner={el.user.created_at}
                                                        ImgOwner={el.user.image}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="bt-main" onClick={() => {
                                dispatch(PageIncrease({ type: getTypeBlog }));


                            }}>عرض المزيد</button>
                        </div>
                    ) : (
                        "لم يتم العثور على البيانات"
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogBox;
