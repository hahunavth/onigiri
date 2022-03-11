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
import { Platform, BackHandler, Alert } from 'react-native'
import { useEffect } from 'react'

import { triggerNotifications } from 'app/utils/notification'

import AppLoading from 'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold
} from '@expo-google-fonts/quicksand'
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons
} from '@expo/vector-icons'
import { AlertDialog } from 'native-base'

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

  const [isReady, setIsReady] = React.useState(false)
  const [isNavReady, setIsNavReady] = React.useState(false)

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Keep the splash screen visible while we fetch resources
  //       await SplashScreen.preventAutoHideAsync()
  //       // Pre-load fonts, make any API calls you need to do here
  //       await Font.loadAsync(Entypo.font)
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       // await new Promise((resolve) => setTimeout(resolve, 2000))

  //       await triggerNotifications()
  //     } catch (e) {
  //       console.warn(e)
  //     } finally {
  //       // Tell the application to render
  //       setIsReady(true)
  //     }
  //   }

  //   prepare()
  // }, [])

  // const onLayoutRootView = React.useCallback(async () => {
  //   if (isReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setIsRisReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync()
  //   }
  // }, [isReady])

  // if (!isReady) {
  //   return null
  // }

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'YES',
        onPress: () => BackHandler.exitApp(),
        style: 'destructive'
      }
    ])
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold
  })

  const Preload = React.useCallback(async () => {
    await SplashScreen.preventAutoHideAsync()
    await Font.loadAsync(Entypo.font)
    await Font.loadAsync(AntDesign.font)
    await Font.loadAsync(MaterialCommunityIcons.font)
    await Font.loadAsync(Ionicons.font)
    await triggerNotifications()
  }, [isReady])

  if (!isReady && !fontsLoaded && !isNavReady)
    return (
      <AppLoading
        startAsync={Preload}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setIsNavReady(true)}
    >
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
