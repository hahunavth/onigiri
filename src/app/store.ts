import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { getDefaultState } from 'react-query/types/core/mutation'
import { comicApi } from './api'
import homeSlice from './homeSlice'
import settingReducer from './settingSlice'

const store = configureStore({
  reducer: {
    home: homeSlice,
    setting: settingReducer,
    [comicApi.reducerPath]: comicApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(comicApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
