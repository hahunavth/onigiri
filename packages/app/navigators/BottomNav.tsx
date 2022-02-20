import { useToken } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// NOTE: IMPORT COMPONENT
import { BottomTabNavigationHeader } from 'app/components/NavigationHeader'
import {
  HomeScreen,
  LibraryScreen,
  DiscoverScreen,
  SettingScreen,
  MainTestScreen
} from 'app/screens'

type BottomNavParamsList = {
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
  const [text, background] = useToken('colors', [
    '$light.textPrimary',
    '$light.backgroundSecondary'
  ])

  return (
    <Navigator
      screenOptions={{
        header: BottomTabNavigationHeader,
        tabBarActiveTintColor: text,
        tabBarActiveBackgroundColor: background,
        tabBarInactiveBackgroundColor: background
      }}
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
