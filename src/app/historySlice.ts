import { resComicDetailChapterItem_T, resComicDetail_T } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

type TimestampT = {
  createdAt?: Date | number | string;
  updatedAt?: Date | number | string;
};

type HistoryComicT = resComicDetail_T &
  TimestampT & {
    chapters: (resComicDetailChapterItem_T & TimestampT)[];
    lastedReadChapter?: string;
  };

type HistoryStoreT = {
  comics: HistoryComicT[];
};

const initialState: HistoryStoreT = {
  comics: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    pushComic: (state, action: PayloadAction<resComicDetail_T>) => {
      const historyComic: HistoryComicT = {
        ...action.payload,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastedReadChapter: "",
      };
      return {
        ...state,
        comics: [...state.comics, historyComic],
      };
    },
    pushChapter: (
      state,
      action: PayloadAction<{ comicPath: string; chapterPath: string }>
    ) => {
      return {
        ...state,
        comics: state.comics.map((c) => {
          if (c.path === action.payload.comicPath) {
            return {
              ...c,
              chapters: c.chapters.map((cpt) => {
                if (cpt.path === action.payload.chapterPath) {
                  return {
                    ...cpt,
                    createdAt: Date.now(),
                  };
                }
                return cpt;
              }),
            };
          }
          return c;
        }),
      };
    },
  },
});

export const historyAction = historySlice.actions;
export const historySelector = (state: RootState) => state.history;
export default historySlice.reducer;
