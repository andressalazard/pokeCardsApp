import { UseFetch } from "../../UseFetch";
import styles from "./CardsDashboard.module.css";

const CardsDashboard = ({ pokemons }) => {
  return (
    <div className={styles.container}>
      {pokemons.map((pokemon, index) => {
        let data = UseFetch(pokemon.url);
        return (
          <div className={styles.card} key={index}>
            <h3>{pokemon.name}</h3>
            {data !== null ? <img src={data.sprites.front_default} /> : <div>Here goes an image</div>}
            <div>Here goes the habilities</div>
          </div>
        );
      })}
    </div>
  );
};

export default CardsDashboard;
