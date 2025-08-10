import React, { useMemo } from "react";

// Lightweight Gauge Chart Component
const GaugeChart = ({ percent = 0, nrOfLevels = 20, id = "gauge" }) => {
  const normalizedPercent = Math.min(Math.max(percent, 0), 1);
  const angle = normalizedPercent * 180; // Convert to degrees (0-180)
  
  const getColor = (percent) => {
    if (percent < 0.4) return '#ef4444'; // Red for negative
    if (percent < 0.6) return '#f59e0b'; // Yellow for neutral
    return '#10b981'; // Green for positive
  };

  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <svg className="w-48 h-24" viewBox="0 0 200 100">
        {/* Background arc */}
        <path
          d="M 20 80 A 60 60 0 0 1 180 80"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
          className="dark:stroke-gray-600"
        />
        
        {/* Foreground arc */}
        <path
          d="M 20 80 A 60 60 0 0 1 180 80"
          fill="none"
          stroke={getColor(normalizedPercent)}
          strokeWidth="8"
          strokeDasharray={`${(angle / 180) * 188} 188`}
          strokeLinecap="round"
          transform="rotate(180 100 80)"
        />
        
        {/* Center circle */}
        <circle
          cx="100"
          cy="80"
          r="4"
          fill={getColor(normalizedPercent)}
        />
        
        {/* Percentage text */}
        <text
          x="100"
          y="70"
          textAnchor="middle"
          className="text-lg font-semibold fill-gray-900 dark:fill-gray-100"
        >
          {Math.round(normalizedPercent * 100)}%
        </text>
      </svg>
    </div>
  );
};

const MarketSentiment = ({ averageSentiment }) => {
	const sentimentLabel = useMemo(() => {
		if (averageSentiment >= 0 && averageSentiment < 0.25) {
			return "Negative";
		} else if (averageSentiment >= 0.25 && averageSentiment < 0.4) {
			return "Slightly Negative";
		} else if (averageSentiment >= 0.4 && averageSentiment < 0.6) {
			return "Neutral";
		} else if (averageSentiment >= 0.6 && averageSentiment < 0.75) {
			return "Slightly Positive";
		} else if (averageSentiment >= 0.75 && averageSentiment <= 1) {
			return "Positive";
		}
	}, [averageSentiment]);

	return (
		<div className="flex flex-col bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
			<div className="self-start flex flex-grow">
				<p className="text-xl font-semibold mb-2">
					Market Sentiment
				</p>
			</div>
			{averageSentiment > 0 && (
				<div className="text-center mb-4">
					<p className="text-lg font-semibold">{sentimentLabel}</p>
				</div>
			)}
			<div className="flex-grow md:w-full overflow-auto">
				<GaugeChart
					id="gauge-chart2"
					nrOfLevels={20}
					percent={averageSentiment}
				/>
			</div>
		</div>
	);
};

export default MarketSentiment;
