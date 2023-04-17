import React from "react";
import { useState, useEffect } from "react";
import { app, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./indicatorsBar.module.css";
import Years from "../Years/Years";
import Indicators from "../Indicators/Indicators";
// import date2 from "./date.json";
import date from "../../public/date.json";
import ChartComponent from "../Charts/ChartComponent";

export default function IndicatorsBar({ country }) {
  const [indicators, setIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  useEffect(() => {
    const { ani } = country;
    if (ani.length > 0) {
      setIndicators(ani[0].indicatori); // setam indicatorii primului an
    }
  }, [country]);

  const handleIndicatorClick = (indicator) => {
    setSelectedIndicator(indicator);
  };

  return (
    <div>
      {" "}
      <div className={styles.title}>
        <h2>{country.nume} </h2>
      </div>
      {indicators.length > 0 && (
        <div className={styles.display}>
          {indicators.map((indicator) => (
            <div key={indicator.nume}>
              <h3
                key={indicator.nume}
                onClick={() => handleIndicatorClick(indicator)}
                className={styles.hover}
              >
                {indicator.nume}
              </h3>
            </div>
          ))}
        </div>
      )}
      {selectedIndicator && (
        <div>
          <ChartComponent
            country={country.nume}
            //    year={year.an}
            indicator={selectedIndicator.nume}
            value={selectedIndicator.valoare}
          />
        </div>
      )}
    </div>
  );
}
