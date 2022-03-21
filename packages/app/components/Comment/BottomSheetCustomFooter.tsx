import React, { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  useBottomSheet
} from '@gorhom/bottom-sheet'
import { RectButton } from 'react-native-gesture-handler'
import { useAppSafeAreaInsets } from 'app/provider/safe-area/use-safe-area'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { toRad } from 'react-native-redash'

import { Entypo } from '@expo/vector-icons'

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton)

// inherent the `BottomSheetFooterProps` to be able receive
// `animatedFooterPosition`.
interface CustomFooterProps extends BottomSheetFooterProps {}

export const BottomSheetCustomFooter = ({
  animatedFooterPosition
}: CustomFooterProps) => {
  //#region hooks
  // we need the bottom safe insets to avoid bottom notches.
  const { bottom: bottomSafeArea } = useAppSafeAreaInsets()
  // extract animated index and other functionalities
  const { expand, collapse, animatedIndex } = useBottomSheet()
  //#endregion

  //#region styles
  // create the arrow animated style reacting to the
  // sheet index.
  const arrowAnimatedStyle = useAnimatedStyle(() => {
    const arrowRotate = interpolate(
      animatedIndex.value,
      [0, 1],
      [toRad(0), toRad(-180)],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ rotate: `${arrowRotate}rad` }]
    }
  }, [])
  const arrowStyle = useMemo(
    () => [arrowAnimatedStyle, styles.arrow],
    [arrowAnimatedStyle]
  )
  // create the content animated style reacting to the
  // sheet index.
  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        animatedIndex.value,
        [-0.85, 0],
        [0, 1],
        Extrapolate.CLAMP
      )
    }),
    [animatedIndex]
  )
  const containerStyle = useMemo(
    () => [containerAnimatedStyle, styles.container],
    [containerAnimatedStyle]
  )
  //#endregion

  //#region callbacks
  const handleArrowPress = useCallback(() => {
    // if sheet is collapsed, then we extend it,
    // or the opposite.
    if (animatedIndex.value === 0) {
      expand()
    } else {
      collapse()
    }
  }, [expand, collapse, animatedIndex])
  //#endregion

  return (
    <BottomSheetFooter
      // we pass the bottom safe inset
      bottomInset={bottomSafeArea}
      // we pass the provided `animatedFooterPosition`
      animatedFooterPosition={animatedFooterPosition}
    >
      <AnimatedRectButton style={containerStyle} onPress={handleArrowPress}>
        <Animated.Text style={arrowStyle}>
          <Entypo name="chevron-up" size={18} color="white" />
        </Animated.Text>
      </AnimatedRectButton>
    </BottomSheetFooter>
  )
}

// footer style
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#80f',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.0,

    elevation: 8
  },
  arrow: {
    fontSize: 20,
    height: 20,
    textAlignVertical: 'center',
    fontWeight: '900',
    color: '#fff'
  }
})
