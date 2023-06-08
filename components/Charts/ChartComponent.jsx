import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { toJpeg } from "dom-to-image-more";

import { Line } from "react-chartjs-2";
import styles from "./chartComponent.module.css";

export default function ChartComponent({ country, indicator, data }) {
  if (!data || data.length === 0) {
    return <div>No data available for the selected indicator.</div>;
  }

  const years = data.map((year) => year.an);
  const valori = data.map(
    (year) => year.indicatori.find((i) => i.nume === indicator)?.valoare
  );

  const chartData = {
    labels: years,
    datasets: [
      {
        label: `${country} - ${indicator}`,
        data: valori,
        backgroundColor: "#ff4c30",
        borderColor: "#ff4c30",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: `${indicator.toUpperCase()}`,
        font: {
          size: 20,
          weight: "bold",
        },
        color: "white",
        padding: {
          bottom: 30,
          top: 10,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    layout: {
      padding: {
        right: 1, // Ajustați acest număr pentru a stabili spațiul din dreapta al graficului
        top: 20, // Adăugați spațiul dorit între titlu și grafic (valoarea poate fi ajustată)
        // bottom: 10,
      },
    },
  };
  const chartRef = useRef(null);
  const exportChartAsJpg = () => {
    console.log("Exporting chart as JPG");
    const chartElement = chartRef.current?.chartInstance?.canvas;
    console.log(chartElement);
    if (chartElement) {
      toJpeg(chartElement, { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement("a");
          link.download = "chart.jpg";
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          console.error("Error exporting chart as JPG:", error);
        });
    }
  };

  return (
    <div className={styles.table}>
      <Line
        ref={chartRef}
        data={chartData}
        options={chartOptions}
        height={250}
        width={500}
        className={styles.ChartComponent}
      />
      {/* <button onClick={exportChartAsJpg}>Export as JPG</button> */}
    </div>
  );
}
