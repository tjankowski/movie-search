import styles from "styles/MovieCard.module.scss";
import React from "react";
import Image from "components/Image";

export default function MovieCard({ item }) {
  return (
    <article className={styles.movieCard}>
      <Image src={item.Poster} title={item.Title} />
      <div className={styles.movieCard__title}>
        <h2>{item.Title}</h2>
        <div>{item.Year}</div>
        <div>{item.Type}</div>
      </div>
    </article>
  );
}
