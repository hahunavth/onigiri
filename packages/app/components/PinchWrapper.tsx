import { View, Text, Image, ScrollView } from 'native-base'
import {
  GestureResponderEvent,
  Dimensions,
  FlatList,
  Animated as RNAnimated
} from 'react-native'
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  State,
  FlingGestureHandler,
  Directions
} from 'react-native-gesture-handler'
import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming
} from 'react-native-reanimated'

type Props = {
  children: React.ReactNode
}

const { width, height } = Dimensions.get('window')

const PinchWrapper = (props: Props) => {
  // const scale = React.useRef(new RNAnimated.Value(1)).current

  // const onPinchEvent = RNAnimated.event(
  //   [
  //     {
  //       nativeEvent: { scale: scale }
  //     }
  //   ],
  //   {
  //     useNativeDriver: false
  //   }
  // )

  // const onPinchStateChange = (event: any) => {
  //   if (event.nativeEvent.oldState === State.ACTIVE) {
  //     RNAnimated.spring(scale, {
  //       toValue: 1,
  //       useNativeDriver: false
  //     }).start()
  //   }
  // }

  const lastContentOffset = useSharedValue(0)
  const isScrolling = useSharedValue(false)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (lastContentOffset.value > event.contentOffset.y) {
        if (isScrolling.value) {
          console.log('UP')
        }
      } else if (lastContentOffset.value < event.contentOffset.y) {
        if (isScrolling.value) {
          console.log('DOWN')
        }
      }
      if (isScrolling.value) lastContentOffset.value = event.contentOffset.y
    },
    onBeginDrag: (e) => {
      console.log(e)
      isScrolling.value = false
    },
    onEndDrag: (e) => {
      isScrolling.value = false
    }
  })

  // Gesture handler
  // const gestureHandler =

  const scale = useSharedValue(1)
  const transX = useSharedValue(0)
  const transY = useSharedValue(0)
  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (e) => {
        if (e.scale > 0.8) scale.value = e.scale
        else scale.value = 0.8
        transX.value = e.focalX
        transY.value = e.focalY
      },
      onFinish: (e) => {
        if (scale.value < 1) {
          scale.value = withTiming(1)
          // transX.value = 0
          // transY.value = 0
        }
        // console.log(scale.value)
      }
    })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transX.value },
        { translateY: transY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -transX.value },
        { translateY: -transY.value },
        { translateX: width / 2 },
        { translateY: height / 2 }
      ]
    }
  })

  // const renderItem = React.useCallback(() => {
  //   return (
  //     <Animated.Image
  //       source={{
  //         uri: 'https://avatars.githubusercontent.com/u/66118664?v=4'
  //       }}
  //       style={{
  //         width: width,
  //         height: 300
  //       }}
  //       resizeMode="contain"
  //     ></Animated.Image>
  //   )
  // }, [])

  return (
    // <FlingGestureHandler
    //   direction={Directions.DOWN}
    //   onHandlerStateChange={({ nativeEvent }) => {
    //     // if (nativeEvent.state === State.ACTIVE) {
    //     // console.log("I'm flinged!")
    //     // }
    //   }}
    // >
    <PinchGestureHandler
      onGestureEvent={pinchHandler}
      // onGestureEvent={onPinchEvent}
      // onHandlerStateChange={onPinchStateChange}
    >
      <Animated.View
        style={rStyle}
        // style={{
        // transform: [{ scale: scale }]
        // }}
      >
        {props.children}
      </Animated.View>
    </PinchGestureHandler>
    // </FlingGestureHandler>
  )
}

export default PinchWrapper
