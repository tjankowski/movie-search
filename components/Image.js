import React from "react";
import { union } from "utils";
import styles from "styles/Image.module.scss";

const NA = "N/A";

export default function Image({ src = NA, className }) {
  return (
    <div className={union(styles.image, className)}>
      {src !== NA ? (
        <>
          <img className={styles.image__blur} src={src} />
          <img className={styles.image__poster} src={src} />
        </>
      ) : (
        <div className={styles.image__placeholder} />
      )}
    </div>
  );
}
