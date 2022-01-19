import Pokecard from "../Pokecard/Pokecard";
import styles from "./CardsDashboard.module.css";

const CardsDashboard = ({ pokemons }) => {
  return (
    <div className={styles.container}>
      {pokemons.map((pokemon, index) => {
        return <Pokecard pokemonData={pokemon} key={index}></Pokecard>;
      })}
    </div>
  );
};

export default CardsDashboard;
