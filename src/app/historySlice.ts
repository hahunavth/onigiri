import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

type WriteTime = {
  createdAt: Date;
  updatedAt: Date;
};

type HistoryStoreT = {
  comics: {
    [k: string]: WriteTime;
  };
  chapters: {
    [k: string]: WriteTime;
  };
};

const initialState: HistoryStoreT = {
  comics: {},
  chapters: {},
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    pushComic: (state, action: PayloadAction<string>) => {
      const comicPath = action.payload;
      if (!comicPath) {
        return state;
      }

      if (state.comics[comicPath]) {
        const prevComic = state.comics[comicPath];
        const nextComic: WriteTime = {
          ...prevComic,
          updatedAt: new Date(),
        };
        return {
          ...state,
          comics: { ...state.comics, [comicPath]: nextComic },
        };
      }

      return {
        ...state,
        comics: {
          ...state.comics,
          [comicPath]: {
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      };
    },

    pushChapter: (state, action: PayloadAction<string>) => {
      const chapterPath = action.payload;
      if (!chapterPath) {
        return state;
      }

      if (state.chapters[chapterPath]) {
        const prevComic = state.chapters[chapterPath];
        const nextComic: WriteTime = {
          ...prevComic,
          updatedAt: new Date(),
        };
        return {
          ...state,
          chapters: { ...state.chapters, [chapterPath]: nextComic },
        };
      }

      return {
        ...state,
        chapters: {
          ...state.chapters,
          [chapterPath]: {
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      };
    },
  },
});


export const historyAction = historySlice.actions;
export const historySelector = (state: RootState) => state.history;
export default historySlice.reducer;