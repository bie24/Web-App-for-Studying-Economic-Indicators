import React, { useState } from "react";
import styles from "./leftButtons.module.css";
import Image from "next/image";
import Logo1 from "../../icons/icon1.svg";
import Logo2 from "../../icons/icon2.svg";
import Logo3 from "../../icons/icon3.svg";
import Countries from "../Countries/Countries";
import CountriesBar from "../Countries/CountriesBar";
import CountriesTable from "../Countries/CountriesTable";

export default function LeftButtons() {
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => {
      if (!current) {
        setIsShown2(false);
        setIsShown3(false);
      }
      return !current;
    });
  };

  const handleClick2 = (event) => {
    setIsShown2((current) => {
      if (!current) {
        setIsShown(false);
        setIsShown3(false);
      }
      return !current;
    });
  };

  const handleClick3 = (event) => {
    setIsShown3((current) => {
      if (!current) {
        setIsShown(false);
        setIsShown2(false);
      }
      return !current;
    });
  };
  return (
    <div className={styles.btns}>
      <div className={styles.btn} onClick={handleClick}>
        <Image src={Logo1} alt="logo" className={styles.logo} />
      </div>

      <div className={styles.btn} onClick={handleClick2}>
        <Image src={Logo2} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.btn} onClick={handleClick3}>
        <Image src={Logo3} alt="logo" className={styles.logo} />
      </div>
      {isShown && (
        <div className={styles.display}>
          <Countries />
        </div>
      )}
      {isShown2 && (
        <div className={styles.display}>
          <CountriesBar />
        </div>
      )}
      {isShown3 && (
        <div className={styles.display}>
          <CountriesTable />
        </div>
      )}
    </div>
  );
}
