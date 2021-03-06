import { selectLastedReadChapterPathList } from "./historySlice";
import { Platform } from "react-native";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";

import { comicApi } from "./api";
import { originApi } from "./apiOrigin";
import homeSlice from "./homeSlice";
import authSlice from "./authSlice";
import settingReducer from "./settingSlice";
import chapterSlice, { selectChapterInfo } from "./chapterSlice";
import historyReducer, {
  selectDownloadedChapters,
  selectLastedReadChapterPath,
  selectReadChapters,
  selectThisComicIsSubscribed
} from "./historySlice";
import recentReducer from "./recentSlice";
import notificationReducer, {
  selectAlleNewChapterNotification,
  selectOneNewChapterNotification
} from "./notificationSlice";

// STUB: FLIPPER REDUX
// NEED REBUILD EAS
let createFlipperDebugger: any = null;
if (__DEV__ && Platform.OS !== "web") {
  createFlipperDebugger = require("redux-flipper").default;
}
if (__DEV__ && Platform.OS !== "web") {
  const selectors = [
    selectAlleNewChapterNotification,
    selectOneNewChapterNotification,
    selectDownloadedChapters,
    selectLastedReadChapterPath,
    selectReadChapters,
    selectThisComicIsSubscribed,
    selectChapterInfo,
    selectLastedReadChapterPathList
  ];
  const reselectDebugger = require("reselect-debugger-flipper");
  reselectDebugger.configure({
    selectors
  });
}

// STUB: DYNAMIC IMPORT REDUX PERSIST STORAGE
const _getStorage = Platform.select({
  // native: () => require('@react-native-async-storage/async-storage').default,
  native: () => require("app/utils/mmkvStorage").mmkvStorage,
  web: () => require("app/utils/ssrStorage").default
});
const storage = _getStorage ? _getStorage() : null;
// console.log(storage);
/**
 * NOTE: USE NESTED PERSIST IO IGNORE persist chapter.current
 */
const chapterPersistConfig = {
  key: "chapter",
  storage: storage,
  blacklist: ["current"]
};

const reducer = combineReducers({
  home: homeSlice,
  auth: authSlice,
  setting: settingReducer,
  history: historyReducer,
  recent: recentReducer,
  notification: notificationReducer,
  chapter: persistReducer(chapterPersistConfig, chapterSlice),
  [comicApi.reducerPath]: comicApi.reducer,
  [originApi.reducerPath]: originApi.reducer
});

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [comicApi.reducerPath, "home", originApi.reducerPath, "chapter"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    })
      .concat(comicApi.middleware)
      .concat(originApi.middleware);

    // IF DEV -> CONCAT MIDDLEWARE
    if (createFlipperDebugger) {
      // NOTE: PUSH DEBUG MIDDLEWARE FIRST!!!
      // AND REBUILD THE APP IF USING CUSTOM DEV CLIENT
      middleware.push(createFlipperDebugger());
    }

    return middleware;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
