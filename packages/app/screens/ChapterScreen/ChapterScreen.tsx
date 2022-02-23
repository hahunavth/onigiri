import React, { useEffect, useRef } from 'react'
import {
  ListRenderItemInfo,
  Dimensions,
  ActivityIndicator,
  InteractionManager
} from 'react-native'
import { View, Text, FlatList } from 'native-base'
// import ImageSize from "react-native-image-size";

import { ChapterScreenProps } from 'app/navigators/StackNav'
import { ScaledImage } from 'app/components/ScaledImage'
import { useApiChapter, usePrefetch } from 'app/store/api'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
// import { downloadAction, downloadSelector } from "app/store/downloadSlice";
import { homeActions, homeSelector } from 'app/store/homeSlice'

import { BlurHeader } from 'app/components/BlurHeader'
import ChapterBar from './ChapterBar'
import ChapterHeader from './ChapterHeader'
// import {} from "app/types";
import Animated, {
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withDelay
} from 'react-native-reanimated'
import { historyAction, historySelector } from 'app/store/historySlice'
import FadeInView from 'app/components/FadeInView'
// import SessionHeader from 'app/components/Common/SessionHeader'
import { NavigationHeader } from 'app/components/NavigationHeader/index.web'
import { SafeAreaView } from 'react-native-safe-area-context'

let oldOffset = 0
let headerVisible = true

const screenHeight = Dimensions.get('screen').height

export function ChapterScreen({
  route: {
    params: { path, id, name }
  }
}: ChapterScreenProps) {
  // ANCHOR: ANIMATION
  const offset = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => {
    return {
      // top: offset.value,
      transform: [
        {
          // offset.value,
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
          // offset.value,
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
  const home = useAppSelector(homeSelector)

  const { data, isLoading, isFetching } = useApiChapter(path)
  const dispatch = useAppDispatch()
  const chapterInfo = data?.data

  const [imgs, setImgs] = React.useState<{ uri: string; h: number }[]>([])
  useEffect(() => {
    if (!imgs.length) {
      setImgs(chapterInfo?.images.map((uri) => ({ uri, h: 0 })) || [])
    }
    // console.log(imgs)
  }, [isFetching])

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      if (!isFetching && data) {
        dispatch(homeActions.setCurrentChapter({ ...data?.data, id: id }))
        if (home.currentComic) {
          // console.log('setcomic')
          dispatch(historyAction.pushReadComic(home.currentComic))
          dispatch(
            historyAction.pushChapter({
              comicPath: home.currentComic?.path,
              chapterPath: data?.data.path
            })
          )
          console.log(home.currentComic?.path, data.data.path)

          // NOTE: SPLASH ANIMATION ON RENDER
        }
        splashOffset.value = 1
      }
    })
    return () => {
      interaction.cancel()
      dispatch(homeActions.removeCurrentChapter())
    }
  }, [isFetching, data])

  const renderItem = React.useCallback(
    ({ item, index }: ListRenderItemInfo<{ uri: string; h: number }>) => {
      return (
        <ScaledImage
          src={
            'https://hahunavth-express-api.herokuapp.com/api/v1/cors/' +
            item.uri
          }
          id={index}
          h={item.h}
          setImgs={setImgs}
        />
      )
    },
    []
  )

  if (isFetching || !data)
    return (
      <View
        style={[
          {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center'
            // backgroundColor: "red",
          }
        ]}
      >
        <Text
          style={{
            fontSize: 18
            // zIndex: 100
            // fontFamily: QFontFamily.Quicksand_600SemiBold
          }}
        >
          Loading...
        </Text>
        <Text
          style={{
            fontSize: 24
            // fontFamily: QFontFamily.Quicksand_600SemiBold
          }}
        >
          {name}
        </Text>
        {/* <Spinner size={'giant'} /> */}
      </View>
    )

  return (
    <>
      {/* {!isFetching && data && ( */}
      {/* <Text style={{ flex: 1 }}> */}
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
              backgroundColor: 'white'
            },
            splashStyles
          ]}
          // level={'2'}
        >
          <Text
            style={{
              fontSize: 24,
              // fontFamily: QFontFamily.Quicksand_600SemiBold,
              color: 'black'
            }}
          >
            {name}
          </Text>
        </Animated.View>
        <View style={{ flex: 1 }}>
          <ChapterHeader style={headerAnimatedStyles} />
          {/* <BlurHeader /> */}

          <FlatList
            data={imgs || []}
            renderItem={renderItem}
            // initialNumToRender={2}
            keyExtractor={(item, id) => item.uri}
            style={{ zIndex: 11 }}
            //#endregion

            onScroll={(e) => {
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
              //
              const scrollLen = currentOffset - oldOffset
              if (scrollLen > 6 && currentOffset > 32) {
                offset.value = 64
              } else if (scrollLen < -10) {
                offset.value = 0
              }
              // Update new state
              oldOffset = currentOffset
            }}
          />
        </View>
      </SafeAreaView>

      <ChapterBar style={animatedStyles} />
      {/* </Text> */}
      {/* )} */}
    </>
  )
}
