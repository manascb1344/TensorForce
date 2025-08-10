import React, { useState, useEffect } from 'react';
import { close, logo, menu } from '../../assets/index.js';
import Button from './Button';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
		useAuth0();
	const [toggle, setToggle] = useState(false);
	// console.log(user);

	const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/dashboardv2');
    };

	const handleLogin = () => {
		loginWithRedirect();
	};

	const handleLogout = () => {
		logout({ returnTo: window.location.origin });
	};

	const renderProfileButton = () => {
		if (isLoading) {
			return null;
		}

        if (isAuthenticated) {
            return (
                <div className='relative ml-auto'>
					<img
						id='avatarButton'
						type='button'
						data-dropdown-toggle='userDropdown'
						data-dropdown-placement='bottom-start'
						className='w-10 h-10 rounded-full cursor-pointer'
						src={user.picture}
						referrerPolicy='no-referrer'
						alt='User dropdown'
						onClick={() => setToggle(!toggle)}
					/>

					{toggle && (
                        <div
                            id='userDropdown'
                            className='z-20 glass-card elevated divide-y divide-white/10 rounded-xl w-56 absolute top-16 right-0 mt-2 p-2'
                            onClick={e => e.stopPropagation()}
                        >
							<div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
								<div className='font-medium truncate'>{user.email}</div>
							</div>
                            <ul
                                className='py-2 text-sm text-white/80'
                                aria-labelledby='avatarButton'
                            >
								<li>
									<a
										href='#'
                                        className='block px-4 py-2 rounded-lg hover:bg-white/10'
										onClick={handleDashboardClick}
									>
										Dashboard
									</a>
								</li>
								<li>
									<a
										href='#'
                                        className='block px-4 py-2 rounded-lg hover:bg-white/10'
									>
										Settings
									</a>
								</li>
								<li>
									<a
										href='#'
                                        className='block px-4 py-2 rounded-lg hover:bg-white/10'
									>
										Earnings
									</a>
								</li>
							</ul>
							<div className='py-1'>
								<a
									href='#'
                                    className='block px-4 py-2 text-sm text-white/90 rounded-lg hover:bg-white/10'
									onClick={e => {
										e.preventDefault();
										handleLogout();
									}}
								>
									Sign out
								</a>
							</div>
						</div>
					)}
				</div>
			);
		} else {
            return <Button onClick={handleLogin} label='Login' className='ml-auto' variant='ghost' />;
		}
	};

	return (
        <nav className='w-full flex py-4 items-center navbar sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/10'>
			<img
				src={logo}
				alt='TensorForce'
                className='w-[124px] h-[32px] cursor-pointer'
				onClick={() => navigate('/')}
			/>

			<ul className='list-none sm:flex hidden items-center flex-1 ml-6'>
                <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/80 mr-8 hover:text-white'>
					<a href='/#home'>Home</a>
				</li>

                <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/80 mr-8 hover:text-white'>
					<a href='/#features'>Features</a>
				</li>
                <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/80 mr-8 hover:text-white'>
					<a href='/#product'>Product</a>
				</li>
                <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/80 mr-8 hover:text-white'>
					<a href='/#clients'>Clients</a>
				</li>
                <li className='font-poppins font-normal cursor-pointer text-[16px] mr-8 text-white/80 hover:text-white'>
					<a href='/contact'>Contact Us</a>
				</li>
				{isAuthenticated && (
                    <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/80 hover:text-white'>
						<a href='/dashboardv2'>Dashboard</a>
					</li>
				)}
			</ul>

			{renderProfileButton()}

            <div className='sm:hidden flex flex-1 justify-end items-center'>
				<img
					src={toggle ? close : menu}
					alt='menu'
                    className='w-[28px] h-[28px] object-contain cursor-pointer'
					onClick={() => setToggle(!toggle)}
				/>

				<div
					className={`${
						toggle ? 'flex' : 'hidden'
                    } p-6 glass-card elevated absolute top-16 right-2 mx-4 my-2 min-w-[180px] rounded-xl sidebar`}
				>
					<ul className='list-none flex flex-col justify-end items-center flex-1'>
                        <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/90 mb-4 hover:text-white'>
							<a href='/#home'>Home</a>
						</li>
                        <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/90 mb-4 hover:text-white'>
							<a href='/#features'>Features</a>
						</li>
                        <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/90 mb-4 hover:text-white'>
							<a href='/#product'>Product</a>
						</li>
                        <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/90 mb-4 hover:text-white'>
							<a href='/#clients'>Clients</a>
						</li>
                        <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/90 mb-2 hover:text-white'>
							<a href='/contact'>Contact Us</a>
						</li>
						{isAuthenticated && (
                            <li className='font-poppins font-normal cursor-pointer text-[16px] text-white/90 hover:text-white'>
								<a href='/dashboardv2'>Dashboard</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
