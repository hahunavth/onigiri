import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'

import { NavigationHeader } from 'app/components/NavigationHeader'
import {
  ChapterScreen,
  ComicDetailScreen,
  ComicListScreen,
  FindResultScreen,
  LoginScreen,
  SignupScreen,
  TestScreen,
  TopComicScreen
} from 'app/screens'

import BottomNav from './BottomNav'
import type { resComicItem_T, resComicDetail_T } from '../types'
import { SelectDownloadChapter } from '../screens/SelectDownloadChapterScreen/SelectDownloadChapter'

/**
 * Using common params
 * Routing expo with react navigation and next.js with same params
 * @param preloadItem: option in expo
 */
export type StackNavParamsList = {
  main: undefined
  'comic-detail': {
    path: string
    preloadItem?: Partial<resComicItem_T>
  }
  'comic-list': undefined
  chapter: {
    path: string
    id: number
    preloadItem?: Partial<resComicDetail_T>
  }
  'find-result': undefined
  'top-comic': undefined
  test: {
    name: string
    id: string | number
  }
  login: undefined
  'sign-up': undefined
  'select-download-chapter': {
    comic: resComicDetail_T
  }
  'downloaded-chapter': {
    path: string
    id: number
    preloadItem?: Partial<resComicDetail_T>
  }
}

/**
 * Screen props
 */
export type ComicDetailScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  'comic-detail'
>
export type ChapterScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  'chapter'
>
export type SelectDownloadChapterProps = NativeStackScreenProps<
  StackNavParamsList,
  'select-download-chapter'
>
export type DownloadedChapterScreen = NativeStackScreenProps<
  StackNavParamsList,
  'downloaded-chapter'
>

/**
 * Export navigation
 */
const { Navigator, Screen } = createNativeStackNavigator<StackNavParamsList>()

export function StackNav() {
  return (
    <Navigator
      screenOptions={{
        header: NavigationHeader
      }}
    >
      <Screen
        name="main"
        options={{
          headerShown: false
        }}
        component={BottomNav}
      ></Screen>

      <Screen
        name="comic-detail"
        options={{
          title: 'Comic Detail Screen',
          headerShown: false
        }}
        component={ComicDetailScreen}
      ></Screen>

      <Screen
        name="chapter"
        options={{
          title: 'Chapter Screen',
          headerShown: false
        }}
        component={ChapterScreen}
      ></Screen>

      <Screen
        name="comic-list"
        options={{
          title: 'Comic List Screen'
        }}
        component={ComicListScreen}
      ></Screen>

      <Screen
        name="find-result"
        options={{
          title: 'Find Result Screen'
        }}
        component={FindResultScreen}
      ></Screen>

      <Screen
        name="login"
        options={{
          title: 'Login Screen'
        }}
        component={LoginScreen}
      ></Screen>

      <Screen
        name="sign-up"
        options={{
          title: 'Sign Up Screen'
        }}
        component={SignupScreen}
      ></Screen>

      <Screen
        name="test"
        options={{
          title: 'Test Screen'
        }}
        component={TestScreen}
      ></Screen>

      <Screen
        name="top-comic"
        options={{
          title: 'Top Comic Screen'
        }}
        component={TopComicScreen}
      ></Screen>

      <Screen
        name="select-download-chapter"
        options={{
          title: 'Select chapters'
        }}
        component={SelectDownloadChapter}
      ></Screen>
    </Navigator>
  )
}
