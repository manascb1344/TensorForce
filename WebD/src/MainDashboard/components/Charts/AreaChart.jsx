import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const YourComponent = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [] // Initialize with an empty array
      }
    },
    series: [
      {
        name: "series-1",
        data: [] // Initialize with an empty array
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      const apiOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'APCA-API-KEY-ID': 'PKP4BR5ZGYD610TTQQ6N',
          'APCA-API-SECRET-KEY': 'v7JCfKUW2Hzr4yT60LsPUVMp9xNQBryebzeeS32u'
        }
      };

      try {
        const response = await fetch('https://paper-api.alpaca.markets/v2/account/portfolio/history?intraday_reporting=market_hours&pnl_reset=per_day', apiOptions);
        const data = await response.json();

        // Process the data to fit your chart structure
        const categories = data.timestamp.map(timestamp => new Date(timestamp).toLocaleTimeString());
        const seriesData = data.equity;

        setState({
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: categories
            }
          },
          series: [
            {
              name: "series-1",
              data: seriesData
            }
          ]
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <Chart options={state.options} series={state.series} type="area" height={350} width={500} />
    </div>
  );
};

export default YourComponent;
