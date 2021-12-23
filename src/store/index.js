// src/js/index.js

import { createStore, applyMiddleware, compose } from "redux";
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import RootReducer from "../reducers/index";
import { checkEmpty } from "../middlewares/index.js";
import { PerformRequestOffline } from "../actions/index";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const customConfig = {
  ...offlineConfig,
  effect: (effect, _action) => PerformRequestOffline(effect, _action)
}

const Store = createStore(
  RootReducer,
  storeEnhancers(
    applyMiddleware(checkEmpty, thunk),
    offline(customConfig)
  )
);

export default Store;