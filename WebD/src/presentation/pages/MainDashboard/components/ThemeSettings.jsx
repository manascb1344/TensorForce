import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import Tippy from '@tippyjs/react';

import { themeColors } from '../data/dummy';
import { useTheme } from '../../../hooks/useTheme';

const ThemeSettings = () => {
	const { theme, setMode, setColor, toggleSettings } = useTheme();

	return (
		<div className='bg-half-transparent w-screen fixed nav-item top-0 right-0'>
			<div className='float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-400'>
				<div className='flex justify-between items-center p-4 ml-4'>
					<p className='font-semibold text-lg'>Settings</p>
					<button
						type='button'
						onClick={toggleSettings}
						style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
						className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'
					>
						<MdOutlineCancel />
					</button>
				</div>
				<div className='flex-col border-t-1 border-color p-4 ml-4'>
					<p className='font-semibold text-xl '>Theme Option</p>

					<div className='mt-4'>
						<input
							type='radio'
							id='light'
							name='theme'
							value='Light'
							className='cursor-pointer'
							onChange={e => setMode(e.target.value)}
							checked={theme.mode === 'Light'}
						/>
						<label htmlFor='light' className='ml-2 text-md cursor-pointer'>
							Light
						</label>
					</div>
					<div className='mt-2'>
						<input
							type='radio'
							id='dark'
							name='theme'
							value='Dark'
							onChange={e => setMode(e.target.value)}
							className='cursor-pointer'
							checked={theme.mode === 'Dark'}
						/>
						<label htmlFor='dark' className='ml-2 text-md cursor-pointer'>
							Dark
						</label>
					</div>
				</div>
				<div className='p-4 border-t-1 border-color ml-4'>
					<p className='font-semibold text-xl '>Theme Colors</p>
					<div className='flex gap-3'>
						{themeColors.map((item, index) => (
							<Tippy key={index} content={item.name} placement='top'>
								<div
									className='relative mt-2 cursor-pointer flex gap-5 items-center'
									key={item.name}
								>
									<button
										type='button'
										className='h-10 w-10 rounded-full cursor-pointer'
										style={{ backgroundColor: item.color }}
										onClick={() => setColor(item.color)}
									>
										<BsCheck
											className={`ml-2 text-2xl text-white ${
												item.color === theme.color ? 'block' : 'hidden'
											}`}
										/>
									</button>
								</div>
							</Tippy>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThemeSettings;
