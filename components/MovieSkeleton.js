import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "styles/MovieCard.module.scss";

export default function MovieSkeleton() {
  return (
    <div className={styles.movieCard}>
      <div className={styles.movieCard__posterContainer}>
        <Skeleton width="6rem" height="6rem" />
      </div>
      <div className={styles.movieCard__title}>
        <h3>
          <Skeleton width="8rem" />
        </h3>
        <div>
          <Skeleton width="4rem" />
        </div>
        <div>
          <Skeleton width="4rem" />
        </div>
      </div>
    </div>
  );
}
