import React from 'react';
import styles from '../../style.js';
import {
	Navbar,
	Hero,
	Stats,
	Business,
	Billing,
	CardDeal,
	Testimonials,
	Clients,
	CTA,
	Footer,
} from '../components/index.js';

/**
 * Landing page component
 * Main marketing page with all sections
 */
const LandingPage = () => {
	return (
		<div className='bg-primary w-full overflow-hidden'>
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Navbar />
				</div>
			</div>

			<div className={`bg-primary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Hero />
				</div>
			</div>

			<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Stats />
					<Business />
					<Billing />
					<CardDeal />
					<Testimonials />
					<Clients />
					<CTA />
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
