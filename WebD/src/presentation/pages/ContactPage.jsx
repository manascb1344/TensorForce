import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../../style.js';
import emailjs from '@emailjs/browser';
import { Navbar, Button, Footer } from '../components/index.js';

const Result = () => {
	return <p>Your message has been successfully sent.</p>;
};

const Contact = () => {
	const [result, showResult] = useState(false);
	const form = useRef();

	const showToast = () => {
		toast.success('Sent Email Successfully');
	};

	const sendEmail = async e => {
		e.preventDefault();

		const formData = new FormData(form.current);
		const name = formData.get('user_name');
		const email = formData.get('user_email');
		const message = formData.get('message');

		try {
			await emailjs.sendForm(
				'service_2ple5xi',
				'template_v7tyw6i',
				form.current,
				'RRDZn2aOJpp7EsaMm'
			);
			showResult(true);
			showToast();
			setTimeout(() => {
				showResult(false);
			}, 5000);
		} catch (error) {
			console.log(error.text);
		}
	};

	return (
		<form ref={form} onSubmit={sendEmail}>
			<div className='bg-primary w-full overflow-hidden'>
				<div className={`${styles.paddingX} ${styles.flexCenter}`}>
					<div className={styles.boxWidth}>
						<Navbar />
					</div>
				</div>

				<div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
					<div className={styles.boxWidth}>
                        <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col glass-card elevated rounded-2xl`}>
                            <div className='flex-1 flex flex-col w-full'>
                                <div className='mt-6 sm:mr-12 flex flex-col w-full'>
                                    <input
                                        name='fullName'
                                        type='text'
                                        placeholder='Name'
                                        required
                                        className='w-full max-w-md h-12 py-3 px-4 bg-white/5 border border-white/10 text-white placeholder-white/60 font-poppins text-[16px] outline-none rounded-xl mb-4'
                                    />
                                    <input
                                        name='email'
                                        type='email'
                                        placeholder='Email'
                                        required
                                        className='w-full max-w-md h-12 py-3 px-4 bg-white/5 border border-white/10 text-white placeholder-white/60 font-poppins text-[16px] outline-none rounded-xl mb-4'
                                    />
                                    <textarea
                                        name='message'
                                        placeholder='Message'
                                        required
                                        className='w-full max-w-md h-28 py-3 px-4 bg-white/5 border border-white/10 text-white placeholder-white/60 font-poppins text-[16px] outline-none rounded-xl mb-4'
                                    />
                                    <div className='mt-6'>
                                        <Button label='Submit' variant='primary' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex-1 mt-8 sm:mt-0'>
                                <div className='rounded-xl overflow-hidden border border-white/10'>
                                    <iframe
                                        src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Veermata%20Jijabai%20Technological%20Institute%20VJT+(Veermata%20Jijabai%20Technological%20Institute%20VJTI)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                                        width='100%'
                                        height='450'
                                        style={{ border: 0 }}
                                        allowFullScreen=''
                                        loading='lazy'
                                    ></iframe>
                                </div>
                            </div>
                        </section>
						<Footer />
					</div>
				</div>
				<div className='row'>
					<ToastContainer />
					{result ? <Result /> : null}
				</div>
			</div>
		</form>
	);
};

export default Contact;
