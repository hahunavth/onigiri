import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring
} from 'react-native-reanimated'
import { ViewStyle } from 'react-native'
import { View } from 'native-base'

// const AnimatedLayout = Animated.createAnimatedComponent(Layout);

type Props = {
  children: React.ReactNode
  style?: ViewStyle
}

const FadeInView = (props: Props) => {
  const fadeAnim = useSharedValue(0) // Initial value for opacity: 0

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeAnim.value, {
        duration: 200,
        easing: Easing.in(Easing.ease)
      })
      // opacity: withSpring(fadeAnim.value, {})
    }
  })

  useFocusEffect(() => {
    fadeAnim.value = 1
    return () => {
      fadeAnim.value = 0
    }
  })

  return (
    <View bg={'$light.backgroundPrimary'} style={[{ flex: 1 }, props.style]}>
      <Animated.View // Special animatable View
        // level={"4"}
        style={[
          {
            flex: 1
            // opacity: fadeAnim, // Bind opacity to animated value
          },
          fadeStyle
        ]}
      >
        {props.children}
      </Animated.View>
    </View>
  )
}

export default FadeInView

export function FadeInWrapper<T>(
  Children: Props['children'],
  style?: Props['style']
) {
  return (props: T) => (
    <FadeInView style={style}>
      {/* @ts-ignore */}
      <Children {...props} />
    </FadeInView>
  )
}
