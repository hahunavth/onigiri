import { View, Text } from 'native-base'
import React from 'react'
import { LibraryTopNavigator } from '../../navigators/LibraryTopNavigator'

type Props = {}

export const LibraryScreen = (props: Props) => {
  return (
    <View flex={1}>
      <LibraryTopNavigator />
    </View>
  )
}
