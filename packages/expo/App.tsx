import React from 'react'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NavigationContainer } from '@react-navigation/native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from 'app/store/store'

import { navigationRef } from 'app/navigators'
import { useFlipper } from '@react-navigation/devtools'

import UI from 'app/ExpoUI'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
// @ts-ignore
import { connectToDevTools } from 'react-devtools-core'
import { Platform } from 'react-native'
import { useEffect } from 'react'

import { triggerNotifications } from 'app/utils/notification'
// FLIPPER CONNECT
if (__DEV__ && Platform.OS !== 'web') {
  connectToDevTools({
    host: 'localhost',
    port: 8097
  })
}

if (__DEV__ && Platform.OS !== 'web') {
  require('react-native-performance-flipper-reporter').setupDefaultFlipperReporter()
}

enableScreens(true)

export default function App() {
  // Hooks from this package only work during development and are disabled in production.
  // You don't need to do anything special to remove them from the production build.
  useFlipper(navigationRef)

  useEffect(() => {
    triggerNotifications()
  })

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <UI />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  )
}

/**
 * TODO:
 *  expo-task-manager setup for ios
 *
 */
