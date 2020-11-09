import { useCallback, useReducer } from "react";
import { search } from "api/omdb";

const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const ACTION_TYPES = {
  FETCH: "fetch",
  SUCCESS: "success",
  ERROR: "error",
  NEXT_PAGE: "next",
};

const initialState = {
  status: STATUS.SUCCESS,
  data: {
    query: "",
    pages: [],
    totalResults: -1,
    totalPages: 0,
  },
};

const init = (data) => {
  const { results, query, totalResults, totalPages, error } = data;
  return {
    ...initialState,
    status: data?.error ? STATUS.ERROR : STATUS.SUCCESS,
    data: {
      ...initialState.data,
      query,
      pages: [results],
      totalResults,
      totalPages,
      error,
    },
  };
};

function action(type, payload) {
  return {
    type,
    payload,
  };
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION_TYPES.FETCH:
      const isNewQuery = payload.query !== state.data.query;
      return {
        ...state,
        status: STATUS.LOADING,
        data: {
          ...state.data,
          query: payload.query,
          pages: isNewQuery ? [] : state.data.pages,
          totalResults: isNewQuery ? -1 : state.data.totalResults,
          totalPages: isNewQuery ? 0 : state.data.totalPages,
        },
      };
    case ACTION_TYPES.SUCCESS:
      const { results, query, page, totalResults, totalPages } = payload;
      const isNextPage = page > state.data.pages.length;
      const isFirstPage = state.data.pages.length === 0;
      return {
        ...state,
        status: STATUS.SUCCESS,
        data: {
          ...state.data,
          query,
          pages: isNextPage
            ? [...state.data.pages, results]
            : isFirstPage
            ? [results]
            : state.data.pages,
          totalResults,
          totalPages,
        },
      };
    case ACTION_TYPES.ERROR:
      return {
        ...state,
        status: STATUS.ERROR,
        data: {
          ...state.data,
          error: payload,
        },
      };
    default:
      return state;
  }
}

export default function useMovieData(data) {
  const [state, dispatch] = useReducer(reducer, data, init);

  const fetchMovies = useCallback(async (query, page) => {
    dispatch(action(ACTION_TYPES.FETCH, { page, query }));
    try {
      const result = await search(query, page);
      dispatch(action(ACTION_TYPES.SUCCESS, result));
    } catch (error) {
      dispatch(action(ACTION_TYPES.ERROR, error));
    }
  }, []);

  const findMovies = useCallback(
    (query) => {
      if (query.length > 2) {
        fetchMovies(query, 1);
      }
    },
    [fetchMovies]
  );

  const loadMore = useCallback(() => {
    if (state.data.pages.length < state.data.totalPages) {
      fetchMovies(state.data.query, state.data.pages.length + 1);
    }
  }, [
    state.data.pages.length,
    state.data.totalPages,
    state.data.query,
    fetchMovies,
  ]);

  return {
    data: state.data,
    isFetching: state.status === STATUS.LOADING,
    isError: state.status === STATUS.ERROR,
    actions: {
      findMovies,
      loadMore,
    },
  };
}
