import { settingAction } from './../store/settingSlice'
//
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import en from './en'
import jp from 'app/i18n/jp.json'
import vi from 'app/i18n/vi.json'
import store from '../store/store'
/**
 *
 * i18n
 *
 */
i18n.translations = {
  en: en,
  ja: jp,
  vi: vi
}

i18n.fallbacks = true
