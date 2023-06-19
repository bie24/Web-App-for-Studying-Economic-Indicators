import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { app, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./table.module.css";
import Years from "../Years/Years";
import Countries from "../Countries/Countries";
// import date2 from "./date.json";
import date from "../../public/date.json";
import Image from "next/image";
import Download from "../../icons/download.png";

export default function Table({ country }) {
  const exportBtn = useRef(null);

  const handleExport = useCallback(() => {
    const table = document.getElementById("myTable");

    // Creaza un fisier CSV cu continutul tabelului
    let csv = [];
    let rows = table.querySelectorAll("tr");

    for (let i = 0; i < rows.length; i++) {
      let cols = rows[i].querySelectorAll("td, th");
      let row = [];
      for (let j = 0; j < cols.length; j++) {
        row.push(decodeURIComponent(cols[j].textContent));
      }
      csv.push(row.join(","));
    }

    // Descarca fisierul
    let csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(csvFile);
    link.download = `${decodeURIComponent(country.nume)}.csv`;
    link.click();
  }, []);

  useEffect(() => {
    const button = exportBtn.current;
    if (button) {
      button.addEventListener("click", handleExport);
      return () => {
        button.removeEventListener("click", handleExport);
      };
    }
  }, [handleExport]);

  return (
    <div className={styles.display}>
      <h2 className={styles.title}>{country.nume}</h2>
      <div className={styles.exportData}>
        <button ref={exportBtn} className={styles.export}>
          <Image src={Download} className={styles.downloadIcon} />{" "}
        </button>

        <button className={styles.export}>Export</button>
      </div>
      <div className={styles.container}>
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          className={styles.table}
          id="myTable"
        >
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>An</th>
              {country.ani[0].indicatori.map((indicator, index) => (
                <th key={index} className={styles.th}>
                  {indicator.nume}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {country.ani.map((an, index) => (
              <tr key={index}>
                <td className={styles.td}>{an.an}</td>
                {an.indicatori.map((indicator, index) => (
                  <td key={index} className={styles.td}>
                    {indicator.valoare}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
