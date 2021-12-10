import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import song from "./song";
import playlist from "./playlist";
import audio from "./audio";
import follow from "./follow";
import playlist_song from "./playlist_songs";
import user from "./user"

const rootReducer = combineReducers({
  session,
  song,
  playlist,
  audio,
  playlist_song,
  follow,
  user
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
