import CardsDashboard from "../components/CardsDashboard/CardsDashboard";
import Layout from "../components/Layout/Layout";
import Searchbar from "../components/Searchbar/Searchbar";
import styles from "../styles/Home.module.css";

export default function Home({ pokemons }) {
  console.log(pokemons);
  return (
    <Layout>
      <div className={styles.counts}>found {pokemons.length} pokemons</div>
      <Searchbar placeholder="Search a pokemon" />
      <CardsDashboard pokemons={pokemons} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await res.json();
  return {
    props: {
      pokemons: data.results,
    },
  };
};
