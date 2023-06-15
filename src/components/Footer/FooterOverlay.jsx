import React, { useEffect, useState } from 'react';
import { useScrollYPosition } from 'react-use-scroll-position';
import './FooterOverlay.css';
import LogoImg from '../../assets/Img/logo png.png';
import { ReactComponent as Iconsnapchat } from '../../assets/Icons/snapchat.svg';
import { ReactComponent as Iconfacebook } from '../../assets/Icons/icon-24-facebook.svg';
import { ReactComponent as Icontwitter } from '../../assets/Icons/icon-24-twitter.svg';
import { ReactComponent as Iconinstagram } from '../../assets/Icons/icon-32-instagram.svg';
import { ReactComponent as Icontiktok } from '../../assets/Icons/icon-32-tiktok.svg';
import { Link, useNavigate } from 'react-router-dom';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../LoadingBox/LoadingBox';
import NotFoundData from '../NotFoundData/NotFoundData';
import { HomeThunk } from '../../RTK/Thunk/HomeThunk';
import { useRef } from 'react';

const FooterOverlay = () => {
	let scrolly = useScrollYPosition();
	const [showup, setShowup] = useState(false);
	let dispatch = useDispatch();
	let navigate = useNavigate();
	useEffect(() => {
		if (scrolly >= 500) {
			setShowup(true);
		} else {
			setShowup(false);
		}
	}, [scrolly]);

	const shouldData = useRef(true);

	useEffect(() => {
		if (shouldData.current) {
			dispatch(HomeThunk());
			// ===========
			shouldData.current = false;
		}
	}, [dispatch]);
	let { linkWebsite, homeLoadingData, homeAllData, homeFooter } = useSelector((state) => state.HomeReducer);
	let goUpWindow = () => {
		window.scroll(0, 0);
	};
	return (
		<>
			<footer className='main-footer'>
				<div className='all'>
					<div className='container flex-column flex-lg-row-reverse  align-items-center align-items-lg-start '>
						<div className='box-left'>
							<a className='main-footer__logo' href='#0'>
								<img src={homeAllData?.logo_footer} alt='' />
							</a>
							{/* <ul>
                                <li>
                                    <a href="#">
                                        <Iconfacebook />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Iconinstagram />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Icontwitter />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Icontiktok />
                                    </a>
                                </li>
                            </ul> */}
							<ul>
								{linkWebsite.length &&
									linkWebsite.map((el) => {
										return (
											<li key={el.id}>
												<a href={el.link}>
													<img src={el.logo} alt='' />
												</a>
											</li>
										);
									})}

								{/* <li>
                                    <a href="https://mostaql.com">
                                        <Icontiktok />
                                    </a>
                                </li> */}
							</ul>
						</div>
						<nav className='box-right'>
							<ul className=''>
								{/**
                            <li className=" text-center text-lg-end ">
                                    <h4 className="me6-margin-bottom-sm me6-text-base@md">
                                        خدماتنا
                                    </h4>
                                    <ul className="text-center text-lg-end ">
                                        <li>
                                            <a
                                                href="#0"
                                                className="main-footer-link"
                                            >
                                                الاستيراد
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#0"
                                                className="main-footer-link"
                                            >
                                                الأكاديمية
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#0"
                                                className="main-footer-link"
                                            >
                                                الاستشارات
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            */}

								<li className='text-center text-lg-end '>
									<h4 className=''>معلومات</h4>
									<ul className='text-center text-lg-end '>
										{homeFooter.length &&
											homeFooter.map((el) => {
												return (
													<li
														key={el.id}
														className='main-footer-link'
														onClick={() => {
															navigate('/YourPolicy/' + el.id);
															goUpWindow();
														}}
													>
														{el.title}
													</li>
												);
											})}
									
									</ul>
								</li>
								<li className='text-center text-lg-end '>
									<h4 className=''>حسابي</h4>
									<ul className='text-center text-lg-end '>
										<li>
											<Link to={'/register/merchant'} className='main-footer-link'>
												التسجيل كتاجر
											</Link>
										</li>

										<li>
											<Link to={'/register/represented'} className='main-footer-link'>
												التسجيل كمندوب
											</Link>
										</li>
									</ul>
								</li>
								<li className='text-center text-lg-end '>
									<h4 className=''>خدمة العملاء</h4>
									<ul className='text-center text-lg-end '>
										<li>
											<a href='#0' className='main-footer-link'>
												اتصل بنا
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</nav>
					</div>
					<div className='copyright-box container'>
						<hr />
						<h5>
							جميع الحقوق محفوظة <span> لمنصة شبكة اطلبها </span>2023 برمجة وتطوير{' '}
							<span>
								<a href='https://faz-it.net'>شبكة فاز</a>
							</span>
						</h5>
					</div>
				</div>
				<div
					className={showup === true ? 'go-up show ' : 'go-up'}
					onClick={() => {
						window.scroll(0, 0);
					}}
				>
					<span>
						<HiChevronDoubleLeft />
					</span>
				</div>
			</footer>
		</>
	);
};

export default FooterOverlay;
