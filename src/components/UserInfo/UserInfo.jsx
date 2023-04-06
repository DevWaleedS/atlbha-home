import * as React from 'react';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './UserInfo.css';

function UserInfo() {
	const [cookies, setCookies, removeCookies] = useCookies(['access_token']);

	const [anchorElUser, setAnchorElUser] = React.useState(null);
	// const [userInfoData, setUserInfoData] = React.useState([]);
	// console.log(userInfoData);

	// React.useEffect(() => {
	// 	(async function () {
	// 		const response = await axios.get('https://backend.atlbha.com/api/loginapi', {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		});
	// 		setUserInfoData(response.data);
	// 	})();
	// }, []);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const openDashboard = () => {
		setAnchorElUser(null);
		window.location.href = 'http://store.atlbha.com';
	};

	const logOut = () => {
		setAnchorElUser(null);
		removeCookies('access_token', { path: '/' });
	};

	return (
		<div className='user-info-menu'>
			<Box>
				<Tooltip title='الإعدادات'>
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: '45px' }}
					id='menu-appbar'
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					<MenuItem onClick={handleCloseUserMenu}>
						<Typography textAlign='center'>اسم المستخدم</Typography>
					</MenuItem>
					<MenuItem onClick={openDashboard}>
						<Typography textAlign='center'>لوحة التحكم</Typography>
					</MenuItem>
					<MenuItem onClick={logOut}>
						<Typography textAlign='center'>تسجيل خروج</Typography>
					</MenuItem>
				</Menu>
			</Box>
		</div>
	);
}
export default UserInfo;
