import React from "react";
import Link from "next/link";
import styles from "../styles/Search.module.css";
import { motion } from "framer-motion";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.items = this.props.names;
    this.state = {
      suggestions: [],
      text: "",
    };
  }
  onTextChanged = (e) => {
    let val = e.target.value;
    let suggestions = [];
    if (val.length > 0) {
      const regex = new RegExp(`^${val}`, "i");
      suggestions = this.items.filter((v) => regex.test(v.name));
    }
    this.setState(() => ({ suggestions, text: val }));
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value.charAt(0).toUpperCase() + value.slice(1),
      suggestions: [],
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <motion.ul
        initial={{ scale: 0.91 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", ease: "easeIn", duration: 0.4 }}
      >
        {suggestions.map((ele) => (
          <Link href={`/pokemon/${ele.name}`}>
            <motion.li
              whileTap={{ scale: 0.7 }}
              key={ele.id}
              onClick={() => this.suggestionSelected(ele.name)}
            >
              <span>
                {ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}
              </span>
              <img src={`official-artwork/${ele.id}.png`} />
            </motion.li>
          </Link>
        ))}
      </motion.ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className={styles.SearchDiv}>
        <input
          placeholder="Find pokemon"
          value={text}
          onChange={this.onTextChanged}
          type="text"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default Search;
