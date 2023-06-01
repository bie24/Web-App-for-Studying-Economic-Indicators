import React from "react";

import Head from "next/head";
import styles from "./layout.module.css";
import Image from "next/image";
import Logo from "../../icons/logo.svg";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Aplicatie Indicatori" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <style jsx global>
          {`
            body {
              margin: 0rem;
              padding: 0rem;
              font-family: "Roboto", sans-serif;
            }
          `}
        </style>
      </div>
      <div className={styles.wrapper}>
        <Image src={Logo} className={styles.logo} />
        <main className={styles.container}>{children}</main>
      </div>
    </>
  );
}
