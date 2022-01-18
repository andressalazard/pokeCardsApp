import { UseFetch } from "../../UseFetch";
import Pokecard from "../Pokecard/Pokecard";
import styles from "./CardsDashboard.module.css";

const CardsDashboard = ({ pokemons }) => {
  return (
    <div className={styles.container}>
      {pokemons.map((pokemon, index) => {
        let data = UseFetch(pokemon.url);
        if (data !== null) return <Pokecard pokemonData={data} key={index}></Pokecard>;
        return;
      })}
    </div>
  );
};

export default CardsDashboard;
