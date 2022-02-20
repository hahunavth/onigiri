import {
  ApiResponse_T,
  resChapterDetail_T,
  resComicDetail_T,
  resComicItem_T
} from 'app/types'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import axios from 'axios'

const fetchUserById = createAsyncThunk(
  'home/fetchData',
  // if you type your function argument here
  async (userId: number) => {
    const { data } = await axios.get(
      `https://hahunavth-express-api.herokuapp.com/api/v1/recently`
    )
    return data as ApiResponse_T<resComicItem_T[]>
  }
)

export const fetchRecentlyAsync = createAsyncThunk(
  'home/fetchRecently',
  async (page: number) => {
    try {
      const response = await axios.get(
        `https://hahunavth-express-api.herokuapp.com/api/v1/recently?page=${page}`
      )
      return response.data as ApiResponse_T<resComicItem_T[]>
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchHotAsync = createAsyncThunk(
  'home/fetchHot',
  async (page: number) => {
    return (
      await axios.get(
        `https://hahunavth-express-api.herokuapp.com/api/v1/recently?page=${page}`
      )
    ).data as ApiResponse_T<resComicItem_T[]>
  }
)

const initialState: {
  status: 'idle' | 'loading' | 'success'
  recently: resComicItem_T[]
  hot: resComicItem_T[]
  currentComic: resComicDetail_T | null
  currentChapter:
    | (resChapterDetail_T & {
        id: number
      })
    | null
} = {
  status: 'loading',
  recently: [],
  hot: [],
  currentComic: null,
  currentChapter: null
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<resComicItem_T[]>) => {
      return { ...state, recently: action.payload }
    },
    setCurrentComic: (
      state,
      action: PayloadAction<resComicDetail_T | undefined>
    ) => {
      return { ...state, currentComic: action.payload || null }
    },
    removeCurrentComic: (state, action: PayloadAction<undefined>) => {
      return { ...state, currentComic: null }
    },
    setCurrentChapter: (
      state,
      action: PayloadAction<(resChapterDetail_T & { id: number }) | undefined>
    ) => {
      return { ...state, currentChapter: action.payload || null }
    },
    removeCurrentChapter: (state, action: PayloadAction<undefined>) => {
      return { ...state, currentChapter: null }
    }
  },
  // extraReducers: {
  //   [fetchRecentlyAsync.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        return { ...state, status: 'loading' }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        return { ...state, status: 'idle' }
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        return { ...state, status: 'success' }
      })
      .addCase(fetchRecentlyAsync.fulfilled, (state, action) => {
        state = {
          ...state,
          status: 'success',
          recently: action.payload?.data || []
        }
        return state
      })
      .addCase(fetchRecentlyAsync.pending, (state, action) => {
        state.status = 'loading'
        return state
      })
      .addCase(fetchRecentlyAsync.rejected, (state, action) => {
        state.status = 'idle'
        return state
      })
  }
})

export const homeActions = homeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const homeSelector = (state: RootState) => state.home

export default homeSlice.reducer
