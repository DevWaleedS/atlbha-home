import React, { useState, useContext } from 'react';
import AppContext from '../../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { LogoHeader } from '../../index';

import { ReactComponent as EyeOPen } from '../../../assets/eye_open.svg';
import { ReactComponent as EyeClose } from '../../../assets/eye_close.svg';

import { ReactComponent as SvgComponent } from '../../../assets/Icons/Component 59 – 11.svg';
import '../../PasswordField/PasswordField.css';

import axios from 'axios';
import { useCookies } from 'react-cookie';

const CreateNewPassword = () => {
	const navigate = useNavigate();
	const contextStore = useContext(AppContext);
	const { email } = contextStore;
	const { resetPasswordToken } = contextStore;
	const [cookies, setCookie] = useCookies(['access_token']);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [password, setPassword] = useState(cookies.remember_me === 'true' ? cookies.password : '');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	// to handle errors
	const [passwordError, setPasswordError] = useState('');
	let type = 'password';

	const reateNewPasswordFunction = () => {
		setPasswordError('');
		const formData = new FormData();
		formData.append('password', password);
		formData.append('password_confirmation', confirmPassword);
		formData.append('user_name', email);
		formData.append('token', resetPasswordToken);
		axios.post('https://backend.atlbha.com/api/password/reset-password', formData).then((res) => {
			if (res?.data?.success === true && res?.data?.data?.status === 200) {
				setCookie('access_token', res?.data?.data?.token, { domain: 'atlbha.com', path: '/' });

				if (rememberMe) {
					setCookie('password', password, { maxAge: 30 * 24 * 60 * 60 }); // Set password cookie to expire in 30 days
					setCookie('remember_me', 'true', { maxAge: 30 * 24 * 60 * 60 }); // Set remember_me cookie to expire in 30 days

					// Navigate the user to login page
					navigate('/SignInPage');
				} else {
					setCookie('password', '', { maxAge: 0 }); // Remove the password cookie
					setCookie('remember_me', 'false', { maxAge: 0 }); // Remove the remember_me cookie
				}
			} else {
				setPasswordError(res?.data?.message?.en?.password?.[0]);
			}
		});
	};

	console.log(resetPasswordToken);

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			reateNewPasswordFunction();

			if (rememberMe) {
				setCookie('password', password, { maxAge: 30 * 24 * 60 * 60 }); // Set password cookie to expire in 30 days
				setCookie('remember_me', 'true', { maxAge: 30 * 24 * 60 * 60 }); // Set remember_me cookie to expire in 30 days
			} else {
				setCookie('password', '', { maxAge: 0 }); // Remove the password cookie
				setCookie('remember_me', 'false', { maxAge: 0 }); // Remove the remember_me cookie
			}
		}
	};

	return (
		<div className='sign-in-box' dir='ltr'>
			<div className='all-content' dir='rtl'>
				<div className='box-container-form'>
					<LogoHeader />
					<div className='all'>
						<h2>قم بتسجيل الدخول الى حسابك</h2>
						<div className='box'>
							<div className='password-field'>
								{type === 'password' ? (
									showPassword ? (
										<EyeOPen
											onClick={() => {
												setShowPassword((prev) => !prev);
											}}
											className='show-password-icon'
										/>
									) : (
										<EyeClose
											onClick={() => {
												setShowPassword((prev) => !prev);
											}}
											className='show-password-icon'
										/>
									)
								) : null}

								<h5>كلمة المرور</h5>
								<input
									autoComplete='off'
									value={password}
									placeholder='********'
									maxLength={24}
									minLength={8}
									onChange={(e) => setPassword(e.target.value)}
									onKeyDown={handleKeyDown}
									type={!type === 'password' ? type : showPassword ? 'text' : type}
								/>

								{passwordError && (
									<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red' }}>
										{passwordError}
									</span>
								)}
							</div>

							<div className='password-field'>
								{type === 'password' ? (
									showConfirmPassword ? (
										<EyeOPen
											onClick={() => {
												setShowConfirmPassword((prev) => !prev);
											}}
											className='show-password-icon'
										/>
									) : (
										<EyeClose
											onClick={() => {
												setShowConfirmPassword((prev) => !prev);
											}}
											className='show-password-icon'
										/>
									)
								) : null}

								<h5>تأكيد كلمة المرور</h5>
								<input
									autoComplete='off'
									value={confirmPassword}
									placeholder='********'
									maxLength={24}
									minLength={8}
									onChange={(e) => setConfirmPassword(e.target.value)}
									onKeyDown={handleKeyDown}
									type={!type === 'password' ? type : showConfirmPassword ? 'text' : type}
								/>

								{passwordError && (
									<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red' }}>
										{passwordError}
									</span>
								)}
							</div>
						</div>
						<div className='top'>
							<div className='check'>
								<div className='form-check'>
									<input className='form-check-input' type='checkbox' id='flexCheckDefault' value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
								</div>
								<h6>تذكرني</h6>
							</div>
						</div>
						<button className='bt-main' onClick={reateNewPasswordFunction}>
							تسجيل الدخول
						</button>
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

export default CreateNewPassword;
