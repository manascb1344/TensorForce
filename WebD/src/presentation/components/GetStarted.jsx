import React from 'react';
import styles from '../../style.js';
import { arrowUp } from '../../assets/index.js';

const GetStarted = () => (
    <div className={`${styles.flexCenter} w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
		<div
			className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
		>
			<div className={`${styles.flexStart} flex-row`}>
                <p className='font-poppins font-medium text-[16px] sm:text-[18px] leading-[23px] mr-2'>
					<span className='text-gradient'>Get</span>
				</p>
				<img
					src={arrowUp}
					alt='arrow'
					className='w-[23px] h-[23px] object-contain'
				/>
			</div>

            <p className='font-poppins font-medium text-[16px] sm:text-[18px] leading-[23px]'>
				<span className='text-gradient'>Started</span>
			</p>
		</div>
	</div>
);

export default GetStarted;
