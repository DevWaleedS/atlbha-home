import React, { Fragment, useContext, useEffect, useState } from 'react';
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
import AppContext from '../../../Context/AppContext';

const subscriptionPeriod = [
	{ id: 1, name: ' 6 شهور', name_en: '6months' },
	{ id: 2, name: 'سنوي', name_en: 'year' },
];

/** -----------------------------------------------------------------------------------------------------------
 *  	=> TO HANDLE THE REG_EXPRESS <=
 *  ------------------------------------------------- */
const USER_REGEX = /^[A-Za-z]+$/;
const OWNER_REGEX = /^[\p{L}\p{M}\p{Zs}.'-]+(\s[\p{L}\p{M}\p{Zs}.'-]+){2,}$/u;
const PWD_REGEX = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_]).{8,24}$/;
const PHONE_REGEX = /^(5\d{8})$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const RegisterBox = () => {
	const navigate = useNavigate();
	const parm = useParams();
	const [registerTarget, setRegisterTarget] = useState('merchant');
	const [cookies, setCookie] = useCookies(['access_token']);
	const contextStore = useContext(AppContext);
	const { setEmail, setResendButtonDisabled, setDisabledBtn } = contextStore;

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> TO OPEN THE TERMS AND CONDITIONS MODAL <=
	 *  ------------------------------------------------- */

	const [showTermsModal, setShowTermsModal] = useState(false);

	// TO STORE DATA FROM SELECTORS API
	const [citiesList, setCitiesList] = useState([]);
	const [city, setCity] = useState('');
	const [packages, setPackages] = useState([]);
	const [packagesValues, setPackagesValues] = useState('');
	const [activityName, setActivityName] = React.useState([]);
	const [subscriptionPeriodValues, setSubscriptionPeriodValues] = useState([]);
	const [userType, setUserType] = useState('store');


	const [password, setPassword] = useState('');
	const [isChecked, setIsChecked] = useState(0);

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> TO  CREATE THE VALIDATION <=
	 *  ------------------------------------------------- */
	const [validUserName, setValidUserName] = useState(false);
	const [userNameFocus, setUserNameFocus] = useState(false);

	const [validOwnerName, setValidOwnerName] = useState(false);
	const [ownerNameFocus, setOwnerNameFocus] = useState(false);

	const [validStorePhoneNumber, setValidStorePhoneNumber] = useState(false);
	const [storePhoneNumberFocus, setStorePhoneNumberFocus] = useState(false);

	const [validUserPhoneNumber, setValidUserPhoneNumber] = useState(false);
	const [userPhoneNumberFocus, setUserPhoneNumberFocus] = useState(false);

	const [validPssWord, setValidPssWord] = useState(false);
	const [pssWordFocus, setPssWordFocus] = useState(false);

	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [phonenumberError, setPhonenumberError] = useState('');
	const [nameError, setNameError] = useState('');

	

	const [emailError, setEmailError] = useState('');
	const [cityError, setCityError] = useState('');
	const [activityError, setActivityError] = useState('');
	const [packagesError, setPackagesError] = useState('');
	const [checkboxError, setCheckboxError] = useState('');
	const [error, setError] = useState('');



	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> THE SEND THE DATA TO SERVER  <=
	 *  ------------------------------------------------- */

	// to assign the store info into state
	const [storeInfo, setStoreInfo] = useState({
		phonenumber: '',
	});

	// to assign the owner info into state
	const [ownerInfo, setOwnerInfo] = useState({
		name: '',
		user_name: '',
		email: '',
		userphonenumber : '',
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

	// USE THIS EFFECT TO CHANGE USER TYPE
	useEffect(() => {
		if (parm.user === 'merchant' || parm.user === 'represented') {
			setRegisterTarget(parm.user);
		} else {
			navigate('*');
		}
	}, [parm.user]);

	// TO CALL CITIES API
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

	// TO HANDLE VALIDATION FOR OWNER NAME
	useEffect(() => {
		const ownerNameValidation = OWNER_REGEX.test(ownerInfo?.name);
		setValidOwnerName(ownerNameValidation);
	}, [ownerInfo?.name]);

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

	// TO HANDLE VALIDATION STORE PHONE NUMBER
	useEffect(() => {
		const storePhoneNumberValidation = PHONE_REGEX.test(storeInfo?.phonenumber);
		setValidStorePhoneNumber(storePhoneNumberValidation);
	}, [storeInfo?.phonenumber]);

	// TO HANDLE VALIDATION USER PHONE NUMBER
	useEffect(() => {
		const userPhoneNumberValidation = PHONE_REGEX.test(ownerInfo?.userphonenumber);
		setValidUserPhoneNumber(userPhoneNumberValidation);
	}, [ownerInfo?.userphonenumber]);

	// TO HANDLE VALIDATION PASSWORD
	useEffect(() => {
		const passwordValidation = PWD_REGEX.test(password);
		setValidPssWord(passwordValidation);
	}, [password]);

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
		setPhonenumberError('');
		setNameError('');
		setEmailError('');

		setCityError('');
		setActivityError('');
		setPackagesError('');
		setCheckboxError('');

		let formData = new FormData();
		formData.append('user_type', userType);

		// Owner info
		formData.append('password', password);
		formData.append('name', ownerInfo?.name);
		formData.append('email', ownerInfo?.email);
		formData.append('user_name', ownerInfo?.user_name);
		ownerInfo?.userphonenumber ? formData.append('userphonenumber', '+966' + ownerInfo?.userphonenumber ) : formData.append('userphonenumber',  ownerInfo?.userphonenumber );
		

		// Store info
		formData.append('phonenumber', '+966' + storeInfo?.phonenumber);
		formData.append('checkbox_field', isChecked);
		formData.append('periodtype', subscriptionPeriodValues);
		formData.append('city_id', city);

		for (let i = 0; i < activityName.length; i++) {
			formData.append(`activity_id[${i}]`, activityName[i]);
		}
		formData.append('package_id', packagesValues);

		axios.post('https://backend.atlbha.com/api/registerapi', formData).then((res) => {
			if (res?.data?.success === true && res?.data?.data?.status === 200) {
				setCookie('access_token', res?.data?.data?.token);
				navigate('/verificationPage');
				setResendButtonDisabled(true);
				setDisabledBtn(true);
				setEmail(ownerInfo?.email)

			}else{
				setUsernameError(res?.data?.message?.en?.user_name??[0] );
				setPasswordError(res?.data?.message?.en?.password??[0]);
				setPhonenumberError(res?.data?.message?.en?.phonenumber??[0]);
				setNameError(res?.data?.message?.en?.name??[0]);
				setEmailError(res?.data?.message?.en?.email??[0]);
				setCityError(res?.data?.message?.en?.city_id??[0]);
				setActivityError(res?.data?.message?.en?.activity_id[0]??[0]);
				setPackagesError(res?.data?.message?.en?.package_id??[0]);
				setCheckboxError(res?.data?.message?.en?.checkbox_field??[0] );
				if( res?.data?.message.ar === 'stop_registration'){
					setError(res?.data?.message.en)
				}
				
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> this styles to set some style on media query <=
	 *  ------------------------------------------------- */
	const styles = {
		phonenumberErrorStyle: {
			color: 'red',
			direction: 'rtl',
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
											navigate('/register/represented ');
											setUserType('marketer');
										}}
									>
										تسجيل مندوب
									</button>
								</div>

								<div className='user-form'>
									<h4 className='title'>بيانات المتجر</h4>

									<div className='content'>
										<form onSubmit={handleSubmit}>
											<div className='name'>
												<h5>اسم المستخدم</h5>
												<input
													style={{ paddingRight: '42px' }}
													type='text'
													name='user_name'
													value={ownerInfo?.user_name}
													onChange={handleOwnerInfo}
													required
													placeholder='اسم المستخدم باللغة الانجليزية'
													aria-invalid={validUserName ? 'false' : 'true'}
													aria-describedby='uidnote'
													onFocus={() => setUserNameFocus(true)}
													onBlur={() => setUserNameFocus(true)}
												/>
												<div id='span-icon'>
													<SvgUser />
												</div>
											</div>
											<p
												id='uidnote'
												className={userNameFocus && ownerInfo?.user_name && !validUserName ? ' d-block wrong-text ' : 'd-none'}
												style={{ color: 'red', marginTop: '-20px', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
											>
												<MdErrorOutline className='ms-1' />
												يجب ان يكون اسم المستخدم باللغة الانجليزية وبدون مسافات
											</p>

											{usernameError && (
												<p className={'wrong-text w-100'} style={{ color: 'red', marginTop: '-20px', direction: 'rtl' }}>
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
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
														{emailError}
													</span>
												)}
											</div>

											<div className='phone'>
												<h5>رقم الجوال</h5>
												<section className='d-flex align-items-center flex-row input_wrapper'>
													<input
														className='phone_input'
														style={{
															width: '100%',
															height: '100%',
															border: 'none',
															outline: 'none',
															boxShadow: 'none',
															padding: ' 0 25px',
															borderRadius: 'none',
														}}
														type='tel'
														name='phonenumber'
														maxLength='9'
														minLength='9'
														value={storeInfo?.phonenumber}
														onChange={handleStoreInfo}
														placeholder='500000000'
														required
														aria-invalid={validStorePhoneNumber ? 'false' : 'true'}
														aria-describedby='storePhoneNumber'
														onFocus={() => setStorePhoneNumberFocus(true)}
														onBlur={() => setStorePhoneNumberFocus(true)}
													/>
													<div className='country_key'>966</div>
												</section>

												<p
													id='storePhoneNumber'
													className={storePhoneNumberFocus && storeInfo?.phonenumber && !validStorePhoneNumber ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													تأكد ان رقم الجوال يبدأ برقم 5 ولا يقل عن 9 أرقام
												</p>
											</div>
											{phonenumberError && (
												<span
													className='wrong-text w-100 '
													style={{
														color: 'red',
														marginTop: '-10px',
														direction: 'rtl',
													}}
												>
													{phonenumberError}
												</span>
											)}

											<PasswordField
												name='password'
												password={password}
												setPassword={setPassword}
												passwordError={passwordError}
												required
												validPssWord={validPssWord}
												pssWordFocus={pssWordFocus}
												setPssWordFocus={setPssWordFocus}
											/>

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
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'rtl' }}>
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

											<div className={packagesValues[0] === undefined || packagesValues[0] === '1' ? 'd-none' : 'd-flex'}>
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
										</form>
									</div>
								</div>

								{/*--------------------------------------------------------------------*/}
								{/*  owner info  form */}
								<div className='owner-form'>
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
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
														{checkboxError}
													</span>
												)}
											</div>

											<button disabled={!validUserName || !validPssWord || !validEmail ? true : false} className='bt-main' onClick={register}>
												تسجيل حساب جديد
											</button>
											{error && (
												<span className='wrong-text w-100 mb-3 text-center' style={{ color: 'red', direction: 'rtl', marginTop: '-20px', fontSize: '18px' }}>
													{error}
												</span>
											)}

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
											setUserType('store');

										}}
									>
										تسجيل تاجر
									</button>
								</div>

								<div className='user-form'>
									<h4 className='title'>بيانات المندوب</h4>

									<div className='content'>
										<form onSubmit={handleSubmit}>
											<div>
												<h5>اسم المندوب</h5>
												<input
													name='name'
													type='text'
													value={ownerInfo?.name}
													onChange={handleOwnerInfo}
													placeholder='ادخل اسمك بالكامل'
													required
													aria-invalid={validOwnerName ? 'false' : 'true'}
													aria-describedby='ownerName'
													onFocus={() => setOwnerNameFocus(true)}
													onBlur={() => setOwnerNameFocus(true)}
												/>
												<p
													id='ownerName'
													className={ownerNameFocus && ownerInfo?.name && !validOwnerName ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													برجاء كتابة الاسم بالكامل كما هو موجود في الهوية
													<br />
												</p>
												{nameError && (
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
														{nameError}
													</span>
												)}
											</div>

											<div>
												<h5>اسم المستخدم</h5>
												<input
													type='text'
													name='user_name'
													value={ownerInfo?.user_name}
													onChange={handleOwnerInfo}
													placeholder='ادخل اسم المستخدم'
													required
													aria-invalid={validUserName ? 'false' : 'true'}
													aria-describedby='uidnote'
													onFocus={() => setUserNameFocus(true)}
													onBlur={() => setUserNameFocus(true)}
												/>
												<p
													id='uidnote'
													className={userNameFocus && ownerInfo?.user_name && !validUserName ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													يجب ان يكون اسم المستخدم باللغة الانجليزية
												</p>
												{usernameError && (
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
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
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
														{emailError}
													</span>
												)}
											</div>

											<div className='phone'>
												<h5>رقم الجوال</h5>

												<section className='d-flex align-items-center flex-row input_wrapper for_owner'>
													<input
														style={{
															width: '100%',
															height: '100%',
															border: 'none',
															outline: 'none',
															boxShadow: 'none',
															padding: ' 0 25px',
															borderRadius: 'none',
														}}
														name='userphonenumber'
														maxLength='9'
														minLength='0'
														value={ownerInfo?.userphonenumber}
														onChange={handleOwnerInfo}
														type='tel'
														placeholder='500000000'
														required
														aria-invalid={validUserPhoneNumber ? 'false' : 'true'}
														aria-describedby='storePhoneNumber'
														onFocus={() => setUserPhoneNumberFocus(true)}
														onBlur={() => setUserPhoneNumberFocus(true)}
													/>
													<section className='country_key'>966</section>
												</section>

												<p
													id='storePhoneNumber'
													className={userPhoneNumberFocus && ownerInfo?.userphonenumber && !validUserPhoneNumber ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													تأكد ان رقم الجوال يبدأ برقم 5 ولا يقل عن 9 أرقام
												</p>
											</div>
											{phonenumberError && (
												<span
													className='wrong-text w-100 '
													style={{
														color: 'red',
														marginTop: '-10px',
														direction: 'rtl',
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
													className='select-mu '
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
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'rtl' }}>
														{cityError}
													</span>
												)}
											</div>

											<PasswordField
												name='password'
												password={password}
												setPassword={setPassword}
												passwordError={passwordError}
												required
												validPssWord={validPssWord}
												pssWordFocus={pssWordFocus}
												setPssWordFocus={setPssWordFocus}
											/>
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
												<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
													{checkboxError}
												</span>
											)}
										</div>
										<button disabled={!validUserName || !validPssWord || !validEmail ? true : false} className='bt-main' onClick={register}>
											تسجيل حساب جديد
										</button>
										{error && (
											<span className='wrong-text w-100 mb-3 text-center' style={{ color: 'red', direction: 'rtl', marginTop: '-20px', fontSize: '18px' }}>
												{error}
											</span>
										)}

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
