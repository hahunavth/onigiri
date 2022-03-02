import React from 'react'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp
} from '@react-navigation/material-top-tabs'
import { DownloadTab } from 'app/screens/LibraryScreen/DownloadTab'
import { RecentTab } from 'app/screens/LibraryScreen/RecentTab'
import { SubscribeTab } from 'app/screens/LibraryScreen/SubscribeTab'
import { StyleSheet } from 'react-native'

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

  return (
    <Navigator
      backBehavior="none"
      screenOptions={{
        tabBarStyle: styles.tabBar,

        tabBarLabelStyle: {},
        tabBarItemStyle: {
          margin: -5,
          justifyContent: 'center',
          alignItems: 'center'
        },

        tabBarPressOpacity: 0.1,
        tabBarIndicatorStyle: {
          backgroundColor: '#1285f0df',
          flex: 1,
          height: 38,
          borderWidth: 5,
          borderRadius: 12,
          borderColor: 'transparent'
        },
        tabBarActiveTintColor: 'white',
        tabBarAllowFontScaling: false,
        tabBarInactiveTintColor: 'gray',
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
