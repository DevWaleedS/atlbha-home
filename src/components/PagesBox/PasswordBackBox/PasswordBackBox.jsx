import React, { useContext, useState } from 'react';
import AppContext from '../../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { LogoHeader } from '../../index';
import { ReactComponent as SvgComponent } from '../../../assets/Icons/Component 59 – 11.svg';
import { ReactComponent as SvgKey } from '../../../assets/Icons/key.svg';
import './PasswordBackBox.css';
import axios from 'axios';
const PasswordBackBox = () => {
	const navigate = useNavigate();
	const contextStore = useContext(AppContext);
	const { email, setEmail } = contextStore;

	// to send code on your email
	const [userName, setUserName] = useState('');
	const [usernameError, setUsernameError] = useState('');
	// to set email to resend page
	setEmail(userName);


	const sendPassWord = () => {
		setUsernameError('');
		const formData = new FormData();
		formData.append('user_name', userName);

		axios.post('https://backend.atlbha.com/api/password/create', formData).then((res) => {
			if (res?.data?.success === true && res?.data?.data?.status === 200) {
				navigate('/SendVerifcationCodePage');
	
			} else {
				setUsernameError(res?.data?.message?.en?.user_name?.[0]);
			}
		});
	};

	return (
		<>
			<div className='password-back-box' dir='ltr'>
				<div className='all-content' dir='rtl'>
					<div className='box-container-form'>
						<LogoHeader />
						<div className='all'>
							<h2>قم بتسجيل الدخول الى حسابك</h2>
							<div className='box'>
								<h5>البريد الالكتروني</h5>
								<input value={userName} onChange={(e) => setUserName(e.target.value)} type='email' name='userName' placeholder=' ارسل الكود عبر البريد الالكتروني ' />
							</div>
							{usernameError && userName === '' && (
								<p className={'wrong-text w-100'} style={{ color: 'red', marginTop: '-20px', direction: 'rtl' }}>
									يرجي ادخال البريد الالكتروني حتي نتكمن من ارسال كود التحقق
								</p>
							)}

							<button className='bt-main' onClick={sendPassWord}>
								ارسال
							</button>
						</div>
					</div>

					<div className='box-form-banner'>
						<span className='over-info'>
							<SvgComponent />
						</span>
						<div className='info-svg'>
							<h4>استعادة كلمة المرور</h4>
							<span>
								<SvgKey />
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PasswordBackBox;
