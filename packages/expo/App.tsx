import React from "react";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "app/store/store";

import { navigationRef } from "app/navigators";
import { useFlipper } from "@react-navigation/devtools";

import UI from "app/ExpoUI";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// @ts-ignore
import { connectToDevTools } from "react-devtools-core";
import {
  Platform,
  BackHandler,
  Alert,
  LogBox,
  UIManager,
  AppState,
  AppStateStatus,
  useWindowDimensions,
  ActivityIndicator
} from "react-native";
import { useEffect } from "react";

import { triggerNotifications } from "app/utils/notification";

import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold
} from "@expo-google-fonts/quicksand";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons
} from "@expo/vector-icons";
import { Asset } from "expo-asset";
import NetInfo from "@react-native-community/netinfo";

// NOTE: ADS
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync
} from "expo-ads-admob";
// Android banner: ca-app-pub-1646154512233519/3404814383
// Android in: ca-app-pub-1646154512233519/7994811999

// import * as Sentry from 'sentry-expo'

// Sentry.init({
//   dsn: 'https://b317d8e257dc46158832ef2b7567670d@o1168335.ingest.sentry.io/6260193',
//   enableInExpoDevelopment: true,
//   debug: true // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// })

import "app/i18n/index";

import * as Localization from "expo-localization";
import i18n from "i18n-js";

import { useBackgroundPushNotificationInfo } from "app/utils/backgroundFetchServices";
import * as Sentry from "@sentry/react-native";
import { StatusBar } from "expo-status-bar";
import {
  comicApi,
  useApiHot,
  useApiLazyHot,
  useApiLazyRecently,
  useApiLazyTopWeek,
  useApiRecently,
  useApiTopMonth,
  useApiTopWeek
} from "app/store/api";

import * as Device from "expo-device";
import { mergeNewChapterNotificationThunk } from "app/store/notificationSlice";

import * as Updates from "expo-updates";
import { useCallback, useMemo, useState } from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";

// NOTE: BARE WORKFLOW DONT HAVE ACCESS TO THIS MODULE
// import Constants from 'expo-constants'

// NOTE: LogBox first to remove warning
LogBox.ignoreLogs([
  "Sentry Logger [Warn]: Note: Native Sentry SDK is disabled.",
  `Picker has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-picker/picker' instead of 'react-native'. See https://github.com/react-native-picker/react-native-picker`,
  "Bridge was already shutdown."
]);

// NOTE: SPLASH
// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

// import { InteractionManager } from 'react-native'
// import {
//   hasMigratedFromAsyncStorage,
//   migrateFromAsyncStorage
// } from 'app/utils/mmkvStorage'

// import { initializeMMKVFlipper } from "react-native-mmkv-flipper-plugin";
// import { MMKV } from "react-native-mmkv";
/**
 * TODO: USE MMKV INSTEAD OF ASYNC STORAGE
 */
if (__DEV__ && process.env.MMKV === "true") {
  console.log("USING MMKV DEBUGGER");
  const initializeMMKVFlipper =
    require("react-native-mmkv-flipper-plugin").initializeMMKVFlipper;
  const MMKV = require("react-native-mmkv").MMKV;
  const storage = new MMKV();
  // console.log(storage);
  initializeMMKVFlipper({ default: storage });
}

// FIXME: CAUSE ERROR
// Construct a new instrumentation instance. This is needed to communicate between the integration and React
// const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

// console.log('Dsn: adgasjhasg ------------------  ' + process.env.SENTRY_DSN)
// console.log(process)

const onigiriSentryReleaseName = () => {
  const prefix = Platform.OS === "ios" ? "ios" : "android";
  const buildNumber = Device.modelName;
  const version = Device.osVersion;
  return prefix + "-" + version + "-" + buildNumber;
};

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enableNative: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      // routingInstrumentation,
      tracingOrigins: ["localhost", "my-site-url.com", /^\//]
    })
  ],
  debug: true,
  // To set a uniform sample rate
  // tracesSampleRate: 0.2,
  //
  // enableAutoSessionTracking: true,
  // Sessions close after app is 10 seconds in the background.
  // sessionTrackingIntervalMillis: 10000,
  // NOTE: eigen config
  release: onigiriSentryReleaseName(),
  dist: Device.osVersion || undefined,
  autoSessionTracking: true,
  enableOutOfMemoryTracking: false
  // beforeSend(event) {
  //   // exclude all events that have no stack trace
  //   if (event.stacktrace?.frames?.length) {
  //     return event
  //   } else {
  //     return null
  //   }
  // }
});

// FLIPPER CONNECT
if (__DEV__ && Platform.OS !== "web") {
  connectToDevTools({
    host: "localhost",
    port: 8097
  });
}

if (__DEV__ && Platform.OS !== "web") {
  require("react-native-performance-flipper-reporter").setupDefaultFlipperReporter();
}
enableScreens(true);

// Configure layout animation
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * Prefetch image
 * Catching
 */

// function cacheImages(images) {
//   return images.map((image) => {
//     if (typeof image === "string") {
//       return Image.prefetch(image);
//     } else {
//       return Asset.fromModule(image).downloadAsync();
//     }
//   });
// }

// function cacheFonts(fonts) {
//   return fonts.map((font) => Font.loadAsync(font));
// }

/**
 *
 * App
 */
function App() {
  // NOTE: APP STATE ON ACTIVE DISPATCH ACTION
  const appState = React.useRef(AppState.currentState);
  // NOTE: CAUSE CRASH WHEN RELOAD #2
  // const [appStateVisible, setAppStateVisible] = React.useState(
  //   appState.current
  // );

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      store.dispatch(mergeNewChapterNotificationThunk());
    }

    appState.current = nextAppState;
    // setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };

  // TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
  // const [hasMigrated, setHasMigrated] = React.useState(
  //   hasMigratedFromAsyncStorage
  // )

  // useEffect(() => {
  //   if (!hasMigratedFromAsyncStorage) {
  //     InteractionManager.runAfterInteractions(async () => {
  //       try {
  //         await migrateFromAsyncStorage()
  //         setHasMigrated(true)
  //       } catch (e) {
  //         // TODO: fall back to AsyncStorage? Wipe storage clean and use MMKV? Crash app?
  //       }
  //     })
  //   }
  // }, [])

  // Hooks from this package only work during development and are disabled in production.
  // You don't need to do anything special to remove them from the production build.
  useFlipper(navigationRef);

  const [isReady, setIsReady] = React.useState(false);
  const [isNavReady, setIsNavReady] = React.useState(false);

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

  useEffect(() => {
    i18n.locale = store.getState().setting.language;
  }, []);

  const { checkStatusAsync, isRegistered, status, toggleFetchTask } =
    useBackgroundPushNotificationInfo();

  useEffect(() => {
    (async () => {
      if (!isRegistered && status === 3) {
        toggleFetchTask && toggleFetchTask();
      }
    })();
  }, [isRegistered, status, toggleFetchTask]);

  // console.log(
  //   isRegistered,
  //   status
  //   // status && BackgroundFetch.BackgroundFetchStatus[status]
  // )

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log('Connection type', state.type)
      // console.log('Is connected?', state.isConnected)
    });
    return () => unsubscribe();
  });

  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold
  });
  // const [a, b, c] = useApiLazyRecently()
  // const [e, f, g] = useApiLazyHot()
  // const [h, i, k] = useApiLazyTopWeek()
  // const { refetch } =
  //   comicApi.endpoints.getRecentlyByPage.useQuerySubscription('1')
  // useApiTopMonth('1')

  const Preload = React.useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();
    await Font.loadAsync(Entypo.font);
    await Font.loadAsync(AntDesign.font);
    await Font.loadAsync(MaterialCommunityIcons.font);
    await Font.loadAsync(Ionicons.font);
    // console.log('prefetch---------------')
    // a('1')
    // e('1')
    // h('1')
    // await new Promise((resolve) => setTimeout(resolve, 10000))
    // await triggerNotifications()
    // NOTE: ADS
  }, []);

  // if (!isReady && !fontsLoaded && !isNavReady)
  //   return (
  //     <>
  //       <StatusBar animated={true} translucent={true} style={'auto'} />

  //       <AppLoading
  //         startAsync={Preload}
  //         onFinish={() => setIsReady(true)}
  //         onError={console.warn}
  //       />
  //     </>
  //   )

  // if (!hasMigrated) {
  //   // show loading indicator while app is migrating storage...
  //   return (
  //     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator color="black" />
  //     </View>
  //   )
  // }

  return (
    <Provider store={store}>
      {
        // !isReady && !fontsLoaded && !isNavReady ? (
        //   <>
        //     {/* <StatusBar animated={true} translucent={true} style={'auto'} /> */}

        //     <AppLoading
        //       startAsync={Preload}
        //       onFinish={() => setIsReady(true)}
        //       onError={console.warn}
        //     />
        //   </>
        // ) :
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            // Sentry
            // routingInstrumentation.registerNavigationContainer(navigationRef);
            // Splash
            setIsNavReady(true);
          }}
        >
          <PersistGate persistor={persistor}>
            <SafeAreaProvider>
              <AnimatedAppLoader
                isSplashReady={isReady && fontsLoaded && isNavReady}
                startAsync={Preload}
                onFinish={() => setIsReady(true)}
                // image={{
                //   uri: "https://user-images.githubusercontent.com/7416971/78830030-f2c9f100-7a04-11ea-81e1-e742854bb48d.png"
                // }}
              >
                <UI />
              </AnimatedAppLoader>
            </SafeAreaProvider>
          </PersistGate>
        </NavigationContainer>
      }
    </Provider>
  );
}

// function ReduxWrappedApp() {
//   return (
//       <App />
//   )
// }

// Sentry
export default Sentry.wrap(App);

/**
 * TODO:
 *  expo-task-manager setup for ios
 *
 */

/**
 * STUB: SPLASH
 */
// import AppLoading from "expo-app-loading";
// import { Asset } from "expo-asset";
// import Constants from "expo-constants";
// import * as SplashScreen from "expo-splash-screen";
// import * as Updates from "expo-updates";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   Animated,
//   Button,
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from "react-native";

// // Instruct SplashScreen not to hide yet, we want to do this manually
// SplashScreen.preventAutoHideAsync().catch(() => {
//   /* reloading the app might trigger some race conditions, ignore them */
// });

// export default function App() {
//   return (
//     <AnimatedAppLoader
//       image={{
//         uri: "https://user-images.githubusercontent.com/7416971/78830030-f2c9f100-7a04-11ea-81e1-e742854bb48d.png"
//       }}
//     >
//       <MainScreen />
//     </AnimatedAppLoader>
//   );
// }

type AnimatedAppLoaderProps = {
  children: React.ReactNode;
  isSplashReady: boolean;
  startAsync: () => any;
  onFinish: () => any;
};

function AnimatedAppLoader({
  children,
  isSplashReady,
  startAsync,
  onFinish
}: AnimatedAppLoaderProps) {
  if (!isSplashReady) {
    return (
      <AppLoading
        // Instruct SplashScreen not to hide yet, we want to do this manually
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <AnimatedSplashScreen image={require("./assets/splash.yellow.png")}>
      {children}
    </AnimatedSplashScreen>
  );
}

function AnimatedSplashScreen({ children, image }: any) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        delay: 3000,
        useNativeDriver: true
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "white",
              opacity: animation
            }
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              transform: [
                {
                  scale: animation
                }
              ]
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
          <AnimatedSplashText />
        </Animated.View>
      )}
    </View>
  );
}

function AnimatedSplashText() {
  const animation = useMemo(() => new Animated.Value(0), []);
  const { height, width } = useWindowDimensions();

  const trans = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0]
  });
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      delay: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: animation,
        transform: [{ translateY: trans }],
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width,
        height: 100,
        bottom: 100,
        flexDirection: "row"
      }}
    >
      <ActivityIndicator
        color={"#8d6868"}
        style={{ marginTop: 2, marginRight: 8, marginLeft: -20 }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          textAlign: "center"
        }}
      >
        Onigiri
      </Text>
    </Animated.View>
  );
}
