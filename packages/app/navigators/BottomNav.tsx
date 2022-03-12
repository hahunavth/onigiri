import { useColorModeValue, useToken } from 'native-base'
import { Easing } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {} from 'react'
// NOTE: IMPORT COMPONENT
import {
  BottomTabNavigationHeader,
  SearchNavigationHeader
} from 'app/components/NavigationHeader'
import {
  HomeScreen,
  LibraryScreen,
  DiscoverScreen,
  SettingScreen,
  MainTestScreen
} from 'app/screens'
import React from 'react'

export type BottomNavParamsList = {
  'main/home': undefined
  'main/library': undefined
  'main/discover': undefined
  'main/setting': undefined
  'main/test': undefined
}

/**
 * ANCHOR: RETURN NAVIGATION
 */
const { Navigator, Screen } = createBottomTabNavigator<BottomNavParamsList>()

export default function BottomNav() {
  const textT = useColorModeValue('$light.textPrimary', '$dark.textPrimary')
  const backgroundT = useColorModeValue(
    '$light.backgroundSecondary',
    '$dark.backgroundPrimary'
  )
  const [text, background] = useToken('colors', [textT, backgroundT])

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        header: BottomTabNavigationHeader,
        tabBarActiveTintColor: text,
        tabBarActiveBackgroundColor: background,
        tabBarInactiveBackgroundColor: background,
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: 'timing',
            config: { duration: 700, easing: Easing.out(Easing.exp) }
          }
          // hide: {
          //   animation: 'timing';
          //   config: {

          //   }
          // }
        }
        // tabBarVisibilityAnimationConfig
      }}
      // detachInactiveScreens={false}
    >
      <Screen
        name="main/home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: HomeIcon
        }}
      ></Screen>

      <Screen
        name="main/library"
        component={LibraryScreen}
        options={{
          tabBarIcon: LibraryIcon
        }}
      ></Screen>

      <Screen
        name="main/discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: DiscoverIcon
        }}
      ></Screen>

      <Screen
        name="main/setting"
        component={SettingScreen}
        options={{
          tabBarIcon: SettingIcon
        }}
      ></Screen>

      <Screen
        name="main/test"
        component={MainTestScreen}
        options={{
          tabBarIcon: TestIcon
          // header: (props) => <SearchNavigationHeader {...props} />
          // headerStyle: { backgroundColor: 'red', zIndex: 1000000 }
        }}
      ></Screen>
    </Navigator>
  )
}

/**
 * ANCHOR: BOTTOM BAR ICONS
 */
function HomeIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Ionicons name="ios-home-sharp" size={24} color="#4a2702" />
  ) : (
    <Ionicons name="ios-home-outline" size={24} color="#a8a8a8" />
  )
}

function LibraryIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Ionicons name="ios-library-sharp" size={24} color="#4a2702" />
  ) : (
    <Ionicons name="ios-library-outline" size={24} color="#a8a8a8" />
  )
}

function DiscoverIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <MaterialCommunityIcons name="feature-search" size={24} color="#4a2702" />
  ) : (
    <MaterialCommunityIcons
      name="feature-search-outline"
      size={24}
      color="#a8a8a8"
    />
  )
}

function SettingIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Ionicons name="ios-settings" size={24} color="#4a2702" />
  ) : (
    <Ionicons name="ios-settings-outline" size={24} color="#a8a8a8" />
  )
}

function TestIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <MaterialCommunityIcons name="test-tube" size={24} color="#4a2702" />
  ) : (
    <MaterialCommunityIcons name="test-tube-off" size={24} color="#a8a8a8" />
  )
}
