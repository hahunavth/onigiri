import { View, Text, Button, useColorMode } from 'native-base'
import React from 'react'
import { useAppDispatch } from '../../store/hooks'
import { historyAction } from 'app/store/historySlice'

type Props = {}

export const MainTestScreen = (props: Props) => {
  const dispatch = useAppDispatch()
  const { toggleColorMode } = useColorMode()

  return (
    <View>
      <Text>MainTestScreen</Text>
      <Button onPress={() => dispatch(historyAction.reset())}>
        Reset history slice
      </Button>
      <Button onPress={() => toggleColorMode()}>Toggle color mode</Button>
    </View>
  )
}
