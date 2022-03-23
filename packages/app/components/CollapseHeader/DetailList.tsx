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
  Text,
  LayoutAnimation
} from 'react-native'
import { Button, View, Box, Fade } from 'native-base'
import Animated, {
  Easing,
  // FadeInDown,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  ZoomInDown,
  FadeInDown
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import FadeInView, { FadeInWrapper } from '../AnimationWrapper/FadeInView'
import useInteraction from '../../hooks/useInteraction'
import { navigate } from '../../navigators'
import RoundView from './RoundView'
import CollapseRoundView from './CollapseRoundView'
import { useApiComicComment } from '../../store/api'
import { Comment } from '../Comment'
import { num2FormatString } from '../../utils/stringFormat'
import { Layout, LightSpeedInLeft } from 'react-native-reanimated'
import { Loading } from '../Loading'
import { MotiView } from 'moti'
import { SideInDownView } from '../AnimationWrapper/SideInDownView'

// @ts-ignore
export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList)

type Props = Omit<FlatListProps<resComicDetail_T>, 'renderItem'>

const Details = forwardRef<FlatList, Props>((props, ref) => {
  const { data } = useApiComicComment(
    props.data?.length ? props.data[0].path : ''
  )

  // console.log(data, props.data?.length && props.data[0]?.path)
  const keyExtractor = useCallback((_, index) => index.toString(), [])

  const renderItem = useCallback<ListRenderItem<resComicDetail_T>>(
    ({ item, index }) => {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      if (index === 0) {
        return (
          // entering={FadeInDown.delay(300 * index + 50)}
          // exiting={FadeInDown.delay(300 * index + 50)}
          // layout={Layout.springify()}
          // FIXME: RN REANIMATED LAYOUT ANIMATION CAUSE CRASH HERE
          <SideInDownView delay={index * 100 + 200}>
            <CollapseRoundView detail={item?.detail}></CollapseRoundView>
          </SideInDownView>
        )
      }
      if (index === 1)
        return (
          // FIXME: RN REANIMATED LAYOUT ANIMATION CAUSE CRASH HERE
          <SideInDownView delay={index * 100 + 200}>
            {/* <FadeInView style={{ backgroundColor: "transparent" }}> */}
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
                    colorScheme={'warning'}
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
                  {num2FormatString(item?.info)}
                </Text>
              </View>
            </RoundView>

            {/* </FadeInView> */}
          </SideInDownView>
        )

      return <View>{data && <Comment data={data} />}</View>
    },
    [data]
  )
  const offset = useSharedValue(100)
  const offsetStyle = useAnimatedStyle(() => {
    return {
      // transform: [{ translateY: withTiming(offset.value) }],
      opacity: withDelay(400, withSpring((100 - offset.value) / 100))
    }
  })

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //     offset.value = 0
  //   }, 1000)
  // }, [])

  const { loading } = useInteraction({
    callback: () => {
      offset.value = 0
    }
  })

  return (
    <Animated.View style={[{ flex: 1 }, offsetStyle]}>
      {loading || !props.data?.length ? (
        <Loading style={{ paddingTop: 12 }} />
      ) : (
        <AnimatedFlatList
          ref={ref}
          style={styles.container}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          {...props}
          // For layout animation
          // @ts-ignore
          data={props.data?.length ? new Array(3).fill(props.data[0]) : []}
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
