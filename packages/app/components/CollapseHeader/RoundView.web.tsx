import { View, Text } from 'react-native'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const RoundView = (props: Props) => {
  return <View>{props.children}</View>
  // return null
}

export default RoundView
