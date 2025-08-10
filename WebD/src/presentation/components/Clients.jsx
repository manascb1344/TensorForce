import { clients } from '../../shared/constants/appConstants.js';
import styles from '../../style.js';

const Clients = () => (
  <section className={`${styles.flexCenter} my-8`}>
    <div className={`${styles.flexCenter} flex-wrap w-full gap-6`}>
      {clients.map(client => (
        <div
          key={client.id}
          className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px] opacity-70 hover:opacity-100 transition`}
        >
          <img src={client.logo} alt='client' className='sm:w-[160px] w-[110px] object-contain' />
        </div>
      ))}
    </div>
  </section>
);

export default Clients;
