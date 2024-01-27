import React, { useEffect, useRef } from "react";
import CalHeatMap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { Tooltip, TooltipComponent } from "@syncfusion/ej2-react-popups";
Tooltip;

const ColorMapping = () => {
  const calContainer = useRef(null);
  const calLegend = useRef(null);

  useEffect(() => {
    if (calContainer.current && calLegend.current) {
      const cal = new CalHeatMap();
      const data = {
        1704243600: 10,
        1704330000: 20,
        1704416400: 30,
        1704502800: 40,
      };
      cal.paint(
        {
          data: data,
          date: { start: new Date(2024, 0) },
          range: 1,
          scale: { color: { type: "linear", scheme: "PRGn", domain: [0, 40] } },
          domain: { type: "year", label: { text: null } },
          subDomain: { type: "day", radius: 2 },
          itemSelector: calContainer.current,
        }
        // [
        //   [
        //     Tooltip,
        //     {
        //       text: function (date, value, dayjsDate) {
        //         return (
        //           (value ? value + "°C" : "No data") +
        //           " on " +
        //           dayjsDate.format("LL")
        //         );
        //       },
        //     },
        //   ],
        // ]
      );
    }
  }, []);

  return (
    <div>
      <div ref={calContainer} className="margin-bottom--md"></div>
      <a
        className="button button--sm button--secondary margin-top--sm"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          cal.previous();
        }}
      >
        ← Previous
      </a>
      <a
        className="button button--sm button--secondary margin-top--sm margin-left--xs"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          cal.next();
        }}
      >
        Next →
      </a>
      <div ref={calLegend} style={{ float: "right" }}></div>
    </div>
  );
};

export default ColorMapping;
