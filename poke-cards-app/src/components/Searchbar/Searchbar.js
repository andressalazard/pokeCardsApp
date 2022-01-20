import styles from "./Searchbar.module.css";

const Searchbar = ({ ...rest }) => {
  return (
    <div className={styles.container}>
      <span className={"material-icons"}>search</span>
      <input className={styles.input} {...rest} />
    </div>
  );
};

export default Searchbar;
