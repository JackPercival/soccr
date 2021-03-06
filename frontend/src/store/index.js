import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from './session';
import imagesReducer from "./images";
import commentsReducer from "./comments";
import usersReducer from "./users";
import albumsReducer from "./albums";
import albumContentReducer from "./albumContents";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  users: usersReducer,
  images: imagesReducer,
  comments: commentsReducer,
  albums: albumsReducer,
  albumContents: albumContentReducer,
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
