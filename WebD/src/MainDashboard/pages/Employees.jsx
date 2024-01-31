import React, { useEffect, useState } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Toolbar,
  Page,
} from "@syncfusion/ej2-react-grids";

import { Header } from "../components";

const Employees = () => {
  const [data, setData] = useState({ gainers: [], losers: [] });
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: false, allowEditing: false };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "APCA-API-KEY-ID": "PKXQ63AJJLRUQHYJKLIS",
        "APCA-API-SECRET-KEY": "uWrne0JlFVcXEn8Be8qpl5dVtg9e06H8bhdXDs8J",
      },
    };

    fetch(
      "https://data.alpaca.markets/v1beta1/screener/stocks/movers?top=10",
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Stocks" />
      <h2>Gainers</h2>
      <GridComponent
        dataSource={data.gainers}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field="symbol" headerText="Symbol" />
          <ColumnDirective field="price" headerText="Price" />
          <ColumnDirective field="change" headerText="Change" />
          <ColumnDirective field="percent_change" headerText="Percent Change" />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
      <h2>Losers</h2>
      <GridComponent
        dataSource={data.losers}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field="symbol" headerText="Symbol" />
          <ColumnDirective field="price" headerText="Price" />
          <ColumnDirective field="change" headerText="Change" />
          <ColumnDirective field="percent_change" headerText="Percent Change" />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
