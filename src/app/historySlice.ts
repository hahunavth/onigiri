import { resChapterDetail_T } from "./../types/api";
import { resComicDetailChapterItem_T, resComicDetail_T } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

type TimestampT = {
  readAt?: Date | number | string;
  createdAt?: Date | number | string;
  // updatedAt?: Date | number | string;
};

export type HistoryComicT = resComicDetail_T &
  TimestampT & {
    chapters: (resComicDetailChapterItem_T & TimestampT)[];
    lastedReadChapter?: string;
    subtribe?: Date | number | string;
  };

type HistoryStoreT = {
  comics: {
    [key: string]: HistoryComicT | undefined;
  };
  readComics: string[];
  subscribeComics: string[];
  readCpt: {
    [key: string]: number;
  };
};

/**
 * Comic save hash <string, resComicItem_T>
 * readComic save string[] use when select recent read list. Usage: path: string -> comics[path]: resComicItem_T
 * subscribeComics save list of subscribed comic. Usage: path: string -> comics[path]: resComicItem_T
 * readCpt use when render list chapter and check cpt had been read. Usage: path -> comics[comicPath].chapters[path]
 */
const initialState: HistoryStoreT = {
  comics: {},
  readComics: [],
  subscribeComics: [],
  readCpt: {},
};

export const toggleSubscribeComicThunk = createAsyncThunk(
  "toggleSubscribeComicThunk",
  (comic: resComicDetail_T, { getState, dispatch }) => {
    const state = getState();

    return new Promise((res, rej) => {
      dispatch(historyAction.toggleSubscribeComic(comic));
    });
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  /**
   * Create Slice will auto immutable state
   * So don't need return
   */
  reducers: {
    pushComic: (state, action: PayloadAction<resChapterDetail_T>) => {},
    /**
     * Push comic to history if not exists
     * @param resComicDetail_T
     * @returns
     */
    pushReadComic: (state, action: PayloadAction<resComicDetail_T>) => {
      // state.comics = {};
      // state.readComics = [];
      // state.readCpt = {};
      // state.subscribeComics = [];
      const findResult = state.comics[action.payload.path];
      if (!findResult) {
        const historyComic: HistoryComicT = {
          ...action.payload,
          readAt: Date.now(),
        };
        // ANCHOR: Modify state
        state.comics[historyComic.path] = historyComic;
        state.readComics.unshift(historyComic.path);
      } else {
        const pushNum =
          action.payload.chapters.length - findResult.chapters.length;
        if (pushNum) {
          // ANCHOR: Modify state
          // Push first if num chapters change
          findResult.chapters.unshift(
            ...action.payload.chapters.slice(0, pushNum)
          );
        }
      }

      console.log("history/comic: No effect");
    },
    /**
     * Save chapter history
     * @param
     * @returns add readAt field
     */
    pushChapter: (
      state,
      action: PayloadAction<{ comicPath: string; chapterPath: string }>
    ) => {
      const { chapterPath, comicPath } = action.payload;
      // Find reading comic
      // const curComic = state.comics.find((comic) => comic.path === comicPath);
      const curComic = state.comics[comicPath];

      if (!!curComic) {
        const changedCurComic: HistoryComicT = {
          ...curComic,
          lastedReadChapter:
            curComic.chapters.find((cpt) => cpt.path === chapterPath)?.name ||
            "",
          readAt: Date.now(),
          chapters: curComic.chapters.map((cpt) => {
            // If found reading chapter -> add fill read at
            if (cpt.path === chapterPath) {
              const changedCurChapter: resComicDetailChapterItem_T &
                TimestampT = {
                ...cpt,
                readAt: Date.now(),
              };
              return changedCurChapter;
            }
            // else do nothing
            return cpt;
          }),
        };
        // ANCHOR: Modify state
        state.comics[comicPath] = changedCurComic;
        state.readCpt[chapterPath] = Date.now();
      } else {
        console.log("history/chapter:ERR: Not found comic");
      }
    },

    /**
     * Subscribe comic
     * find in comics
     * pushComic if not exists
     * push new subscribeComic
     * with subscribe = Date.now()
     *
     * Unsubscribe comic
     * find in subscribeComic and remove it
     * find in comic, readComic
     * if found comic and not found readComic then delete
     * else do nothing
     * @param comicPath
     */
    toggleSubscribeComic: (state, action: PayloadAction<resComicDetail_T>) => {
      const comic = action.payload;
      const resultPath = state.subscribeComics.find(
        (path) => path === comic.path
      );

      if (resultPath) {
        // Unsubscribe
        state.subscribeComics = state.subscribeComics.filter(
          (path) => path !== resultPath
        );
        const readComicPath = state.readComics.find(
          (path) => path === resultPath
        );
        if (!readComicPath) {
          state.comics[comic.path] = undefined;
        }
      } else {
        // Subscribe
        const historyComic: HistoryComicT = {
          ...action.payload,
          // readAt: Date.now(),
          subtribe: Date.now(),
        };
        const findResult = state.comics[action.payload.path];
        if (!findResult) {
          // ANCHOR: Modify state
          // if (!!state.comics[historyComic.path])
          // state.comics[historyComic.path].subtribe = Date.now();
          state.comics[action.payload.path] = historyComic;
        } else {
          const pushNum =
            action.payload.chapters.length - findResult.chapters.length;
          if (pushNum) {
            // ANCHOR: Modify state
            // Push first if num chapters change
            findResult.chapters.unshift(
              ...action.payload.chapters.slice(0, pushNum)
            );
          }
        }
        state.subscribeComics.unshift(historyComic.path);
      }
    },
  },
});

export const historyAction = historySlice.actions;
export const historySelector = (state: RootState) => state.history;
export default historySlice.reducer;
