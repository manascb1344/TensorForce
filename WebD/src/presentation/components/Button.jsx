import React from 'react';

const Button = ({ label, styles, className, onClick }) => {
	return (
		<button
			type='button'
			className={`py-3 px-4 bg-black-gradient font-poppins font-medium text-[18px] text-dimWhite outline-none rounded-[10px] ${styles || ''} ${className || ''}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;
