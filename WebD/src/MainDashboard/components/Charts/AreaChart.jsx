import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const AreaChart = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
        zoom: false,  // Disable zooming
        pan: false,   // Disable panning
        reset: false, // Disable reset button
        menu: false,  // Disable menu
      },
      xaxis: {
        categories: [] 
      }
    },
    series: [
      {
        name: "Price",
        data: [] 
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      const apiOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'APCA-API-KEY-ID': 'PKI1EBX5LM1D0WUN7WU5',
          'APCA-API-SECRET-KEY': 'CxSsspL84jDujfTUxxGNhWibaexutf18Uf513ABM'
        }
      };

      try {
        const response = await fetch('https://paper-api.alpaca.markets/v2/account/portfolio/history?intraday_reporting=market_hours&pnl_reset=per_day', apiOptions);
        const data = await response.json();

        const categories = data.timestamp.map(timestamp => new Date(timestamp).toLocaleTimeString());
        const seriesData = data.equity;

        setState({
          options: {
            chart: {
              id: "basic-bar",
              zoom: false,  // Disable zooming
              pan: false,   // Disable panning
              reset: false, // Disable reset button
              menu: false,  // Disable menu
            },
            xaxis: {
              categories: categories
            }
          },
          series: [
            {
              name: "Price",
              data: seriesData
            }
          ]
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); 

  return (
    <div type>
      <Chart options={state.options} series={state.series} type="line" height={400} width={700} />
    </div>
  );
};

export default AreaChart;
