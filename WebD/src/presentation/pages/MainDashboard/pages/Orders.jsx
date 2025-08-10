import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { AlpacaApiService } from '../../../../infrastructure/api/AlpacaApiService';

// Lightweight Table Component
const DataTable = ({ data, columns, className = '' }) => {
	const [sortField, setSortField] = useState(null);
	const [sortDirection, setSortDirection] = useState('asc');
	const [searchTerm, setSearchTerm] = useState('');

	const handleSort = field => {
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
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Search orders...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
				/>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
					<thead className='bg-gray-50 dark:bg-gray-700'>
						<tr>
							{columns.map(column => (
								<th
									key={column.key}
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600'
									onClick={() => handleSort(column.key)}
								>
									<div className='flex items-center'>
										{column.label}
										{sortField === column.key && (
											<span className='ml-1'>
												{sortDirection === 'asc' ? '↑' : '↓'}
											</span>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
						{sortedData.map((row, index) => (
							<tr
								key={index}
								className='hover:bg-gray-50 dark:hover:bg-gray-700'
							>
								{columns.map(column => (
									<td
										key={column.key}
										className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'
									>
										{column.render
											? column.render(row[column.key], row)
											: row[column.key]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{sortedData.length === 0 && (
				<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
					No orders found
				</div>
			)}
		</div>
	);
};

const Orders = () => {
	const { user } = useAuth();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const apiService = new AlpacaApiService();

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const data = await apiService.getOrders();
				setOrders(data || []);
			} catch (err) {
				console.error('Error fetching orders:', err);
				setError('Failed to load orders');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	const getStatusColor = status => {
		switch (status.toLowerCase()) {
			case 'filled':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'cancelled':
				return 'bg-red-100 text-red-800';
			case 'rejected':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const getSideColor = side => {
		return side.toLowerCase() === 'buy' ? 'text-green-600' : 'text-red-600';
	};

	const columns = [
		{ key: 'symbol', label: 'Symbol' },
		{
			key: 'side',
			label: 'Side',
			render: value => (
				<span className={`font-medium ${getSideColor(value)}`}>
					{value.toUpperCase()}
				</span>
			),
		},
		{ key: 'qty', label: 'Quantity' },
		{ key: 'type', label: 'Type' },
		{
			key: 'status',
			label: 'Status',
			render: value => (
				<span
					className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}
				>
					{value}
				</span>
			),
		},
		{
			key: 'filled_at',
			label: 'Filled At',
			render: value => (value ? new Date(value).toLocaleString() : 'N/A'),
		},
		{
			key: 'filled_avg_price',
			label: 'Avg Price',
			render: value => (value ? `$${parseFloat(value).toFixed(2)}` : 'N/A'),
		},
	];

	if (loading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-gray-500 dark:text-gray-400'>
					Loading orders...
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
					Orders
				</h1>
				<div className='text-sm text-gray-500 dark:text-gray-400'>
					Total Orders: {orders.length}
				</div>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
				<DataTable data={orders} columns={columns} className='p-6' />
			</div>
		</div>
	);
};

export default Orders;
