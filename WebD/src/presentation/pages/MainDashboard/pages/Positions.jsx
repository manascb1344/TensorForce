import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { AlpacaApiService } from "../../../../infrastructure/api/AlpacaApiService";

// Lightweight Table Component
const DataTable = ({ data, columns, className = "" }) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  {sortField === column.key && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Lightweight Chart Component
const SimpleChart = ({ data, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="w-20 text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </span>
            <div className="flex-1 mx-2">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
            <span className="w-16 text-sm text-gray-900 dark:text-gray-200 text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Positions = () => {
  const { user } = useAuth();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiService = new AlpacaApiService();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const data = await apiService.getPositions();
        setPositions(data || []);
      } catch (err) {
        console.error('Error fetching positions:', err);
        setError('Failed to load positions');
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const columns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'qty', label: 'Quantity' },
    { key: 'market_value', label: 'Market Value', render: (value) => `$${parseFloat(value).toFixed(2)}` },
    { key: 'unrealized_pl', label: 'Unrealized P&L', render: (value) => (
      <span className={parseFloat(value) >= 0 ? 'text-green-600' : 'text-red-600'}>
        ${parseFloat(value).toFixed(2)}
      </span>
    )},
    { key: 'unrealized_plpc', label: 'P&L %', render: (value) => (
      <span className={parseFloat(value) >= 0 ? 'text-green-600' : 'text-red-600'}>
        {parseFloat(value).toFixed(2)}%
      </span>
    )},
  ];

  const chartData = positions.slice(0, 5).map(pos => ({
    label: pos.symbol,
    value: Math.abs(parseFloat(pos.market_value))
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading positions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Positions
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total Positions: {positions.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            data={positions}
            columns={columns}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <SimpleChart
            data={chartData}
            title="Top Positions by Value"
          />
        </div>
      </div>
    </div>
  );
};

export default Positions;
