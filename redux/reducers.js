import { combineReducers } from "redux";

import favoriteReducer from "./favorites/reducer";

export const createReducer = () =>
  combineReducers({
    favorites: favoriteReducer,
  });
