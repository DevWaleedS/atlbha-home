import React, { useState } from 'react';
import './PasswordField.css';
import { ReactComponent as EyeOPen } from '../../assets/eye_open.svg';
import { ReactComponent as EyeClose } from '../../assets/eye_close.svg';
import { MdErrorOutline } from 'react-icons/md';

const PasswordField = ({ password, setPassword, passwordError, handleKeyDown, validPssWord, pssWordFocus, setPssWordFocus }) => {
	const [showPassword, setShowPassword] = useState(false);
	let type = 'password';
	return (
		<>
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
				style={{direction:'ltr', textAlign:'right'}}
					autoComplete='off'
					value={password}
					placeholder='********'
					maxLength={24}
					minLength={8}
					onChange={(e) => setPassword(e.target.value)}
					onKeyDown={handleKeyDown}
					type={!type === 'password' ? type : showPassword ? 'text' : type}
					aria-invalid={validPssWord ? 'false' : 'true'}
					aria-describedby='password'
					onFocus={() => setPssWordFocus(true)}
					onBlur={() => setPssWordFocus(true)}
				/>
				<p
					id='password'
					className={pssWordFocus && password && !validPssWord ? ' d-block wrong-text ' : 'd-none'}
					style={{ color: 'red', direction: 'rtl', background: '#ffffff5e', padding: '10px 10px 10px 20px', borderRadius: '8px' }}
				>
					<MdErrorOutline className='ms-1' />
					يجب ان تكون كلمة المرور من 8 الي 24 حرف
					<br />
					وتحتوي علي حروف كبيرة وصغيرة وأرقام و رموز.
					<br />
				</p>

				{passwordError && (
					<span className='wrong-text w-100 d-flex justify-content-start' style={{ color: 'red' }}>
						{passwordError}
					</span>
				)}
			</div>
		</>
	);
};

export default PasswordField;
