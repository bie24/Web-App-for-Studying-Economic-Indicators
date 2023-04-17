import React from "react";
import Script from "next/script";
import Head from "next/head";
import styles from "./mapChart.module.css";

export default function MapChart() {
  return (
    <>
      <div className={styles.position}>
        <iframe src="/staticMap.html" className={styles.iframe}></iframe>
      </div>
    </>
  );
}
