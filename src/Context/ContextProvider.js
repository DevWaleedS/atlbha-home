import React, { useState } from 'react';

import AppContext from './AppContext';

const ContextProvider = (props) => {
	const [email, setEmail] = useState(null);
	const [resetPasswordToken, setResetPasswordToken] = useState(null);
	const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
	const [disapledBtn, setDisabledBtn] = useState(false);

	const context = {
		email,
		setEmail,
		resetPasswordToken,
		setResetPasswordToken,
		resendButtonDisabled,
		setResendButtonDisabled,
		disapledBtn,
		setDisabledBtn,
	};
	// console.log(context?.email);

	return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export default ContextProvider;
