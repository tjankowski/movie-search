import React from "react";
import { union } from "utils";
import styles from "styles/Image.module.scss";

const NA = "N/A";

export default function Image({
  src = NA,
  className = styles.image,
  title = "",
}) {
  return (
    <div className={className}>
      {src !== NA ? (
        <>
          <img
            alt={`Blurred background for ${title}`}
            className={styles.image__blur}
            src={src}
          />
          <img alt={title} className={styles.image__poster} src={src} />
        </>
      ) : (
        <div className={styles.image__placeholder} />
      )}
    </div>
  );
}
