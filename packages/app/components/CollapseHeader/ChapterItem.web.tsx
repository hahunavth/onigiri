import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ViewProps,
  Platform
} from 'react-native'
import React from 'react'
import {
  MotiPressable,
  useMotiPressable,
  useMotiPressableAnimatedProps,
  MotiPressableInteractionState
} from '@motify/interactions'
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'
import { resComicDetailChapterItem_T } from 'app/types'
import { NextLink } from 'app/components/NextLink'
import { Pressable } from 'native-base'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming
} from 'react-native-reanimated'

type Props = {
  chapter: resComicDetailChapterItem_T
  comicPath: string
  id: number
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const ChapterLink = (props: Props) => {
  const { name, path, updatedAt, updatedDistance, updatedVew, url } =
    props.chapter
  const { id } = props

  const offset = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        offset.value,
        [0, 1],
        ['transparent', '#7f92a2']
      )
    }
  }, [offset.value])

  return (
    <NextLink
      routeName="chapter"
      key={path}
      params={{
        comicPath: props.comicPath,
        cptId: id
      }}
    >
      <AnimatedPressable
        onPress={() => {
          offset.value = withTiming(1)
        }}
        style={animatedStyle}
        _focus={{
          borderColor: 'warmGray.300'
        }}
        borderWidth={2}
        borderColor={'transparent'}
        _hover={{
          bg: 'red.50',
          color: 'darkBlue.800',
          borderColor: 'warmGray.100'

          // _text: {{color: 'blue.500'}}
        }}
        flexDirection={'row'}
        justifyContent={'space-between'}
        w={'full'}
        bg={'coolGray.50'}
        // p={1}
        px={2}
        rounded={2}
        m={1}
        shadow={2}
      >
        <Text>{name}</Text>
        <Text>{updatedDistance}</Text>
      </AnimatedPressable>
    </NextLink>
  )
}

export default ChapterLink
