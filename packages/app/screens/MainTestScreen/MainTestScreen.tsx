// import { Button, FlatList, Input, Text, View } from 'native-base'
// import React from 'react'
// import {
//   TouchableNativeFeedback,
//   ListRenderItemInfo,
//   TextInput
// } from 'react-native'
// import { ComicListVertical } from '../../components/ComicListVertical'
// import { useApiInfinityRecently } from '../../hooks/useApiInfinityItem'
// import { useApiLazyRecently, useApiRecently } from '../../store/api'
// import { useAppDispatch, useAppSelector } from '../../store/hooks'
// import {
//   fetchNewChapterNotificationThunk,
//   notificationSelector
// } from '../../store/notificationSlice'
// import { resComicItem_T } from '../../types'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { fetchBackgroundTask } from '../../utils/backgroundFetchServices'

// export function MainTestScreen() {
//   // const { fetchNextPage, results } = useApiInfinityRecently()
//   // const dispatch = useAppDispatch()
//   // React.useEffect(() => {
//   //   dispatch(fetchNewChapterNotificationAsync())
//   // }, [])
//   // return <MemoComicListVertical list={results} onEndReach={fetchNextPage} />
//   const { count, mergeCount } = useAppSelector(notificationSelector)
//   const [str, setStr] = React.useState('')
//   const [text, setText] = React.useState('')
//   const inputRef = React.useRef<TextInput>()

//   React.useEffect(() => {
//     AsyncStorage.getItem('background-fetch-last-number').then((s) =>
//       s ? setStr(s) : null
//     )
//     fetchBackgroundTask()
//   }, [])

//   AsyncStorage.getAllKeys().then((a) => console.log(a))
//   AsyncStorage.getItem('notifications-template').then((a) => {
//     console.log('result')
//     console.log(a ? JSON.parse(a) : 'cant parse')
//   })

//   return (
//     <View>
//       <Text>Count: {count}</Text>
//       <Text>async storage background-fetch-last-number: {str}</Text>
//       <Text>mergeCount: {mergeCount}</Text>
//       <Input value={text} onChangeText={(e) => setText(e)}></Input>
//       <Button
//         onPress={() =>
//           AsyncStorage.getItem(text).then((s) => (s ? setStr(s) : null))
//         }
//       >
//         RefreshInfo
//       </Button>
//     </View>
//   )
// }

// // const MemoComicListVertical = React.memo(ComicListVertical)

/**
 * ZoomView
 */

/**
 * ZoomView
 */
import { Center, Text, View, VStack } from 'native-base'
import React from 'react'
import {
  Alert,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  Platform
} from 'react-native'
import { TextTest, TextXsS } from '../../components/Typo'
import i18n from 'i18n-js'
// NOTE: ADS
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync
} from 'expo-ads-admob'

var { height, width } = Dimensions.get('window')
var neededWidth = width,
  neededHeight = height

// var zoom = Math.min(height / neededHeight, width / neededWidth)
var zoom = 0.5

export function MainTestScreen() {
  // console.log(i18n.currentLocale())

  React.useEffect(() => {
    Platform.OS !== 'web' &&
      (async () => {
        await setTestDeviceIDAsync('EMULATOR')

        await AdMobInterstitial.setAdUnitID(
          'ca-app-pub-3940256099942544/1033173712'
        )
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
        await AdMobInterstitial.showAdAsync()
      })()
  })

  const scrollViewRef = React.useRef<ScrollView>()
  const animatedZoom = React.useRef(new Animated.Value(1))

  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(animatedZoom.current, {
        toValue: zoom,
        useNativeDriver: false
      }).start()
    }, 5000)
  }, [])

  const _pan = PanResponder.create({
    onPanResponderMove: (e, { dy }) => {
      const { height: windowHeight } = Dimensions.get(`window`)
      // return this.props.onZoomProgress(
      //   Math.min(Math.max(dy * -1 / windowHeight, 0), 0.5),
      // )
      console.log('1')
      animatedZoom.current.setValue(2)
    },
    onMoveShouldSetPanResponder: (ev, { dx }) => {
      console.log('2')

      return dx !== 0
    },
    onPanResponderGrant: () => {
      animatedZoom.current.setValue(1)
      console.log('3')

      // return this.props.onZoomStart()
    },
    onPanResponderRelease: () => {
      animatedZoom.current.setValue(1)
      console.log('4')

      // return this.props.onZoomEnd()
    }
  })

  return (
    <View flex={1}>
      {Platform.OS !== 'web' && (
        <AdMobBanner
          // style={{ height: 100, backgroundColor: 'gray' }}
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          // onDidFailToReceiveAdWithError={(e) =>
          //   __DEV__ &&
          //   Alert.alert('ca-app-pub-1646154512233519/3404814383', e, [
          //     { text: 'OK', onPress: (e) => console.log(e) }
          //   ])
          // }
        />
      )}

      <Animated.ScrollView
        style={{ flex: 1, transform: [{ scale: animatedZoom.current }] }}
        // @ts-ignore
        ref={(ref) => (scrollViewRef.current = ref)}
        maximumZoomScale={4}
        minimumZoomScale={0.5}
        // contentContainerStyle={{ width: this.mapSize, height: this.mapSize }}
        centerContent
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        <Animated.View
          {..._pan}
          style={{ width: 500, height: 1000, backgroundColor: 'red' }}
        >
          <Text>Hello</Text>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  )
}
