import React, { useState } from 'react';

import AppContext from './AppContext';

const ContextProvider = (props) => {
	const [email, setEmail] = useState(null);
	const [resetPasswordToken, setResetPasswordToken] = useState(null);

	const context = {
		email,
		setEmail,
		resetPasswordToken,
		setResetPasswordToken,
	};
	// console.log(context?.email);

	return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export default ContextProvider;
