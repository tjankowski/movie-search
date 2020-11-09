import fetch from "isomorphic-unfetch";

const RESULTS_NOT_FOUND = "Movie not found!";
const TOO_MANY_RESULTS = "Too many results.";
const NOT_FOUND = "Incorrect IMDb ID.";
const SERVER_ERROR =
  "We couldn't load data from the server. Please try again later.";

const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const URL = process.env.NEXT_PUBLIC_API_URL;

function isValidResponse(response) {
  return String(response).toLowerCase() === "true";
}

async function fetchURL(url) {
  let data = null;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    throw new Error(SERVER_ERROR);
  }
  return data;
}

export async function byId(id) {
  const data = await fetchURL(`${URL}/?i=${id}&plot=full&apikey=${TOKEN}`);
  if (isValidResponse(data.Response)) {
    return data;
  }
  if (data.Error === NOT_FOUND) {
    const error = new Error("Incorrect movie ID.");
    error.name = 404;
    throw error;
  }
  throw new Error(SERVER_ERROR);
}

export async function search(query, page = 1) {
  const data = await fetchURL(
    `${URL}/?s=${query}&page=${page}&apikey=${TOKEN}`
  );
  if (isValidResponse(data.Response)) {
    const totalPages = Math.ceil(parseInt(data.totalResults) / 10);
    return {
      query,
      results: data.Search,
      totalResults: parseInt(data.totalResults),
      page,
      // According to API documentation upper limit for number of pages is 100.
      totalPages: totalPages > 100 ? 100 : totalPages,
    };
  }
  if (data.Error === RESULTS_NOT_FOUND) {
    return {
      query,
      results: [],
      totalResults: 0,
      page,
      totalPages: 0,
    };
  }
  if (data.Error === TOO_MANY_RESULTS) {
    throw new Error("Too many results. Please try more specific query.");
  }
  throw new Error(SERVER_ERROR);
}
