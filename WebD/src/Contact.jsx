import React, { useState, useRef } from "react";
import styles from "./style";
import emailjs from "@emailjs/browser";
import { Navbar, Button, Footer } from "./components";

const Result = () => {
	return <p>Your message has been successfully sent.</p>;
};

const Contact = () => {
	const [result, showResult] = useState(false);
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm("service_2ple5xi", "template_v7tyw6i", form.current, "RRDZn2aOJpp7EsaMm").then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
		form.current.reset();
		showResult(true);
	};

	return (
		<form ref={form} onSubmit={sendEmail}>
			<div className="bg-primary w-full overflow-hidden">
				<div className={`${styles.paddingX} ${styles.flexCenter}`}>
					<div className={styles.boxWidth}>
						<Navbar />
					</div>
				</div>

				<div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
					<div className={styles.boxWidth}>
						<section
							className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
						>
							<div className="flex-1 flex flex-col">
								<form onSubmit={sendEmail} className="mt-8 mr-20 flex flex-col">
									<input
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Name"
										required
										className={`w-96 h-10 py-3 px-4 bg-white font-poppins font-medium text-[18px] text-black outline-none rounded-[10px] mb-4`}
									/>
									<input
										type="tel"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
										placeholder="Phone Number"
										required
										className={`w-96 h-10 py-3 px-4 bg-white font-poppins font-medium text-[18px] text-black outline-none rounded-[10px] mb-4`}
									/>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Email"
										required
										className={`w-96 h-10 py-3 px-4 bg-white font-poppins font-medium text-[18px] text-black outline-none rounded-[10px] mb-4`}
									/>
									<textarea
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Message"
										required
										className={`w-96 h-20 py-3 px-4 bg-white font-poppins font-medium text-[18px] text-black outline-none rounded-[10px] mb-4`}
									/>
									<div className="mt-10">
										<Button label="Submit" onClick={sendEmail} />
									</div>
								</form>
							</div>
							<div>
								<iframe
									src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=VJTI+(TensorForce)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
									width="600"
									height="450"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
								></iframe>
							</div>
						</section>
						<Footer />
					</div>
				</div>
				<div className="row">{result ? <Result /> : null}</div>
			</div>
		</form>
	);
};

export default Contact;
