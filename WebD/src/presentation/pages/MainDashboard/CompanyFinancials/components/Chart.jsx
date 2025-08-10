import React, { useEffect, useRef, memo } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { useAppContext } from '../../../../providers/AppContextProvider';
import { useStockContext } from '../../../../providers/StockContextProvider';
import { useTheme } from '../../../../hooks/useTheme';

const Chart = () => {
	const { activeMenu } = useAppContext();
	const { stockSymbol } = useStockContext();
	const { theme } = useTheme();

	return (
		<div className='w-full h-full'>
			<TradingViewWidget
				symbol={stockSymbol || 'AAPL'}
				theme={theme.isDarkMode() ? Themes.DARK : Themes.LIGHT}
				locale='en'
				height={750}
				width='100%'
				autosize={true}
				interval='D'
				timezone='Etc/UTC'
				style='1'
				enable_publishing={false}
				allow_symbol_change={true}
				hide_top_toolbar={false}
				hide_legend={false}
				save_image={false}
				backgroundColor='transparent'
				gridColor='rgba(240, 243, 250, 0)'
				width_trading='100%'
				height_trading='100%'
			/>
		</div>
	);
};

export default memo(Chart);
