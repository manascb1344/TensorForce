// import React, { useState, useEffect } from 'react';
// import AreaChart from './AreaChart';
// const AreaData = () => {
//   const [state, setState] = useState({
//     options: {
//       chart: {
//         id: "basic-bar"
//       },
//       xaxis: {
//         categories: [] // Update categories based on fetched data
//       }
//     },
//     series: [
//       {
//         name: "series-1",
//         data: [] // Update data based on fetched data
//       }
//     ]
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           'APCA-API-KEY-ID': 'PKP4BR5ZGYD610TTQQ6N',
//           'APCA-API-SECRET-KEY': 'v7JCfKUW2Hzr4yT60LsPUVMp9xNQBryebzeeS32u'
//         }
//       };

//       try {
//         const response = await fetch('https://paper-api.alpaca.markets/v2/account/portfolio/history?intraday_reporting=market_hours&pnl_reset=per_day', options);
//         const data = await response.json();

//         // Process the data to fit your chart structure
//         const categories = data.timestamp.map(timestamp => new Date(timestamp).toLocaleTimeString());
//         const seriesData = data.equity;

//         setState({
//           options: {
//             chart: {
//               id: "basic-bar"
//             },
//             xaxis: {
//               categories: categories
//             }
//           },
//           series: [
//             {
//               name: "series-1",
//               data: seriesData
//             }
//           ]
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures useEffect runs only once on component mount

//   const [val, setVal] = useVal({
//     options: {
//       chart: {
//         id: "basic-bar"
//       },
//       xaxis: {
//         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//       }
//     },
//     series: [
//       {
//         name: "series-1",
//         data: [30, 40, 45, 50, 49, 60, 70, 91]
//       }
//     ]
//   });
//   return (
//     <div>
//       <AreaChart options={state.options} series={state.series} />
//     </div>
//   );
// };

// export default AreaData;
