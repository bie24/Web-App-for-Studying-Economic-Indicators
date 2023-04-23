import React from "react";
import { useState, useEffect } from "react";
import { app, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./indicators.module.css";
import Years from "../Years/Years";
import Countries from "../Countries/Countries";
// import date2 from "./date.json";
import date from "../../public/date.json";
import arrow from "../../icons/arrow.svg";
import Image from "next/image";
import icon1ind from "../../icons/icon1ind.png";
import icon2ind from "../../icons/icon2ind.png";
import icon3ind from "../../icons/icon3ind.png";
import icon4ind from "../../icons/icon4ind.png";
import icon5ind from "../../icons/icon5ind.png";

function getArrowDirectionAndDiff(indicators, indicatorName, year) {
  const indicator = indicators.find(
    (indicator) => indicator.nume === indicatorName
  );
  const indicatorAnPrecedent = country.ani
    .find((y) => y.an === year - 1)
    ?.indicatori.find((indicator) => indicator.nume === indicatorName);

  if (indicator !== undefined && indicatorAnPrecedent !== undefined) {
    const arrowDirection =
      indicator.valoare > indicatorAnPrecedent.valoare ? "up" : "down";
    const diff = (indicator.valoare - indicatorAnPrecedent.valoare).toFixed(1);

    return { arrowDirection, diff };
  }

  return undefined;
}

export default function Indicators({ country, year, onClose }) {
  const [indicators, setIndicators] = useState([]);

  // useEffect(() => {
  //   const selectedYear = country.ani.find((y) => y.an === year);
  //   setIndicators(selectedYear.indicatori);
  //   // setShowCountriesAndYears(false);
  // }, [country, year]);
  useEffect(() => {
    const selectedYear = country.ani.find((y) => y.an === year);
    if (selectedYear) {
      setIndicators(selectedYear.indicatori);
    }
  }, [country, year]);

  function getArrowDirection(valoareAnPrecedentIndicator, valoareIndicator) {
    let arrowDirection = "";
    if (
      valoareAnPrecedentIndicator !== undefined &&
      valoareIndicator?.valoare !== valoareAnPrecedentIndicator.valoare
    ) {
      arrowDirection =
        valoareIndicator?.valoare > valoareAnPrecedentIndicator.valoare
          ? "up"
          : "down";
    }
    return arrowDirection;
  }
  function getIndicatorData(indicators, country, year, indicatorName) {
    const indicator = indicators.find(
      (indicator) => indicator.nume === indicatorName
    );
    const indicatorAnPrecedent = country.ani
      .find((y) => y.an === year - 1)
      ?.indicatori.find((indicator) => indicator.nume === indicatorName);

    const dif = indicatorAnPrecedent
      ? (indicator?.valoare - indicatorAnPrecedent.valoare).toFixed(1)
      : undefined;

    const arrowDirection = getArrowDirection(indicatorAnPrecedent, indicator);

    const absDif = indicatorAnPrecedent
      ? Math.abs(indicator?.valoare - indicatorAnPrecedent.valoare).toFixed(1)
      : undefined;

    return {
      indicator,
      dif,
      arrowDirection,
      absDif,
    };
  }
  const inflatieData = getIndicatorData(indicators, country, year, "Inflatie");
  const pibData = getIndicatorData(indicators, country, year, "PIB");
  const rataSomajData = getIndicatorData(
    indicators,
    country,
    year,
    "Rata somaj"
  );
  const cursValutarData = getIndicatorData(
    indicators,
    country,
    year,
    "Curs valutar"
  );
  const indicatorData = getIndicatorData(
    indicators,
    country,
    year,
    "Indicator"
  );
  return (
    <div className={styles.allData}>
      <div className={styles.title}>
        <h2>{country.nume} </h2>
        <h2 className={styles.dot}>⚪</h2>
        <h2>{year}</h2>
      </div>

      {/* INFLATIE */}
      <div className={styles.displayInd}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>Inflatie</h3>
          <button className={styles.dots}>...</button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value}>
            {inflatieData.indicator?.valoare || "N/A"}
          </p>
          <Image src={icon1ind} className={styles.icon1ind} />{" "}
        </div>

        <p className={styles.valueDif}>
          {inflatieData.arrowDirection !== "" && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 20 20"
              style={{
                transform:
                  inflatieData.arrowDirection === "up" ? "" : "rotate(180deg)",
                display: "inline-block",
                marginRight: "5px",
                fill: "rgba(255, 255, 255, 0.637)",
              }}
            >
              <polygon points="10,0 20,20 0,20" />
            </svg>
          )}
          {inflatieData.absDif}% fata de anul anterior
        </p>
      </div>

      {/* PIB */}
      <div className={styles.displayInd2}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>PIB</h3>
          <button className={styles.dots}>...</button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value}>{pibData.indicator?.valoare || "N/A"}</p>
          <Image src={icon2ind} className={styles.icon1ind} />{" "}
        </div>

        <p className={styles.valueDif}>
          {pibData.arrowDirection !== "" && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 20 20"
              style={{
                transform:
                  pibData.arrowDirection === "up" ? "" : "rotate(180deg)",
                display: "inline-block",
                marginRight: "5px",
                fill: "rgba(255, 255, 255, 0.637)",
              }}
            >
              <polygon points="10,0 20,20 0,20" />
            </svg>
          )}
          {pibData.absDif}% fata de anul anterior
        </p>
      </div>

      {/* RATA SOMAJ */}
      <div className={styles.displayInd3}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>Rata somaj</h3>
          <button className={styles.dots}>...</button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value}>
            {rataSomajData.indicator?.valoare || "N/A"}
          </p>
          <Image src={icon3ind} className={styles.icon1ind} />{" "}
        </div>

        <p className={styles.valueDif}>
          {rataSomajData.arrowDirection !== "" && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 20 20"
              style={{
                transform:
                  rataSomajData.arrowDirection === "up" ? "" : "rotate(180deg)",
                display: "inline-block",
                marginRight: "5px",
                fill: "rgba(255, 255, 255, 0.637)",
              }}
            >
              <polygon points="10,0 20,20 0,20" />
            </svg>
          )}
          {rataSomajData.absDif}% fata de anul anterior
        </p>
      </div>
      {/* CURS VALUTAR */}
      <div className={styles.displayInd4}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>Curs valutar</h3>
          <button className={styles.dots}>...</button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value}>
            {cursValutarData.indicator?.valoare || "N/A"}
          </p>
          <Image src={icon4ind} className={styles.icon1ind} />
        </div>

        <p className={styles.valueDif}>
          {cursValutarData.arrowDirection !== "" && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 20 20"
              style={{
                transform:
                  cursValutarData.arrowDirection === "up"
                    ? ""
                    : "rotate(180deg)",
                display: "inline-block",
                marginRight: "5px",
                fill: "rgba(255, 255, 255, 0.637)",
              }}
            >
              <polygon points="10,0 20,20 0,20" />
            </svg>
          )}
          {cursValutarData.absDif}% fata de anul anterior
        </p>
      </div>
      {/* indicator */}
      <div className={styles.displayInd5}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>Indicator</h3>
          <button className={styles.dots}>...</button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value}>
            {indicatorData.indicator?.valoare || "N/A"}
          </p>
          <Image src={icon5ind} className={styles.icon1ind} />{" "}
        </div>

        <p className={styles.valueDif}>
          {indicatorData.arrowDirection !== "" && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 20 20"
              style={{
                transform:
                  indicatorData.arrowDirection === "up" ? "" : "rotate(180deg)",
                display: "inline-block",
                marginRight: "5px",
                fill: "rgba(255, 255, 255, 0.637)",
              }}
            >
              <polygon points="10,0 20,20 0,20" />
            </svg>
          )}
          {indicatorData.absDif}% fata de anul anterior
        </p>
      </div>
      <div className={styles.displayInd6}></div>
      <div className={styles.displayInd7}></div>
      <div className={styles.displayInd8}></div>
      <div className={styles.displayInd9}></div>
      <div className={styles.displayInd10}></div>
      <div className={styles.displayInd11}></div>
      <div className={styles.displayInd12}></div>
    </div>
  );
}
//   return (
//     <div>
//       {selectedYear && (
//         <div className={styles.indicators}>
//           {selectedYear.indicatori.map((indicator) => (
//             <div key={indicator.nume}>
//               <h4>{indicator.nume}</h4>
//               <p>{indicator.valoare}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
