import { View, Text } from 'react-native'
import React from 'react'
import { RoundViewProps } from './types'

const RoundView = ({ children, style }: RoundViewProps) => {
  return <View style={style}>{children}</View>
  // return null
}

export default RoundView
