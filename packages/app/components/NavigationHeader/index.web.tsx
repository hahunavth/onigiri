import { Box, Center, View, Text, Factory } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableNativeFeedback
} from 'react-native'
import React from 'react'
import { goBack } from 'app/navigators/index'

type Props = {
  onRightPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void
  onLeftPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void
  rightLabel?: string | null
  leftLabel?: string | null
  title?: string
  headerRight?: (props: any) => React.ReactNode
  headerLeft?: (props: any) => React.ReactNode
}

export const NavigationHeader = React.memo(function ({
  leftLabel,
  onLeftPress,
  onRightPress,
  rightLabel,
  title,
  headerLeft,
  headerRight
}: Props) {
  const FSafeAreaView = Factory(SafeAreaView)
  const HeaderRight = React.useMemo(() => headerRight && headerRight(null), [])
  const HeaderLeft = React.useMemo(() => headerLeft && headerLeft(null), [])

  return (
    <FSafeAreaView
      _light={{ backgroundColor: '$light.backgroundSecondary' }}
      justifyContent={'center'}
      height={16}
      pl={2}
      pr={2}
    >
      <View>
        {/* Left */}
        <TouchableNativeFeedback onPress={() => goBack()}>
          <View
            // style={[styles.left, styles.buttonContainer]}
            position={'absolute'}
            left={0}
            padding={1}
            top={-6}
          >
            <Text _light={{ color: '$light.textSecondary' }}>
              {leftLabel || HeaderLeft}
            </Text>
          </View>
        </TouchableNativeFeedback>
        {/* Left */}

        {/* Right */}
        <TouchableNativeFeedback onPress={onRightPress}>
          <View
            // style={[styles.Right, styles.buttonContainer]}
            style={{ position: 'absolute', right: 0 }}
            padding={1}
            top={-6}
          >
            <Text _light={{ color: '$light.textSecondary' }}>
              {rightLabel || HeaderRight}
            </Text>
          </View>
        </TouchableNativeFeedback>
        {/* Right */}

        <Center>
          <Text _light={{ color: '$light.textPrimary' }} fontWeight="bold">
            {title}
          </Text>
        </Center>
      </View>
    </FSafeAreaView>
  )
})
