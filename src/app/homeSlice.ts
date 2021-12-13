import { ApiRespone_T, resComicItem_T } from "@/types/api";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

const fetchUserById = createAsyncThunk(
  "home/fetchData",
  // if you type your function argument here
  async (userId: number) => {
    const response = await fetch(
      `https://hahunavth-express-api.herokuapp.com/api/v1/recently`
    );
    return (await response.json()) as ApiRespone_T<resComicItem_T[]>;
  }
);

export const fetchRecentlyAsync = createAsyncThunk(
  "home/fetchRecently",
  async (page: number) => {
    try {
      const response = await axios.get(
        `https://hahunavth-express-api.herokuapp.com/api/v1/recently?page=${page}`
      );
      return response.data as ApiRespone_T<resComicItem_T[]>;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchHotAsync = createAsyncThunk(
  "home/fetchHot",
  async (page: number) => {
    return (
      await axios.get(
        `https://hahunavth-express-api.herokuapp.com/api/v1/recently?page=${page}`
      )
    ).data as ApiRespone_T<resComicItem_T[]>;
  }
);

const initialState: {
  status: "idle" | "loading" | "success";
  recently: resComicItem_T[];
  hot: resComicItem_T[];
} = {
  status: "loading",
  recently: [],
  hot: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<resComicItem_T[]>) => {
      return { ...state, recently: action.payload };
    },
  },
  // extraReducers: {
  //   [fetchRecentlyAsync.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        return { ...state, status: "loading" };
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        return { ...state, status: "idle" };
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        return { ...state, status: "success" };
      })
      .addCase(fetchRecentlyAsync.fulfilled, (state, action) => {
        state = { ...state, status: "success", recently: action.payload?.data || [] };
        return state;
      })
      .addCase(fetchRecentlyAsync.pending, (state, action) => {
        state.status = "loading";
        return state;
      })
      .addCase(fetchRecentlyAsync.rejected, (state, action) => {
        state.status = "idle";
        return state;
      });
  },
});

export const homeActions = homeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHome = (state: RootState) => state.home;

export default homeSlice.reducer;
