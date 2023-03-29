
import React, { useState } from "react";
import "./PasswordField.css";
import { ReactComponent as EyeOPen } from "../../assets/eye_open.svg";
import { ReactComponent as EyeClose } from "../../assets/eye_close.svg";


const PasswordField = ({password,setPassword,passwordError,handleKeyDown }) => {
    const [showPassword, setShowPassword] = useState(false);
    let type = "password";
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
							<input autoComplete='true' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} type={!type === 'password' ? type : showPassword ? 'text' : type} />
							{passwordError && (
								<span className='wrong-text w-100 d-flex justify-content-end' style={{ color: 'red' }}>
									{passwordError}
								</span>
							)}
						</div>
					</>
				);
};

export default PasswordField;
