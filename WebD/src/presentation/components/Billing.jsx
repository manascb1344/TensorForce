import { apple, google } from '../../assets/index.js';
import styles, { layout } from '../../style.js';
import Button from './Button';
import Lottie from 'lottie-react';
import animationData from '../../assets/Analysis Digital Marketing.json';

const Billing = () => (
	<section id='product' className={layout.sectionReverse}>
        <div className={layout.sectionImgReverse}>
			<Lottie
				animationData={animationData}
				loop={true}
				autoplay={true}
				style={{ width: '100%', height: '100%' }}
			/>
            {/* subtle glow start */}
            <div className='absolute z-[0] -left-1/3 top-10 w-[40%] h-[40%] rounded-full white__gradient' />
            {/* subtle glow end */}
		</div>

		<div className={layout.sectionInfo}>
			<h2 className={styles.heading2}>
				Easily control your <br className='sm:block hidden' /> billing &
				invoicing.
			</h2>
			<p className={`${styles.paragraph} max-w-[470px] mt-5`}>
				Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio aenean
				neque. Fusce ipsum orci rhoncus aliporttitor integer platea placerat.
			</p>

			<div className='flex flex-row sm:mt-10 mt-6'>
				<img
					src={apple}
					alt='google_play'
					className='w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer'
				/>
				<img
					src={google}
					alt='google_play'
					className='w-[144.17px] h-[43.08px] object-contain cursor-pointer'
				/>
			</div>
		</div>
	</section>
);

export default Billing;
