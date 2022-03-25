import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./store";

type ChapterStateT = {
  setting: {
    viewMode: "Vertical" | "Horizontal";
    theme: "light" | "dark" | "default";
  };
  current: {
    chapterId: number;
  };
};

const initialState: ChapterStateT = {
  setting: {
    viewMode: "Vertical",
    theme: "default"
  },
  current: {
    chapterId: -1
  }
};

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    reset: (state, action) => {
      return initialState;
    },
    setCurrentChapter: (state, action: PayloadAction<number>) => {
      state.current.chapterId = action.payload;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "default">) => {
      state.setting.theme = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"Vertical" | "Horizontal">) => {
      state.setting.viewMode = action.payload;
    }
  }
});

export const chapterActions = chapterSlice.actions;

export const chapterSelector = (state: RootState) => state.chapter;

export default chapterSlice.reducer;

//
export const selectCptSettingTheme = (state: RootState) =>
  state.chapter.setting.theme;
export const selectCptSettingViewMode = (state: RootState) =>
  state.chapter.setting.viewMode;
export const selectCptId = (state: RootState) =>
  state.chapter.current.chapterId;
export const selectChapterInfo = createSelector(
  [
    (state: RootState) => state.chapter.current.chapterId,
    (state: RootState) => state.home.currentComic?.chapters
  ],
  (cptId, cpts) => {
    return cpts && cptId !== -1 ? cpts[cptId] : {};
  }
);
