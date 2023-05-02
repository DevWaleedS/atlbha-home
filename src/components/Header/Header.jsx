import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserInfo from '../UserInfo/UserInfo';

import './Header.css';

// ============Icon================
import { FiMenu } from 'react-icons/fi';
import { ReactComponent as SearchIcon } from '../../assets/Icons/icon_24_search.svg';
import { ReactComponent as Logo } from '../../assets/Icons/Logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = () => {
	const [cookies] = useCookies(['access_token']);
	const navigate = useNavigate();
	let location = useLocation();
	let [activeLink, setActiveLink] = useState(`التسجيل`);
	let [showForm, setShowForm] = useState(true);

	if (
		location.pathname === '/register/merchant' ||
		location.pathname === '/register/represented' ||
		location.pathname === '/sendPasswordPage' ||
		location.pathname === '/paymentPage' ||
		location.pathname === '/signInPage' ||
		location.pathname === '/createYourStore' ||
		location.pathname === '/verificationPage' ||
		location.pathname === '/openControlPanel' ||
		location.pathname === '/createYourStorePayment' ||
		location.pathname === '/packagePage' ||
		location.pathname === '/passwordBackPage'
	) {
		document.querySelector('body').style.overflow = 'hidden';
	} else {
		document.querySelector('body').style.overflow = 'auto';
	}

	useEffect(() => {
		if (document.querySelector('.header .navbar .navbar-collapse').classList.contains('show')) {
			document.querySelector('.header .navbar .show').classList.remove('show');
			document.querySelector('.header .navbar button').classList.add('collapsed');
		}
	}, [location.pathname]);
	useEffect(() => {
		if (location.pathname === '/') {
			setActiveLink('التسجيل');
		}
		if (location.pathname === '/start') {
			setActiveLink('كيف أبدأ');
		}
		if (location.pathname === '/blog') {
			setActiveLink('المدونة');
		}
	}, [location.pathname]);
	useEffect(() => {
		if (location.pathname === '/' || location.pathname === '/start' || location.pathname === '/policyPayment' || location.pathname === '/policyUse') {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	}, [location.pathname]);
	return (
		<>
			<div className='header'>
				<div className='container'>
					<Navbar expand='lg'>
						<Navbar.Brand>
							<Logo onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
						</Navbar.Brand>

						<Navbar.Toggle aria-controls='navbarScroll'>
							<FiMenu />
						</Navbar.Toggle>
						<Navbar.Collapse id='navbarScroll'>
							<Form className={showForm === true ? 'show' : ''}>
								<button>
									<SearchIcon />
								</button>
								<Form.Control type='search' placeholder='ادخل كلمه البحث' className='me-2' aria-label='Search' />
							</Form>
							<Nav className='me-auto my-2 my-lg-0' navbarScroll>
								<Link to={'/'} onClick={() => setActiveLink(`التسجيل`)}>
									الرئيسية
								</Link>

								<Link  to={'/'} className={activeLink === 'السوق' ? 'active' : ''} onClick={() => setActiveLink(`السوق`)}>
									السوق
								</Link>

								<Link to={'/blog'} className={activeLink === 'المدونة' ? 'active' : ''} onClick={() => setActiveLink(`المدونة`)}>
									المدونة
								</Link>

								<Link to={'/start'} className={activeLink === 'كيف أبدأ' ? 'active' : ''} onClick={() => setActiveLink(`كيف أبدأ`)}>
									كيف أبدأ
								</Link>

								{cookies.access_token ? (
									''
								) : cookies.access_token === 'undefined' ? (
									<Link to={'/register/merchant'} className={location.pathname === '/' || activeLink === 'التسجيل' ? 'active' : ''} onClick={() => setActiveLink(`التسجيل`)}>
										التسجيل
									</Link>
								) : (
									<Link to={'/register/merchant'} className={location.pathname === '/' || activeLink === 'التسجيل' ? 'active' : ''} onClick={() => setActiveLink(`التسجيل`)}>
										التسجيل
									</Link>
								)}
							</Nav>
						</Navbar.Collapse>
						{cookies.access_token ? <UserInfo className='user-info-menu' /> : cookies.access_token === 'undefined' ? '' : ''}
					</Navbar>
				</div>
			</div>
		</>
	);
};

export default Header;
