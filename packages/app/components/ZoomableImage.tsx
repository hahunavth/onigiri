import { View, Text, Image, ScrollView } from 'native-base'
import {
  GestureResponderEvent,
  Dimensions,
  FlatList,
  Animated as RNAnimated
} from 'react-native'
import {
  PinchGestureHandler,
  State,
  FlingGestureHandler
} from 'react-native-gesture-handler'
import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useAnimatedScrollHandler
} from 'react-native-reanimated'

type Props = {}
const { width } = Dimensions.get('window')

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const ZoomableImage = (props: Props) => {
  const scale = React.useRef(new RNAnimated.Value(1)).current

  const onPinchEvent = RNAnimated.event(
    [
      {
        nativeEvent: { scale: scale }
      }
    ],
    {
      useNativeDriver: true
    }
  )

  const onPinchStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      RNAnimated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start()
    }
  }

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
      isScrolling.value = false
    },
    onEndDrag: (e) => {
      isScrolling.value = false
    }
  })

  // Gesture handler
  // const gestureHandler =

  const renderItem = React.useCallback(() => {
    return (
      <Animated.Image
        source={{
          uri: 'https://avatars.githubusercontent.com/u/66118664?v=4'
        }}
        style={{
          width: width,
          height: 300
        }}
        resizeMode="contain"
      ></Animated.Image>
    )
  }, [])

  return (
    // <FlingGestureHandler>
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onHandlerStateChange={onPinchStateChange}
    >
      <RNAnimated.View
        style={{
          transform: [{ scale: scale }]
        }}
      >
        <AnimatedFlatList
          data={new Array(50).fill(1)}
          renderItem={renderItem}
          // scrollEnabled={false}
          keyExtractor={(item, id) => id.toString()}
          onScroll={scrollHandler}
          scrollEventThrottle={2}
          minimumZoomScale={1}
          maximumZoomScale={5}
          // onScroll
        ></AnimatedFlatList>
      </RNAnimated.View>
    </PinchGestureHandler>
    // </FlingGestureHandler>
  )
}

export default ZoomableImage
