import React, { useEffect } from "react";

// Eas build
import "expo-dev-client";

import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import AppLoading from "expo-app-loading";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { StackNavigator } from "@/navigators/StackNavigator";
import store, { persistor } from "@/app/store";
import { settingSelector } from "@/app/settingSlice";

// import { schedulePushNotification, useNotification } from "@/app/notification";
import { navigationRef } from "@/navigators";

// import "react-native-gesture-handler";

// @ts-ignore
import { connectToDevTools } from "react-devtools-core";
import { useAppSelector } from "@/app/hooks";
import { Platform } from "react-native";

// FLIPPER CONNECT
if (__DEV__ && Platform.OS !== "web") {
  connectToDevTools({
    host: "localhost",
    port: 8097,
  });
}

// ANCHOR: Export function
export default function App() {
  // Load font
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  // const { expoPushToken, notification } = useNotification();

  useEffect(() => {
    if (Platform.OS !== "web") schedulePushNotification();
  });

  // Splash screen
  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Provider  */}
          <UI />
          {/* Provider  */}
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

// ANCHOR: UI
function UI() {
  const setting = useAppSelector(settingSelector);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={setting.theme === "light" ? eva.light : eva.dark}
      >
        <SafeAreaProvider>
          <StackNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
      <StatusBar style="light" backgroundColor="#32404750" translucent={true} />
    </>
  );
}
