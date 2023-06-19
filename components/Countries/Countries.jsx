import React from "react";
import { useState, useEffect } from "react";
import { app, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./countries.module.css";
import Years from "../Years/Years";
import Indicators from "../Indicators/Indicators";
// import date2 from "./date.json";
import date from "../../public/date.json";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/date.json");
      const data = await response.json();
      let dataArray = data;
      if (typeof data === "object") {
        dataArray = Object.values(data);
      }

      setCountries(data.tari);
    };
    fetchData();
  }, []);

  const handleCountryClick = (countryId) => {
    console.log("Selected country:", countryId);
    const selected = countries.find((country) => country.nume === countryId);
    setSelectedCountry(selected);
    setSelectedYear(null);
  };

  const handleYearClick = (year) => {
    console.log("Selected year:", year);
    setSelectedYear(year);
  };

  const handleClose = () => {
    setSelectedCountry(null);
    setSelectedYear(null);
  };

  return (
    <div>
      {(!selectedCountry || (selectedCountry && !selectedYear)) && (
        <div className={styles.display}>
          {countries.map((country) => (
            <div key={country.nume}>
              <h3
                key={country.nume}
                onClick={() => handleCountryClick(country.nume)}
                className={styles.hover}
              >
                {country.nume}
              </h3>
            </div>
          ))}
        </div>
      )}
      {selectedCountry && !selectedYear && (
        <Years country={selectedCountry} onYearClick={handleYearClick} />
      )}
      {selectedCountry && selectedYear && (
        <Indicators
          country={selectedCountry}
          year={selectedYear}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
