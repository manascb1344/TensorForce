import React, { useEffect, useState } from "react";
import { useStockContext } from "../../../../providers/StockContextProvider";
import Overview from "./Overview";
import Details from "./Details";
import Chart from "./Chart";
import Header from "./Header";
import { fetchStockDetails, fetchQuote } from "../utils/api/stock-api";
import "./a.css";

/**
 * Dashboard component for stock financials
 * Displays stock charts, overview, and details
 */
const Dashboard = () => {
	const { stockSymbol } = useStockContext();

	const [stockDetails, setStockDetails] = useState({});
	const [quote, setQuote] = useState({});
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		const updateStockDetails = async () => {
			try {
				const result = await fetchStockDetails(stockSymbol);
				setStockDetails(result);
			} catch (error) {
				setStockDetails({});
				console.log(error);
			}
		};

		const updateStockOverview = async () => {
			try {
				const result = await fetchQuote(stockSymbol);
				setQuote(result);
			} catch (error) {
				setQuote({});
				console.log(error);
			}
		};

		updateStockDetails();
		updateStockOverview();
	}, [stockSymbol]);

	return (
		<div className="container pt-5 md:pt-10 pl-5 md:pl-10 font-quicksand dark:bg-main-dark-bg text-gray-300 mb-10">
			<div className="Chart mx-4">
				<Chart />
			</div>
			<div className="Header">
				<Header stockDetails={stockDetails} />
			</div>
			<div className="Overview mb-5">
				<Overview
					symbol={stockSymbol}
					price={quote.pc}
					change={quote.d}
					changePercent={quote.dp}
					currency={stockDetails.currency}
				/>
			</div>
			<div className="Details">
				<Details details={stockDetails} />
			</div>
		</div>
	);
};

export default Dashboard;
