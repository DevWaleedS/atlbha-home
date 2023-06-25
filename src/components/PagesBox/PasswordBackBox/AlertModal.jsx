import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import './AlertModal.css';

const BackDrop = () => {
	return <div className='backdrop'></div>;
};

export const AlertModalContent = () => {
	return (
		<Fragment>
			<BackDrop />
			<div className='alert-modal_body'>
				<div className='alert-message'>
					<div className='alert-message'>تم إرسال الكود إلى البريد الإلكتروني</div>

					<div className='progress-bar'></div>
				</div>
			</div>
		</Fragment>
	);
};

const AlertModal = ({ show }) => {
	return show && <Fragment>{ReactDom.createPortal(<AlertModalContent />, document.getElementById('alert-modal'))}</Fragment>;
};

export default AlertModal;
