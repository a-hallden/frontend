import { createActions } from "redux-actions";
import requests from "../../utils/requests";

const requestsHelper = new requests();

export const {
  search,
  searchSuccess,
  searchError,
  addToFavorites,
  addToFavoritesSuccess,
  addToFavoritesError,
  getFavorites,
  getFavoritesSuccess,
  getFavoritesError,
  getMovieDetail,
  getMovieDetailSuccess,
  getMovieDetailError,
} = createActions({
  SEARCH: (dispatch, searchTerm) => {
    const url = "";
    requestsHelper
      .doUnauthenticatedGet(url, { search: searchTerm })
      .then((response) => dispatch(searchSuccess(response.data)))
      .catch((error) => dispatch(searchError(error)));
  },
  SEARCH_SUCCESS: (payload) => payload,
  SEARCH_ERROR: (error) => error,
  ADD_TO_FAVORITES: (dispatch, movie) => {
    const url = "favorites/";
    requestsHelper
      .doUnauthenticatedPost(url, movie)
      .then((response) => dispatch(addToFavoritesSuccess(response.data)))
      .catch((error) => dispatch(addToFavoritesError(error)));
  },
  ADD_TO_FAVORITES_SUCCESS: (payload) => payload,
  ADD_TO_FAVORITES_ERROR: (error) => error,
  GET_FAVORITES: (dispatch) => {
    const url = "favorites/";
    requestsHelper
      .doUnauthenticatedGet(url)
      .then((response) => dispatch(getFavoritesSuccess(response.data)))
      .catch((error) => dispatch(getFavoritesError(error)));
  },
  GET_FAVORITES_SUCCESS: (payload) => payload,
  GET_FAVORITES_ERROR: (error) => error,
  GET_MOVIE_DETAIL: (dispatch, imdbID) => {
    const url = "";
    requestsHelper
      .doUnauthenticatedGet(url, { search: imdbID })
      .then((response) => dispatch(getMovieDetailSuccess(response.data)))
      .catch((error) => dispatch(getMovieDetailError(error)));
  },
  GET_MOVIE_DETAIL_SUCCESS: (payload) => payload,
  GET_MOVIE_DETAIL_ERROR: (error) => error,
});
