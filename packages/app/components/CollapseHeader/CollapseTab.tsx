// Lib
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  ViewProps,
  ViewStyle,
  InteractionManager
} from 'react-native'
import { Button, View, Text, Badge } from 'native-base'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  interpolateColor,
  withTiming
} from 'react-native-reanimated'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs'

// App
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { goBack, navigate } from 'app/navigators'
import {
  historySelector,
  selectDownloadedChapters,
  selectThisComicIsSubscribed,
  toggleSubscribeComicThunk
} from 'app/store/historySlice'
import { useColorModeStyle } from 'app/hooks/useColorModeStyle'
// Local
import Header, { HeaderConfig, Visibility } from './Header'
import HeaderOverlay from './HeaderOverlay'
import { ScrollPair } from './ScrollPair'
import useScrollSync from './useScrollSync'
import ChapterList from './ChapterList'
import TabBar from './TabBar'
import DetailList from './DetailList'
// Type
import type {
  resComicDetailChapterItem_T,
  resComicDetail_T,
  resComicItem_T
} from 'app/types'
import useInteraction from '../../hooks/useInteraction'
import usePrevious from 'react-use/esm/usePrevious'
import ComicDetailBottomBar, { styles } from './ComicDetailBottomBar'

const Tab = createMaterialTopTabNavigator()

type CollapseTabProps = {
  renderTabBar: (props: MaterialTopTabBarProps) => React.ReactNode
  renderFriends: () => JSX.Element
  renderSuggestions: () => JSX.Element
}

const CollapseTab = (props: CollapseTabProps) => {
  const { renderTabBar, renderFriends, renderSuggestions } = props

  // console.log('object')

  const screenOptions = useMemo<MaterialTopTabNavigationOptions>(
    () => ({
      tabBarLabelStyle: {},
      tabBarItemStyle: {
        margin: -5,
        justifyContent: 'center',
        alignItems: 'center'
      },
      tabBarPressOpacity: 0.1,
      tabBarIndicatorStyle: {
        backgroundColor: '#f0125cdf',
        flex: 1,
        height: 38,
        borderWidth: 5,
        borderRadius: 12,
        borderColor: 'transparent'

        // web
        // margin: 6,
        // // marginHorizontal: 20,
        // borderWidth: 0,
        // height: 25
        // 'box-sizing': 'border-box'
      },
      tabBarActiveTintColor: 'white',
      tabBarAllowFontScaling: false,
      tabBarInactiveTintColor: 'gray',
      tabBarPressColor: 'transparent',
      lazyPreloadDistance: 2
      // web
      // tabBarStyle: {
      //   // maxWidth: 500,
      //   paddingHorizontal: 'auto'
      // }
    }),
    []
  )

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      // pageMargin={10}
      backBehavior="none"
      screenOptions={screenOptions}
    >
      <Tab.Screen name="Friends">{renderFriends}</Tab.Screen>
      <Tab.Screen
        name="Suggestions"
        // component={renderSuggestions}
        // NOTE: Do not use component props like above
        //       It will rerender component when navigate
        //       Use children props will render once
      >
        {renderSuggestions}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default CollapseTab
// export default React.memo(CollapseTab)
