import React, { useEffect, useState } from "react";
import Script from "next/script";
import Head from "next/head";
import styles from "./mapChart.module.css";

export default function MapChart({ isBlurred }) {
  return (
    <div
      className={`${styles.iframeContainer} ${isBlurred ? styles.blur : ""}`}
    >
      <iframe
        src="/staticMap.html"
        className={styles.iframe}
        style={{ height: "100vh" }}
      ></iframe>
    </div>
  );
}
