import React, { useEffect, useRef, useContext } from 'react'
import {
  ListRenderItemInfo,
  Dimensions,
  InteractionManager,
  StyleSheet,
  FlatList as FlatListT,
  Platform
} from 'react-native'
import { View, Text, FlatList, HStack } from 'native-base'
import { ChapterScreenProps } from 'app/navigators/StackNav'
import { useApiChapter } from 'app/store/api'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import ChapterBar from './ChapterBar'
import ChapterHeader from './ChapterHeader'
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import useUpdateCurrentChapter from '../../hooks/useUpdateCurrentChapter'
import useInteraction from '../../hooks/useInteraction'
import ChapterViewVerticalList from './ChapterViewVerticalList'
import ChapterContextProvider, { ChapterContext } from './ChapterContext'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { FontAwesome } from '@expo/vector-icons'
import { CommentBottomSheet, CommentLoader } from '../../components/Comment'
import { homeSelector } from '../../store/homeSlice'
import { ChapterViewHorizontalList } from './ChapterViewHorizontalList'

export function ChapterScreen(props: ChapterScreenProps) {
  return (
    <ChapterContextProvider>
      <ChapterScreenNode {...props} />
    </ChapterContextProvider>
  )
}

let oldOffset = 0
const screenHeight = Dimensions.get('screen').height

function ChapterScreenNode(props: ChapterScreenProps) {
  const {
    ctxId,
    ctxName,
    ctxPath,
    setCtxId,
    setCtxName,
    setCtxPath,
    viewStatus
  } = useContext(ChapterContext)

  const comicPath = useAppSelector(homeSelector).currentComic?.path

  const { path, name, id, preloadItem } = props.route.params
  const flatListRef = React.useRef<FlatListT>(null)

  useEffect(() => {
    setCtxId && setCtxId(id)
    setCtxName && setCtxName(name || '')
    setCtxPath && setCtxPath(path)
  }, [])

  // const {} = props.navigation.
  // ANCHOR: ANIMATION
  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(offset.value, {
            duration: 200,
            easing: Easing.in(Easing.linear)
          })
        }
      ]
    }
  })

  const animatedStyles2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(offset.value, {
            duration: 200,
            easing: Easing.in(Easing.linear)
          })
        }
      ]
    }
  })
  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: 1 - offset.value / 100,
      transform: [
        {
          translateY: withTiming(-offset.value * 2, {
            duration: 100,
            easing: Easing.in(Easing.linear)
          })
        }
      ]
    }
  })
  const splashOffset = useSharedValue(0)
  const splashStyles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      backgroundColor: 'white',
      opacity: withTiming(1 - splashOffset.value / 2, {
        duration: 800,
        easing: Easing.inOut(Easing.sin)
      }),
      transform: [
        {
          translateY: withTiming(-splashOffset.value * screenHeight, {
            duration: 800,
            easing: Easing.in(Easing.exp)
          })
        }
      ]
    }
  })

  // ANCHOR: DATA LOGIC
  // VAr
  const { data, isFetching } = useApiChapter(ctxPath || path)
  const chapterInfo = data?.data

  const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([])

  // UPDATE IMAGE LIST
  // useEffect(() => {
  //   // NOTE: Do not using if here
  //   // useEffect run when change path (navigate to new chapter)
  //   // if (!imgs.length) {
  //     setImgs(chapterInfo?.images.map((uri) => ({ uri, h: 0 })) || [])
  //     setIsLoading(false)
  //   // }
  // }, [path])

  // NOTE: Start animation when change chapter
  React.useEffect(() => {
    // reset
    setImgs([])
    flatListRef.current?.scrollToIndex({ animated: true, index: 0 })
    splashOffset.value = 0
  }, [ctxPath])

  useInteraction({
    callback: () => {
      setImgs(chapterInfo?.images.map((uri) => ({ uri, h: 0 })) || [])
    },
    dependencyList: [ctxPath, chapterInfo]
  })

  // DISPATCH ACTION
  const { loading } = useUpdateCurrentChapter({
    chapterDetail: data?.data,
    id: ctxId,
    isFetching,
    callback: () => (splashOffset.value = 2)
  })

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)
  // MEMO
  const handleScroll = React.useCallback((e) => {
    // NOTE: V1: Chapter bar show related with scroll
    // const currentOffset = e.nativeEvent.contentOffset.y
    // const newScrollValue = offset.value + currentOffset - oldOffset
    // if (newScrollValue > 100) {
    //   offset.value = 100
    //   headerVisible = false
    // } else if (newScrollValue < 0) offset.value = 0
    // else offset.value = newScrollValue
    // oldOffset = currentOffset

    // NOTE: V2: Chapter bar when scroll end or tap
    const currentOffset = e.nativeEvent.contentOffset.y
    const scrollLen = currentOffset - oldOffset
    if (scrollLen > 6 && currentOffset > 32) {
      offset.value = 64
      // bottomSheetRef.current?.close()
    } else if (scrollLen < -10) {
      offset.value = 0
      // bottomSheetRef.current?.snapToIndex(0)
    }
    oldOffset = currentOffset
  }, [])

  const toggleFloatingVisible = React.useCallback(() => {
    if (offset.value > 0) offset.value = 0
    else offset.value = 64
  }, [offset])

  const expandSheet = React.useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0)
  }, [])

  useEffect(() => {
    bottomSheetRef.current?.close()
  }, [ctxId])

  // return <ComicViewHorizontaList />

  return (
    <>
      <SafeAreaView style={style.container}>
        {/* Splash */}
        <Animated.View style={splashStyles}>
          <Text style={style.splashText}>{ctxName}</Text>
        </Animated.View>

        {/* ComicView */}
        {loading ? null : viewStatus === 'vertical' ? (
          <View style={style.container}>
            <ChapterViewVerticalList
              ref={flatListRef as any}
              handleScroll={handleScroll}
              imgs={imgs}
              imgList={chapterInfo?.chapterList || []}
              setImgs={setImgs}
              onEndReach={expandSheet}
            />
          </View>
        ) : (
          <ChapterViewHorizontalList
            ref={flatListRef as any}
            handleScroll={handleScroll}
            imgs={imgs}
            imgList={chapterInfo?.chapterList || []}
            setImgs={setImgs}
            onEndReach={expandSheet}
            toggleFloatingVisible={toggleFloatingVisible}
          />
        )}
      </SafeAreaView>

      {/* Floading */}
      <ChapterHeader style={headerAnimatedStyles} name={ctxName} />
      <ChapterBar style={animatedStyles} onCommentClick={expandSheet} />
      {/* FIXME: NOT SUPPORT FOR WEB */}
      {Platform.OS !== 'web' && loading ? null : (
        <CommentBottomSheet ref={bottomSheetRef} path={comicPath || ''} />
      )}
    </>
  )
}

const style = StyleSheet.create({
  splashText: {
    fontSize: 24,
    color: 'black'
  },
  container: { flex: 1 },
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center'
  }
})
