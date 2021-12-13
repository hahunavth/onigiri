import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from './store';

type themeT = 'dark' | 'light'

type settingType = {
  theme: themeT,
}

const initialState: settingType = {
  theme: 'light',
 }

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<undefined>) => {
      return {...state, theme: state.theme === 'dark' ? 'light' : 'dark'}
    }
  }
})

export const settingAction = settingSlice.actions;

export const settingSelector = (state: RootState) => state.setting;

export default settingSlice.reducer;
