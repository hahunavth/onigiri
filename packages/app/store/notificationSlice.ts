import { createSelector } from 'reselect'
import { historyAction } from 'app/store/historySlice'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { resComicDetail_T } from '../types'
import { RootState } from './store'

/**
 * WORK:
 *  1. compare with comic in historySlice
 *  2. when notification is read, delete it
 */
export type NewCptNotificationT = {
  // NOTE: Lasted chapter information only
  chapterName: string
  updatedAt: string
  chapterPath: string
  // Count num of new chapters
  count: number
  // time
  createdAt: string
  editedAt: string
}

export type NotificationStoreT = {
  // NOTE: read, follow, like, downloaded comic notification
  newChapter: {
    [comicPath: string]: NewCptNotificationT
  }
  newChapterList: string[]
  // TODO: comment
  replyComment: []
  //
  lastRefresh: string
  // debug: count num of fetch async thunk run
  count: number
}

const initialState: NotificationStoreT = {
  newChapter: {},
  newChapterList: [],
  replyComment: [],
  lastRefresh: '',
  count: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: (state, action) => initialState,
    pushNewChapterNotification: (
      state,
      action: PayloadAction<{
        comicPath: string
        info: NewCptNotificationT
      }>
    ) => {
      const { comicPath, info } = action.payload

      const oldNoti = state.newChapter[comicPath]

      if (oldNoti) {
        state.newChapterList = state.newChapterList.filter(
          (cPath) => cPath !== comicPath
        )
      } else {
        // ANCHOR: MODIFY STATE
        state.newChapter[comicPath] = { ...info }
      }

      state.newChapterList.unshift(comicPath)
    },
    removeNewChapterNotification: (state, action: PayloadAction<string>) => {
      const comicPath = action.payload

      delete state.newChapter[comicPath]
      state.newChapterList = state.newChapterList.filter(
        (cPath) => cPath !== comicPath
      )
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchNewChapterNotificationAsync.fulfilled,
      (state, action) => {
        // console.log('full', action.payload)
        state.newChapter = { ...state.newChapter, ...action.payload }
        action.payload &&
          Object.keys(action.payload).forEach((k) => {
            // const path = action.payload ? action.payload[k]?.chapterPath : null
            state.newChapterList = state.newChapterList.filter(
              (cPath) => cPath !== k
            )
            state.newChapterList.unshift(k)
          })
      }
    )
  }
})

export const fetchNewChapterNotificationAsync = createAsyncThunk(
  'fetchNewChapterNotificationAsync',
  async (
    undefined,
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      // @ts-ignore
      const state: RootState = getState()
      state.notification.count += 1
      state.notification.lastRefresh = Date.now().toString()

      const notifications: NotificationStoreT['newChapter'] = {}

      const fetchData = async (cPath: string) => {
        const lastedCptPath = state.history.comics[cPath]?.chapters[0].path
        // state.notification.newChapter = {}
        // state.notification.newChapterList = []
        await axios
          .get(`https://hahunavth-express-api.herokuapp.com/api/v1${cPath}`)
          .then(({ data }) => {
            const result = data as resComicDetail_T
            console.log(result?.path)
            const id = result?.chapters?.findIndex(
              (cpt) => cpt.path === lastedCptPath || ''
            )
            const oldNoti = state.notification.newChapter[cPath]
            if (
              id > 0 &&
              result?.chapters[id] &&
              lastedCptPath &&
              !(oldNoti?.chapterName === result?.chapters[id].name)
            ) {
              console.log(id)
              notifications[cPath] = {
                chapterName: result?.chapters[id].name,
                updatedAt: result?.chapters[id].updatedAt,
                count: id,
                chapterPath: lastedCptPath,
                createdAt: Date.now().toString(),
                editedAt: Date.now().toString()
              }

              // ANCHOR: MODIFY STATE
              if (result) dispatch(historyAction.pushComic(result))
            }
          })
      }

      const mapSeries = async (
        iterable: any[],
        action: (a: any) => Promise<any>
      ) => {
        for (const x of iterable) {
          await action(x)
        }
      }

      await mapSeries(Object.keys(state.history.comics), fetchData)

      return notifications
    } catch (e) {
      console.log(e)
    }
  }
)

/**
 * ANCHOR: EXPORT
 */

export default notificationSlice.reducer
export const notificationAction = notificationSlice.actions

export const notificationSelector = (state: RootState) => state.notification

export const selectOneNewChapterNotification = createSelector(
  [
    (state: RootState) => state.notification.newChapter,
    (state: RootState) => state.history.comics,
    (state, param: string) => param
  ],
  (newChapter, comics, param) => ({
    comicDetail: comics[param],
    notification: newChapter[param]
  })
)

export const selectAlleNewChapterNotification = createSelector(
  [
    (state: RootState) => state.notification.newChapter,
    (state: RootState) => state.history.comics,
    (state: RootState) => state.notification.newChapterList
  ],
  (newChapter, comics, newChapterList) =>
    newChapterList.map((cPath) => ({
      notification: newChapter[cPath],
      comicDetail: comics[cPath]
    }))
)
