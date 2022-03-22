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
  withTiming,
  SlideInDown
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
  selectLastedReadChapterPath,
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
import useRaf from 'react-use/esm/useRaf'
import { useThemedColor } from '../Typo'
// import { ANbView } from '../Typo/View'

type ComicDetailBottomBarProps = {
  comic?: resComicDetail_T
  path: string
  // handleReadNowClick: () => any
  // handleSubscribeClick: () => any
}

const ComicDetailBottomBar = React.memo(
  ({
    path,
    comic
  }: // handleReadNowClick,
  // handleSubscribeClick
  ComicDetailBottomBarProps) => {
    const { boxStyle: bs1 } = useColorModeStyle('Blue', 'Secondary')
    const subscribed = !!useAppSelector((state) =>
      selectThisComicIsSubscribed(state, path || ('' as any))
    )

    // ANIMATED
    // const offset = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
      return {
        //  opacity: offset.value,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
      }
    })

    // useInteraction({
    //   callback: () => {
    //     offset.value = withTiming(1)
    //   }
    // })

    const dispatch = useAppDispatch()

    const lastedReadCptName = useAppSelector((state) =>
      selectLastedReadChapterPath(state, comic?.path || '')
    )
    // NOTE: Handle function
    const handleSubscribeClick = useCallback(() => {
      if (comic) dispatch(toggleSubscribeComicThunk(comic))
    }, [comic])

    const currCptId = React.useMemo(() => {
      return comic?.chapters.findIndex((cpt) => cpt.name === lastedReadCptName)
    }, [comic, lastedReadCptName])

    const handleReadNowClick = useCallback(() => {
      if (typeof currCptId === 'number' && currCptId !== -1) {
        navigate('chapter', {
          id: currCptId,
          path: comic?.chapters[currCptId].path || '',
          name: comic?.chapters[currCptId].name
        })
      } else {
        const chapter1 = comic?.chapters[comic?.chapters.length - 1]
        chapter1?.path &&
          comic?.chapters.length &&
          navigate('chapter', {
            id: comic?.chapters.length - 1,
            name: chapter1.name,
            path: chapter1.path
          })
      }
    }, [comic])

    const {
      backgroundPrimary,
      backgroundSecondary,
      textPrimary,
      textSecondary
    } = useThemedColor()

    // TODO: FIX ANY STYLE
    return (
      <Animated.View
        // shadow={'3'}
        // entering={SlideInDown.duration(500)}
        style={animatedStyle}
      >
        <TouchableOpacity
          style={styles.shareIconTouchOpacity}
          onPress={ToastComingSoon}
        >
          <AntDesign name="sharealt" size={24} style={{ color: textPrimary }} />
          <Text style={[styles.shareIconText, { color: textPrimary }]}>
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubscribeClick}
          style={styles.subscribeTouchOpacity}
        >
          <AntDesign
            name="adduser"
            size={24}
            style={{ color: subscribed ? 'red' : textPrimary }}
          />
          <Text
            style={
              {
                fontSize: 11,
                color: subscribed ? 'red' : textPrimary
              } as any
            }
          >
            Subscribe
          </Text>
        </TouchableOpacity>
        <Button
          _pressed={{ bg: 'warning.900' }}
          bg={'$light.backgroundButton'}
          _text={{ color: '$light.textButton' }}
          _dark={{
            bg: '$dark.backgroundButton',
            _text: { color: '$dark.textButton' }
          }}
          style={styles.readNowBtn}
          onPress={handleReadNowClick}
        >
          {lastedReadCptName ? (
            <Text numberOfLines={1} color={'white'}>
              Read {lastedReadCptName}
            </Text>
          ) : (
            'Read now!'
          )}
        </Button>
      </Animated.View>
    )
  }
)

const ToastComingSoon = () => {
  ToastAndroid.show('Coming Soon!', 500)
}

export const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1
  },
  container: {
    flex: 1
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1
  },
  headerIconContainer: {
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    height: 72,
    alignItems: 'center',
    marginHorizontal: 4
  },
  overlayName: {
    fontSize: 24
  },
  collapsedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 2
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1
  },
  downloadIconContainer: { alignSelf: 'flex-end', flexDirection: 'row' },
  shareIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
    // backgroundColor: 'red',
    // opacity: 0
  },
  shareIconTouchOpacity: {
    margin: 'auto',
    alignItems: 'center',
    marginLeft: 24
  },
  shareIconText: { fontSize: 11 },
  subscribeTouchOpacity: {
    margin: 'auto',
    alignItems: 'center'
  },
  readNowBtn: {
    width: 210,
    borderRadius: 100,
    margin: 0,
    padding: 0,
    marginRight: 12
  }
})

export default ComicDetailBottomBar
