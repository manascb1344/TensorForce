import React from "react";
import Dashboard from "./components/Dashboard";
import { useStockContext } from "../../../../providers/StockContextProvider.jsx";

/**
 * Company Financials component
 * Wrapper for stock dashboard functionality
 */
function CompanyFinancials() {
	return <Dashboard />;
}

export default CompanyFinancials;
