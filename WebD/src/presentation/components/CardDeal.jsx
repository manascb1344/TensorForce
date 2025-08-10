import styles, { layout } from '../../style.js';
import Lottie from 'lottie-react';
import animationData from '../../assets/Cb7PYb6sBk.json';
import Button from './Button';

const CardDeal = () => (
    <section className={layout.section}>
        <div className={layout.sectionInfo}>
			<h2 className={styles.heading2}>
				Find a better card deal <br className='sm:block hidden' /> in few easy
				steps.
			</h2>
			<p className={`${styles.paragraph} max-w-[470px] mt-5`}>
				Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
				aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
			</p>
            <div className='mt-8'>
                <Button label='Get Started' variant='primary' size='md' />
            </div>
		</div>

        <div className={layout.sectionImg}>
			<Lottie
				animationData={animationData}
				loop={true}
				autoplay={true}
				style={{ width: '100%', height: '100%' }}
			/>
			{/* gradient start */}
			<div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient' />
			<div className='absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40' />
			<div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient' />
			{/* gradient end */}
		</div>
	</section>
);

export default CardDeal;
