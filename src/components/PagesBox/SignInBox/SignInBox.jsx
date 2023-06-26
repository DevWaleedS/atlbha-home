import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoHeader, PasswordField } from '../../index';
import { ReactComponent as SvgComponent } from '../../../assets/Icons/Component 59 – 11.svg';
import './SignInBox.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const SignInBox = () => {
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies(['access_token']);
	const [username, setUsername] = useState(cookies.remember_me === 'true' ? cookies.username : '');
	const [password, setPassword] = useState(cookies.remember_me === 'true' ? cookies.password : '');
	const [rememberMe, setRememberMe] = useState(false);

	// to handle errors
	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [error, setError] = useState('');

	// go to url store dashboard if logign
	function NavigateTodDashboard() {
		window.location.href = 'http://store.atlbha.com';
	}

	//Set username , password and remember_me cookie to expire
	function setUserInfoToCookies() {
		// Set username cookie to expire in 1 days
		setCookie('username', username, { maxAge: 24 * 60 * 60 });
		setCookie('password', password, { maxAge: 24 * 60 * 60 }); // Set password cookie to expire in 1 days
		setCookie('remember_me', 'true', { maxAge: 30 * 24 * 60 * 60 }); // Set remember_me cookie to expire in 30 days
	}

	//remove username , password and remember_me cookie to expire
	function removeUserInfoToCookies() {
		setCookie('username', '', { maxAge: 0 }); // Remove the username cookie
		setCookie('password', '', { maxAge: 0 }); // Remove the password cookie
		setCookie('remember_me', 'false', { maxAge: 0 }); // Remove the remember_me cookie
	}

	const Login = () => {
		setError('');
		setUsernameError('');
		setPasswordError('');
		const data = {
			user_name: username,
			password: password,
		};
		axios.post('https://backend.atlbha.com/api/loginapi', data).then((res) => {
			if (res?.data?.success === true && res?.data?.data?.status === 200) {
				setCookie('access_token', res?.data?.data?.token, { domain: 'atlbha.com', path: '/' });

				if (rememberMe) {
					//Set username , password and remember_me cookie to expire
					setUserInfoToCookies();
				} else {
					//remove username , password and remember_me cookie to expire
					removeUserInfoToCookies();
				}
				// if  login is go to dashboard
				// NavigateTodDashboard();
				navigate('/');
			} else {
				setUsernameError(res?.data?.message?.en?.user_name?.[0]);
				setPasswordError(res?.data?.message?.en?.password?.[0]);
				setError(res?.data?.message?.ar);
			}
		});
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			Login();

			if (rememberMe) {
				//Set username , password and remember_me cookie to expire
				setUserInfoToCookies();
			} else {
				//remove username , password and remember_me cookie to expire
				removeUserInfoToCookies();
			}
		}
	};

	return cookies?.access_token ? (
		navigate('/')
	) : (
		<div className='sign-in-box' dir='ltr'>
			<div className='all-content' dir='rtl'>
				<div className='box-container-form'>
					<LogoHeader />
					<div className='all'>
						<h2>قم بتسجيل الدخول الى حسابك</h2>
						<div className='box'>
							<div>
								<h5>الاسم</h5>
								<input type='text' placeholder='ادخل اسم المستخدم او البريد الالكتروني' value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} />
								{usernameError && <span className='wrong-text'>{usernameError}</span>}
							</div>
							<PasswordField password={password} setPassword={setPassword} passwordError={passwordError} handleKeyDown={handleKeyDown} />
							<span className='wrong-text'>{error}</span>
						</div>
						<div className='top'>
							<div className='check'>
								<div className='form-check'>
									<input className='form-check-input' type='checkbox' id='flexCheckDefault' value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
								</div>
								<h6>تذكرني</h6>
							</div>
							<h5
								onClick={() => {
									navigate('/passwordBackPage');
								}}
							>
								نسيت كلمة المرور ؟
							</h5>
						</div>
						<button className='bt-main' onClick={Login}>
							تسجيل الدخول
						</button>
						<ul>
							<li>ليس لديك حساب؟</li>
							<li
								onClick={() => {
									navigate('/register/merchant');
								}}
							>
								أنشئ حساب
							</li>
						</ul>
					</div>
				</div>

				<div className='box-form-banner'>
					<span className='over-info'>
						<SvgComponent />
					</span>
					<div className='info-svg'>
						<h4>منصة اطلبها للتجارة الإلكترونية</h4>
						<h1> مرحباً بعودتك</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignInBox;
