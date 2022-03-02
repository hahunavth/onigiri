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
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'
// App
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { goBack, navigate } from 'app/navigators'
import {
  historySelector,
  selectDownloadedChapters,
  selectThisComicIsSubcribed,
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
import CollapseTab from './CollapseTab'

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign)
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons)

type Props = {
  comic?: resComicDetail_T
  offline?: boolean
  headerDiff: number
  translateY: Readonly<Animated.SharedValue<number>>
}

const CollapseTop = (props: Props) => {
  const { headerDiff, translateY } = props
  const handleGoBack = useCallback(() => goBack(), [])
  const handleDownloadClick = useCallback(
    () =>
      props.comic &&
      navigate('select-download-chapter', { comic: props.comic }),
    [props.comic]
  )
  // NOTE:color
  const { boxStyle: bs1 } = useColorModeStyle('Blue', 'Secondary')

  /**
   * FIXME: Animation not work in first render
   */
  const headerIconStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        -translateY.value,
        [0, headerDiff],
        ['#fff', '#111']
      )
    }
  })
  const headerIconStyle2 = useAnimatedStyle(() => {
    return {
      marginRight: 4,
      marginBottom: 4,
      color: interpolateColor(
        -translateY.value,
        [0, headerDiff],
        ['#fff', '#111']
      )
    }
  })
  const headerIconStyle3 = useAnimatedStyle(() => {
    return {
      marginTop: 4,
      color: interpolateColor(
        -translateY.value,
        [0, headerDiff],
        ['#fff', '#111']
      )
    }
  }, [translateY.value])

  return (
    <SafeAreaView style={styles.headerIconContainer}>
      <TouchableOpacity onPress={handleGoBack}>
        <AnimatedAntDesign name="arrowleft" size={34} style={headerIconStyle} />
      </TouchableOpacity>
      <View style={styles.downloadIconContainer}>
        {props.offline ? (
          <Badge variant={'subtle'} colorScheme={'danger'}>
            Offline
          </Badge>
        ) : (
          <TouchableOpacity onPress={handleDownloadClick}>
            <AnimatedIonicons
              name="ios-download-outline"
              size={34}
              color={bs1.backgroundColor}
              style={headerIconStyle2}
            />
          </TouchableOpacity>
        )}
        <AnimatedAntDesign
          name="menuunfold"
          size={30}
          style={headerIconStyle3}
        />
      </View>
    </SafeAreaView>
  )
}

// export default CollapseTop
export default React.memo(CollapseTop)
