import React from 'react';
import GaugeChart from 'react-gauge-chart';

const MeterChart = () => {
  return (
    <div>

      <GaugeChart
        id="gauge-chart3"
        nrOfLevels={30}
        colors={["#FF5F6D", "#FFC371"]}
        arcWidth={0.3}
        percent={0.37}
      />
    </div>
  );
};

export default MeterChart;
