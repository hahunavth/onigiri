import { resComicDetail_T } from 'app/types'
// import { Button, Icon, Layout } from "@ui-kitten/components";
import React, { forwardRef, memo, useCallback, useState } from 'react'
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text
} from 'react-native'
import { Button, View, Box } from 'native-base'
import Animated, {
  Easing,
  // FadeInDown,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import FadeInView from '../FadeInView'
import useInteraction from '../../hooks/useInteraction'
import { navigate } from '../../navigators'
import RoundView from './RoundView'
import CollapseRoundView from './CollapseRoundView'

// @ts-ignore
export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList)

type Props = Omit<FlatListProps<resComicDetail_T>, 'renderItem'>

const Details = forwardRef<FlatList, Props>((props, ref) => {
  const keyExtractor = useCallback((_, index) => index.toString(), [])

  const renderItem = useCallback<ListRenderItem<resComicDetail_T>>(
    ({ item }) => (
      <Animated.View>
        {/* <FadeInView style={{ backgroundColor: "transparent" }}> */}
        <Box mx={[0, 12, 24, 32]} my={[0, 2, 4, 5]}>
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
                  size={'xs'}
                  variant={'subtle'}
                  colorScheme={'danger'}
                  onPress={() =>
                    navigate('genres', {
                      genresName: kind
                    })
                  }
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
        </Box>

        {/* </FadeInView> */}
      </Animated.View>
    ),
    []
  )
  const offset = useSharedValue(100)
  const offsetStyle = useAnimatedStyle(() => {
    return {
      // transform: [{ translateY: withTiming(offset.value) }],
      opacity: withDelay(400, withSpring((100 - offset.value) / 100))
    }
  })

  const [loading, setLoading] = React.useState(true)
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //     offset.value = 0
  //   }, 1000)
  // }, [])

  useInteraction({
    callback: () => {
      setLoading(false)
      offset.value = 0
    }
  })

  return (
    <Animated.View style={[{ flex: 1 }, offsetStyle]}>
      {loading ? null : (
        <AnimatedFlatList
          ref={ref}
          style={styles.container}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          {...props}
        />
      )}
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

// const AnimatedLayout = Animated.createAnimatedComponent(Layout)
