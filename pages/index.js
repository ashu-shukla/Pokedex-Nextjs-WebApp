import Head from "next/head";
import Card from "../components/Card";
import Search from "../components/Search";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Home({ data }) {
  const pokenames = data.results.map((poke, index) => {
    return {
      name: poke.name,
      id: index + 1,
    };
  });
  return (
    <motion.div>
      <Head>
        <title>Pokedex-Gotta Know-em All</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="pokemon pokedex. Get all the pokemon related data and statistics here."
        />
        <meta
          name="keywords"
          content={`Pokemon, Pokedex, Stats, Height, Weight, Statistics, Pokemon Type`}
        />
      </Head>
      <div className="App-Top">
        <motion.h1 whileTap={{ scale: 0.8 }}>POKEDEX</motion.h1>
        <motion.div
          initial={{ scale: 0.1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.3, duration: 1.2 }}
          className="App-component"
        >
          <Search names={pokenames} />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, x: 600 }}
          animate={{ scale: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: "easeIn",
          }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.5}
          className="pokeround"
        >
          <motion.span
            initial={{ scale: 2 }}
            animate={{
              scale: [1, 2, 2, 1, 1],
              borderRadius: ["100%", "50%", "50%", "50%", "100%"],
            }}
            transition={{
              duration: 2,
              times: [0, 0.2, 0.5, 0.8, 1],
            }}
            className="dot"
          />
        </motion.div>
      </div>
      <Card />
      <Footer page="index" />
    </motion.div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=898
	`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};
