import { quotes } from '../../assets/index.js';

const FeedbackCard = ({ content, name, title, img }) => (
    <div className='flex justify-between flex-col px-8 py-10 rounded-2xl max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card glass-card elevated'>
		<img
			src={quotes}
			alt='double_quotes'
			className='w-[42px] h-[27px] object-contain'
		/>
        <p className='font-poppins font-normal text-[18px] leading-[30px] text-white/90 my-8'>
			{content}
		</p>

		<div className='flex flex-row'>
			<img src={img} alt={name} className='w-[48px] h-[48px] rounded-full' />
			<div className='flex flex-col ml-4'>
                <h4 className='font-poppins font-semibold text-[18px] leading-[28px] text-white'>
					{name}
				</h4>
                <p className='font-poppins font-normal text-[14px] leading-[22px] text-white/60'>
					{title}
				</p>
			</div>
		</div>
	</div>
);

export default FeedbackCard;
