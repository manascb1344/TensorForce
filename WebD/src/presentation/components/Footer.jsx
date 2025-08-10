import styles from '../../style.js';
import { logo } from '../../assets/index.js';
import {
	footerLinks,
	socialMedia,
} from '../../shared/constants/appConstants.js';

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className='flex-1 flex flex-col justify-start mr-10'>
        <img src={logo} alt='TensorForce' className='w-[220px] h-auto object-contain' />
      </div>

      <div className='flex-[1.5] w-full flex flex-row justify-end flex-wrap md:mt-0 mt-10'>
        {footerLinks.map((footerLink, index) => (
          <div key={`${footerLink.key}_${index}`} className='flex flex-col ss:my-0 my-4 min-w-[150px]'>
            <h4 className='font-poppins font-medium text-[16px] leading-[26px] text-white/90'>
              {footerLink.title}
            </h4>
            <ul className='list-none mt-4'>
              {footerLink.links.map((link, index) => (
                <li
                  key={`${index}_${link.name}`}
                  className={`font-poppins font-normal text-[15px] leading-[24px] text-white/60 hover:text-white cursor-pointer ${
                    index !== footerLink.links.length - 1 ? 'mb-3' : 'mb-0'
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t border-white/10'>
      <p className='font-poppins font-normal text-center text-[14px] leading-[22px] text-white/60'>
        2025 TensorForce. All Rights Reserved
      </p>

      <div className='flex flex-row md:mt-0 mt-6'>
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[20px] h-[20px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? 'mr-5' : 'mr-0'}`}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
