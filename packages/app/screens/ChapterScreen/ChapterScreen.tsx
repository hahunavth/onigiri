import React, { useEffect, useRef, useContext } from 'react'
import {
  ListRenderItemInfo,
  Dimensions,
  InteractionManager,
  StyleSheet,
  FlatList as FlatListT
} from 'react-native'
import { View, Text, FlatList } from 'native-base'
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
import ChapterViewListScreen from './ChapterViewListScreen'
import ChapterScreenContext, { ChapterContext } from './ChapterScreenContext'
import BottomSheet from '@gorhom/bottom-sheet'

export function ChapterScreen(props: ChapterScreenProps) {
  return (
    <ChapterScreenContext>
      <ChapterScreenNode {...props} />
    </ChapterScreenContext>
  )
}

let oldOffset = 0
const screenHeight = Dimensions.get('screen').height
function ChapterScreenNode(props: ChapterScreenProps) {
  const { ctxId, ctxName, ctxPath, setCtxId, setCtxName, setCtxPath } =
    useContext(ChapterContext)

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
  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: 1 - offset.value / 100,
      transform: [
        {
          translateY: withTiming(-offset.value * 2, {
            duration: 200,
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
    } else if (scrollLen < -10) {
      offset.value = 0
    }
    oldOffset = currentOffset
  }, [])
  // Bottom sheet
  //   // ref
  // const bottomSheetRef = useRef<BottomSheet>(null);
  // // variables
  // const snapPoints = React.useMemo(() => ['25%', '50%', Dimensions.get('window').height], []);
  // // callbacks
  // const handleSheetChanges = React.useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  return (
    <>
      <SafeAreaView style={style.container}>
        {/* Splash */}
        <Animated.View style={splashStyles}>
          <Text style={style.splashText}>{ctxName}</Text>
        </Animated.View>

        {/* ComicView */}
        {loading ? null : (
          <View style={style.container}>
            <ChapterViewListScreen
              ref={flatListRef as any}
              handleScroll={handleScroll}
              imgs={imgs}
              setImgs={setImgs}
            />
          </View>
        )}
      </SafeAreaView>

      {/* Floading */}
      <ChapterHeader style={headerAnimatedStyles} name={ctxName} />
      <ChapterBar style={animatedStyles} />
      {/* <BottomSheet
         ref={bottomSheetRef}
         index={1}
         snapPoints={snapPoints}
         onChange={handleSheetChanges}
       >
         <View style={{
           flex: 1
         }}>
           <Text>Awesome 🎉</Text>
         </View>
       </BottomSheet> */}
    </>
  )
}

const style = StyleSheet.create({
  splashText: {
    fontSize: 24,
    color: 'black'
  },
  container: { flex: 1 }
})
