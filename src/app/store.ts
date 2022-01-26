import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import { comicApi } from "./api";
import homeSlice from "./homeSlice";
import settingReducer from "./settingSlice";
import downloadReducer from "./downloadSlice";
import historyReducer from "./historySlice";

// STUB: FLIPPER REDUX
// NEED REBUILD EAS
let createFlipperDebugger: any = null;
if (__DEV__) {
  createFlipperDebugger = require("redux-flipper").default;
}

const reducer = combineReducers({
  home: homeSlice,
  setting: settingReducer,
  download: downloadReducer,
  history: historyReducer,
  [comicApi.reducerPath]: comicApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [comicApi.reducerPath, "home"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      // {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }).concat(
      comicApi.middleware
      // logger
    );

    // IF DEV -> CONCAT MIDDLEWARE
    if (createFlipperDebugger) {
      // NOTE: PUSH DEBUG MIDDLEWARE FIRST!!!
      middleware.push(createFlipperDebugger());
    }

    return middleware;
  },
});

// const store = createStore(persistedReducer, compose(applyMiddleware(comicApi.middleware)))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
