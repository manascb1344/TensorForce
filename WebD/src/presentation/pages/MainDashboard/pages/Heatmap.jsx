import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { AlpacaApiService } from '../../../../infrastructure/api/AlpacaApiService';

// Lightweight Calendar Heatmap Component
const CalendarHeatmap = ({ data = [], startDate, endDate, className = '' }) => {
	if (!data || data.length === 0) {
		return (
			<div
				className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ${className}`}
			>
				<div className='flex items-center justify-center h-64 text-gray-500 dark:text-gray-400'>
					No data available
				</div>
			</div>
		);
	}

	const getColorClass = value => {
		if (!value || value.count === 0) return 'bg-gray-100 dark:bg-gray-700';

		const count = Math.abs(value.count);
		if (value.count < 0) {
			// Red shades for negative values
			if (count < 10) return 'bg-red-100 dark:bg-red-900';
			if (count < 20) return 'bg-red-200 dark:bg-red-800';
			if (count < 30) return 'bg-red-300 dark:bg-red-700';
			return 'bg-red-400 dark:bg-red-600';
		} else {
			// Green shades for positive values
			if (count < 10) return 'bg-green-100 dark:bg-green-900';
			if (count < 20) return 'bg-green-200 dark:bg-green-800';
			if (count < 30) return 'bg-green-300 dark:bg-green-700';
			return 'bg-green-400 dark:bg-green-600';
		}
	};

	const formatDate = dateString => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	};

	return (
		<div
			className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ${className}`}
		>
			<div className='grid grid-cols-7 gap-1'>
				{/* Day labels */}
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
					<div
						key={day}
						className='text-xs text-gray-500 dark:text-gray-400 text-center py-2'
					>
						{day}
					</div>
				))}

				{/* Calendar cells */}
				{data.map((item, index) => (
					<div
						key={index}
						className={`w-8 h-8 rounded-sm border border-gray-200 dark:border-gray-600 ${getColorClass(item)} hover:scale-110 transition-transform cursor-pointer`}
						title={`${formatDate(item.date)}: ${item.count || 0}`}
					/>
				))}
			</div>

			{/* Legend */}
			<div className='mt-4 flex items-center justify-center space-x-4 text-xs'>
				<div className='flex items-center space-x-1'>
					<div className='w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded-sm'></div>
					<span className='text-gray-500 dark:text-gray-400'>No data</span>
				</div>
				<div className='flex items-center space-x-1'>
					<div className='w-3 h-3 bg-green-100 dark:bg-green-900 rounded-sm'></div>
					<span className='text-gray-500 dark:text-gray-400'>Profit</span>
				</div>
				<div className='flex items-center space-x-1'>
					<div className='w-3 h-3 bg-red-100 dark:bg-red-900 rounded-sm'></div>
					<span className='text-gray-500 dark:text-gray-400'>Loss</span>
				</div>
			</div>
		</div>
	);
};

const Heatmap = () => {
	const { user } = useAuth();
	const [data, setData] = useState({
		timestamp: [],
		profit_loss: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const apiService = new AlpacaApiService();

	const fetchAlpacaData = async () => {
		try {
			setLoading(true);
			// Mock data for now - replace with actual API call
			const mockData = {
				timestamp: [
					Date.now() / 1000 - 86400 * 30, // 30 days ago
					Date.now() / 1000 - 86400 * 29,
					Date.now() / 1000 - 86400 * 28,
					// ... add more mock timestamps
				],
				profit_loss: [10, -5, 15, 8, -12, 20, 5, -8, 12, 18],
			};

			setData(mockData);
		} catch (error) {
			console.error('Error fetching data from Alpaca API:', error.message);
			setError('Failed to load heatmap data');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAlpacaData();
	}, []);

	const heatmapData = data.timestamp.map((ts, i) => {
		const date = new Date(ts * 1000);
		return {
			date: date.toISOString().split('T')[0],
			count: data.profit_loss[i] === null ? 0 : data.profit_loss[i],
		};
	});

	if (loading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-gray-500 dark:text-gray-400'>
					Loading heatmap data...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-red-500'>{error}</div>
			</div>
		);
	}

	return (
		<div className='p-6 space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
					Portfolio Heatmap
				</h1>
				<div className='text-sm text-gray-500 dark:text-gray-400'>
					Last 30 days
				</div>
			</div>

			<CalendarHeatmap
				data={heatmapData}
				startDate={new Date(data.timestamp[0] * 1000)}
				endDate={new Date(data.timestamp[data.timestamp.length - 1] * 1000)}
			/>
		</div>
	);
};

export default Heatmap;
