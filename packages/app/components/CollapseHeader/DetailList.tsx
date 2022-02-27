import {
  resComicDetail_T
} from 'app/types'
// import { Button, Icon, Layout } from "@ui-kitten/components";
import React, { forwardRef, memo, useCallback, useState } from 'react'
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text
} from 'react-native'
import { Button } from 'native-base'
import Animated, {
  Easing,
  // FadeInDown,
  withTiming,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import FadeInView from '../FadeInView'
import useInteraction from '../../hooks/useInteraction'

// @ts-ignore
export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList)

type Props = Omit<FlatListProps<resComicDetail_T>, 'renderItem'>

const Details = forwardRef<FlatList, Props>((props, ref) => {
  // console.log('rererere')
  const keyExtractor = useCallback((_, index) => index.toString(), [])

  const renderItem = useCallback<ListRenderItem<resComicDetail_T>>(
    ({ item }) => (
      <Animated.View>
        {/* <FadeInView style={{ backgroundColor: "transparent" }}> */}
        <CollapseRoundView detail={item?.detail}></CollapseRoundView>
        <RoundView>
          <Text
            style={{
              fontSize: 18,
              // fontFamily: QFontFamily.Quicksand_700Bold,
              marginBottom: 8
            }}
          >
            Genre
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {item?.kind?.map((kind) => (
              <Button
                key={kind}
                style={{ margin: 4 }}
                // size={'tiny'}
                // status={'danger'}
                // appearance={'outline'}
              >
                {kind}
              </Button>
            ))}
          </View>
          <Text
            style={{
              fontSize: 18,
              // fontFamily: QFontFamily.Quicksand_700Bold,
              marginBottom: 8
            }}
          >
            Complete info
          </Text>
          <View style={{ paddingLeft: 4 }}>
            <Text style={{ color: '#ccc', fontSize: 11 }}>Author:</Text>

            <Text
              style={{
                fontSize: 14
                // fontFamily: QFontFamily.Quicksand_600SemiBold
              }}
            >
              {item?.author}
            </Text>

            <Text style={{ color: '#ccc', fontSize: 11 }}>Status:</Text>
            <Text
              style={{
                fontSize: 14
                // fontFamily: QFontFamily.Quicksand_600SemiBold
              }}
            >
              {item?.status}
            </Text>
            <Text style={{ color: '#ccc', fontSize: 11 }}>Rating:</Text>
            <Text
              style={{
                fontSize: 14
                // fontFamily: QFontFamily.Quicksand_600SemiBold
              }}
            >
              {item?.rate}
            </Text>
            <Text style={{ color: '#ccc', fontSize: 11 }}>Followers:</Text>
            <Text
              style={{
                fontSize: 14
                // fontFamily: QFontFamily.Quicksand_600SemiBold
              }}
            >
              {item?.info}
            </Text>
          </View>
        </RoundView>
        {/* </FadeInView> */}
      </Animated.View>
    ),
    []
  )
  const offset = useSharedValue(100)
  const offsetStyle = useAnimatedStyle(() => {
    return (
      {
        transform: [{translateY: withTiming(offset.value)}],
        opacity: withTiming((100-offset.value) / 100)
      }
    )
  })

  const [loading, setLoading ] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      offset.value = 0
    }, 1000)
  }, [])

  return (
    <Animated.View
      style={[{ flex: 1 }, offsetStyle]}
      // level={'3'}
    >
    {
      loading ? null
      : <AnimatedFlatList
        ref={ref}
        style={styles.container}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...props}
      />
    }
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    flex: 1
  }
})

export default memo(Details)


/**
 * Helper component
 */
const RoundView = ({
  children,
  style
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) => {
  return (
    <View
      // level={'1'}
      style={[
        {
          borderRadius: 10,
          // backgroundColor: "#555",
          padding: 12,
          margin: 12
        },
        style
      ]}
    >
      {children}
    </View>
  )
}

// const AnimatedLayout = Animated.createAnimatedComponent(Layout)

const CollapseRoundView = ({
  children,
  detail
}: {
  children?: React.ReactNode
  detail?: string
}) => {
  const [collapse, setCollapse] = useState(true)

  const offset = useSharedValue(100)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // transform: [{ translateX: offset.value * 255 }],
      height: withTiming(offset.value, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      })
    }
  })

  return (
    <Animated.View
      // level={'1'}
      style={[
        {
          borderRadius: 10,
          // backgroundColor: "#555",
          margin: 12
          // maxHeight: collapse ? 150 : undefined,
        },
        animatedStyles
      ]}
    >
      <LinearGradient
        colors={['transparent', collapse ? '#b93f5e60' : 'transparent']}
        start={{ x: 0, y: 0.85 }}
        style={{
          padding: 12,
          borderRadius: 10,
          flex: 1
        }}
      >
        <Text
          style={{
            fontSize: 18,
            // fontFamily: QFontFamily.Quicksand_700Bold,
            marginBottom: 8
          }}
        >
          Synopsis
        </Text>
        <ScrollView>
          <Text
            style={{
              fontSize: 14,
              // fontFamily: QFontFamily.Quicksand_500Medium,
              // color: "#eee",

              zIndex: -1
            }}
          >
            {detail}
          </Text>
        </ScrollView>
      </LinearGradient>
      <TouchableOpacity
        style={{
          // flex: 1,
          position: 'absolute',
          bottom: -16,
          // right: 0,
          backgroundColor: '#dd7cad5c',
          borderRadius: 100,
          alignSelf: 'center',
          width: 36,
          height: 36,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#a03d4e'

          // shadowColor: "#000000",
          // shadowOffset: {
          //   width: 0,
          //   height: 10,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,

          // elevation: 5,
        }}
        onPress={() => {
          setCollapse(!collapse)
          // offset.value = Math.random();
          offset.value = offset.value === 100 ? 200 : 100
        }}
      >
        {/* <Icon
          name={
            collapse ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'
          }
          style={{ width: 24, height: 24 }}
          fill="#db1b7bb5"
        /> */}
      </TouchableOpacity>
    </Animated.View>
  )
}
