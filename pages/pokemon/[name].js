import Link from "next/link";
import Head from "next/head";
import { usePalette } from "react-palette";
import Footer from "../../components/Footer";
import styles from "../../styles/PokeInfo.module.css";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

const PokeInfo = ({ poke }) => {
  const pokeimg = `../official-artwork/${poke.id}.png`;
  let statname;

  const { data } = usePalette(pokeimg);
  return (
    <div
      style={{
        fontFamily: "Archivo Black",
      }}
    >
      <style jsx global>{`
        body {
          background: ${data.lightVibrant};
        }
      `}</style>
      <Head>
        <title>
          {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)} - Stats
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`${
            poke.name.charAt(0).toUpperCase() + poke.name.slice(1)
          } pokemon pokedex. Get all the pokemon related data and statistics here.`}
        />
        <meta
          name="keywords"
          content={`Pokemon, Pokedex, ${
            poke.name.charAt(0).toUpperCase() + poke.name.slice(1)
          }, Stats, Height, Weight, Statistics, Pokemon Type`}
        />
      </Head>
      <motion.div
        variants={postVariants}
        initial="initial"
        animate="animate"
        className={styles.pokeTop}
      >
        <motion.h1>
          {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
        </motion.h1>
        <p>
          Weight: <span>{poke.weight / 10}</span>kg
        </p>
        <p>
          Height: <span>{Math.round(poke.height * 0.328084)}</span>ft
        </p>
        <motion.img
          variants={postVariants}
          initial="initial"
          animate="animate"
          className={styles.pokeimg}
          src={pokeimg}
          alt={poke.name}
        />
        <div className={styles.icon_container}>
          {poke.types.map((res) => {
            const typename =
              res.type.name.charAt(0).toUpperCase() + res.type.name.slice(1);
            return (
              <div key={res.slot}>
                <div className={styles.icon}>
                  <img src={`../types/${typename}.png`} alt={typename} />
                </div>
                <span>{typename}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.statul}
      >
        {poke.stats.map((res) => {
          res.stat.name == "special-attack"
            ? (statname = "Sp. Attack")
            : res.stat.name == "special-defense"
            ? (statname = "Sp. Defense")
            : (statname = res.stat.name);
          return (
            <motion.li variants={item} key={statname}>
              <span>{statname.toUpperCase()}: </span>
              <span>{res.base_stat}</span>
            </motion.li>
          );
        })}
      </motion.ul>
      <motion.div
        whileHover={{ cursor: "pointer" }}
        whileTap={{ color: "white" }}
        style={{ textAlign: "center", marginBottom: "80px" }}
      >
        <Link href="/">
          <p>Go Back</p>
        </Link>
      </motion.div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.params.name}`
  );

  const poke = await res.json();

  return {
    props: {
      poke,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=898");

  const poke = await res.json();

  const pokenames = poke.results.map((res) => {
    return res.name;
  });

  const paths = pokenames.map((name) => ({
    params: { name: name.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default PokeInfo;
