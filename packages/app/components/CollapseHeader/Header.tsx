import React, { FC, memo, useMemo, useEffect } from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageProps,
  StyleSheet,
  ViewProps,
  useWindowDimensions,
  Platform
} from 'react-native'
import { View, Factory, Text } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import { SharedElement } from 'react-navigation-shared-element'
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  withSpring
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import useInteraction from '../../hooks/useInteraction'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const PHOTO_SIZE = 120

// NOTE: Animation config
export type HeaderConfig = {
  heightExpanded: number
  heightCollapsed: number
}

export enum Visibility {
  Hidden = 0,
  Visible = 1
}

type Props2 = Pick<ViewProps, 'style'> & {
  photo: string
  name: string
  bio: string
}
const FLG = Factory(LinearGradient)
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
// const AnimatedLinearGradient = Animated.createAnimatedComponent(FLG)

const { height } = Dimensions.get('screen')

const Header: FC<Props2> = ({ style, name, photo, bio }) => {
  // const { height } = useWindowDimensions()
  // const { top } = useSafeAreaInsets()
  // REVIEW: Save Style
  const containerStyle = useMemo(() => [styles.container, style], [])

  // REVIEW: Save Image source for next render
  const photoSource = useMemo<ImageProps['source']>(() => ({ uri: photo }), [])
  // const photoSource = { uri: photo };
  const offset = useSharedValue(0)
  // const imageBackgroundHeight = useSharedValue(height)
  // const imageBackgroundHeight = useDerivedValue(() => {
  //   return offset.value * height
  // })

  const opacityStyle1 = useAnimatedStyle(() => {
    // // STUB: FIX: Type error, viewRef.current._component.setNativeProps is not a function in animated linear gradient
    // if (Platform.OS === 'web') {
    //   return {
    //     flex: 1,
    //     flexDirection: 'row',
    //     alignItems: 'flex-end',
    //     padding: 12,
    //     opacity: 0.5
    //   }
    // }

    return {
      opacity: withTiming(offset.value),
      flex: 1,
      // justifyContent: "flex-end",
      // alignItems: "flex-start",
      flexDirection: 'row',
      // backgroundColor: "white",
      alignItems: 'flex-end',
      padding: 12
    }
  })
  const opacityStyle2 = useAnimatedStyle(() => {
    return {
      opacity: withTiming(offset.value)
      // width: withTiming(imageBackgroundHeight.value, {
      //   duration: 500,
      // })
    }
  })

  useInteraction({
    callback: () => {
      // imageBackgroundHeight.value = 280
      offset.value = 1
    }
  })

  // React.useEffect(() => {
  //     requestAnimationFrame(() => {
  //       offset.value = 1
  //     })
  // })

  return (
    <View style={containerStyle}>
      <AnimatedImageBackground
        style={[styles.photo, opacityStyle2]}
        blurRadius={4}
        source={photoSource}
        fadeDuration={500}
      />
      <AnimatedLinearGradient
        colors={['#000000d8', '#00000042', '#77777747']}
        start={{ x: 0, y: 1.1 }}
        end={{ x: 0, y: 0 }}
        style={[opacityStyle1]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
        {/* <SharedElement id={`item.${photo}.photo`}> */}
        <Image
          source={photoSource}
          width={100}
          height={100}
          style={{
            width: 130,
            height: 180,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#333',
            opacity: 1
          }}
        />
        {/* </SharedElement> */}
      </AnimatedLinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: { marginLeft: 8, justifyContent: 'flex-end', flex: 1 },
  name: {
    fontSize: 20,
    // fontFamily: QFontFamily.Quicksand_700Bold,
    color: 'white'
  },
  bio: { fontSize: 15, marginTop: 4, color: '#ccc' },
  photo: {
    // height: PHOTO_SIZE,
    // width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
    // borderRadius: PHOTO_SIZE / 2,
  },
  container: {
    flexDirection: 'row',
    // backgroundColor: "white",
    // alignItems: "flex-end",
    // padding: 24,
    height: 280
  }
})

export default memo(Header)
