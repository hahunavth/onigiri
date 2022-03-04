import {
  View,
  Text,
  VStack,
  HStack,
  Box,
  Pressable,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from 'native-base'
import React from 'react'
import { resComicDetail_T } from '../../types'
import ChapterItem from 'app/components/CollapseHeader/ChapterItem.web'
import { SimpleLineIcons } from '@expo/vector-icons'
import { ViewStyle, ImageStyle, TextStyle } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'

type Props = {
  comic?: resComicDetail_T
}
/**
 * diff .native file
 */
const ChapterList = (props: Props) => {
  const { comic } = props

  const [page, setPage] = React.useState(0)

  const maxPage = React.useMemo(() => {
    return (comic?.chapters.length || 0) / 20 - 1
  }, [comic])

  const pageSize = React.useMemo(() => {
    if ((comic?.chapters.length || 0) > 20 * (maxPage + 1)) return 20

    return (comic?.chapters.length || 0) - 20 * maxPage
  }, [maxPage, comic])

  return (
    <View flex={1} mt={4}>
      <Text fontSize={[16, 18, 20]} fontFamily={'Quicksand'} fontWeight={'500'}>
        ChapterList
      </Text>

      {/* Control block */}
      <HStack justifyContent={'space-between'} my={2}>
        <HStack>
          <InputGroup
            w={{
              base: '50%',
              md: '255'
            }}
          >
            <InputLeftAddon children={'Page: '} />
            <Input
              w={{
                base: '50%',
                md: '100%'
              }}
              placeholder="Page number"
              value={(page + 1).toString()}
            />
            <InputRightAddon
              children={'of ' + Math.ceil(maxPage + 1).toString()}
            />
          </InputGroup>
        </HStack>

        <HStack alignItems={'center'}>
          <Pressable onPress={() => page > 0 && setPage((page) => page - 1)}>
            {({ isFocused, isHovered, isPressed }) =>
              isHovered ? (
                <MaterialCommunityIcons
                  name="arrow-left-bold-circle"
                  size={36}
                  color={page > 0 ? '#27516d' : 'gray'}
                />
              ) : (
                <MaterialCommunityIcons
                  name="arrow-left-bold-circle-outline"
                  size={36}
                  color={page > 0 ? '#27516d' : 'gray'}
                />
              )
            }
          </Pressable>

          <Pressable
            onPress={() => page < maxPage && setPage((page) => page + 1)}
          >
            {({ isFocused, isHovered, isPressed }) =>
              isHovered ? (
                <MaterialCommunityIcons
                  name="arrow-right-bold-circle"
                  size={36}
                  color={page < maxPage ? '#27516d' : 'gray'}
                />
              ) : (
                <MaterialCommunityIcons
                  name="arrow-right-bold-circle-outline"
                  size={36}
                  color={page < maxPage ? '#27516d' : 'gray'}
                />
              )
            }
          </Pressable>
        </HStack>
      </HStack>

      {/* list */}
      <VStack w={['full']}>
        {comic?.chapters.map((cpt, id) => {
          // console.log(id)
          if (id >= 20 * page && id < 20 * (page + 1))
            return (
              <ChapterItem
                chapter={cpt}
                id={comic?.chapters.length - id}
                comicPath={comic?.path}
                key={id}
              />
            )
          return null
        })}
      </VStack>
    </View>
  )
}

type HoverBtnProps = {
  children: (props: {
    isHovered?: boolean
    isFocused?: boolean
    isPressed?: boolean
    style?: Animated.AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>
  }) => React.ReactNode
}

function HoverBtn(props: HoverBtnProps) {
  const Child = props.children

  // const offset = useSharedValue(0)
  // const animatedStyle = useAnimatedStyle(() => {

  // }, [])

  return (
    <Pressable
    // onHoverIn={}
    >
      {/* {({ isHovered, isFocused, isPressed }) => <Child {...props} />} */}
      {props.children}
    </Pressable>
  )
}

export default ChapterList
