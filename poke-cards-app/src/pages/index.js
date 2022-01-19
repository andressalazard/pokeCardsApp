import { useState } from "react";
import CardsDashboard from "../components/CardsDashboard/CardsDashboard";
import Layout from "../components/Layout/Layout";
import Searchbar from "../components/Searchbar/Searchbar";
import styles from "../styles/Home.module.css";

export default function Home({ pokemons }) {
  const [keyword, setKeyword] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(keyword));

  const handleInputChange = (e) => {
    e.preventDefault;
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.counts}>found {filteredPokemons.length} pokemons</div>
      <Searchbar placeholder="Search a pokemon" onChange={handleInputChange} />
      <CardsDashboard pokemons={filteredPokemons} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await res.json();

  var pokemons = [],
    aux = data.results;
  for (let i = 0; i < aux.length; i++) {
    var response = await fetch(aux[i].url);
    var values = await response.json();
    pokemons.push(values);
  }

  return {
    props: {
      // pokemons: data.results,
      pokemons: pokemons,
    },
  };
};
