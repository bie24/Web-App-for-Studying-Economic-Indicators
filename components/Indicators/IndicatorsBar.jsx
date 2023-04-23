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
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const indicators = country.ani.length > 0 ? country.ani[0].indicatori : [];

  const handleCheckboxChange = (event) => {
    const target = event.target;
    const indicatorName = target.name;

    if (target.checked) {
      setSelectedIndicators([...selectedIndicators, indicatorName]);
    } else {
      setSelectedIndicators(
        selectedIndicators.filter((indicator) => indicator !== indicatorName)
      );
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <h2>{country.nume} </h2>
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
                checked={selectedIndicators.includes(indicator.nume)}
                className={styles["checkbox-input"]}
              />
              <label
                htmlFor={indicator.nume}
                className={styles["checkbox-label"]}
              >
                <h3 className={styles.hover}>{indicator.nume}</h3>
              </label>
            </div>
          ))}
        </div>
      )}
      {selectedIndicators.length > 0 && (
        <div className={styles.divIndicator}>
          {selectedIndicators.map((indicatorName) => {
            const selectedIndicator = indicators.find(
              (indicator) => indicator.nume === indicatorName
            );
            return (
              <ChartComponent
                key={selectedIndicator.nume}
                country={country.nume}
                indicator={selectedIndicator.nume}
                value={selectedIndicator.valoare}
              />
            );
          })}
        </div>
      )}
    </div>
  );

  // const [indicators, setIndicators] = useState([]);
  // const [selectedIndicators, setSelectedIndicators] = useState(null);

  // useEffect(() => {
  //   const { ani } = country;
  //   if (ani.length > 0) {
  //     setIndicators(ani[0].indicatori); // setam indicatorii primului an
  //   }
  // }, [country]);

  // // const handleIndicatorClick = (indicator) => {
  // //   setSelectedIndicator(indicator);
  // // };
  // const handleCheckboxChange = (event) => {
  //   const target = event.target;
  //   const indicatorName = target.name;

  //   if (target.checked) {
  //     setSelectedIndicators([...selectedIndicators, indicatorName]);
  //   } else {
  //     setSelectedIndicators(selectedIndicators.filter((indicator) => indicator !== indicatorName));
  //   }
  // };

  // return (
  //   <div>
  //     {" "}
  //     <div className={styles.title}>
  //       <h2>{country.nume} </h2>
  //     </div>
  //     {indicators.length > 0 && (
  //       <div className={styles.display}>
  //         {indicators.map((indicator) => (
  //           <div key={indicator.nume}>
  //             <input
  //               type="radio"
  //               name="dark"
  //               id="dark"
  //               value="dark"
  //               onChange={onChange}
  //               checked={true}
  //             />
  //             <h3
  //               key={indicator.nume}
  //               onClick={() => handleIndicatorClick(indicator)}
  //               className={styles.hover}
  //             >
  //               {indicator.nume}
  //             </h3>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //     {selectedIndicator && (
  //       <div>
  //         <ChartComponent
  //           country={country.nume}
  //           //    year={year.an}
  //           indicator={selectedIndicator.nume}
  //           value={selectedIndicator.valoare}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
}
