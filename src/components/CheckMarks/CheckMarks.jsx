import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './CheckMarks.css';
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';

let CheckMarks = ({ activityName, setActivityName }) => {
	// TO STORE THE ACTIVITIES DATA FROM API
	const [activities, setActivities] = useState([]);

	const [openSubcategory, setOpenSubcategory] = useState(false);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setActivityName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	// to call activities api
	useEffect(() => {
		axios
			.get('https://backend.atlbha.com/api/selector/activities')
			.then((response) => {
				setActivities(response?.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Select
				
				sx={{
					height: '3.5rem',
					border: '1px solid rgba(167, 167, 167, 0.5)',
					'& .MuiOutlinedInput-notchedOutline': {
						border: 'none',
					},
					'& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
						{
							paddingRight: 0,
							whiteSpace: 'normal',
						},
				}}
				IconComponent={IoIosArrowDown}
				multiple
				displayEmpty
				className='check-mark'
				value={activityName}
				onChange={handleChange}
				input={<OutlinedInput />}
				renderValue={(selected) => {
					if (activityName.length === 0) {
						return (
							<span
								style={{
									marginRight: ' -30px',
									color: '#67747b',
								}}
							>
								اختر نوع النشاط
							</span>
						);
					}

					return selected.map((item) => {
						const result = activities?.data?.activities?.filter((sub) => sub?.id === parseInt(item));
						return `${result[0]?.name} , `;
					});
				}}
				onClick={(e) => {
					setOpenSubcategory(true);
				}}
				open={openSubcategory}
			>
				{activities?.data?.activities?.map((activity) => (
					<MenuItem key={activity?.id} className='check-mark-liData' value={activity?.id}>
						<Checkbox checked={activityName.indexOf(activity?.id) > -1} />
						<ListItemText primary={activity?.name} />
					</MenuItem>
				))}
				<MenuItem className='check-mark-button'>
					<button
						className='check-mark-button'
						onClick={(e) => {
							e.stopPropagation();
							setOpenSubcategory(!openSubcategory);
						}}
					>
						اختر
					</button>
				</MenuItem>
			</Select>
		</>
	);
};
export default CheckMarks;
