import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'

import {
  NavigationHeader,
  SearchNavigationHeader
} from 'app/components/NavigationHeader'
import {
  ChapterScreen,
  ComicDetailScreen,
  ComicListScreen,
  FindResultScreen,
  LoginScreen,
  SignupScreen,
  TestScreen,
  TopComicScreen,
  OfflineChapterScreen,
  OfflineComicScreen
} from 'app/screens'

import BottomNav from './BottomNav'
import type {
  resComicItem_T,
  resComicDetail_T,
  resChapterDetail_T
} from '../types'
import { SelectDownloadChapter } from '../screens/SelectDownloadChapterScreen/SelectDownloadChapter'
import { HistoryComicT } from '../store/historySlice'
import { FindOptionT } from '../screens/DiscoverScreen/constants'
import Header from '../components/CollapseHeader/Header'
import { Icon, Text, View } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MotiView } from 'moti'
import { FindByNameResultScreen } from '../screens/FindByNameResultScreen'

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
  'find-result': {
    path: string
    findOption: FindOptionT
  }
  'find-by-name-result': {
    name: string
  }
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
  'offline-comic-screen': {
    path: string
    // Load comic from source and pass navigate
    // comic: Partial<HistoryComicT>
  }
  'offline-chapter-screen': {
    comicPath: string
    chapterPath: string
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
export type OfflineComicScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  'offline-comic-screen'
>
export type OfflineChapterScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  'offline-chapter-screen'
>
export type FindResultScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  'find-result'
>
export type FindByNameResultScreenProps = NativeStackScreenProps<
  StackNavParamsList,
  'find-by-name-result'
>

/**
 * Export navigation
 */
const { Navigator, Screen } = createNativeStackNavigator<StackNavParamsList>()

export function StackNav() {
  const renderHeader = React.useCallback(
    (props: any) => <NavigationHeader {...props} />,
    []
  )

  const renderRight = React.useCallback((props: any) => {
    return (
      <MotiView
        from={{
          transform: [{ scale: 0 }, { translateX: -10 }]
        }}
        animate={{
          transform: [{ scale: 1 }, { translateX: 0 }]
        }}
      >
        {/* <MaterialCommunityIcons
          name="feature-search"
          size={24}
          color="#000000"
        /> */}
        <AntDesign name="upsquare" size={24} color="black" />
        {/* <Text>aaa</Text> */}
      </MotiView>
    )
  }, [])

  return (
    <Navigator
      screenOptions={
        {
          // header: NavigationHeader
        }
      }
    >
      <Screen
        name="main"
        options={{
          headerShown: true,
          header: (props) => <SearchNavigationHeader {...props} />
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
          title: 'Find Result Screen',
          header: renderHeader,
          headerRight: renderRight
        }}
        component={FindResultScreen}
      ></Screen>

      <Screen
        name="find-by-name-result"
        options={{}}
        component={FindByNameResultScreen}
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

      <Screen
        name="offline-comic-screen"
        options={{ headerShown: false }}
        component={OfflineComicScreen}
      />

      <Screen name="offline-chapter-screen" component={OfflineChapterScreen} />
    </Navigator>
  )
}
