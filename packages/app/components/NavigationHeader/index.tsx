import React from 'react'
import { NavigationHeader as WebNavigationHeader } from './index.web'
import type { NativeStackHeaderProps } from '@react-navigation/native-stack'
import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { goBack } from 'app/navigators/index'

export function NavigationHeader(props: NativeStackHeaderProps) {
  const leftLabel = React.useMemo(() => {
    return props.navigation.canGoBack() ? 'back' : null
  }, [props.navigation.canGoBack()])

  return (
    <WebNavigationHeader
      title={props.options.title || props.route.name}
      leftLabel={leftLabel}
      headerLeft={props.options.headerLeft}
      headerRight={props.options.headerRight}
    />
  )
}

export function BottomTabNavigationHeader(props: BottomTabHeaderProps) {
  return (
    <WebNavigationHeader
      title={props.options.title || props.route.name}
      onLeftPress={(props) => {
        // goBack()
        console.log('first')
      }}
      headerLeft={props.options.headerLeft}
      headerRight={props.options.headerRight}
    />
  )
}
