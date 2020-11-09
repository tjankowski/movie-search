import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import debounce from "lodash.debounce";
import { motion } from "framer-motion";
import { updateUrlQuery } from "utils";
import { search } from "api/omdb";
import Layout from "components/Layout";
import MovieCard from "components/MovieCard";
import SearchForm from "components/SearchForm";
import MovieSkeleton from "components/MovieSkeleton";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import useMovieData from "hooks/useMovieData";
import { fadeIn, hidden } from "styles/animations";
import styles from "styles/Layout.module.scss";
import resultsStyles from "styles/Results.module.scss";
import AnimatedItem from "components/AnimatedItem";

export default function Home({ param, data }) {
  const [query, setQuery] = useState(param);
  const {
    data: { pages, totalResults, totalPages, error },
    isFetching,
    isError,
    actions,
  } = useMovieData(data);
  const bottomBoundaryRef = useRef(null);

  useIntersectionObserver(bottomBoundaryRef, actions.loadMore);

  const search = useCallback(debounce(actions.findMovies, 500), [
    actions.findMovies,
  ]);

  const onQueryChange = (value) => {
    setQuery(value);
    search(value);
    updateUrlQuery(value);
  };

  return (
    <Layout>
      <motion.div
        animate={fadeIn.animate(0)}
        initial={fadeIn.initial}
        exit={hidden}
      >
        <main className={styles.container}>
          <h1 className={styles.header}>Looking for movie?</h1>
          <SearchForm query={query} onChange={onQueryChange} />
          <div className={styles.padding_h}>
            <ul className={resultsStyles.results}>
              {pages.flat().map((item, index) => {
                return (
                  <AnimatedItem
                    className={resultsStyles.results__item}
                    index={index}
                    // Added index to key because API returns same movie for different pages
                    key={`${item.imdbID}=${index}`}
                  >
                    <Link href={`/${encodeURIComponent(item.imdbID)}`}>
                      <a>
                        <MovieCard item={item} />
                      </a>
                    </Link>
                  </AnimatedItem>
                );
              })}
              {!isError && totalResults === 0 && (
                <AnimatedItem className={resultsStyles.results__error}>
                  We didn't find any results.
                </AnimatedItem>
              )}
              {isError && (
                <AnimatedItem className={resultsStyles.results__error}>
                  {error.message}
                </AnimatedItem>
              )}
              {isFetching &&
                [...Array(3)].map((item, index) => (
                  <AnimatedItem
                    className={resultsStyles.results__item}
                    index={index}
                    key={index}
                  >
                    <MovieSkeleton key={index} />
                  </AnimatedItem>
                ))}
            </ul>
          </div>
          {totalPages > 1 && <div ref={bottomBoundaryRef} />}
        </main>
      </motion.div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const params = new URLSearchParams(query);
  const param = params.get("query") || "";
  let data = {
    query: param,
    results: [],
    totalResults: -1,
    totalPages: 0,
  };
  if (param) {
    try {
      data = await search(param, 1);
    } catch (error) {
      data = {
        query,
        error: {
          message: error.message,
        },
      };
    }
  }
  return {
    props: {
      param,
      data,
    },
  };
}
