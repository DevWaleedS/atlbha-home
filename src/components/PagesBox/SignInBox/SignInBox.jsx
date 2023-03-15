import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogoHeader, PasswordField } from '../../index';
import { ReactComponent as SvgComponent } from '../../../assets/Icons/Component 59 – 11.svg';
import './SignInBox.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const SignInBox = () => {
	const [cookies, setCookie] = useCookies(['access_token']);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

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
				setCookie('access_token', res?.data?.data?.token);
				navigate('http://localhost:3000'); // url dashboard tajer
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
		}
	};

	return cookies.access_token ? (
		// url dashboard tajer
		<Navigate to='/' />
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
								<span className='wrong-text'>{usernameError}</span>
							</div>
							<PasswordField password={password} setPassword={setPassword} passwordError={passwordError} handleKeyDown={handleKeyDown} />
							<span className='wrong-text'>{error}</span>
						</div>
						<div className='top'>
							<div className='check'>
								<div className='form-check'>
									<input className='form-check-input' type='checkbox' defaultValue='' id='flexCheckDefault' />
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
							<li> ليس لديك حساب؟</li>
							<li
								onClick={() => {
									navigate('/registerMerchant');
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
