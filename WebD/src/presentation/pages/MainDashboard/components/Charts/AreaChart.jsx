import React from "react";

const AreaChart = ({ data = [], title = "Chart", color = "#3B82F6" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox={`0 0 ${data.length * 40} 200`}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent, i) => (
            <line
              key={i}
              x1="0"
              y1={200 - (percent * 2)}
              x2={data.length * 40}
              y2={200 - (percent * 2)}
              stroke="#E5E7EB"
              strokeWidth="1"
              className="dark:stroke-gray-600"
            />
          ))}
          
          {/* Area path */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <path
            d={data.map((point, i) => {
              const x = i * 40;
              const y = 200 - ((point.value - minValue) / range) * 180;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="url(#areaGradient)"
            stroke={color}
            strokeWidth="2"
          />
          
          {/* Data points */}
          {data.map((point, i) => {
            const x = i * 40;
            const y = 200 - ((point.value - minValue) / range) * 180;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={color}
                className="hover:r-4 transition-all"
              />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          {data.map((point, i) => (
            <span key={i} className="text-center">
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
