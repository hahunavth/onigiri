import type { ApiResponse_T } from "./../types/api";
import axios from "axios";
import {
  resComicDetailChapterItem_T,
  resComicDetail_T,
  resChapterDetail_T
} from "app/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { addMultipleImgs, deleteChapter } from "app/utils/imgManager";
import {
  createSelector,
  createSelectorCreator,
  defaultMemoize
} from "reselect";
// import isEqual from "lodash.isequal";

// ANCHOR: TYPE DEFINITION
type TimestampT = {
  readAt?: Date | number | string;
  createdAt?: Date | number | string;
  downloadedAt?: Date | number | string;
  downloadCount?: number;
};

export type HistoryComicT = resComicDetail_T &
  TimestampT & {
    chapters: (resComicDetailChapterItem_T & TimestampT)[];
    lastedReadChapter?: string;
    lastedReadPathList: string[];
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
  downloadCpt: {
    [key: string]: resChapterDetail_T | undefined;
  };
  downloadComics: string[];
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
  downloadComics: [],
  downloadCpt: {}
};

/**
 * ANCHOR: HISTORY SLICE
 * save read history, subscribe, download comic logic
 */
const historySlice = createSlice({
  name: "history",
  initialState,
  /**
   * Create Slice will auto immutable state
   * So don't need copy and return state
   */
  reducers: {
    /**
     * RESET STATE TO INITIAL
     */
    reset: (state, action: PayloadAction<null>) => {
      return initialState;
    },
    /**
     * Push comic to list if not exists
     * Update chapter list in comic if exists in state
     */
    pushComic: (state, action: PayloadAction<resComicDetail_T>) => {
      // Find comic in state
      const findResult = state.comics[action.payload.path];
      if (!findResult) {
        const historyComic: HistoryComicT = {
          ...action.payload,
          lastedReadPathList: [],
          readAt: Date.now()
        };
        // If not found, push new
        // ANCHOR: Modify state
        state.comics[historyComic.path] = historyComic;
      } else {
        // If found
        // Update chapter list in state
        const pushNum =
          action.payload.chapters.length - findResult.chapters.length;
        if (pushNum) {
          // ANCHOR: Modify state
          // Push first if num chapters change
          // findResult.chapters.unshift(
          //   ...action.payload.chapters.slice(0, pushNum)
          // );
          // findResult.chapters = action.payload.chapters;
          state.comics[action.payload.path] = {
            ...findResult,
            chapters: action.payload.chapters
          };
        }
      }
    },
    /**
     * Push comic to history if not exists
     * Update chapter list in comic if exists in state
     */
    pushReadComic: (state, action: PayloadAction<resComicDetail_T>) => {
      const findResult = state.comics[action.payload.path];
      if (!findResult) {
        // If not exists in state.comics
        // -> not exists in state.readComics
        // -> add new comic and readComic
        const historyComic: HistoryComicT = {
          ...action.payload,
          lastedReadPathList: [],
          readAt: Date.now()
        };
        // ANCHOR: Modify state
        state.comics[historyComic.path] = historyComic;
        state.readComics.unshift(historyComic.path);
      } else {
        // If found comic in state
        // Unknown readComic in state
        //
        // Update comic
        // if add readComic if not exists
        const pushNum =
          action.payload.chapters.length - findResult.chapters.length;
        if (pushNum) {
          // ANCHOR: Modify state
          // Push first if num chapters change
          // findResult.chapters.unshift(
          //   ...action.payload.chapters.slice(0, pushNum)
          // );
          findResult.chapters = action.payload.chapters;
          state.comics[action.payload.path] = findResult;
        }
        // Add if not exists
        const comicIdInArr = state.readComics.indexOf(action.payload.path);
        if (comicIdInArr === -1) {
          state.readComics.unshift(action.payload.path);
        } else {
          // else remove and unshift to first
          state.readComics.splice(comicIdInArr, 1);
          state.readComics.unshift(action.payload.path);
        }
      }

      // console.log('history/comic: No effect')
    },
    removeReadComic: (state, action: PayloadAction<{ path: string }>) => {
      const comicPath = action.payload.path;
      // const readComic = state.readComics.find(str => str === comicPath);
      // ANCHOR: MODIFY STATE
      const id = state.readComics.indexOf(comicPath);
      if (id !== -1) {
        const cpts = state.comics[comicPath]?.chapters;
        cpts?.forEach((cpt) => delete state.readCpt[cpt.path]);
        const subId = state.subscribeComics.indexOf(comicPath);
        const downId = state.downloadComics.indexOf(comicPath);
        state.readComics = state.readComics.filter(
          (path) => path !== comicPath
        );
        if (subId === -1 && downId === -1) {
          delete state.comics[comicPath];
        }
      }
    },
    /**
     * Save chapter history
     * @returns add readAt field
     * Note: dispatch pushReadComic before use this reducer
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
        const newLastedReadChapter =
          curComic.chapters.find((cpt) => cpt.path === chapterPath)?.name || "";
        const newLastedReadPathList = curComic.lastedReadPathList;
        const id = newLastedReadPathList.indexOf(newLastedReadChapter);
        if (id > 0) {
          newLastedReadPathList.slice(id, 1);
          newLastedReadPathList.unshift(newLastedReadChapter);
        } else if (id === -1) {
          newLastedReadPathList?.length > 3
            ? newLastedReadPathList.slice(2, 1).push(newLastedReadChapter)
            : newLastedReadPathList.unshift(newLastedReadChapter);
        }
        const changedCurComic: HistoryComicT = {
          ...curComic,
          lastedReadChapter: newLastedReadChapter,
          lastedReadPathList: newLastedReadPathList,
          readAt: Date.now(),
          chapters: curComic.chapters.map((cpt) => {
            // If found reading chapter -> add fill read at
            if (cpt.path === chapterPath) {
              const changedCurChapter: resComicDetailChapterItem_T &
                TimestampT = {
                ...cpt,
                readAt: Date.now()
              };
              return changedCurChapter;
            }
            // else do nothing
            return cpt;
          })
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
        // Delete if not need
        const readComicPath = state.readComics.find(
          (path) => path === resultPath
        );

        if (!readComicPath && !state.comics[comic.path]?.downloadCount) {
          state.comics[comic.path] = undefined;
        }
      } else {
        // Subscribe
        const historyComic: HistoryComicT = {
          ...action.payload,
          // readAt: Date.now(),
          lastedReadPathList: [],
          subtribe: Date.now()
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
            // findResult.chapters.unshift(
            //   ...action.payload.chapters.slice(0, pushNum)
            // );
            findResult.chapters = action.payload.chapters;
            state.comics[action.payload.path] = findResult;
          }
        }
        state.subscribeComics.unshift(historyComic.path);
      }
    },

    unSubscribeComic: (state, action: PayloadAction<string>) => {
      const comicPath = action.payload;

      const resultPath = state.subscribeComics.find(
        (path) => path === comicPath
      );

      if (resultPath) {
        // Unsubscribe
        state.subscribeComics = state.subscribeComics.filter(
          (path) => path !== resultPath
        );
        // Delete if dont need
        const readComicPath = state.readComics.find(
          (path) => path === resultPath
        );

        if (!readComicPath && !state.comics[comicPath]?.downloadCount) {
          delete state.comics[comicPath];
        }
      }
    },

    /**
     * Save 1 downloaded chapter
     * Note: use pushComic before dispatch this reducer
     * This is a support async thunk action
     */
    pushDownloadChapter: (
      state,
      action: PayloadAction<{
        comic: resComicDetail_T;
        chapter: resChapterDetail_T;
      }>
    ) => {
      const comicPath = action.payload.comic.path;
      const chapterPath = action.payload.chapter.path;

      // Find comic in state
      // If not found -> error
      const comic = state.comics[comicPath];
      if (!comic) {
        console.log("Not found comic, no effect !");
        return;
      }

      // find chapter, if exists add downloadCpt
      const result = comic.chapters.find((cpt) => {
        return cpt.path === chapterPath;
      });
      if (result) {
        // ANCHOR: MODIFY STATE
        state.downloadCpt[chapterPath] = action.payload.chapter;
        if (state.downloadComics.indexOf(comicPath) === -1)
          state.downloadComics.push(comicPath);

        const dc = state.comics[comicPath]?.downloadCount;
        const comic = state.comics[comicPath];
        if (comic) comic.downloadCount = dc ? dc + 1 : 0;
      } else console.log("Not found chapter in object, no effect!");
    },
    removeDownloadChapter: (
      state,
      action: PayloadAction<{ comicPath: string; chapterPath: string }>
    ) => {
      const { chapterPath, comicPath } = action.payload;
      const downloadCount = state.comics[comicPath]?.downloadCount;
      const comic = state.comics[comicPath];
      // ANCHOR: REMOVE downloadCpt
      // update downloadCount or remove comic, downloadComic
      state.downloadCpt[chapterPath] = undefined;
      if (downloadCount) {
        const id = state.downloadComics.indexOf(comicPath);
        if (id) {
          state.downloadComics.splice(id, 1);
        }
        // Check and remove comic
        if (
          !(state.readComics.indexOf(comicPath) !== -1) &&
          !(state.subscribeComics.indexOf(comicPath) !== -1) &&
          comic?.downloadCount &&
          comic?.downloadCount <= 1
        ) {
          state.comics[comicPath] = undefined;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(downloadComicThunk.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  }
});

/**
 * ANCHOR: THUNKS
 */
export const downloadComicThunk = createAsyncThunk(
  "downloadComicThunk",
  async (
    props: { comic: resComicDetail_T; chapterPaths: string[] },
    { getState, dispatch }
  ) => {
    try {
      const state = getState();
      // let isComicErr = false
      let cptPathErrList: string[] = [];
      dispatch(historyAction.pushComic(props.comic));
      // Get chapter in loop
      for await (let path of props.chapterPaths) {
        console.log(
          `https://hahunavth-express-api.herokuapp.com/api/v1${path}`
        );

        const { data } = await axios.get(
          `https://hahunavth-express-api.herokuapp.com/api/v1${path}`
        );

        if (data) {
          const result = data as ApiResponse_T<resChapterDetail_T>;
          await addMultipleImgs(
            result.data?.images,
            props.comic.path,
            result.data.path
          )
            .then(() => {
              dispatch(
                historyAction.pushDownloadChapter({
                  comic: props.comic,
                  chapter: result.data
                })
              );
            })
            .catch((e) => {
              cptPathErrList.push(result.data.path);
              //  REMOVE CHAPTER IN MEMORY
              deleteChapter(props.comic.path, result.data.path);
            });
        }
      }
      return {
        isCptErr: cptPathErrList.length === props.chapterPaths.length,
        cptPathErrList
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const toggleSubscribeComicThunk = createAsyncThunk(
  "toggleSubscribeComicThunk",
  (comic: resComicDetail_T, { getState, dispatch }) => {
    const state = getState();

    return new Promise((res, rej) => {
      dispatch(historyAction.toggleSubscribeComic(comic));
    });
  }
);

/**
 * ANCHOR: EXPORT
 */
export default historySlice.reducer;
export const historyAction = historySlice.actions;

export const historySelector = (state: RootState) => state.history;
export const selectDownloadedChapters = createSelector(
  (state: RootState) => state.history.downloadCpt,
  (state) => state
);
// REVIEW: TEST NEW SELECTOR CREATOR
// const createFocusedSelector = createSelectorCreator(
//   defaultMemoize,
//   isEqual
//   // (s1, s2) => {
//   //   // console.log("Compare result: isFocused" + isFocused);
//   //   // console.log("Compare result: state" + state);
//   //   // console.log("Compare result: n" + n);
//   //   if (s2 == false) {
//   //   return false;
//   //   }
//   //   return isEqual(s1, s2);
//   // }
// );
export const selectReadComics = createSelector(
  [
    (state: any, isFocused?: boolean) => {
      // console.log("is focused: " + isFocused);
      return isFocused;
    },
    (state: RootState) => state.history.readComics,
    (state: RootState) => state.history.comics
  ],
  (isFocused, readComics, comics) => {
    console.log("is focused: " + isFocused);
    return !isFocused
      ? []
      : (readComics
          .map((cPath) => comics[cPath])
          .filter(Boolean) as HistoryComicT[]);
  },
  {
    // New in 4.1: Pass options through to the built-in `defaultMemoize` function
    memoizeOptions: {
      equalityCheck: (a, b) => {
        console.log("Compare result: " + (a === b));
        return a === b;
      }
      // maxSize: 10
      // resultEqualityCheck: shallowEqual
    }
  }
);
export const selectSubscribeComics = createSelector(
  [
    (state: any, isFocused?: boolean) => isFocused,
    (state: RootState) => state.history.subscribeComics,
    (state: RootState) => state.history.comics
  ],
  (isFocused, subscribeComics, comics) =>
    !isFocused
      ? []
      : (subscribeComics
          .map((cPath) => comics[cPath])
          .filter(Boolean) as HistoryComicT[])
);
export const selectDownloadedComics = createSelector(
  [
    (state: any, isFocused?: boolean) => isFocused,
    (state: RootState) => state.history.downloadComics,
    (state: RootState) => state.history.comics
  ],
  (isFocused, downloadComics, comics) =>
    // !isFocused
    //   ? []
    //   :
    (downloadComics?.map((str) => comics[str]) || []) as HistoryComicT[]
);

export const selectReadChapters = createSelector(
  (state: RootState) => state.history.readCpt,
  (state) => state
);
export const selectThisComicIsSubscribed = createSelector(
  [
    (state: RootState) => state.history.subscribeComics,
    (state: any, myPath: string) => myPath
  ],
  (subscribeComics, myPath) => subscribeComics.find((path) => path === myPath)
);

export const selectLastedReadChapterPath = createSelector(
  [
    (state: RootState) => state.history.comics,
    (state: any, myPath: string) => myPath
  ],
  (comics, myPath) => comics[myPath]?.lastedReadChapter
);
export const selectLastedReadChapterPathList = createSelector(
  [
    (state: RootState) =>
      state.home?.currentComic?.path
        ? state.history.comics[state.home?.currentComic?.path]
            ?.lastedReadPathList
        : null,
    (state: RootState) => state.home.currentComic?.chapters || null
  ],
  (pathList, cptList) => {
    console.log(cptList);
    return (pathList
      ?.map((path) => cptList?.find((_cpt) => _cpt.name === path))
      .filter((c) => c) || []) as resComicDetailChapterItem_T[];
  }
  // (comicPath, comics) =>
  //   comicPath
  //     ? (comics[comicPath]?.lastedReadPathList
  //         .map((path) =>
  //           comics[comicPath]?.chapters.find((c) => c?.path === path)
  //         )
  //         .filter((c) => c) as resComicDetailChapterItem_T[])
  //     : undefined
);
