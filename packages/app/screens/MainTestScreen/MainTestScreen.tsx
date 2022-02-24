import { View, Text, Button, useColorMode } from 'native-base'
import React from 'react'
import { TextInput } from 'react-native'
import { useAppDispatch } from '../../store/hooks'
import { historyAction } from 'app/store/historySlice'
import { SearchNavigationHeader } from '../../components/NavigationHeader'

type Props = {}

export const MainTestScreen = (props: Props) => {
  const dispatch = useAppDispatch()
  const { toggleColorMode } = useColorMode()
  const [text, setText] = React.useState('')
  return (
    <View>
      <Text>MainTestScreen</Text>
      <Button onPress={() => dispatch(historyAction.reset())}>
        Reset history slice
      </Button>
      <Button onPress={() => toggleColorMode()}>Toggle color mode</Button>
      {/* <SearchNavigationHeader /> */}
      <TextInput
        value={text}
        onChangeText={(t) => setText(t)}
        placeholder="Text Input"
      />
    </View>
  )
}
