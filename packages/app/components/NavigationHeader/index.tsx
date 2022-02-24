import React from 'react'
import { NavigationHeader as WebNavigationHeader } from './index.web'
import type { NativeStackHeaderProps } from '@react-navigation/native-stack'
import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { goBack, navigate } from 'app/navigators/index'
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Factory,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  useColorModeValue,
  useToken,
  View,
  VStack
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorModeStyle } from '../../hooks/useColorModeStyle'
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { NextLink } from '../NextLink'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SelectableBadge } from '../SelectableBadge'

export function NavigationHeader(props: NativeStackHeaderProps) {
  const leftLabel = React.useMemo(() => {
    return props.navigation.canGoBack() ? 'back' : null
  }, [props.navigation.canGoBack()])

  return (
    <WebNavigationHeader
      title={props.options.title || props.route.name}
      leftLabel={leftLabel}
      headerLeft={props.options.headerLeft}
      headerRight={props.options.headerRight}
    />
  )
}

export function BottomTabNavigationHeader(props: BottomTabHeaderProps) {
  return (
    <WebNavigationHeader
      title={props.options.title || props.route.name}
      onLeftPress={(props) => {
        // goBack()
        console.log('first')
      }}
      headerLeft={props.options.headerLeft}
      headerRight={props.options.headerRight}
    />
  )
}

const FSafeAreaView = Factory(SafeAreaView)
const AnimatedInput = Animated.createAnimatedComponent(Input)
const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedIonIcons = Animated.createAnimatedComponent(Ionicons)
const AnimatedFSafeAreaView = Animated.createAnimatedComponent(FSafeAreaView)
const AnimatedButton = Animated.createAnimatedComponent(Button)

export const SearchNavigationHeader: React.FC<NativeStackHeaderProps> = (
  props: NativeStackHeaderProps
) => {
  // Animation
  const insets = useSafeAreaInsets()
  const { boxStyle: bs1, textStyle: ts1 } = useColorModeStyle('', 'Primary')
  const { boxStyle: bs2, textStyle: ts2 } = useColorModeStyle('', 'Secondary')
  const inputRef = React.useRef<any>()
  const { height, width } = useWindowDimensions()
  const offset = useSharedValue(0)

  const animatedStyles2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            -offset.value
            //    {
            //   duration: 500,
            //   easing: Easing.out(Easing.exp)
            // }
          )
        }
      ]
    }
  })

  const animatedStyles3 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            offset.value
            //   {
            //   duration: 500,
            //   easing: Easing.out(Easing.exp)
            // }
          )
        }
      ]
    }
  })

  const animatedStyles4 = useAnimatedStyle(() => {
    return {
      // opacity: withTiming(offset.value / 78 + 0.5, {
      //   duration: 500,
      //   easing: Easing.out(Easing.exp)
      // }),
      transform: [
        {
          translateX: withTiming(-offset.value * 1.8, {
            duration: 500,
            easing: Easing.out(Easing.exp)
          })
        },
        {
          translateY: 12
        }
      ]
    }
  })

  const animatedStyles5 = useAnimatedStyle(() => {
    return {
      // opacity: offset.value / 34
      opacity: withTiming(offset.value / 34, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      }),
      flex: 1,
      marginTop: 4
    }
  })

  const animatedStyles6 = useAnimatedStyle(() => {
    return {
      height: withTiming(offset.value * 10 + 40)
    }
  })

  /**
   * ANCHOR: Nested SafeAreaView sometime cause rerender -> lag
   */
  return (
    <SafeAreaView
      style={{
        backgroundColor: bs2.backgroundColor
      }}
    >
      <Animated.View
        // backgroundColor={bs2.backgroundColor}
        style={[animatedStyles6]}
      >
        {/* Only 16 px */}
        <View maxH={16} pl={2} pr={2} mt={1} pb={1} justifyContent={'center'}>
          <View
            style={{
              position: 'absolute',
              right: 0
              // marginVertical: 'auto'
            }}
            height={16}
            justifyContent={'center'}
            alignItems={'center'}
            mr={2}
          >
            <View mt={6}>
              <TouchableOpacity>
                <AnimatedIonIcons
                  name="md-person-circle-outline"
                  size={28}
                  color={ts1.color}
                  style={animatedStyles3}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              left: 0
              // marginVertical: 'auto'
            }}
            height={16}
            justifyContent={'center'}
            alignItems={'center'}
            ml={2}
            pt={6}
            // mt={12}
          >
            <View>
              <TouchableNativeFeedback>
                <AnimatedIonIcons
                  name="notifications-outline"
                  size={28}
                  color={ts1.color}
                  style={animatedStyles2}
                />
              </TouchableNativeFeedback>
            </View>
          </View>

          <AnimatedBox
            style={[
              {
                position: 'absolute',
                // top: 0
                // bottom: 0,
                right: -50
                // width: 120
              },
              animatedStyles4
            ]}
          >
            <AnimatedButton
              size={'md'}
              variant={'link'}
              colorScheme={'danger'}
              // fontSize={16}
              fontWeight="bold"
              p={1}
              onPress={() => {
                // console.log(inputRef.current.getNode())
                if (inputRef.current) inputRef.current.blur()
                // console.log('inputRef.current')
              }}
            >
              Cancel
            </AnimatedButton>
          </AnimatedBox>
        </View>
        {/* <HeaderLeft /> */}
        <RefAnimatedInput
          bs1={bs1}
          offset={offset}
          // animatedStyle={animatedStyles}
          // ref={inputRef}
          ref={(input) => (inputRef ? (inputRef.current = input) : null)}
        />
        {/* Floating */}
        <Animated.View
          // position={'absolute'}
          // top={16}
          // left={0}
          // right={0}
          // w={'100'}
          // h={1000}
          // bg={'red.100'}
          // zIndex={100000}
          style={[
            {
              // position: 'absolute',
              // bottom: 0,
              // left: 0,
              // right: 0,
              // height: 0,
              backgroundColor: 'white',
              paddingTop: 4,
              paddingLeft: 12
            },
            animatedStyles5
          ]}
        >
          <Text
            fontSize={15}
            fontWeight={'bold'}
            color={bs2._text.color}
            pb={1}
            // opacity={0.8}
          >
            Find History:{' '}
          </Text>
          <HStack flex={1} flexWrap={'wrap'}>
            {/* <Button
              // zIndex={1}
              onPressIn={() => {
                navigate('test')
                console.log('press navigate')
              }}
            >
            Home
          </Button> */}
            {new Array(10).fill(1).map((v, id) => (
              <Button
                key={id}
                size={'md'}
                variant={'subtle'}
                py={0}
                px={1}
                rounded={'full'}
                colorScheme={'warning'}
                mb={1}
                mr={1}
              >
                This is a history
              </Button>
            ))}
          </HStack>
        </Animated.View>
        {/* Floating */}
      </Animated.View>
    </SafeAreaView>
  )
}

/**
 * NOTE: TextInput in parent component will cause dismiss keyboard onChange
 * @description Separate it to this component
 * @summary Handle navigate here!
 */
const RefAnimatedInput = React.forwardRef((props: any, ref) => {
  const [text, setText] = React.useState('')
  const handleChange = (text) => setText(text)
  // ref = text
  const { width } = useWindowDimensions()
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(width - 90 + props.offset.value * 0.4, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      }),
      transform: [
        {
          translateX: withTiming(-props.offset.value + 8, {
            duration: 500,
            easing: Easing.out(Easing.exp)
          })
        }
      ]
    }
  })

  return (
    <>
      <AnimatedInput
        ref={ref}
        placeholder="Search"
        variant="outline"
        mx={35}
        size={'xs'}
        py={-12}
        mt={-1}
        h={31}
        fontSize={14}
        color={props.bs1._text.color}
        bg={props.bs1.backgroundColor}
        onFocus={() => (props.offset.value = 34)}
        onBlur={() => (props.offset.value = 0)}
        style={animatedStyles}
        keyboardAppearance={'dark'}
        enablesReturnKeyAutomatically
        value={text}
        onChangeText={handleChange}
        blurOnSubmit
        onSubmitEditing={(e) => {
          if (text) navigate('find-by-name-result', { name: text })
          setText('')
          // console.log(text)
        }}
        // InputLeftElement={
        //   <Icon
        //     ml="2"
        //     size="4"
        //     color={bs2._text.color}
        //     // backgroundColor={'white'}
        //     as={<Ionicons name="ios-search" />}
        //   />
        // }
      />
    </>
  )
})
