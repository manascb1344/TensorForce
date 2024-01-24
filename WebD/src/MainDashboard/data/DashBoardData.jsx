import React, { useState, useEffect } from 'react';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';

const DashBoardData = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch('https://paper-api.alpaca.markets/v2/account', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'APCA-API-KEY-ID': 'PKP4BR5ZGYD610TTQQ6N',
            'APCA-API-SECRET-KEY': 'v7JCfKUW2Hzr4yT60LsPUVMp9xNQBryebzeeS32u',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch account data');
        }

        const accountData = await response.json();
        setApiData(accountData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccountData();
  }, []);

  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: apiData ? apiData.id : '',
      title: 'User ID',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: apiData ? apiData.buying_power : '',
      title: 'Buying Power',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FiBarChart />,
      amount: apiData ? apiData.cash : '',
      title: 'Cash',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
      pcColor: 'green-600',
    },
    {
      icon: <HiOutlineRefresh />,
      amount: '39,354', // Replace with the actual property from the API for daily change
      title: 'Daily Change',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
  ];

  return (
    <>
        {earningData.map((item) => (
               <div
                 key={item.title}
                 className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
               >
                 <button
                   type="button"
                   style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                   className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                 >
                   {item.icon}
                 </button>
                 <p className="mt-3">
                   <span className="text-lg font-semibold">{item.amount}</span>
                   <span className={`text-sm text-${item.pcColor} ml-2`}>
                     {item.percentage}
                   </span>
                 </p>
                 <p className="text-sm text-gray-400  mt-1">{item.title}</p>
               </div>
             ))}
    </>
  );
};

export default DashBoardData;
