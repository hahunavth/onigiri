import { Platform } from 'react-native'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'

import { comicApi } from './api'
import homeSlice from './homeSlice'
import settingReducer from './settingSlice'
import historyReducer from './historySlice'
import recentReducer from './recentSlice'

// STUB: FLIPPER REDUX
// NEED REBUILD EAS
let createFlipperDebugger: any = null
if (__DEV__ && Platform.OS !== 'web') {
  createFlipperDebugger = require('redux-flipper').default
}

// STUB: DYNAMIC IMPORT REDUX PERSIST STORAGE
const SELECT_STORAGE = Platform.select({
  native: () => require('@react-native-async-storage/async-storage').default,
  web: () => require('app/utils/ssrStorage').default
})
const storage = SELECT_STORAGE ? SELECT_STORAGE() : null

const reducer = combineReducers({
  home: homeSlice,
  setting: settingReducer,
  history: historyReducer,
  recent: recentReducer,
  [comicApi.reducerPath]: comicApi.reducer
})

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [comicApi.reducerPath, 'home']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }).concat(comicApi.middleware)

    // IF DEV -> CONCAT MIDDLEWARE
    if (createFlipperDebugger) {
      // NOTE: PUSH DEBUG MIDDLEWARE FIRST!!!
      // AND REBUILD THE APP IF USING CUSTOM DEV CLIENT
      middleware.push(createFlipperDebugger())
    }

    return middleware
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export default store
