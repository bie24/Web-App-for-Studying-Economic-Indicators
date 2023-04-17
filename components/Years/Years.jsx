import React from "react";
import styles from "./years.module.css";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { app, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import yearsData from "../../public/date.json";
import Indicators from "../Indicators/Indicators";

export default function Years({ country, onYearClick }) {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    onYearClick(year);
  };

  useEffect(() => {
    const { ani } = country; // extract the ani property
    setYears(ani);
  }, [country]);

  return (
    <div>
      <div className={styles.display}>
        {country.ani.map((year) => (
          <h3
            key={year.an}
            onClick={() => handleYearClick(year.an)}
            className={styles.hover}
          >
            {year.an}
          </h3>
        ))}
      </div>
      {selectedYear && <Indicators country={country} year={selectedYear} />}
    </div>
  );
}
