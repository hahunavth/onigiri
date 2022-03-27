import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
type RecentSliceT = {
  findNames: string[];
};

const initialState: RecentSliceT = {
  findNames: []
};

const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    pushFindName: (state, action: PayloadAction<string>) => {
      const id = state.findNames.indexOf(action.payload);
      console.log(id);
      if (id === 0) {
        return;
      } else if (id > 0) {
        state.findNames.slice(id, 1);
      }
      state.findNames.unshift(action.payload);
    },
    removeFindName: (state, action: PayloadAction<string>) => {
      const index = state.findNames.indexOf(action.payload);
      if (index !== -1) state.findNames.splice(index, 1);
    },
    removeAllFindNames: (state) => {
      state.findNames = [];
    }
  }
});

export const recentAction = recentSlice.actions;
export const recentSelector = (state: RootState) => state.recent;
export default recentSlice.reducer;
