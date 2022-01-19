import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { pokemonTypes, statsType } from "../../context/pokemon/context";
import styles from "./pokemon.module.css";

const Pokemon = ({ pokemon }) => {
  const [name, setName] = useState("");
  const [sprites, setSprites] = useState({});
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);

  const [description, setDescription] = useState({
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    fillDescription();
    displayDescription();
    displaySideInfo();
  }, [pokemon]);

  const fillDescription = () => {
    setName(pokemon.name);
    setSprites(pokemon.sprites);
    setAbilities(pokemon.abilities);
    setTypes(pokemon.types);

    setDescription({
      height: pokemon.height,
      weight: pokemon.weight,
    });
  };

  const unitsGenerator = (keyValue) => {
    if (keyValue === "weight") return "kg";
    if (keyValue === "height") return "mts";
    return "";
  };

  const displayDescription = () => {
    var list = [];
    for (var desc in description) {
      list.push([desc, description[desc]]);
    }

    return (
      <div className={styles.description}>
        <div className={styles.header}>{name}</div>

        <div className={styles.category}>
          <h1 className={styles.sectionTitle}>Category</h1>
          <div className={styles.types}>
            {types.map((item, index) => {
              var name = item.type.name;
              var aux = pokemonTypes.filter((pokemon) => name === pokemon.name);
              return (
                <div className={styles.type} key={index}>
                  {aux[0].icon !== undefined ? (
                    <img src={aux[0].icon} className={styles.type_icon} alt="type icon" width="30" height="30" />
                  ) : (
                    <span></span>
                  )}
                  <h2>{item.type.name}</h2>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.characteristics}>
          <h1 className={styles.sectionTitle}>Characteristics</h1>
          <div className={styles.details}>
            {list.map((detail, index) => {
              var label = detail[0],
                value = detail[detail.length - 1],
                units = unitsGenerator(label);
              if (label === "height" || label === "weight") value = value / 10;
              return (
                <div className={styles.detail} key={index}>
                  <span>{label}</span>
                  <span>{`${value} ${units}`}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const displaySideInfo = () => {
    return (
      <div className={styles.side_info}>
        <img className={styles.pic} src={sprites.front_default} alt={`${name}-pic`} />
        <div className={styles.battle_stats}>
          <div className={styles.header}>battle statistics</div>
          {displayStatBars()}
        </div>
      </div>
    );
  };

  const displayStatBars = () => {
    var stats = pokemon.stats;

    return (
      <div className={styles.stats}>
        {stats.map((data, index) => {
          var statValue = data.base_stat,
            statIcon = getStatIcon(data.stat.name);

          return (
            <div className={styles.stat} key={index}>
              <img className={styles.stat_icon} src={statIcon} alt="stat pic" />
              <ProgressBar completed={statValue} />
            </div>
          );
        })}
      </div>
    );
  };

  const getStatIcon = (key) => {
    var aux = statsType.filter((stat) => {
      return stat.name === key;
    });
    if (aux !== undefined) return aux[0].icon;
    return "";
  };

  const displayStates = () => {
    return (
      <div className={styles.evolution}>
        <div className={styles.header}>Evolution</div>
        <div className={styles.pics_wrapper}>
          {/* this goes on a foreach */}
          <div className={styles.state}>
            <img className={styles.evolution_pic} src={sprites.back_default} alt="evolution" />
            <span>state (lvl 0)</span>
          </div>
          <div className={styles.state}>
            <img className={styles.evolution_pic} src={sprites.back_shiny} alt="evolution" />
            <span>state (lvl 0)</span>
          </div>
          <div className={styles.state}>
            <img className={styles.evolution_pic} src={sprites.front_shiny} alt="evolution" />
            <span>state (lvl 0)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title={name}>
      <div className={styles.container}>
        <div className={styles.information}>
          {/* Here goes the sideinfo */}
          {displaySideInfo()}

          {/* Here goes description */}
          {displayDescription()}
        </div>

        {/* Here goes evolution */}
        {displayStates()}
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

const ProgressBar = (props) => {
  const { completed } = props;

  const filler_style = {
    borderRadius: "0.5rem",
    backgroundColor: "#c4c4c4",
    height: "1rem",
    width: `${completed}%`,
    transition: "width 1s ease-in-out",
  };

  return (
    <div className={styles.stat_bar_wrapper}>
      <div style={filler_style}></div>
      <h1>{completed}</h1>
    </div>
  );
};

export default Pokemon;
