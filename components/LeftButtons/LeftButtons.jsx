import React, { useState } from "react";
import styles from "./leftButtons.module.css";
import Image from "next/image";
import Logo1 from "../../icons/icon1.svg";
import Logo2 from "../../icons/icon2.svg";
import Logo3 from "../../icons/icon3.svg";
import Countries from "../Countries/Countries";
import CountriesBar from "../Countries/CountriesBar";

export default function LeftButtons() {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  const [isShown2, setIsShown2] = useState(false);
  const handleClick2 = (event) => {
    setIsShown2((current) => !current);
  };
  return (
    <div className={styles.btns}>
      <div className={styles.btn} onClick={handleClick}>
        <Image src={Logo1} alt="logo" className={styles.logo} />
      </div>

      <div className={styles.btn} onClick={handleClick2}>
        <Image src={Logo2} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.btn}>
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
    </div>
  );
}
