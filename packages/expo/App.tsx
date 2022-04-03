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
import { Platform, LogBox, UIManager } from "react-native";
import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

import NetInfo from "@react-native-community/netinfo";

import { useBackgroundPushNotificationInfo } from "app/utils/backgroundFetchServices";
import * as Sentry from "@sentry/react-native";

import setupSentry from "app/provider/AppLoader/setupSentry";
import setupFlipper from "app/provider/AppLoader/setupFlipper";
import useAppPreload from "app/provider/AppLoader/useAppPreload";
import useAppState from "app/provider/AppLoader/useAppState";
import useI18n from "app/provider/AppLoader/useI18n";
import AnimatedAppLoader from "app/provider/AppLoader/AnimatedAppLoader";

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

setupSentry();
setupFlipper();

enableScreens(true);

// Configure layout animation
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * App
 */
function App() {
  useAppState();
  useFlipper(navigationRef);
  useI18n();

  const { checkStatusAsync, isRegistered, status, toggleFetchTask } =
    useBackgroundPushNotificationInfo();

  useEffect(() => {
    (async () => {
      if (!isRegistered && status === 3) {
        toggleFetchTask && toggleFetchTask();
      }
    })();
  }, [isRegistered, status, toggleFetchTask]);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {});
    return () => unsubscribe();
  });

  const { handleFinish, handleNavReady, isSplashReady, startAsync } =
    useAppPreload();

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
            handleNavReady();
          }}
        >
          <PersistGate persistor={persistor}>
            <SafeAreaProvider>
              <AnimatedAppLoader
                isSplashReady={isSplashReady}
                startAsync={startAsync}
                onFinish={handleFinish}
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

// Sentry
export default Sentry.wrap(App);

/**
 * TODO:
 *  expo-task-manager setup for ios
 */
