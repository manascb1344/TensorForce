import styles from "../../style.js";
import Lottie from "lottie-react";
import animationData from "../../assets/Cb7PYb6sBk.json";

const CardDeal = () => (
	<section className={styles.section}>
		<div className={styles.sectionInfo}>
			<h2 className={styles.heading2}>
				Find a better card deal <br className="sm:block hidden" /> in few easy
				steps.
			</h2>
			<p className={`${styles.paragraph} max-w-[470px] mt-5`}>
				Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
				aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
			</p>

			<button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
				Get Started
			</button>
		</div>

		<div className={styles.sectionImg}>
			<Lottie
				animationData={animationData}
				loop={true}
				autoplay={true}
				style={{ width: "100%", height: "100%" }}
			/>
			{/* gradient start */}
			<div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
			<div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
			<div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
			{/* gradient end */}
		</div>
	</section>
);

export default CardDeal;
