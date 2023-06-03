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
const OWNER_REGEX = /^[\p{L}\p{M}\p{Zs}.'-]+(\s[\p{L}\p{M}\p{Zs}.'-]+){2,}$/u;
const STORE_REGEX = /^[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_]).{8,24}$/;
const PHONE_REGEX = /^(5[0-9]{8})$/;
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

	const [validStoreName, setValidStoreName] = useState(false);
	const [storeNameFocus, setStoreNameFocus] = useState(false);

	const [validDomainName, setValidDomainName] = useState(false);
	const [domainNameFocus, setDomainNameFocus] = useState(false);

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

	/** -----------------------------------------------------------------------------------------------------------
	 *  	=> THE SEND THE DATA TO SERVER  <=
	 *  ------------------------------------------------- */

	// to assign the store info into state
	const [storeInfo, setStoreInfo] = useState({
		domain: '',
		store_name: '',
		store_email: '',
		phonenumber: '',
	});

	console.log(storeInfo?.phonenumber.startsWith(5));

	// to assign the owner info into state
	const [ownerInfo, setOwnerInfo] = useState({
		name: '',
		user_name: '',
		email: '',
		userphonenumber: '',
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

	// TO HANDLE VALIDATION FOR STORE NAME
	useEffect(() => {
		const storeNameValidation = STORE_REGEX.test(storeInfo?.store_name);
		setValidStoreName(storeNameValidation);
	}, [storeInfo?.store_name]);

	// TO HANDLE VALIDATION FOR DOMAIN NAME
	useEffect(() => {
		const domainNameValidation = DOMAIN_REGEX.test(storeInfo?.domain);
		setValidDomainName(domainNameValidation);
	}, [storeInfo?.domain]);

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

	useEffect(() => {
		const storeEmailValidation = STORE_EMAIL_REGEX.test(storeInfo?.store_email);
		setValidStoreEmail(storeEmailValidation);
	}, [storeInfo?.store_email]);

	// TO HANDLE VALIDATION PHONE NUMBER
	useEffect(() => {
		const storePhoneNumberValidation = PHONE_REGEX.test(storeInfo?.phonenumber);
		setValidStorePhoneNumber(storePhoneNumberValidation);
	}, [storeInfo?.phonenumber]);

	// TO HANDLE VALIDATION PHONE NUMBER
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
		formData.append('password', password || null);
		formData.append('name', ownerInfo?.name || null);
		formData.append('email', ownerInfo?.email || null);
		formData.append('user_name', ownerInfo?.user_name || null);
		formData.append('userphonenumber', '+966' + ownerInfo?.userphonenumber || null);
		// Store info
		formData.append('domain', storeInfo?.domain || null);
		formData.append('phonenumber', '+966' + storeInfo?.phonenumber || null);
		formData.append('store_name', storeInfo?.store_name || null);
		formData.append('store_email', storeInfo?.store_email || null);
		formData.append('checkbox_field', isChecked || null);
		formData.append('periodtype', subscriptionPeriodValues || null);
		// for (let countr = 0; countr < country.length; countr++) {
		// 	formData.append('country_id', country[countr] || '');
		// }

		for (let cit = 0; cit < city.length; cit++) {
			formData.append('city_id', city[cit] || null);
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
				setError(res?.data?.message?.en);
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
										<form onSubmit={handleSubmit}>
											<div>
												<h5>اسم المتجر</h5>
												<input
													type='text'
													name='store_name'
													value={storeInfo?.store_name}
													onChange={handleStoreInfo}
													placeholder=' ادخل اسم المتجر باللغة الانجليزية'
													required
													aria-invalid={validStoreName ? 'false' : 'true'}
													aria-describedby='storeName'
													onFocus={() => setStoreNameFocus(true)}
													onBlur={() => setStoreNameFocus(true)}
												/>
												<p
													id='storeName'
													className={storeNameFocus && storeInfo?.store_name && !validStoreName ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													يجب ان يكون اسم المتجر باللغة الانجليزية
												</p>

												{storeNameError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'rtl' }}>
														{storeNameError}
													</span>
												)}
											</div>

											<div>
												<h5>الدومين</h5>
												<input
													type='url'
													name='domain'
													value={storeInfo?.domain}
													onChange={handleStoreInfo}
													placeholder='fayez.atlbha.sa'
													required
													aria-invalid={validStoreName ? 'false' : 'true'}
													aria-describedby='domainNmae'
													onFocus={() => setDomainNameFocus(true)}
													onBlur={() => setDomainNameFocus(true)}
												/>
												<p
													id='storeName'
													className={domainNameFocus && storeInfo?.domain && !validDomainName ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													يرجي ادخال الدومين بالكامل مثال :
													<br />
													(http://fayez.atlbha.sa) أو (https://fayez.atlbha.sa)
												</p>
												{domainError && (
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'rtl' }}>
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
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'rtl' }}>
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
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'rtl' }}>
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
													<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red', direction: 'rtl' }}>
														{cityError}
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
														minLength='0'
														value={storeInfo?.phonenumber}
														onChange={handleStoreInfo}
														placeholder='500000000'
														required
														aria-invalid={validStorePhoneNumber ? 'false' : 'true'}
														aria-describedby='storePhoneNumber'
														onFocus={() => setUserPhoneNumberFocus(true)}
														onBlur={() => setUserPhoneNumberFocus(true)}
													/>
													<div className='country_key'>966</div>
												</section>

												<p
													id='storePhoneNumber'
													className={!storeInfo?.phonenumber?.startsWith(5) && userPhoneNumberFocus && storeInfo?.phonenumber && !validStorePhoneNumber ? ' d-block wrong-text ' : 'd-none'}
													style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
												>
													<MdErrorOutline className='ms-1' />
													تأكد ان رقم الجوال يبدأ برقم 5 ولا يقل عن 9 أرقام
												</p>
											</div>
											{phonenumberError && (
												<span className='wrong-text w-100 d-flex justify-content-start' style={styles.phonenumberErrorStyle}>
													{phonenumberError}
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
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
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
									<form onSubmit={handleSubmit}>
										<h4>بيانات المالك</h4>

										<div className='name'>
											<h5>الاسم كامل</h5>
											<input
												type='text'
												name='name'
												value={ownerInfo?.name}
												onChange={handleOwnerInfo}
												required
												aria-invalid={validOwnerName ? 'false' : 'true'}
												aria-describedby='ownerName'
												onFocus={() => setOwnerNameFocus(true)}
												onBlur={() => setOwnerNameFocus(true)}
											/>
											<span>
												<SvgUser />
											</span>
										</div>
										<p
											id='ownerName'
											className={ownerNameFocus && ownerInfo?.userphonenumber && !validOwnerName ? ' d-block wrong-text ' : 'd-none'}
											style={{ color: 'red', direction: 'rtl', marginTop: '-20px', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
										>
											<MdErrorOutline className='ms-1' />
											برجاء كتابة الاسم بالكامل كما هو موجود في الهوية
											<br />
										</p>
										{nameError && (
											<span className='wrong-text w-100 ' style={{ color: 'red', marginTop: '-20px', direction: 'rtl' }}>
												{nameError}
											</span>
										)}

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
													type='tel'
													name='userphonenumber'
													maxLength='9'
													minLength='0'
													value={ownerInfo?.userphonenumber}
													onChange={handleOwnerInfo}
													placeholder='500000000'
													required
													aria-invalid={validUserPhoneNumber ? 'false' : 'true'}
													aria-describedby='userPhoneNumber'
													onFocus={() => setUserPhoneNumberFocus(true)}
													onBlur={() => setUserPhoneNumberFocus(true)}
												/>
												<div className='country_key'>966</div>
											</section>

											<p
												id='storePhoneNumber'
												className={!ownerInfo?.phonenumber?.startsWith(5) && userPhoneNumberFocus && ownerInfo?.userphonenumber && !validUserPhoneNumber ? ' d-block wrong-text ' : 'd-none'}
												style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
											>
												<MdErrorOutline className='ms-1' />
												تأكد ان رقم الجوال يبدأ برقم 5 ولا يقل عن 9 أرقام
											</p>
										</div>
										{userphonenumberError && (
											<span
												className='wrong-text w-100 '
												style={{
													color: 'red',
													marginTop: '-10px',
													direction: 'rtl',
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
											style={{ color: 'red', marginTop: '-20px', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
										>
											<MdErrorOutline className='ms-1' />
											يجب ان يكون اسم المستخدم باللغة الانجليزية
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

												{error && (
													<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
														{error}
													</span>
												)}
											</div>

											<button
												disabled={!validStoreName || !validDomainName || !validUserName || !validStorePhoneNumber || !validUserPhoneNumber || !validPssWord || !validEmail || !validStoreEmail ? true : false}
												className='bt-main'
												onClick={register}
											>
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
														onFocus={() => setStorePhoneNumberFocus(true)}
														onBlur={() => setStorePhoneNumberFocus(true)}
													/>
													<section className='country_key'>966</section>
												</section>

												<p
													id='storePhoneNumber'
													className={!ownerInfo?.userphonenumber?.startsWith(5) && storePhoneNumberFocus && ownerInfo?.userphonenumber && !validUserPhoneNumber ? ' d-block wrong-text ' : 'd-none'}
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

											{error && (
												<span className='wrong-text w-100' style={{ color: 'red', direction: 'rtl' }}>
													{error}
												</span>
											)}
										</div>
										<button disabled={!validUserName || !validUserPhoneNumber || !validPssWord || !validEmail ? true : false} className='bt-main' onClick={register}>
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
