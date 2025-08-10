import React from 'react';
import Loading from './Loading.jsx';

/**
 * Loading component wrapper
 * Provides consistent loading state across the app
 */
const LoadingComponent = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-primary'>
			<Loading />
		</div>
	);
};

export default LoadingComponent;
