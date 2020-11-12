import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Movie search</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Movie searcher" />
        <meta name="keywords" content="Movies, Series, Games" />
        <meta name="author" content="Tomasz Jankowski" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Oswald:wght@300;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </>
  );
}
