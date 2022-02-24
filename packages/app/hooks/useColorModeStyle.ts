import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import {
  useColorModeValue,
  IBoxProps,
  View,
  ITextProps,
  useToken
} from 'native-base'

type ColorT = '' | 'Blue' | 'Yellow' | 'Green' | 'Teal'
type ColorVariantT = 'Primary' | 'Secondary'

/**
 * Custom hook return themed background and text style for native-base component
 */
export function useColorModeStyle(color: ColorT, variant: ColorVariantT) {
  const [bg1, bg2, text1, text2] = useToken('colors', [
    `$light.background${color}${variant}`,
    `$dark.background${color}${variant}`,
    `$light.text${color}${variant}`,
    `$dark.text${color}${variant}`
  ])

  const backgroundColor: string = useColorModeValue(bg1, bg2)
  const textColor: string = useColorModeValue(text1, text2)

  const boxStyle: {
    backgroundColor: string
    _text: ITextProps
  } = {
    backgroundColor,
    _text: {
      color: textColor
    }
  }

  const textStyle: any = {
    color: textColor
  }

  return { boxStyle, textStyle: textStyle }
}
