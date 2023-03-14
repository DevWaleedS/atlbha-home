import { CircularProgress } from '@mui/material';
import React from 'react';
import './LoadingBox.css';
const LoadingBox = () => {
	return (
		<div className='loading-box'>
			<h3> جاري تحميل البيانات</h3> <CircularProgress />
		</div>
	);
};

export default LoadingBox;
