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
          <h1 className={styles.sectionTitle}>
            <span>Category</span>
          </h1>
          <div className={styles.blocks}>
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
          <h1 className={styles.sectionTitle}>
            <span>Characteristics</span>
          </h1>
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

        <div className={styles.abilities}>
          <h1 className={styles.sectionTitle}>
            <span>Abilities</span>
          </h1>
          {showAbilities()}
        </div>
      </div>
    );
  };

  const showAbilities = () => {
    return (
      <div className={styles.blocks}>
        {abilities.map((element, index) => {
          return (
            <div className={styles.ability} key={index}>
              <div className={styles.desc}>
                <h1>{element.ability.name}</h1>
              </div>
              {generateSlots(element.slot)}
            </div>
          );
        })}
      </div>
    );
  };

  const generateSlots = (count) => {
    var content = [];
    for (let i = 0; i < count; i++) {
      var icon = statsType.filter((item) => {
        return item.name === "pokeball";
      })[0].icon;
      content.push(<img className={styles.slot} src={icon} key={i} />);
    }

    return (
      <div>
        <div className={styles.slots}>{content}</div>
        <p>(slots required)</p>
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
              <div className={styles.legend}>
                <img className={styles.stat_icon} src={statIcon} alt="stat pic" />
                <span className={styles.msg}>{data.stat.name}</span>
              </div>
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
    let aux = showSprites();
    return (
      <div className={styles.evolution}>
        <div className={styles.header}>appereance</div>
        <div className={styles.pics_wrapper}>
          {showSprites().map((state, index) => {
            var name = state[0],
              sprite = state[state.length - 1];

            name = name.replace(/_/g, " ");

            return (
              <div className={styles.state} key={index}>
                <img className={styles.evolution_pic} src={sprite} alt="evolution" />
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const showSprites = () => {
    var aux = [];
    for (var i in sprites) {
      if (typeof sprites[i] !== null && typeof sprites[i] !== "object" && !i.includes("front_default")) {
        aux.push([i, sprites[i]]);
      }
    }
    return aux;
  };

  return (
    <Layout title={name}>
      <div className={styles.container}>
        <div className={styles.information}>
          {displaySideInfo()}
          {displayDescription()}
        </div>
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
    backgroundColor: "rgb(81, 186, 216)",
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
