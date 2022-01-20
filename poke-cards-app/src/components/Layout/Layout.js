import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children, title = "PokeCardsApp" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <h1>
            <div className={styles.inner_border}>Pokemon Cards</div>
          </h1>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        Developed by <a href="https://github.com/andressalazard/">andressalazard</a>
      </footer>
    </div>
  );
};

export default Layout;
