import { View, Text } from 'react-native'
import React from 'react'
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
}

const AnimatedPressavle = Animated.createAnimatedComponent(Pressable)

const ChapterLink = (props: Props) => {
  const { name, path, updatedAt, updatedDistance, updatedVew, url, id } =
    props.chapter

  const offset = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(offset.value, [0, 1], ['#fff', '#000'])
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
      <AnimatedPressavle
        onPress={() => {
          offset.value = withTiming(1)
        }}
        _focus={{
          borderColor: 'warmGray.300'
        }}
        borderWidth={2}
        borderColor={'transparent'}
        _hover={{ bg: 'red.50' }}
        flexDirection={'row'}
        justifyContent={'space-between'}
        w={'full'}
        bg={'coolGray.50'}
        // p={1}
        px={2}
        rounded={2}
        m={1}
        style={animatedStyle}
      >
        <Text>{name}</Text>
        <Text>{updatedDistance}</Text>
      </AnimatedPressavle>
    </NextLink>
  )
}

export default ChapterLink
