import { createStore, applyMiddleware, compose } from "redux";
import { createReducer } from "./reducers";
import thunk from "redux-thunk";

const initializeStore = (initialState) =>
  createStore(createReducer(), initialState, applyMiddleware(thunk));

export default initializeStore;
