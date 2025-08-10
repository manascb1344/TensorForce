import styles from '../../style.js';
import Lottie from 'lottie-react';
import animationData from '../../assets/business-team.json';

const CTA = () => (
	<section
		className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} bg-black-gradient-2 rounded-[20px] box-shadow`}
	>
		<div className='flex-1 flex flex-col'>
			<h2 className={styles.heading2}>Let's try our service now!</h2>
			<p className={`${styles.paragraph} max-w-[470px] mt-5`}>
				Everything you need to accept card payments and grow your business
				anywhere on the planet.
			</p>
		</div>

		<div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
			<Lottie
				animationData={animationData}
				loop={true}
				autoplay={true}
				style={{ width: '200px', height: '200px' }}
			/>
		</div>
	</section>
);

export default CTA;
