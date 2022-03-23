import { mmkvStorage } from "./../utils/mmkvStorage";
import { createSelector } from "reselect";
import { historyAction, HistoryComicT } from "app/store/historySlice";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resComicDetail_T } from "../types";
import { RootState } from "./store";
// import * as Notifications from 'expo-notifications'
import { Platform } from "react-native";

const _getNotifications = Platform.select({
  native: () => require("expo-notifications")
});

const Notifications = _getNotifications ? _getNotifications() : null;

/**
 * WORK:
 *  1. compare with comic in historySlice
 *  2. when notification is read, delete it
 */
export type NewCptNotificationT = {
  // NOTE: Lasted chapter information only
  chapterName: string;
  updatedAt: string;
  chapterPath: string;
  // Count num of new chapters
  count: number;
  // time
  createdAt: string;
  editedAt: string;
};

export type NotificationStoreT = {
  // NOTE: read, follow, like, downloaded comic notification
  newChapter: {
    [comicPath: string]: NewCptNotificationT;
  };
  newChapterList: string[];
  // TODO: comment
  replyComment: [];
  //
  lastRefresh: string;
  // debug: count num of fetch async thunk run
  count: number;
  mergeCount: number;
};

const initialState: NotificationStoreT = {
  newChapter: {},
  newChapterList: [],
  replyComment: [],
  lastRefresh: "",
  count: 0,
  mergeCount: 0
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    reset: (state, action) => initialState,
    pushNewChapterNotification: (
      state,
      action: PayloadAction<{
        comicPath: string;
        info: NewCptNotificationT;
      }>
    ) => {
      const { comicPath, info } = action.payload;

      const oldNoti = state.newChapter[comicPath];

      if (oldNoti) {
        state.newChapterList = state.newChapterList.filter(
          (cPath) => cPath !== comicPath
        );
      } else {
        // ANCHOR: MODIFY STATE
        state.newChapter[comicPath] = { ...info };
      }

      state.newChapterList.unshift(comicPath);
    },
    removeNewChapterNotification: (state, action: PayloadAction<string>) => {
      const comicPath = action.payload;

      delete state.newChapter[comicPath];
      // state.newChapter[comicPath] = undefined
      state.newChapterList = state.newChapterList.filter(
        (cPath) => cPath !== comicPath
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchNewChapterNotificationThunk.fulfilled,
      (state, action) => {
        // console.log('full', action.payload)
        state.count += 1;
        if (action.payload) {
          state.newChapter = { ...state.newChapter, ...action.payload };
          action.payload &&
            Object.keys(action.payload).forEach((k) => {
              // const path = action.payload ? action.payload[k]?.chapterPath : null
              state.newChapterList = state.newChapterList.filter(
                (cPath) => cPath !== k
              );
              state.newChapterList.unshift(k);
            });
        }
        console.log("payload", action.payload);
      }
    );
    builder.addCase(
      mergeNewChapterNotificationThunk.fulfilled,

      (state, action) => {
        if (action.payload) {
          state.mergeCount =
            typeof state.mergeCount === "number" ? state.mergeCount + 1 : 0;
          state.newChapter = { ...state.newChapter, ...action.payload };
          action.payload &&
            Object.keys(action.payload).forEach((k) => {
              // const path = action.payload ? action.payload[k]?.chapterPath : null
              state.newChapterList = state.newChapterList.filter(
                (cPath) => cPath !== k
              );
              state.newChapterList.unshift(k);
            });
        }
      }
    );
  }
});

/**
 * NOTE: UTILS FN
 */

const genFetchNotificationDataFN =
  (
    // state.history.comics
    comics: {
      [key: string]: HistoryComicT | undefined;
    },
    // state.notification
    memoNotification: NotificationStoreT,
    stateNotification: NotificationStoreT,
    // new result
    notifications: NotificationStoreT["newChapter"],
    comicPushList: resComicDetail_T[],
    isBackground: boolean
  ) =>
  async (cPath: string) => {
    const lastedCptPath = comics[cPath]?.chapters[0]?.path;

    await axios
      .get(`https://hahunavth-express-api.herokuapp.com/api/v1${cPath}`)
      .then(({ data }) => {
        const result = data as resComicDetail_T;
        console.log(result?.path);
        const id = result?.chapters?.findIndex(
          (cpt) => cpt.path === lastedCptPath || ""
        );
        // const oldNoti = notification.newChapter[cPath]
        if (
          // TODO: id > 0, >=0 -> test
          id > 0 &&
          result?.chapters[id] &&
          lastedCptPath &&
          id !== stateNotification.newChapter[cPath]?.count &&
          id !== memoNotification.newChapter[cPath]?.count
        ) {
          console.log(id);
          notifications[cPath] = {
            chapterName: result?.chapters[0].name,
            updatedAt: result?.chapters[0].updatedAt,
            count: id,
            chapterPath: result?.chapters[0].path,
            createdAt: Date.now().toString(),
            editedAt: Date.now().toString()
          };

          // ANCHOR: MODIFY STATE
          // if (result) dispatch(historyAction.pushComic(result))
          if (result) {
            comicPushList.unshift(result);
            if (Platform.OS !== "web" && Notifications) {
              Notifications.scheduleNotificationAsync({
                content: {
                  title: `${result?.title}`,
                  body: `${result?.chapters[0]}`,
                  // data: { data: 'ABCD' },
                  autoDismiss: true,
                  // attachments: [
                  //   {
                  //     url: result.posterUrl
                  //   }
                  // ],
                  subtitle: result?.chapters[0]?.path
                  // badge: 2,
                  // launchImageName: result.posterUrl
                },
                //
                trigger: { seconds: 2 }
              });
            }
          }
        }
      });
  };

const mapSeries = async (iterable: any[], action: (a: any) => Promise<any>) => {
  for (const x of iterable) {
    await action(x);
  }
};

export const fetchBackgroundInfo = async (
  state: Readonly<RootState>,
  notifications: NotificationStoreT["newChapter"],
  comicPushList: resComicDetail_T[],
  isBackground: boolean = false
) => {
  // TODO: USE isBackground in if
  if (!isBackground && typeof state.history !== "string") {
    const memoNotification = await mmkvStorage
      .getItem("notifications-template")
      .then((s: string) => (s ? JSON.parse(s) : undefined));
    await mapSeries(
      Object.keys(state.history.comics),
      genFetchNotificationDataFN(
        state.history.comics,
        memoNotification,
        state.notification,
        notifications,
        comicPushList,
        false
      )
    );
  } else {
    console.log(typeof state.history);
    // @ts-ignore
    const comics = JSON.parse(state.history).comics;
    /**
     * FIXED: GET NOTIFICATION OBJECT FROM ASYNC STORAGE INSTEAD OF STORE
     * I only want to get comics list in the store!
     */
    // @ts-ignore
    const stateNotification = JSON.parse(state.notification);
    const memoNotification = mmkvStorage.getItem("notifications-template");
    await mapSeries(
      Object.keys(comics),
      genFetchNotificationDataFN(
        comics,
        memoNotification,
        stateNotification,
        notifications,
        comicPushList,
        true
      )
    );
  }
};

/**
 * NOTE: THUNK
 */
export const fetchNewChapterNotificationThunk = createAsyncThunk(
  "fetchNewChapterNotificationAsync",
  async (
    undefined,
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      // @ts-ignore
      const state: RootState = getState();
      state.notification.lastRefresh = Date.now().toString();

      const notifications: NotificationStoreT["newChapter"] = {};
      const comicPushList: resComicDetail_T[] = [];
      // await mapSeries(
      //   Object.keys(state.history.comics),
      //   genFetchNotificationDataFN(state, notifications, comicPushList)
      // )
      await fetchBackgroundInfo(state, notifications, comicPushList);

      comicPushList.forEach((c) => dispatch(historyAction.pushComic(c)));
      return notifications;
    } catch (e) {
      console.log(e);
    }
  }
);

/**
 * NOTE: DISPATCH WHEN START APP TO UPDATE NOTIFICATION FROM ASYNC STORAGES
 */
export const mergeNewChapterNotificationThunk = createAsyncThunk(
  "mergeNewChapterNotificationAsync",
  async (
    undefined,
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    console.log("mergeNewChapterNotificationThunk dispatched");
    const state = getState();

    const notifications: NotificationStoreT["newChapter"] = await mmkvStorage
      .getItem("notifications-template")
      .then((s: string) => (s ? JSON.parse(s) : undefined));
    const comicPushList: resComicDetail_T[] = await mmkvStorage
      .getItem("comicPushList-template")
      .then((s: string) => (s ? JSON.parse(s) : undefined));

    if (notifications && comicPushList) {
      // ANCHOR: MODIFY STATE
      comicPushList.forEach((c) => dispatch(historyAction.pushComic(c)));
    }
    await mmkvStorage.removeItem("notifications-template");
    await mmkvStorage.removeItem("comicPushList-template");
    console.log(
      "merge done with ",
      comicPushList.length,
      "item",
      // comicPushList,
      // @ts-ignore
      state?.history?.comics[comicPushList[0].path]?.chapters[0],
      notifications
    );
    return notifications;
  }
);

/**
 * ANCHOR: EXPORT
 */

export default notificationSlice.reducer;
export const notificationAction = notificationSlice.actions;

export const notificationSelector = (state: RootState) => state.notification;

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
);

export const selectAlleNewChapterNotification = createSelector(
  [
    (state: RootState) => state.notification.newChapter,
    (state: RootState) => state.history.comics,
    (state: RootState) => state.notification.newChapterList
  ],
  (newChapter, comics, newChapterList) =>
    newChapterList
      ?.map((cPath) => ({
        notification: newChapter[cPath],
        comicDetail: comics[cPath]
      }))
      ?.filter((item) => item.comicDetail && item.notification) || []
  // NOTE: WITHOUT ? CAUSE ERROR: REMOVE NATIVE VIEW ...
);
