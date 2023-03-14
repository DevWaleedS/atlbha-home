import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckMarks, LogoHeader, PasswordField } from '../../index';
import { ReactComponent as Svgarrwos } from '../../../assets/Icons/icon-30-arrwos back1.svg';
import { ReactComponent as SvgComponent } from '../../../assets/Icons/Component 59 – 11.svg';
import { ReactComponent as SvgUser } from '../../../assets/Icons/icon-24-user.svg';
import { ReactComponent as Svgcomparison } from '../../../assets/Icons/comparison.svg';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IoIosArrowDown } from 'react-icons/io';

import './RegisterBox.css';

const countries = [{ id: 1, name: 'المملكة العربية السعودية', name_en: 'ksa' }];
const cites = [
	{ id: 1, name: ' الرياض', name_en: ' riyadh' },
	{ id: 2, name: ' مكة', name_en: ' mecca' },
];

const packages = [
	{ id: 1, name: 'التاجر (مجانية)', name_en: 'free_package' },
	{ id: 2, name: 'التاجر المحترف (مدفوع)', name_en: 'expert_package' },
	{ id: 3, name: 'العلامه التجارية(مدفوع)', name_en: 'brand_package' },
];

const subscriptionPeriod = [
	{ id: 1, name: 'شهري', name_en: 'monthly' },
	{ id: 2, name: 'سنوي', name_en: 'year' },
	
];

	// <MenuItem value={10}>1اختر مده الاشتراك</MenuItem>
	// 												<MenuItem value={20}>2اختر مده الاشتراك</MenuItem>
	// 												<MenuItem value={30}>3 اختر مده الاشتراك</MenuItem>


const RegisterBox = () => {
	let navigate = useNavigate();
	let parm = useParams();
	let [registerTarget, setRegisterTarget] = useState('merchant');

	useEffect(() => {
		if (parm.user === 'merchant' || parm.user === 'represented') {
			setRegisterTarget(parm.user);
		} else {
			navigate('*');
		}
	}, [parm.user]);

	let [city, setCity] = useState([]);
	let [packagesValues, setPackagesValues] = useState([]);
	let [country, setCountry] = useState([]);
	let [subscriptionPeriodValues, setSubscriptionPeriodValues] = useState([]);

	return (
		<>
			<div className='register-box' dir='ltr'>
				<div className={registerTarget === 'represented' ? 'all-content show' : 'all-content'} dir='rtl'>
					<div className='box-container-form' style={{ overflow: 'hidden' }}>
						<LogoHeader />
						<div className='all-register'>
							<div className={registerTarget === 'merchant' ? ' all all-1 show' : ' all all-1'}>
								<h2>أنشئ حسابك واستمتع بالتجارة الإلكترونية</h2>
								<div className='user-info'>
									<button className='bt-main'>تسجيل تاجر</button>
									<button
										className='bt-main'
										onClick={() => {
											// setRegisterTarget("represented");
											navigate('/register/represented');
										}}
									>
										تسجيل مندوب
									</button>
								</div>
								<div className='user-form'>
									<h4 className='title'>بيانات المتجر</h4>
									<div className='content'>
										<form action=''>
											<div>
												<h5>اسم المتجر</h5>
												<input type='text' placeholder='ادخل اسم المتجر' />
											</div>
											<div>
												<h5>الدومين</h5>
												<input type='email' placeholder='https:www.utlopha.sample.com' />
											</div>
											<div>
												<h5>البريد الإلكتروني</h5>
												<input type='email' placeholder='sapmle@gmail.com' />
											</div>

											<div>
												<h5>الدوله</h5>
												<Select
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
														if (country.length === 0) {
															return <>المملكة العربية السعودية</>;
														}
														const result = countries?.filter((item) => item?.name_en === selected);
														return result[0]?.name;
													}}
												>
													{countries.map((country) => (
														<MenuItem value={country.name_en} key={country.id}>
															{country.name}
														</MenuItem>
													))}
												</Select>
												{/**
                                                <input
                                                    type="text"
                                                    placeholder="المملكة العربية السعودية"
                                                />
                                             */}
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
														if (city.length === 0) {
															return <>الرياض</>;
														}
														const result = cites?.filter((item) => item?.name_en === selected);
														return result[0]?.name;
													}}
												>
													{cites.map((city) => (
														<MenuItem value={city.name_en} key={city.id}>
															{city.name}
														</MenuItem>
													))}
												</Select>
											</div>
											<div className='phone'>
												<h5>رقم الجوال</h5>
												<input type='tel' />
											</div>
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
															return <>أختر نوع الباقة</>;
														}
														const result = packages?.filter((item) => item?.name_en === selected);
														return result[0]?.name;
													}}
												>
													{packages.map((pack) => (
														<MenuItem value={pack.name_en} key={pack.id}>
															{pack.name}
														</MenuItem>
													))}
												</Select>
												<div
													className='box'
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
														<MenuItem value={period.name_en} key={period.id}>
															{period.name}
														</MenuItem>
													))}
												</Select>
											</div>
											<div>
												<h5>نشاط المتجر</h5>

												<CheckMarks />
											</div>
										</form>
									</div>
								</div>
								<div className='owner-form'>
									<form action=''>
										<h4>بيانات المالك</h4>
										<div className='name'>
											<h5>الاسم كامل</h5>
											<input type='text' />
											<span>
												<SvgUser />
											</span>
										</div>
										<div className='phone'>
											<h5>رقم الجوال</h5>
											<input type='tel' />
										</div>
										<div className='name'>
											<h5>اسم المستخدم</h5>
											<input type='text' />
											<span>
												<SvgUser />
											</span>
										</div>
										<div>
											<h5>البريد الإلكتروني</h5>
											<input type='email' placeholder='sapmle@gmail.com' />
										</div>

										<PasswordField />
									</form>
									<div className='box-pay'>
										<div className='top'>
											<div className='form-check'>
												<input className='form-check-input' type='checkbox' defaultValue='' id='flexCheckDefault' />
											</div>
											<h5>بتسجيلك فإنك توافق على سياسة الشروط والأحكام الخاصة بمنصة اطلبها</h5>
										</div>
										<button
											className='bt-main'
											onClick={() => {
												navigate('/verificationPage');
											}}
										>
											دفع
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
							<div className={registerTarget === 'represented' ? ' all all-2 show' : 'all all-2'}>
								<h2>أنشئ حسابك واستمتع بالتجارة الإلكترونية</h2>

								<div className='user-info'>
									<button className='bt-main'>تسجيل مندوب</button>
									<button
										className='bt-main'
										onClick={() => {
											// setRegisterTarget("merchant");
											navigate('/register/merchant');
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
												<input type='text' placeholder='ادخل اسم المتجر' />
											</div>

											<div>
												<h5>البريد الإلكتروني</h5>
												<input type='email' placeholder='sapmle@gmail.com' />
											</div>
											<div className='phone'>
												<h5>رقم الجوال</h5>
												<input type='tel' />
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
														if (city.length === 0) {
															return <>الرياض</>;
														}
														const result = cites?.filter((item) => item?.name_en === selected);
														return result[0]?.name;
													}}
												>
													{cites.map((city) => (
														<MenuItem value={city.name_en} key={city.id}>
															{city.name}
														</MenuItem>
													))}
												</Select>
											</div>
											<PasswordField />
										</form>
									</div>
								</div>
								<div className='owner-form'>
									<div className='box-pay'>
										<div className='top'>
											<div className='form-check'>
												<input className='form-check-input' type='checkbox' defaultValue='' id='flexCheckDefault' />
											</div>
											<h5>بتسجيلك فإنك توافق على سياسة الشروط والأحكام الخاصة بمنصة اطلبها</h5>
										</div>
										<button
											className='bt-main'
											onClick={() => {
												navigate('/verificationPage');
											}}
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
					</div>

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
		</>
	);
};

export default RegisterBox;
