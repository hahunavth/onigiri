import 'expo-dev-client'
import 'expo-dev-launcher'
import 'expo/build/Expo.fx'
import { activateKeepAwake } from 'expo-keep-awake'
import { registerRootComponent } from 'expo'

import App from './App'
import { NativeBaseProvider } from 'native-base'

if (__DEV__) {
  activateKeepAwake()
}

registerRootComponent(App)
