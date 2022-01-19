import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Pokecard.module.css";

const Pokecard = ({ pokemonData }) => {
  const [name, setName] = useState(""),
    [image, setImage] = useState(null),
    [stats, setStats] = useState({ hp: 0, attack: 0, defense: 0 });

  useEffect(() => {
    initValues();
  }, [pokemonData]);

  function initValues() {
    setName(pokemonData.name);
    setImage(pokemonData.sprites.front_default);
    initStats();
  }

  const handleChange = (prop, value) => {
    let updateValue = {};
    updateValue[prop] = value;

    setStats((stats) => ({
      ...stats,
      ...updateValue,
    }));
  };

  function initStats() {
    let statsData = pokemonData.stats;
    for (let i = 0; i < statsData.length; i++) {
      var statName = statsData[i].stat.name,
        statValue = statsData[i].base_stat;

      switch (statName) {
        case "hp":
          handleChange("hp", statValue);
          break;
        case "attack":
          handleChange("attack", statValue);
          break;
        case "defense":
          handleChange("defense", statValue);
          break;
        default:
          break;
      }
    }
  }

  return (
    <Link href={`/pokemon/${name}`}>
      <div className={styles.wrapper}>
        <h3>{name}</h3>
        <img className={styles.pic} src={image} alt="poke-pic" />
        <div className={styles.statistics}>
          <div className={styles.stat}>
            <span className={styles.tooltip}>Health Points</span>
            <div className={styles.value}>
              <span className="material-icons">favorite</span> {stats.hp}
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.tooltip}>Attack Points</span>
            <div className={styles.value}>
              <span className="material-icons">flash_on</span> {stats.attack}
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.tooltip}>Defense Points</span>
            <div className={styles.value}>
              <span className="material-icons">health_and_safety</span> {stats.defense}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Pokecard;
