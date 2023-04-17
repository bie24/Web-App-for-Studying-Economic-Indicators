import React from "react";
import { useState, useEffect } from "react";
import { app, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./countries.module.css";
import Years from "../Years/Years";
import Indicators from "../Indicators/Indicators";
// import date2 from "./date.json";
import date from "../../public/date.json";
import IndicatorsBar from "../Indicators/IndicatorsBar";

export default function CountriesBar() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/date.json");
      const data = await response.json();
      setCountries(data.tari);
    };
    fetchData();
  }, []);

  const handleCountryClick = (countryId) => {
    console.log("Selected country:", countryId);
    const selected = countries.find((country) => country.nume === countryId);
    setSelectedCountry(selected);
  };

  const handleClose = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      {!selectedCountry && (
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
      {selectedCountry && (
        <IndicatorsBar country={selectedCountry} onClose={handleClose} />
      )}
    </div>
  );
}
