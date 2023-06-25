import React, { Fragment } from 'react';
import ReactDom from 'react-dom';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './CircleModal.css';

const BackDrop = () => {
	return <div className='backdrop'></div>;
};

export const CircleLoading = ({ closeModal, countdown }) => {
	return (
		<Fragment>
			<BackDrop closeModal={closeModal} />
			<div className='circle-modal_body'>
				<div className='circle-wrap'>
					<CircularProgressbar startValue={0} value={countdown} text={countdown} strokeWidth={3} />

					<div className='second'>ثانية</div>
				</div>
			</div>
		</Fragment>
	);
};

const CircleModal = ({ show, closeModal, countdown }) => {
	return show && <Fragment>{ReactDom.createPortal(<CircleLoading closeModal={closeModal} countdown={countdown} />, document.getElementById('circle-modal'))}</Fragment>;
};

export default CircleModal;
