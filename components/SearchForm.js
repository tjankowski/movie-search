import React from "react";
import styles from "styles/SearchForm.module.scss";

export default function SearchForm({ query, onChange }) {
  return (
    <form className={styles.searchForm}>
      <input
        type="text"
        value={query}
        placeholder="Type movie title here"
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchForm__input}
      />
      <button
        type="button"
        className={styles.searchForm__button}
        onClick={() => onChange(query)}
      >
        Search
      </button>
    </form>
  );
}
