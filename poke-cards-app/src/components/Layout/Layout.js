import styles from "./Layout.module.css";
import Head from "next/head";

const Layout = ({ children, title = "PokeCardsApp" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>Here goes the header</header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Created by Andrés Salazar</footer>
    </div>
  );
};

export default Layout;
