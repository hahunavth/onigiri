import { View, Text } from 'native-base'
import React from 'react'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp
} from '@react-navigation/material-top-tabs'
import {
  HomeSessionDetailListHot,
  HomeSessionDetailListRecently,
  HomeSessionDetailListWeek,
  HomeSessionDetailList
} from 'app/components/HomeSessionDetailList'
import { useColorModeStyle } from '../../hooks/useColorModeStyle'

type TopComicTopTabNavParamList = {
  recently: undefined
  hot: undefined
  week: undefined
}

const { Navigator, Screen } =
  createMaterialTopTabNavigator<TopComicTopTabNavParamList>()

export const TopComicScreen = () => {
  const { boxStyle: bs1, textStyle: ts1 } = useColorModeStyle('', 'Primary')
  const { boxStyle: bs2, textStyle: ts2 } = useColorModeStyle('', 'Secondary')

  return (
    <Navigator
      backBehavior="none"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: bs1.backgroundColor
        },

        tabBarLabelStyle: {},
        tabBarItemStyle: {
          margin: -5,
          justifyContent: 'center',
          alignItems: 'center'
        },

        tabBarPressOpacity: 0.1,
        tabBarIndicatorStyle: {
          backgroundColor: bs2._text.color as any,
          flex: 1,
          height: 38,
          borderWidth: 5,
          borderRadius: 12,
          borderColor: 'transparent'
        },
        tabBarActiveTintColor: bs1.backgroundColor as any,
        tabBarAllowFontScaling: false,
        tabBarInactiveTintColor: bs1._text.color as any,
        tabBarPressColor: 'transparent'
      }}
      showPageIndicator
    >
      <Screen name="hot" component={HomeSessionDetailListHot} />
      <Screen name="recently" component={HomeSessionDetailListRecently} />
      <Screen name="week" component={HomeSessionDetailListHot} />
    </Navigator>
  )
}
