import Link from "next/link";
import { motion } from "framer-motion";

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

export default function Pokelist({ pokemon }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{ exit: { transition: { staggerChildren: 0.01 } } }}
      className="container-card"
    >
      {pokemon.map((res) => (
        <div key={res.id}>
          <motion.div variants={postVariants}>
            <Link scroll={false} href={`/pokemon/${res.name}`}>
              <motion.div
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 1.1,
                }}
                className="Card"
              >
                <motion.p>
                  {res.name.charAt(0).toUpperCase() + res.name.slice(1)}
                </motion.p>
                <motion.div>
                  <img src={`official-artwork/${res.id}.png`} />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
