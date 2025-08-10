import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

// Lightweight Table Component
const DataTable = ({ data, columns, className = "" }) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
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
    <div className={`${className}`}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div className="overflow-x-auto">
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
      
      {sortedData.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No data found
        </div>
      )}
    </div>
  );
};

const SentimentPage = () => {
  const { user } = useAuth();
  const [sentimentData, setSentimentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading sentiment data
    const loadSentimentData = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const mockData = [
          {
            symbol: 'AAPL',
            sentiment: 'Bullish',
            confidence: 85,
            price: 150.25,
            change: 2.5,
            volume: 45000000
          },
          {
            symbol: 'GOOGL',
            sentiment: 'Neutral',
            confidence: 65,
            price: 2750.80,
            change: -1.2,
            volume: 28000000
          },
          {
            symbol: 'MSFT',
            sentiment: 'Bullish',
            confidence: 78,
            price: 320.45,
            change: 3.1,
            volume: 35000000
          },
          {
            symbol: 'TSLA',
            sentiment: 'Bearish',
            confidence: 72,
            price: 850.30,
            change: -5.8,
            volume: 52000000
          },
          {
            symbol: 'AMZN',
            sentiment: 'Bullish',
            confidence: 81,
            price: 145.60,
            change: 1.9,
            volume: 38000000
          }
        ];
        
        setSentimentData(mockData);
      } catch (error) {
        console.error('Error loading sentiment data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSentimentData();
  }, []);

  const columns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'sentiment', label: 'Sentiment', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Bullish' ? 'bg-green-100 text-green-800' :
        value === 'Bearish' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'confidence', label: 'Confidence', render: (value) => `${value}%` },
    { key: 'price', label: 'Price', render: (value) => `$${value.toFixed(2)}` },
    { key: 'change', label: 'Change', render: (value) => (
      <span className={value >= 0 ? 'text-green-600' : 'text-red-600'}>
        {value >= 0 ? '+' : ''}{value.toFixed(2)}%
      </span>
    )},
    { key: 'volume', label: 'Volume', render: (value) => value.toLocaleString() }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading sentiment data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Market Sentiment Analysis
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <DataTable
          data={sentimentData}
          columns={columns}
          className="p-6"
        />
      </div>
    </div>
  );
};

export default SentimentPage;
