import { handleActions } from "redux-actions";
import * as actions from "./actions";

const defaultState = {
  searchResults: {
    results: [],
    loading: false,
    error: false,
  },
  addToFavorites: {
    loading: false,
    error: false,
  },
  favorites: {
    results: [],
    loading: false,
    error: false,
  },
  movieDetail: {
    result: null,
    loading: false,
    error: false,
  },
};

const favoriteReducer = handleActions(
  {
    [actions.search]: (state) => ({
      ...state,
      searchResults: {
        results: [],
        loading: true,
        error: false,
      },
    }),
    [actions.searchSuccess]: (state, action) => ({
      ...state,
      searchResults: {
        results: action.payload,
        loading: false,
        error: false,
      },
    }),
    [actions.searchError]: (state, action) => ({
      ...state,
      searchResults: {
        results: [],
        loading: false,
        error: action.error,
      },
    }),
    [actions.addToFavorites]: (state) => ({
      ...state,
      addToFavorites: {
        loading: true,
        error: false,
      },
    }),
    [actions.addToFavoritesSuccess]: (state) => ({
      ...state,
      addToFavorites: {
        loading: false,
        error: false,
      },
    }),
    [actions.addToFavoritesError]: (state, action) => ({
      ...state,
      addToFavorites: {
        loading: false,
        error: action.error,
      },
    }),
    [actions.getFavorites]: (state) => ({
      ...state,
      favorites: {
        results: [],
        loading: true,
        error: false,
      },
    }),
    [actions.getFavoritesSuccess]: (state, action) => ({
      ...state,
      favorites: {
        results: action.payload,
        loading: false,
        error: false,
      },
    }),
    [actions.getFavoritesError]: (state, action) => ({
      ...state,
      favorites: {
        results: [],
        loading: false,
        error: action.error,
      },
    }),
    [actions.getMovieDetail]: (state) => ({
      ...state,
      movieDetail: {
        result: null,
        loading: true,
        error: false,
      },
    }),
    [actions.getMovieDetailSuccess]: (state, action) => ({
      ...state,
      movieDetail: {
        result: action.payload,
        loading: false,
        error: false,
      },
    }),
    [actions.getMovieDetailError]: (state, action) => ({
      ...state,
      movieDetail: {
        result: null,
        loading: false,
        error: action.error,
      },
    }),
  },
  defaultState
);

export default favoriteReducer;
