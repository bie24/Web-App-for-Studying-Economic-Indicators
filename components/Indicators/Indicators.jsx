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
import iconHelp from "../../public/help.png";

export default function Indicators({ country, year, onClose }) {
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const selectedYear = country.ani.find((y) => y.an === year);
    if (selectedYear) {
      setIndicators(selectedYear.indicatori);
    }
  }, [country, year]);
  const [helpOpen, setHelpOpen] = useState({});
  function toggleHelp(indicatorName) {
    setIndicators((prevIndicators) => {
      return prevIndicators.map((indicator) => {
        if (indicator.nume === indicatorName) {
          return { ...indicator, isHelpOpen: !indicator.isHelpOpen };
        }
        return indicator;
      });
    });
  }

  function getArrowDirection(valoareAnPrecedentIndicator, valoareIndicator) {
    let arrowDirection = "";

    const valoareAnPrecedent = parseFloat(valoareAnPrecedentIndicator);
    const valoareCurenta = parseFloat(valoareIndicator);

    if (
      !isNaN(valoareAnPrecedent) &&
      !isNaN(valoareCurenta) &&
      valoareCurenta !== valoareAnPrecedent
    ) {
      arrowDirection = valoareCurenta > valoareAnPrecedent ? "up" : "down";
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

    const isHelpOpen = indicator?.isHelpOpen || false;
    let absDif;
    let parsedIndicatorValoare, parsedIndicatorAnPrecedentValoare;
    if (indicatorAnPrecedent) {
      if (
        typeof indicator?.valoare === "string" ||
        typeof indicatorAnPrecedent.valoare === "string"
      ) {
        parsedIndicatorValoare = parseFloat(
          indicator?.valoare.replace(/\s/g, "").replace(",", ".")
        );
        parsedIndicatorAnPrecedentValoare = parseFloat(
          indicatorAnPrecedent.valoare.replace(/\s/g, "").replace(",", ".")
        );

        if (
          isNaN(parsedIndicatorValoare) ||
          isNaN(parsedIndicatorAnPrecedentValoare)
        ) {
          absDif = 0;
        } else {
          absDif = (
            ((parsedIndicatorValoare - parsedIndicatorAnPrecedentValoare) /
              parsedIndicatorAnPrecedentValoare) *
            100
          ).toFixed(1);
        }
      } else {
        parsedIndicatorValoare = parseFloat(indicator?.valoare);
        parsedIndicatorAnPrecedentValoare = parseFloat(
          indicatorAnPrecedent.valoare
        );
        absDif = Math.abs(
          (
            ((parsedIndicatorValoare - parsedIndicatorAnPrecedentValoare) /
              parsedIndicatorAnPrecedentValoare) *
            100
          ).toFixed(1)
        );
      }

      let result;
      if (parseFloat(absDif) === 0) {
        result = 0;
      } else if (isNaN(parseFloat(absDif))) {
        result = 0;
      } else if (absDif < 0) {
        result = Math.abs(absDif);
      } else {
        result = absDif;
      }

      absDif = result;
    } else {
      absDif = undefined;
    }
    const arrowDirection = getArrowDirection(
      parsedIndicatorAnPrecedentValoare,
      parsedIndicatorValoare
    );

    return {
      indicator,
      arrowDirection,
      absDif,
      isHelpOpen,
    };
  }

  const inflatieData = getIndicatorData(
    indicators,
    country,
    year,
    "Rata inflatie"
  );
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
  const populatieData = getIndicatorData(
    indicators,
    country,
    year,
    "Populatie"
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
          <h3 className={styles.indName}>Rată inflație</h3>
          <button
            className={styles.dots}
            onClick={() => toggleHelp("Inflatie")}
          >
            <Image src={iconHelp} className={styles.dots} />
          </button>
        </div>

        <div className={styles.valueAndIcon}>
          <p className={styles.value}>
            {inflatieData.indicator?.valoare || "N/A"}
          </p>
          <Image src={icon1ind} className={styles.icon1ind} />{" "}
        </div>
        {year !== 2011 && (
          <p className={styles.valueDif}>
            {inflatieData.arrowDirection !== "" && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 20 20"
                style={{
                  transform:
                    inflatieData.arrowDirection === "up"
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
            {inflatieData.absDif}
            {year !== 2011 && "% fata de anul anterior"}
          </p>
        )}
        {inflatieData.isHelpOpen && (
          <div className={styles.helpContainer1}>
            <p className={styles.text}>
              Creșterea generală a prețurilor în economie pe o perioadă de timp.
            </p>
          </div>
        )}
      </div>

      {/* PIB */}
      <div className={styles.displayInd2}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>PIB</h3>
          <button className={styles.dots} onClick={() => toggleHelp("PIB")}>
            {" "}
            <Image src={iconHelp} className={styles.dots} />
          </button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value}>{pibData.indicator?.valoare || "N/A"}</p>
          <Image src={icon2ind} className={styles.icon1ind} />{" "}
        </div>
        {year !== 2011 && (
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
            {pibData.absDif} {year !== 2011 && "% fata de anul anterior"}
          </p>
        )}
        {pibData?.isHelpOpen && (
          <div className={styles.helpContainer2}>
            <p className={styles.text}>
              Valoarea totală a bunurilor și serviciilor produse în economie
              într-o o perioadă de timp.
            </p>
          </div>
        )}
      </div>

      {/* RATA SOMAJ */}
      <div className={styles.displayInd3}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>Rată șomaj</h3>
          <button
            className={styles.dots}
            onClick={() => toggleHelp("Rata somaj")}
          >
            {" "}
            <Image src={iconHelp} className={styles.dots} />
          </button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value}>
            {rataSomajData.indicator?.valoare || "N/A"}
          </p>
          <Image src={icon3ind} className={styles.icon1ind} />{" "}
        </div>
        {year !== 2011 && (
          <p className={styles.valueDif}>
            {rataSomajData.arrowDirection !== "" && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 20 20"
                style={{
                  transform:
                    rataSomajData.arrowDirection === "up"
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
            {rataSomajData.absDif}
            {year !== 2011 && "% fata de anul anterior"}
          </p>
        )}
        {rataSomajData?.isHelpOpen && (
          <div className={styles.helpContainer3}>
            <p className={styles.text}>
              Procentul de persoane disponibile și în căutarea unui loc de muncă
              în forța de muncă totală.
            </p>
          </div>
        )}
      </div>
      {/* CURS VALUTAR */}
      <div className={styles.displayInd4}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>Curs valutar (€)</h3>
          <button
            className={styles.dots}
            onClick={() => toggleHelp("Curs valutar")}
          >
            {" "}
            <Image src={iconHelp} className={styles.dots} />
          </button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value}>
            {cursValutarData.indicator?.valoare || "N/A"}
          </p>
          <Image src={icon4ind} className={styles.icon1ind} />
        </div>
        {year !== 2011 && (
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
            {cursValutarData.absDif}
            {year !== 2011 && "% fata de anul anterior"}
          </p>
        )}
        {cursValutarData?.isHelpOpen && (
          <div className={styles.helpContainer4}>
            <p className={styles.text}>
              Prețul unei valute în raport cu alta în piața internațională.
            </p>
          </div>
        )}
      </div>
      {/* POPULATIE */}
      <div className={styles.displayInd5}>
        <div className={styles.nameAndDots}>
          <h3 className={styles.indName}>Populație</h3>
          <button
            className={styles.dots}
            onClick={() => toggleHelp("Populatie")}
          >
            {" "}
            <Image src={iconHelp} className={styles.dots} />
          </button>
        </div>
        <div className={styles.valueAndIcon}>
          <p className={styles.value2}>
            {populatieData.indicator?.valoare || "N/A"}
          </p>
          <Image src={icon5ind} className={styles.icon1ind} />{" "}
        </div>

        {year !== 2011 && (
          <p className={styles.valueDif}>
            {populatieData.arrowDirection !== "" && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 20 20"
                style={{
                  transform:
                    populatieData.arrowDirection === "up"
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
            {populatieData.absDif} {year !== 2011 && "% fata de anul anterior"}
          </p>
        )}
        {populatieData?.isHelpOpen && (
          <div className={styles.helpContainer5}>
            <p className={styles.text}>
              Numărul total de locuitori ai unei țări sau regiuni.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
