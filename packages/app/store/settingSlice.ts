import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import i18n from 'i18n-js'
import * as Localization from 'expo-localization'

type themeT = 'dark' | 'light'
type languageT = 'en-EN' | 'ja-JP' | 'vi-VN'

type settingType = {
  theme: themeT
  language: languageT
}

const initialState: settingType = {
  theme: 'light',
  language: Localization.locale as languageT
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<undefined>) => {
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
      // state.theme === 'dark'
    },
    changeLanguage: (state, action: PayloadAction<languageT>) => {
      state.language = action.payload
      i18n.locale = action.payload
    }
  }
})

export const settingAction = settingSlice.actions

export const settingSelector = (state: RootState) => state.setting

export default settingSlice.reducer
