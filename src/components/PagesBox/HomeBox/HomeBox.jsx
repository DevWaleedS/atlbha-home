import React, { useEffect, useRef, useState } from "react";
import "./HomeBox.css";
import {
    ProductSwiper,
    ReviewSwiper,
    PartnerSwiper,
    LoadingBox,
    NotFoundData,
} from "../../index";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";

import { MainTitle } from "../../index";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
// import { Svghand } from "react-icons/tb";
import { IoCheckmarkSharp } from "react-icons/io5";

// ===============Data================
import Media from 'react-media';
// ===============Icon================
import { ReactComponent as Svghand } from "../../../assets/Icons/icon-touch hand-36.svg";
import { ReactComponent as SvgVideo } from "../../../assets/Icons/ico - 24 - audiovisual - play_circle_outlined.svg";
import { ReactComponent as Svghappy } from "../../../assets/Icons/icon-38-happy emojy.svg";
import { ReactComponent as Svgemojy2 } from "../../../assets/Icons/icon-38-emojy2.svg";
import { ReactComponent as Svgemojy } from "../../../assets/Icons/icon-38-emojy.svg";
// ===============Img================
import featuresIMG from "../../../assets/Img/IMG_3541-removebg-preview.png";
import GroupIMG from "../../../assets/Img/Group 1432.png";
// ===============redux================
import { useDispatch, useSelector } from "react-redux";
import { VideoThunk } from "../../../RTK/Thunk/VideoThunk";
import { storeFilterAction, storeChangeSlice } from "../../../RTK/Reducer/HomeReducer"
import { useNavigate } from "react-router-dom";
import { HomeThunk } from "../../../RTK/Thunk/HomeThunk";
const HomeBox = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const shouldData = useRef(true);

    useEffect(() => {
        if (shouldData.current) {

            dispatch(VideoThunk());
            dispatch(HomeThunk());
            // ===========
            shouldData.current = false;
        }
    }, [dispatch]);
    let [getTypePackage, setTypePackage] = useState(true);
    // ===========
    let { productsHome, homeLoadingData, storesHome, commentHome, partnersHome, homeAllData, packagesHome, StoreCities, StoreActivities } = useSelector(
        (state) => state.HomeReducer
    );
    // ===========


    let { videoData } = useSelector((state) => state.VideoReducer);



    // =======================
    let [getFilterStores, setFilterStores] = useState({ Type: '', Cities: '' });
    let [getMedia, setMedia] = useState('');
    let changeMedia = (e) => {
        e?.small
            ? setMedia('small')
            : setMedia('large')
    }

    let filterStores = (e) => {
        e.preventDefault()
        if ((getFilterStores.Cities) && (getFilterStores.Type)) {
          
            dispatch(storeFilterAction({ cities: getFilterStores.Cities, Type: getFilterStores.Type }))
        }
    }
    useEffect(() => {
        dispatch(storeChangeSlice(getMedia))
    }, [getMedia, dispatch]);

    return (
					<>
						{/* =============media============== */}
						<Media
							queries={{
								small: '(max-width: 599px)',
							}}
							onChange={(e) => {
								changeMedia(e);
							}}
						/>
						{/* =============media============== */}
						<div className='hero' style={{ backgroundImage: `url(${homeAllData?.slider1})` }}>
							<div className='container'>
								<h2>أهلاً بك في منصة اطلبها</h2>
								<h3>انضم الان الى منصة التجارة الالكترونية الشاملة</h3>
								<button
									className='bt-main'
									onClick={() => {
										navigate('/register/merchant');
									}}
								>
									التسجيل
								</button>
							</div>
						</div>
						{/* =========================== */}
						<div className='outstanding-products p-main'>
							<div className='container'>
								<MainTitle text='المنتجات المتميزة' />
								<div className='all'>{homeLoadingData === true ? <LoadingBox /> : productsHome.length ? <ProductSwiper productSwiperData={productsHome} /> : <NotFoundData />}</div>
							</div>
						</div>
						{/* =========================== */}
						<div className='box-information p-main flex-column flex-md-row'>
							<div className='box-right' style={{ backgroundImage: `url(${homeAllData?.banar1})` }}>
								<div className='container'>
									<h4>باقات اشتراك متعددة</h4>
								</div>
							</div>
							<div className='box-left' style={{ backgroundImage: `url(${homeAllData?.banar2})` }}>
								<div className='container'>
									<h4> شركات شحن متعددة</h4>
								</div>
							</div>
						</div>

						<div className='stores-info p-main'>
							<div className='container'>
								<div className='header flex-column flex-md-row gap-4 gap-md-3 '>
									<MainTitle text={'المتاجر المتميزة'} />
									<form
										action=''
										onSubmit={(e) => {
											filterStores(e);
										}}
									>
										<span>
											<AiOutlineSearch />
										</span>
										<div className='all-select'>
											<Select
												sx={{
													overflow: 'hidden',

													'& .MuiOutlinedInput-notchedOutline': {
														border: 'none',
													},
												}}
												value={getFilterStores.Type}
												className='select-mu'
												onChange={(e) => {
													setFilterStores({ ...getFilterStores, Type: e.target.value });
												}}
												IconComponent={IoIosArrowDown}
												displayEmpty
												renderValue={(selected) => {
													if (getFilterStores.Type === '') {
														return <span> نوع النشاط</span>;
													}

													return selected;
												}}
											>
												{StoreActivities.length
													? StoreActivities.map((el) => {
															return (
																<MenuItem value={el.name} key={el.id}>
																	{el.name}
																</MenuItem>
															);
													  })
													: null}
											</Select>
											<Select
												sx={{
													'& .MuiOutlinedInput-notchedOutline': {
														border: 'none',
													},
												}}
												value={getFilterStores.Cities}
												className='select-mu'
												onChange={(e) => {
													setFilterStores({ ...getFilterStores, Cities: e.target.value });
												}}
												IconComponent={IoIosArrowDown}
												displayEmpty
												renderValue={(selected) => {
													if (getFilterStores.Cities === '') {
														return <span>المدينة</span>;
													}

													return selected;
												}}
											>
												
												{StoreCities.length
													? StoreCities.map((el) => {
															return (
																<MenuItem value={el.name} key={el.id}>
																	{el.name}
																</MenuItem>
															);
													  })
													: null}
											</Select>
										</div>
										<button type='submit'>
											تأكيد
											<span>
												<AiOutlineSearch />
											</span>
										</button>
									</form>
								</div>
								<div className='content-stores'>
									<div className='row'>
										{homeLoadingData === true ? (
											<LoadingBox />
										) : storesHome.length ? (
											<>
												{storesHome.map((el) => {
													return (
														<div className=' container-box col-6  col-md-4 col-lg-3 col-xl-2 ' key={el.id}>
															<div className='box'>
																<img src={el.logo} alt='' />
															</div>
														</div>
													);
												})}
												<bdi
													onClick={() => {
														// if ((getFilterStores.Cities) && (getFilterStores.Type)) {
														//     dispatch(storeIncrease({ cities: getFilterStores.Cities, Type: getFilterStores.Type }))
														// }
													}}
												>
													عرض المزيد من المتاجر
													<HiOutlineArrowNarrowLeft />
												</bdi>
											</>
										) : (
											<NotFoundData />
										)}
									</div>
								</div>
							</div>
						</div>
						{/* =========================== */}
						<div className='trade-info p-main'>
							<div className='box' style={{ backgroundImage: `url(${homeAllData?.banar3})` }}>
								<div className='container'>
									<h4>نحن بوابتك لعالم التجارة الإلكترونية</h4>
									<h5>انشئ متجرك وتمتع بالتجربة المجانية</h5>
									<button
										className='bt-main'
										onClick={() => {
											navigate('/register/merchant');
										}}
									>
										التسجيل
									</button>
								</div>
							</div>
						</div>
						{/* =========================== */}
						<div className='out-features p-main'>
							<div className='container '>
								<MainTitle text={'لماذا اطلبها ؟'} />
								<div className='all flex-column-reverse flex-lg-row'>
									<div className='box-right'>
										<ul>
											<li>
												<Svghand />
												افتح متجرك بسهولة
											</li>
											<li>
												<Svghand />
												تجربة مجانية لتتعرف على خدماتنا
											</li>
											<li>
												<Svghand />
												خدمات إضافية مميزة لتساعدك في تسويق متجرك
											</li>
											<li>
												<Svghand />
												باقات احترافية وقوالب متعددة تناسب طبيعة نشاط متجرك
											</li>
										</ul>
										<div className='box-img'>
											<img src={GroupIMG} alt='' />
										</div>
									</div>

									<div className='box-left'>
										<video controls src={videoData !== null ? videoData : ''} type='video/mp4'>
											{/* <source
                                    src={videoData !== null ? videoData : ""}
                                    type="video/mp4"
                                /> */}
										</video>
										<div className='box-img'>
											<img src={featuresIMG} alt='' />
											<span
												onClick={(e) => {
													e.currentTarget.parentElement.classList.add('not-active');

													e.currentTarget.parentElement.parentElement.querySelector('video').play();
												}}
											>
												<SvgVideo />
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* =========================== */}
						<div className='our-package p-main'>
							<div className='container'>
								<MainTitle text={'باقات اطلبها'} />
								<div className='all'>
									<ul>
										<li>سنوي/ 6 شهور</li>
										<li>
											<label className='switch'>
												<input type='checkbox' />
												<span className='slider' onClick={() => setTypePackage(!getTypePackage)} />
											</label>
										</li>
									</ul>

									{homeLoadingData ? (
										<LoadingBox />
									) : packagesHome.length ? (
										getTypePackage === true ? (
											<div className='content-package'>
												<div className='box'>
													<h3>
														{packagesHome[0]?.name}
														<Svghappy />
													</h3>
													<h2>
														<span>{packagesHome[0]?.yearly_price}</span>
														<span>ر.س</span>
														<span>
															{/* {getTypePackage ? 'سنوي' : ''} */}
															سنوي
														</span>
													</h2>
													<ul>
														{packagesHome[0]?.plans.map((el) => {
															return (
																<li key={el.id} className={el.selected === true ? 'active' : ''}>
																	<IoCheckmarkSharp />
																	{el.name}
																</li>
															);
														})}
													</ul>

													<button>ابدأ الآن</button>
												</div>
												<div className='box'>
													<h3>
														{packagesHome[1]?.name}
														<Svgemojy2 />
													</h3>
													<h2>
														<span>{packagesHome[1]?.yearly_price}</span>
														<span>ر.س</span>
														<span>
															{/* {getTypePackage ? 'سنوي' : ''} */}
															سنوي
														</span>
													</h2>
													<ul>
														{packagesHome[1]?.plans.map((el) => {
															return (
																<li key={el.id} className={el.selected === true ? 'active' : ''}>
																	<IoCheckmarkSharp />
																	{el.name}
																</li>
															);
														})}
													</ul>

													<button>ابدأ الآن</button>
												</div>
												<div className='box'>
													<h3>
														{packagesHome[2]?.name}
														<Svgemojy />
													</h3>
													<h2>
														<span>{packagesHome[2]?.yearly_price}</span>
														<span>ر.س</span>
														<span>
															{/* {getTypePackage ? 'سنوي' : ''} */}
															سنوي
														</span>
													</h2>
													<ul>
														{packagesHome[2]?.plans.map((el) => {
															return (
																<li key={el.id} className={el.selected === true ? 'active' : ''}>
																	<IoCheckmarkSharp />
																	{el.name}
																</li>
															);
														})}
													</ul>

													<button>ابدأ الآن</button>
												</div>
											</div>
										) : (
											<div className='content-package'>
												<div className='box'>
													<h3>
														{packagesHome[0]?.name}
														<Svghappy />
													</h3>
													<h2>
														<span>{packagesHome[0]?.monthly_price}</span>
														<span>ر.س</span>
														<span>
															{/* {getTypePackage ? 'سنوي' : ''} */}
															شهرى
														</span>
													</h2>
													<ul>
														{packagesHome[0]?.plans.map((el) => {
															return (
																<li key={el.id} className={el.selected === true ? 'active' : ''}>
																	<IoCheckmarkSharp />
																	{el.name}
																</li>
															);
														})}
													</ul>

													<button>ابدأ الآن</button>
												</div>
												<div className='box'>
													<h3>
														{packagesHome[1]?.name}
														<Svgemojy2 />
													</h3>
													<h2>
														<span>{packagesHome[1]?.monthly_price}</span>
														<span>ر.س</span>
														<span>
															{/* {getTypePackage ? 'سنوي' : ''} */}
															شهرى
														</span>
													</h2>
													<ul>
														{packagesHome[1]?.plans.map((el) => {
															return (
																<li key={el.id} className={el.selected === true ? 'active' : ''}>
																	<IoCheckmarkSharp />
																	{el.name}
																</li>
															);
														})}
													</ul>

													<button>ابدأ الآن</button>
												</div>
												<div className='box'>
													<h3>
														{packagesHome[2]?.name}
														<Svgemojy />
													</h3>
													<h2>
														<span>{packagesHome[2]?.monthly_price}</span>
														<span>ر.س</span>
														<span>
															{/* {getTypePackage ? 'سنوي' : ''} */}
															شهرى
														</span>
													</h2>
													<ul>
														{packagesHome[2]?.plans.map((el) => {
															return (
																<li key={el.id} className={el.selected === true ? 'active' : ''}>
																	<IoCheckmarkSharp />
																	{el.name}
																</li>
															);
														})}
													</ul>

													<button>ابدأ الآن</button>
												</div>
											</div>
										)
									) : (
										<NotFoundData />
									)}
								</div>
							</div>
						</div>
						{/* =========================== */}
						<div className='our-review p-main'>
							<div className='container gap-2 gap-md-5 '>
								<MainTitle text={'قالوا عنا'} />
								<div className='all'>{homeLoadingData === true ? <LoadingBox /> : commentHome.length ? <ReviewSwiper DataReviewSwiper={commentHome} /> : <NotFoundData />}</div>
							</div>
						</div>
						{/* =========================== */}
						<div className='our-partners p-main'>
							<div className='container gap-2 gap-md-5 '>
								<MainTitle text={'شركاء النجاح'} />
								<div className='all '>{homeLoadingData === true ? <LoadingBox /> : partnersHome.length ? <PartnerSwiper PartnerDataSwiper={partnersHome} /> : <NotFoundData />}</div>
							</div>
						</div>
						{/* =========================== */}
					</>
				);
};

export default HomeBox;
