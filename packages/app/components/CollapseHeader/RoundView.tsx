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

import FadeInView from '../AnimationWrapper/FadeInView'
import useInteraction from '../../hooks/useInteraction'
import { navigate } from '../../navigators'
import { RoundViewProps } from './types'

const RoundView = ({ children, style }: RoundViewProps) => {
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

export default RoundView
