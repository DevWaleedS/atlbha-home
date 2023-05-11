import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckMarks, LogoHeader, PasswordField } from '../../index';

// icons and images
import { ReactComponent as Svgarrwos } from '../../../assets/Icons/icon-30-arrwos back1.svg';
import { ReactComponent as SvgComponent } from '../../../assets/Icons/Component 59 – 11.svg';
import { ReactComponent as SvgUser } from '../../../assets/Icons/icon-24-user.svg';
import { ReactComponent as Svgcomparison } from '../../../assets/Icons/comparison.svg';
import { MdErrorOutline } from 'react-icons/md';

// import this library to write media query with inline style
import Radium from 'radium';
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IoIosArrowDown } from 'react-icons/io';
import { useCookies } from 'react-cookie';
import './RegisterBox.css';
import axios from 'axios';
import TermsModal from '../../TermsModal/TermsModal';

const subscriptionPeriod = [
	{ id: 1, name: ' 6 شهور', name_en: '6months' },
	{ id: 2, name: 'سنوي', name_en: 'year' },
];

/** -----------------------------------------------------------------------------------------------------------
 *  	=> TO HANDLE THE REG_EXPRESS <=
 *  ------------------------------------------------- */
const USER_REGEX = /^[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^\+?[0-9][0-9]{9,13}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const STORE_EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const DOMAIN_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const RegisterBox = () => {
	const navigate = useNavigate();
	const parm = useParams();
	const [registerTarget, setRegisterTarget] = useState('merchant');
	const [cookies, setCookie] = useCookies(['access_token']);

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> TO OPEN THE TERMS AND CONDITIONS MODAL <=
	 *  ------------------------------------------------- */

	const [showTermsModal, setShowTermsModal] = useState(false);

	// TO STORE DATA FROM SELECTORS API
	const [citiesList, setCitiesList] = useState([]);
	// const [countryList, setCountryList] = useState([]);
	const [packages, setPackages] = useState([]);

	const [city, setCity] = useState([]);
	// const [country, setCountry] = useState([]);
	const [packagesValues, setPackagesValues] = useState([]);
	const [activityName, setActivityName] = React.useState([]);
	const [subscriptionPeriodValues, setSubscriptionPeriodValues] = useState([]);
	const [userType, setUserType] = useState('marketer');
	const [password, setPassword] = useState('');
	const [isChecked, setIsChecked] = useState(0);

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> TO  CREATE THE VALIDATION <=
	 *  ------------------------------------------------- */

	const [validUserName, setValidUserName] = useState(false);
	const [userNameFocus, setUserNameFocus] = useState(false);

	const [validPssWord, setValidPssWord] = useState(false);
	const [userPssWordFocus, setPssWordFocus] = useState(false);

	const [validPhoneNumber, setValidPhoneNumber] = useState(false);
	const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [validStoreEmail, setValidStoreEmail] = useState(false);
	const [storeEmailFocus, setStoreEmailFocus] = useState(false);

	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [domainError, setDomainError] = useState('');
	const [storeNameError, setStoreNameError] = useState('');

	const [storeEmailError, setStoreEmailError] = useState('');
	const [phonenumberError, setPhonenumberError] = useState('');
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [userphonenumberError, setUserphonenumberError] = useState('');
	// const [countryError, setCountryError] = useState('');
	const [cityError, setCityError] = useState('');
	const [activityError, setActivityError] = useState('');
	const [packagesError, setPackagesError] = useState('');
	const [checkboxError, setCheckboxError] = useState('');
	const [error, setError] = useState('');
	const [accepet, setAccepet] = useState(false);

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> THE SEND THE DATA TO SERVER  <=
	 *  ------------------------------------------------- */

	// to assign the store info into state
	const [storeInfo, setStoreInfo] = useState({
		domain: '',
		store_name: '',
		store_email: '',
		phonenumber: '+966',
	});

	// to assign the owner info into state
	const [ownerInfo, setOwnerInfo] = useState({
		name: '',
		user_name: '',
		email: '',
		userphonenumber: '+966',
	});

	// to get the values from inputs
	const handleStoreInfo = (e) => {
		const { name, value } = e.target;
		setStoreInfo((prevStoreInfo) => {
			return { ...prevStoreInfo, [name]: value };
		});
	};

	const handleOwnerInfo = (e) => {
		const { name, value } = e.target;
		setOwnerInfo((prevStoreInfo) => {
			return { ...prevStoreInfo, [name]: value };
		});
	};

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> THE SIDE EFFECTS <=
	 *  ------------------------------------------------- */

	// use effect to change user type form
	useEffect(() => {
		if (parm.user === 'merchant' || parm.user === 'represented') {
			setRegisterTarget(parm.user);
		} else {
			navigate('*');
		}
	}, [parm.user]);

	// to call cities api
	useEffect(() => {
		axios
			.get('https://backend.atlbha.com/api/selector/cities')
			.then((response) => {
				setCitiesList(response?.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// TO HANDLE VALIDATION FOR USER NAME
	useEffect(() => {
		const UserNameValidation = USER_REGEX.test(ownerInfo?.user_name);
		setValidUserName(UserNameValidation);
	}, [ownerInfo?.user_name]);

	// TO HANDLE VALIDATION FOR EMAIL
	useEffect(() => {
		const emailValidation = EMAIL_REGEX.test(ownerInfo?.email);
		setValidEmail(emailValidation);
	}, [ownerInfo?.email]);

	useEffect(() => {
		const storeEmailValidation = STORE_EMAIL_REGEX.test(storeInfo?.store_email);
		setValidStoreEmail(storeEmailValidation);
	}, [storeInfo?.store_email]);

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> to call packages api  <=
	 *  ------------------------------------------------- */
	useEffect(() => {
		axios
			.get('https://backend.atlbha.com/api/selector/packages')
			.then((response) => {
				setPackages(response?.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> REGISTER FUNCTION  <=
	 *  ------------------------------------------------- */
	const register = () => {
		setError('');
		setUsernameError('');
		setPasswordError('');
		setDomainError('');
		setStoreNameError('');
		setStoreEmailError('');
		setPhonenumberError('');
		setNameError('');
		setEmailError('');
		setUserphonenumberError('');
		// setCountryError('');
		setCityError('');
		setActivityError('');
		setPackagesError('');
		setCheckboxError('');

		let formData = new FormData();
		formData.append('user_type', userType);
		// Owner info
		formData.append('password', password || '');
		formData.append('name', ownerInfo?.name || '');
		formData.append('email', ownerInfo?.email || '');
		formData.append('user_name', ownerInfo?.user_name || '');
		formData.append('userphonenumber', ownerInfo?.userphonenumber || '');
		// Store info
		formData.append('domain', storeInfo?.domain || '');
		formData.append('phonenumber', storeInfo?.phonenumber || '');
		formData.append('store_name', storeInfo?.store_name || '');
		formData.append('store_email', storeInfo?.store_email || '');
		formData.append('checkbox_field', isChecked || null);
		formData.append('periodtype', subscriptionPeriodValues || '');
		// for (let countr = 0; countr < country.length; countr++) {
		// 	formData.append('country_id', country[countr] || '');
		// }

		for (let cit = 0; cit < city.length; cit++) {
			formData.append('city_id', city[cit] || '');
		}

		for (let i = 0; i < activityName.length; i++) {
			formData.append(`activity_id[${i}]`, activityName[i] || null);
		}
		for (let i = 0; i < packagesValues.length; i++) {
			formData.append('package_id', packagesValues[i] || null);
		}

		axios.post('https://backend.atlbha.com/api/registerapi', formData).then((res) => {
			if (res?.data?.success === true && res?.data?.data?.status === 200) {
				setCookie('access_token', res?.data?.data?.token);
				navigate('/verificationPage');
			} else {
				setUsernameError(res?.data?.message?.en?.user_name?.[0]);
				setPasswordError(res?.data?.message?.en?.password?.[0]);
				setDomainError(res?.data?.message?.en?.domain?.[0]);
				setStoreNameError(res?.data?.message?.en?.store_name?.[0]);
				setStoreEmailError(res?.data?.message?.en?.store_email?.[0]);
				setPhonenumberError(res?.data?.message?.en?.phonenumber?.[0]);
				setNameError(res?.data?.message?.en?.name?.[0]);
				setEmailError(res?.data?.message?.en?.email?.[0]);
				setUserphonenumberError(res?.data?.message?.en?.userphonenumber?.[0]);
				// setCountryError(res?.data?.message?.en?.country_id?.[0]);
				setCityError(res?.data?.message?.en?.city_id?.[0]);
				setActivityError(res?.data?.message?.en?.activity_id[0]?.[0]);
				setPackagesError(res?.data?.message?.en?.package_id?.[0]);
				setCheckboxError(res?.data?.message?.en?.checkbox_field?.[0]);
				setError(res?.data?.message?.ar);
			}
		});
	};

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> this styles to set some style on media query <=
	 *  ------------------------------------------------- */
	const styles = {
		phonenumberErrorStyle: {
			color: 'red',
			direction: 'ltr',
			marginBottom: phonenumberError === 'The phonenumber field is required when user type is store.' ? '35px' : '-25px',
			marginTop: '-10px',
			'@media (max-width: 768px)': {
				marginBottom: phonenumberError === 'The phonenumber field is required when user type is store.' ? '12px' : '-25px',
			},
		},

		comparePackagesIconStyle: {
			'@media (max-width: 768px)': {
				top: phonenumberError === 'The phonenumber field is required when user type is store.' ? '-10px' : '20px',
			},
			'@media (max-width: 480px)': {
				top: phonenumberError === 'The phonenumber field is required when user type is store.' ? '-34px' : '20px',
			},
		},
	};

	return (
		<>
			<div className='register-box' dir='ltr'>
				<div className={registerTarget === 'represented' ? 'all-content show' : 'all-content'} dir='rtl'>
					<div className='box-container-form'>
						<LogoHeader />

						<div className='all-register'>
							<div className={registerTarget === 'merchant' ? ' all all-1 show' : ' all all-1'}>
								<h2>أنشئ حسابك واستمتع بالتجارة الإلكترونية</h2>

								<div className='user-info'>
									<button className='bt-main'>تسجيل تاجر</button>
									<button
										className='bt-main'
										onClick={() => {
											navigate('/register/represented');
											setUserType('store');
										}}
									>
										تسجيل مندوب
									</button>
								</div>

								<div className='user-form'>
									<h4 className='title'>بيانات المتجر</h4>

									<div className='content'>
										<form>
											<div>
												<h5>اسم المتجر</h5>
												<input name='store_name' value={storeInfo?.store_name} onChange={handleStoreInfo} type='text' placeholder=' ادخل اسم المتجر باللغة الانجليزية' />

												{storeNameError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'ltr' }}>
														{storeNameError}
													</span>
												)}
											</div>

											<div>
												<h5>الدومين</h5>
												<input name='domain' value={storeInfo?.domain} onChange={handleStoreInfo} type='text' placeholder='fayez.atlbha.sa' />
												{domainError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'ltr' }}>
														{domainError}
													</span>
												)}
											</div>

											<div>
												<h5>البريد الإلكتروني</h5>
												<input
													type='email'
													name='store_email'
													value={storeInfo?.store_email}
													onChange={handleStoreInfo}
													placeholder='atlbha@gmail.com'
													required
													aria-invalid={validStoreEmail ? 'false' : 'true'}
													aria-describedby='storeEmail'
													onFocus={() => setStoreEmailFocus(true)}
													onBlur={() => setStoreEmailFocus(true)}
												/>
												<p
													id='email'
													className={storeEmailFocus && storeInfo?.store_email && !validStoreEmail ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													تأكد من ان البريد الالكتروني يتكون من حرف واحد او اكثر ويحتوي علي علامة الـ @
												</p>
												{storeEmailError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'ltr' }}>
														{storeEmailError}
													</span>
												)}
											</div>

											<div>
												<h5>الدوله</h5>

												<input name='country' value={'المملكة العربية السعودية'} onChange={() => console.log(' --- ')} type='text' disabled />
												{/** <Select
													sx={{
														height: '3.5rem',

														border: '1px solid rgba(167, 167, 167, 0.5)',

														'& .MuiOutlinedInput-notchedOutline': {
															border: 'none',
														},
													}}
													value={country}
													className='select-mu'
													onChange={(e) => {
														setCountry(e.target.value);
													}}
													IconComponent={IoIosArrowDown}
													displayEmpty
													renderValue={(selected) => {
														if (country?.length === 0) {
															return <span>اختر الدولة</span>;
														}
														const result = countryList?.data?.countries?.filter((item) => item?.id === parseInt(selected));
														return result[0]?.name;
													}}
												>
													{countryList?.data?.countries?.map((country) => (
														<MenuItem value={`${country?.id}`} key={country?.id}>
															{country?.name}
														</MenuItem>
													))}
												</Select>

												{countryError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'ltr' }}>
														{countryError}
													</span>
												)} */}
											</div>

											<div>
												<h5>المدينة</h5>
												<Select
													sx={{
														height: '3.5rem',

														border: '1px solid rgba(167, 167, 167, 0.5)',

														'& .MuiOutlinedInput-notchedOutline': {
															border: 'none',
														},
													}}
													value={city}
													className='select-mu'
													onChange={(e) => {
														setCity(e.target.value);
													}}
													IconComponent={IoIosArrowDown}
													displayEmpty
													renderValue={(selected) => {
														if (city?.length === 0) {
															return <span>اختر المدينة</span>;
														}
														const result = citiesList?.data?.cities?.filter((item) => item?.id === parseInt(selected));
														return result[0]?.name;
													}}
												>
													{citiesList?.data?.cities?.map((city) => (
														<MenuItem value={`${city?.id}`} key={city?.id}>
															{city?.name}
														</MenuItem>
													))}
												</Select>
												{cityError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'ltr' }}>
														{cityError}
													</span>
												)}
											</div>

											<div className='phone'>
												<h5>رقم الجوال</h5>
												<input name='phonenumber' maxlength='13' value={storeInfo?.phonenumber} onChange={handleStoreInfo} type='tel' placeholder='500000000' style={{ direction: 'ltr' }} />
											</div>
											{phonenumberError && (
												<span className='wrong-text w-100 d-flex justify-content-start' style={styles.phonenumberErrorStyle}>
													<MdErrorOutline /> {phonenumberError}
												</span>
											)}

											<div className='info-package'>
												<h5>نوع الباقة</h5>

												<Select
													sx={{
														height: '3.5rem',

														border: '1px solid rgba(167, 167, 167, 0.5)',

														'& .MuiOutlinedInput-notchedOutline': {
															border: 'none',
														},
													}}
													value={packagesValues}
													className='select-mu'
													onChange={(e) => {
														setPackagesValues(e.target.value);
													}}
													IconComponent={IoIosArrowDown}
													displayEmpty
													renderValue={(selected) => {
														if (packagesValues.length === 0) {
															return <span>أختر نوع الباقة</span>;
														}
														const result = packages?.data?.packages?.filter((item) => item?.id === parseInt(selected));
														return result[0]?.name;
													}}
												>
													{packages?.data?.packages?.map((pack) => (
														<MenuItem value={`${pack?.id}`} key={pack?.id}>
															{pack?.name}
														</MenuItem>
													))}
												</Select>
												{packagesError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'ltr' }}>
														{packagesError}
													</span>
												)}
												<div
													className='box'
													style={styles.comparePackagesIconStyle}
													onClick={() => {
														navigate('/packagePage');
													}}
												>
													<span>
														<Svgcomparison />
													</span>
												</div>
											</div>

											<div>
												<h5>مدة الاشتراك</h5>

												<Select
													sx={{
														height: '3.5rem',

														border: '1px solid rgba(167, 167, 167, 0.5)',

														'& .MuiOutlinedInput-notchedOutline': {
															border: 'none',
														},
													}}
													value={subscriptionPeriodValues}
													className='select-mu'
													onChange={(e) => {
														setSubscriptionPeriodValues(e.target.value);
													}}
													IconComponent={IoIosArrowDown}
													displayEmpty
													renderValue={(selected) => {
														if (subscriptionPeriodValues.length === 0) {
															return <>أختر مدة الاشتراك</>;
														}
														const result = subscriptionPeriod?.filter((item) => item?.name_en === selected);

														return result[0]?.name;
													}}
												>
													{subscriptionPeriod.map((period) => (
														<MenuItem value={`${period?.name_en}`} key={period?.id}>
															{period.name}
														</MenuItem>
													))}
												</Select>
											</div>

											<div>
												<h5>نشاط المتجر</h5>
												<CheckMarks activityName={activityName} setActivityName={setActivityName} />
												{activityError && (
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'ltr' }}>
														{activityError}
													</span>
												)}
											</div>
										</form>
									</div>
								</div>

								{/*--------------------------------------------------------------------*/}
								{/*  owner info  form */}
								<div className='owner-form'>
									<form action=''>
										<h4>بيانات المالك</h4>

										<div className='name'>
											<h5>الاسم كامل</h5>
											<input name='name' value={ownerInfo?.name} onChange={handleOwnerInfo} type='text' />
											<span>
												<SvgUser />
											</span>
										</div>
										{nameError && (
											<span className='wrong-text w-100 ' style={{ color: 'red', marginTop: '-20px', direction: 'ltr' }}>
												{nameError}
											</span>
										)}

										<div className='phone'>
											<h5>رقم الجوال</h5>
											<input name='userphonenumber' maxlength='13' value={ownerInfo?.userphonenumber} onChange={handleOwnerInfo} type='tel' placeholder='500000000' style={{ direction: 'ltr' }} />
										</div>
										{userphonenumberError && (
											<span
												className='wrong-text w-100 '
												style={{
													color: 'red',
													marginTop: '-10px',
													direction: 'ltr',
												}}
											>
												{userphonenumberError}
											</span>
										)}

										<div className='name'>
											<h5>اسم المستخدم</h5>
											<input
												type='text'
												name='user_name'
												value={ownerInfo?.user_name}
												onChange={handleOwnerInfo}
												required
												aria-invalid={validUserName ? 'false' : 'true'}
												aria-describedby='uidnote'
												onFocus={() => setUserNameFocus(true)}
												onBlur={() => setUserNameFocus(true)}
											/>
											<span>
												<SvgUser />
											</span>
										</div>
										<p
											id='uidnote'
											className={userNameFocus && ownerInfo?.user_name && !validUserName ? ' d-block wrong-text ' : 'd-none'}
											style={{ color: 'red', marginTop: '-20px', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px', width: 'min-content' }}
										>
											<MdErrorOutline className='ms-1' />
											يجب ان يكون اسم المستخدم باللغة الانجليزية
										</p>

										{usernameError && (
											<p className={'wrong-text w-100'} style={{ color: 'red', marginTop: '-20px', direction: 'ltr' }}>
												{usernameError}
											</p>
										)}

										<div>
											<h5>البريد الإلكتروني</h5>
											<input
												type='email'
												name='email'
												value={ownerInfo?.email}
												onChange={handleOwnerInfo}
												placeholder='atlbha@gmail.com'
												required
												aria-invalid={validEmail ? 'false' : 'true'}
												aria-describedby='email'
												onFocus={() => setEmailFocus(true)}
												onBlur={() => setEmailFocus(true)}
											/>
											<p
												id='email'
												className={emailFocus && ownerInfo?.email && !validEmail ? ' d-block wrong-text ' : 'd-none'}
												style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
											>
												<MdErrorOutline className='ms-1' />
												تأكد من ان البريد الالكتروني يتكون من حرف واحد او اكثر ويحتوي علي علامة الـ @
											</p>
											{emailError && (
												<span className='wrong-text w-100' style={{ color: 'red', direction: 'ltr' }}>
													{emailError}
												</span>
											)}
										</div>

										<PasswordField name='password' password={password} setPassword={setPassword} passwordError={passwordError} />
									</form>

									<div className='owner-form'>
										<div className='box-pay'>
											<div className='top'>
												<FormControlLabel
													sx={{
														width: '100%',
														height: '100%',
														display: 'flex',
														alignItems: 'flex-start',
													}}
													value={isChecked}
													control={
														<>
															<Checkbox
																className='form-check-input'
																id='flexCheckDefault'
																checked={isChecked}
																onChange={(e) => {
																	if (e.target.checked) {
																		setIsChecked(1);
																	} else {
																		setIsChecked(0);
																	}
																}}
															/>

															<Typography
																sx={{
																	ml: 0,
																	mr: 1,

																	fontSize: '15px',
																	fontWeight: 400,
																	color: '#67747B',
																	marginTop: '-14px',
																}}
															>
																بتسجيلك فإنك توافق على سياسة<Link onClick={() => setShowTermsModal(true)}> الشروط والأحكام</Link> الخاصة بمنصة اطلبها
															</Typography>
														</>
													}
												/>

												{checkboxError && (
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'ltr' }}>
														{checkboxError}
													</span>
												)}
											</div>
											<button className='bt-main' onClick={register}>
												تسجيل حساب جديد
											</button>

											<ul>
												<li>لديك حساب بالفعل ؟</li>
												<li
													onClick={() => {
														navigate('/signInPage');
													}}
												>
													قم بتسجيل الدخول
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className={registerTarget === 'represented' ? ' all all-2 show' : 'all all-2'}>
								<h2>أنشئ حسابك واستمتع بالتجارة الإلكترونية</h2>

								<div className='user-info'>
									<button className='bt-main'>تسجيل مندوب</button>
									<button
										className='bt-main'
										onClick={() => {
											navigate('/register/merchant');
											setUserType('marketer');
										}}
									>
										تسجيل تاجر
									</button>
								</div>

								<div className='user-form'>
									<h4 className='title'>بيانات المتجر</h4>

									<div className='content'>
										<form action=''>
											<div>
												<h5>اسم المندوب</h5>
												<input name='name' value={ownerInfo?.name} onChange={handleOwnerInfo} type='text' placeholder='ادخل اسمك بالكامل' />
												{nameError && (
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'ltr' }}>
														{nameError}
													</span>
												)}
											</div>

											<div>
												<h5>اسم المستخدم</h5>
												<input name='user_name' value={ownerInfo?.user_name} onChange={handleOwnerInfo} type='text' placeholder='ادخل اسم المستخدم' />
												{usernameError && (
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'ltr' }}>
														{usernameError}
													</span>
												)}
											</div>

											<div>
												<h5>البريد الإلكتروني</h5>
												<input
													name='email'
													value={ownerInfo?.email}
													onChange={handleOwnerInfo}
													type='email'
													placeholder='atlbha@gmail.com'
													required
													aria-invalid={validEmail ? 'false' : 'true'}
													aria-describedby='email'
													onFocus={() => setEmailFocus(true)}
													onBlur={() => setEmailFocus(true)}
												/>
												<p
													id='email'
													className={emailFocus && ownerInfo?.email && !validEmail ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													تأكد من ان البريد الالكتروني يتكون من حرف واحد او اكثر ويحتوي علي علامة الـ @
												</p>
												{emailError && (
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'ltr' }}>
														{emailError}
													</span>
												)}
											</div>

											<div className='phone'>
												<h5>رقم الجوال</h5>
												<input name='phonenumber' maxlength='13' value={storeInfo?.phonenumber} onChange={handleStoreInfo} type='tel' placeholder='500000000' style={{ direction: 'ltr' }} />
											</div>
											{phonenumberError && (
												<span
													className='wrong-text w-100 '
													style={{
														color: 'red',
														marginTop: '-10px',
														direction: 'ltr',
													}}
												>
													{phonenumberError}
												</span>
											)}

											<div className='mb-3'>
												<h5>المدينة</h5>

												<Select
													sx={{
														height: '3.5rem',
														border: '1px solid rgba(167, 167, 167, 0.5)',
														'& .MuiOutlinedInput-notchedOutline': {
															border: 'none',
														},
													}}
													value={city}
													className='select-mu'
													onChange={(e) => {
														setCity(e.target.value);
													}}
													IconComponent={IoIosArrowDown}
													displayEmpty
													renderValue={(selected) => {
														if (city?.length === 0) {
															return <span>اختر المدينة</span>;
														}
														const result = citiesList?.data?.cities?.filter((item) => item?.id === parseInt(selected));
														return result[0]?.name;
													}}
												>
													{citiesList?.data?.cities?.map((city) => (
														<MenuItem value={`${city?.id}`} key={city?.id}>
															{city?.name}
														</MenuItem>
													))}
												</Select>

												{cityError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'ltr' }}>
														{cityError}
													</span>
												)}
											</div>

											<PasswordField name='password' password={password} setPassword={setPassword} passwordError={passwordError} />
										</form>
									</div>
								</div>

								<div className='owner-form'>
									<div className='box-pay'>
										<div className='top'>
											<FormControlLabel
												sx={{
													height: '100%',
													display: 'flex',
													alignItems: 'flex-start',
												}}
												value={isChecked}
												control={
													<>
														<Checkbox
															className='form-check-input'
															id='flexCheckDefault'
															checked={isChecked}
															onChange={(e) => {
																if (e.target.checked) {
																	setIsChecked(1);
																} else {
																	setIsChecked(0);
																}
															}}
														/>

														<Typography
															sx={{
																ml: 0,
																mr: 1,

																fontSize: '15px',
																fontWeight: 400,
																color: '#67747B',
																marginTop: '-14px',
															}}
														>
															بتسجيلك فإنك توافق على سياسة<Link onClick={() => setShowTermsModal(true)}> الشروط والأحكام</Link> الخاصة بمنصة اطلبها
														</Typography>
													</>
												}
											/>
											{checkboxError && (
												<span className='wrong-text w-100' style={{ color: 'red', direction: 'ltr' }}>
													{checkboxError}
												</span>
											)}
										</div>
										<button className='bt-main' onClick={register}>
											تسجيل حساب جديد
										</button>

										<ul>
											<li>لديك حساب بالفعل ؟</li>
											<li
												onClick={() => {
													navigate('/signInPage');
												}}
											>
												قم بتسجيل الدخول
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/*--------------------------------------------------------------------*/}

					{/*banner setion*/}

					<div className='box-form-banner'>
						<h5
							onClick={() => {
								navigate('/');
							}}
						>
							<span>
								<Svgarrwos />
							</span>
							الرئيسية
						</h5>
						<div className='info-svg'>
							<SvgComponent />
						</div>
						<div className='text'>
							<h1>منصة اطلبها</h1>
							<h2>معنى جديد للتجارة الإلكترونية</h2>
						</div>
					</div>
				</div>
			</div>
			{/** terms modal*/}
			<TermsModal show={showTermsModal} closeModal={() => setShowTermsModal(false)} />
		</>
	);
};

export default Radium(RegisterBox);
