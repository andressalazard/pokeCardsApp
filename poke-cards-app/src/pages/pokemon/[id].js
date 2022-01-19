import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./pokemon.module.css";

const Pokemon = ({ pokemon }) => {
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");

  console.log(pokemon);
  return (
    <Layout title={pokemon.name}>
      <div className={styles.container}>
        <div className={styles.information}>
          <div className={styles.side_info}>
            <img className={styles.pic} src={pokemon.sprites.front_default} alt="pokemon pic" />
            <div className={styles.battle_stats}>
              <div className={styles.header}>battle statistics</div>
              <div className={styles.stats}>
                {/* this goes on foreach */}
                <ul>
                  <li>Health Points</li>
                  <li>Attack</li>
                  <li>Defense</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.description}>
            <div className={styles.header}>{pokemon.name}</div>
            <div className={styles.type_info}>
              <scan className={styles.type_data}>level</scan> <scan className={styles.type_data}>type</scan>
            </div>
            <div className={styles.details}>
              {/* this goes on foreach */}
              <div className={styles.detail}>
                <span>color</span>
                <span>1</span>
              </div>
              <div className={styles.detail}>
                <span>height</span>
                <span>0</span>
              </div>
              <div className={styles.detail}>
                <span>weight</span>
                <span>0</span>
              </div>
              <div className={styles.detail}>
                <span>shape</span>
                <span>four legs</span>
              </div>
              <div className={styles.detail}>
                <span>habitat</span>
                <span>urban spaces</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.evolution}>
          <div className={styles.header}>Evolution</div>
          <div className={styles.pics_wrapper}>
            {/* this goes on a foreach */}
            <div className={styles.state}>
              <img className={styles.evolution_pic} src={pokemon.sprites.back_default} alt="evolution" />
              <span>state (lvl 0)</span>
            </div>
            <div className={styles.state}>
              <img className={styles.evolution_pic} src={pokemon.sprites.back_shiny} alt="evolution" />
              <span>state (lvl 0)</span>
            </div>
            <div className={styles.state}>
              <img className={styles.evolution_pic} src={pokemon.sprites.front_shiny} alt="evolution" />
              <span>state (lvl 0)</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  console.log(params);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
  };
};

export default Pokemon;
