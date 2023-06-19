import React from "react";
import { useState, useEffect } from "react";
import { app, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./indicatorsBar.module.css";
import Years from "../Years/Years";
import Indicators from "../Indicators/Indicators";
import date from "../../public/date.json";
import ChartComponent from "../Charts/ChartComponent";

export default function IndicatorsBar({ country }) {
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const indicators = country.ani.length > 0 ? country.ani[0].indicatori : [];

  const handleCheckboxChange = (event) => {
    const target = event.target;
    const indicatorName = target.name;

    if (target.checked) {
      setSelectedIndicator(indicatorName);
    }
  };

  const handleIndicatorClick = (indicator) => {
    setSelectedIndicator(indicator);
  };

  useEffect(() => {
    if (selectedIndicator === null && indicators.length > 0) {
      setSelectedIndicator(indicators[0].nume);
    }
  }, [indicators, selectedIndicator]);

  return (
    <div>
      <div className={styles.title}>
        <h2>{country.nume}</h2>
      </div>
      {indicators.length > 0 && (
        <div className={styles.display}>
          {indicators.map((indicator) => (
            <div key={indicator.nume}>
              <input
                type="checkbox"
                name={indicator.nume}
                id={indicator.nume}
                onChange={handleCheckboxChange}
                checked={selectedIndicator === indicator.nume}
                className={styles["checkbox-input"]}
              />
              <label
                htmlFor={indicator.nume}
                className={styles["checkbox-label"]}
              >
                <h3
                  className={styles.hover}
                  onClick={() => handleIndicatorClick(indicator.nume)}
                >
                  {indicator.nume}
                </h3>
              </label>
            </div>
          ))}
        </div>
      )}
      {selectedIndicator && (
        <div className={styles.divIndicator}>
          <ChartComponent
            key={selectedIndicator}
            country={country.nume}
            indicator={selectedIndicator}
            data={country.ani.map((item) => ({
              an: item.an,
              indicatori: item.indicatori,
            }))}
          />
        </div>
      )}
    </div>
  );
}
