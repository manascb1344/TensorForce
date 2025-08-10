import React from 'react';
import styles from '../../style.js';
import { discount } from '../../assets/index.js';
import GetStarted from './GetStarted';
import Button from './Button';
import Lottie from 'lottie-react';
import animationData from '../../assets/zljP1VcNa6.json';

const Hero = () => {
    return (
        <section id='home' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
			<div
                className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
			>
                <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[12px] mb-4 glass-card elevated'>
					<img src={discount} alt='discount' className='w-[32px] h-[32px]' />
                    <p className={`${styles.paragraph} ml-2 text-white/90`}>
                        <span className='text-white'>20%</span> Discount For <span className='text-white'>1 Month</span> Account
					</p>
				</div>

				<div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='flex-1 font-poppins font-semibold ss:text-[64px] text-[42px] text-white/95 ss:leading-[92px] leading-[60px]'>
                        The Next <br className='sm:block hidden' /> <span className='text-gradient'>Generation</span>{' '}
					</h1>
					<div className='ss:flex hidden md:mr-4 mr-0'>
                        <GetStarted />
					</div>
				</div>

                <h1 className='font-poppins font-semibold ss:text-[56px] text-[36px] text-white/90 ss:leading-[84px] leading-[52px] w-full'>
                    Payment Method.
				</h1>
                <p className={`${styles.paragraph} max-w-[560px] mt-5 text-white/70`}>
                    Our team of experts uses a methodology to identify the credit cards most likely to fit your needs. We examine annual percentage rates, annual fees.
				</p>
			</div>

            <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
				<Lottie
					animationData={animationData}
					loop={true}
					autoplay={true}
					style={{ width: '100%', height: '100%' }}
				/>
                <div className='absolute -z-10 w-[40%] h-[40%] right-6 top-10 blue__gradient rounded-full' />
			</div>

			<div className={`ss:hidden ${styles.flexCenter}`}>
                <GetStarted />
			</div>
		</section>
	);
};

export default Hero;
