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
import { Platform, BackHandler, Alert, LogBox } from 'react-native'
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
import { Asset } from 'expo-asset'
import NetInfo from '@react-native-community/netinfo'

// NOTE: ADS
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync
} from 'expo-ads-admob'
// Android banner: ca-app-pub-1646154512233519/3404814383
// Android in: ca-app-pub-1646154512233519/7994811999

// import * as Sentry from 'sentry-expo'

// Sentry.init({
//   dsn: 'https://b317d8e257dc46158832ef2b7567670d@o1168335.ingest.sentry.io/6260193',
//   enableInExpoDevelopment: true,
//   debug: true // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// })

import 'app/i18n/index'

import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import { useBackgroundPushNotificationInfo } from 'app/utils/backgroundFetchServices'
import * as Sentry from '@sentry/react-native'

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enableNative: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      // routingInstrumentation,
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
    })
  ],
  // debug: true,
  // To set a uniform sample rate
  tracesSampleRate: 0.2,
  //
  enableAutoSessionTracking: true,
  // Sessions close after app is 10 seconds in the background.
  sessionTrackingIntervalMillis: 10000,
  beforeSend(event) {
    // exclude all events that have no stack trace
    if (event.stacktrace?.frames?.length) {
      return event
    } else {
      return null
    }
  }
})

LogBox.ignoreLogs([
  'Sentry Logger [Warn]: Note: Native Sentry SDK is disabled.',
  `Picker has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-picker/picker' instead of 'react-native'. See https://github.com/react-native-picker/react-native-picker`,
  'Bridge was already shutdown.'
])

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

/**
 *
 * App
 */
function App() {
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
    i18n.locale = store.getState().setting.language

    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  const { checkStatusAsync, isRegistered, status, toggleFetchTask } =
    useBackgroundPushNotificationInfo()

  useEffect(() => {
    ;(async () => {
      if (!isRegistered && status === 3) {
        toggleFetchTask && toggleFetchTask()
      }
    })()
  }, [isRegistered, status, toggleFetchTask])

  console.log(
    isRegistered,
    status
    // status && BackgroundFetch.BackgroundFetchStatus[status]
  )

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type)
      console.log('Is connected?', state.isConnected)
    })
    return () => unsubscribe()
  })

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
    // await triggerNotifications()
    // NOTE: ADS
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
      onReady={() => {
        // Splash
        setIsNavReady(true)
        // Sentry
        routingInstrumentation.registerNavigationContainer(navigationRef)
      }}
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

// Sentry
export default Sentry.wrap(App)

/**
 * TODO:
 *  expo-task-manager setup for ios
 *
 */
