import React, { useState } from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

const ToggleButton = ({ value, selected, onChange, children, className = "" }) => (
  <button
    type="button"
    onClick={() => onChange(value)}
    className={`px-4 py-2 border rounded-l-md transition-colors ${
      selected === value
        ? "bg-blue-500 text-white border-blue-500"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    } ${className}`}
  >
    {children}
  </button>
);

const ToggleButtonGroup = ({ value, onChange, children }) => (
  <div className="flex">
    {React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          selected: value,
          onChange,
          className: index === 0 ? "rounded-l-md" : index === React.Children.count(children) - 1 ? "rounded-r-md border-l-0" : "border-l-0"
        });
      }
      return child;
    })}
  </div>
);

const QuickTrade = () => {
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const handleTrade = () => {
    // Trade logic here
    console.log(`${tradeType} ${quantity} shares at $${price}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Quick Trade
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trade Type
          </label>
          <ToggleButtonGroup value={tradeType} onChange={setTradeType}>
            <ToggleButton value="buy">
              <BsArrowUp className="inline mr-1" />
              Buy
            </ToggleButton>
            <ToggleButton value="sell">
              <BsArrowDown className="inline mr-1" />
              Sell
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price per Share
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            step="0.01"
            min="0"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total: ${(quantity * price).toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleTrade}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            tradeType === "buy"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {tradeType === "buy" ? "Buy" : "Sell"} Shares
        </button>
      </div>
    </div>
  );
};

export default QuickTrade;
