import React from 'react'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp
} from '@react-navigation/material-top-tabs'
import { DownloadTab } from 'app/screens/LibraryScreen/DownloadTab'
import { RecentTab } from 'app/screens/LibraryScreen/RecentTab'
import { SubscribeTab } from 'app/screens/LibraryScreen/SubscribeTab'
import { StyleSheet } from 'react-native'
import { useColorModeStyle } from '../hooks/useColorModeStyle'

const { Navigator, Screen } =
  createMaterialTopTabNavigator<LibraryTopNavigatorParamList>()

type LibraryTopNavigatorParamList = {
  recent: undefined
  subscribes: undefined
  downloads: undefined
}

const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: ColorSchemeE["background-basic-color-1"],
  },
  iconColor: {
    // backgroundColor: ColorSchemeE["text-basic-color"],
  }
})

export const LibraryTopNavigator = () => {
  // const styles = useStyleSheet(themedStyles);

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
      <Screen name="recent" component={RecentTab}></Screen>
      <Screen name="subscribes" component={SubscribeTab}></Screen>
      <Screen name="downloads" component={DownloadTab}></Screen>
    </Navigator>
  )
}

export type RecentTabProps = MaterialTopTabNavigationProp<
  LibraryTopNavigatorParamList,
  'recent'
>
export type SubscribeTabProps = MaterialTopTabNavigationProp<
  LibraryTopNavigatorParamList,
  'recent'
>
export type DownloadTabProps = MaterialTopTabNavigationProp<
  LibraryTopNavigatorParamList,
  'recent'
>
