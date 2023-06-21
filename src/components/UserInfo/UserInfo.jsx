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

import { FiLogOut } from 'react-icons/fi';
import { TbLayoutDashboard } from 'react-icons/tb';

function UserInfo() {
	const [cookies, setCookies, removeCookies] = useCookies(['access_token']);

	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [userInfoData, setUserInfoData] = React.useState([]);

	React.useEffect(() => {
		(async function () {
			const response = await axios.get('https://backend.atlbha.com/api/profile', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.access_token}`,
				},
			});
			setUserInfoData(response.data);
		})();
	}, []);

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
		removeCookies('access_token', { domain: 'atlbha.com', path: '/' });
		window.location.reload();
	};

	return (
		<div className='user-info-menu'>
			<Box>
				<Tooltip title='الإعدادات'>
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar alt={userInfoData?.data?.users?.name} src={userInfoData?.data?.users?.image} />
					</IconButton>
				</Tooltip>
				<Menu
					sx={{
						mt: '45px',
						'& .MuiList-root': {
							width: '200px',
						},
					}}
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
					<MenuItem
						textAlign='right'
						onClick={handleCloseUserMenu}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							height: '80px',
							cursor: 'default',

							'&:hover': {
								backgroundColor: 'transparent',
							},
						}}
					>
						<Typography textAlign='right' sx={{ fontSize: '18px', width: '100%' }}>
							{userInfoData?.data?.users?.name}
						</Typography>
						<Typography
							t
							extAlign='right'
							sx={{
								color: 'rgba(0, 0, 0, 0.46)',
								borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
								paddingBottom: '8px',
								width: '100%',
							}}
						>
							{userInfoData?.data?.users?.email}
						</Typography>
					</MenuItem>
					<MenuItem
						onClick={openDashboard}
						sx={{
							minHeight: '40px',
						}}
					>
						<Typography textAlign='right' sx={{ width: '24px' }}>
							<TbLayoutDashboard />
						</Typography>
						<Typography textAlign='right' sx={{ width: '100%' }}>
							لوحة التحكم
						</Typography>
					</MenuItem>
					<MenuItem
						onClick={logOut}
						sx={{
							minHeight: '40px',
						}}
					>
						<Typography textAlign='right' sx={{ width: '24px' }}>
							<FiLogOut />
						</Typography>
						<Typography textAlign='right' sx={{ width: '100%' }}>
							تسجيل خروج
						</Typography>
					</MenuItem>
				</Menu>
			</Box>
		</div>
	);
}
export default UserInfo;
