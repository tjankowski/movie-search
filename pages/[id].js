import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { byId } from "api/omdb";
import Layout from "components/Layout";
import Image from "components/Image";
import styles from "styles/Layout.module.scss";
import movieStyles from "styles/Movie.module.scss";
import { fadeIn, hidden } from "styles/animations";

const FIELDS = ["Genre", "Director", "Writer", "Actors"];

export default function Item({ item }) {
  return (
    <Layout>
      <motion.div
        animate={fadeIn.animate(0)}
        initial={fadeIn.initial}
        exit={hidden}
        className={styles.container}
      >
        <nav className={[styles.padding_b_2, styles.darkBlue].join(" ")}>
          <Link
            href={{
              pathname: "/",
              query: { query: item.Title },
            }}
          >
            <a>Back to search</a>
          </Link>
        </nav>
        <main>
          <article>
            <div className={movieStyles.movie}>
              <Image
                src={item.Poster}
                className={movieStyles.movie__poster}
                title={item.Title}
              />
              <div className={movieStyles.movie__description}>
                <h1 className={movieStyles.movie__title}>{item.Title}</h1>
                <p>
                  {item.Year} | {item.Type}
                </p>
                <p>{item.Plot}</p>
                <div className={movieStyles.movie__fields}>
                  {FIELDS.map((field, index) => (
                    <Fragment key={index}>
                      <span
                        className={movieStyles.movie__fieldName}
                        key={`name${index}`}
                      >
                        {field}:
                      </span>
                      <span key={`value${index}`}>{item[field]}</span>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </main>
      </motion.div>
    </Layout>
  );
}

export async function getServerSideProps({ res, params: { id } }) {
  let item;
  try {
    item = await byId(id);
  } catch (error) {
    if (error.name === 404) {
      res.writeHead(404);
      res.end();
      return { props: {} };
    }
    res.writeHead(301, {
      Location: "/",
    });
    res.end();
    return { props: {} };
  }

  return {
    props: {
      item,
    },
  };
}
