import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function ChartComponent({ country, indicator }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const indicatorData = country.ani
      ? country.ani.reduce((acc, curr) => {
          const foundIndicator = curr.indicatori.find(
            (indicator) => indicator.nume === indicator
          );
          if (indicator) {
            acc.push({ year: curr.an, value: indicator.valoare });
          }
          return acc;
        }, [])
      : [];

    setData({
      labels: indicatorData.map((data) => data.year),
      datasets: [
        {
          label: indicator,
          data: indicatorData.map((data) => data.value),
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(75,192,192,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(75,192,192,1)",
        },
      ],
    });
  }, [country, indicator]);

  return data ? <Line data={data} /> : <p>Loading...</p>;
}
