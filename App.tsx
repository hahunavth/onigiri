import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

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
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { StackNavigator } from "@/navigator/StackNavigator";
import store, { persistor } from "./src/app/store";
import { useAppDispatch, useAppSelector } from "./src/app/hooks";
import { settingSelector } from "./src/app/settingSlice";
import { Subscription } from "expo-modules-core";
import {
  AndroidImportance,
  AndroidNotificationVisibility,
  NotificationChannel,
  NotificationChannelInput,
} from "expo-notifications";
import { addMultipleImgs } from "@/utils/Download/ImgManager";
import { resChapterDetail_T, resComicDetail_T } from "@/types/api";
import { downloadAction, downloadSelector } from "./src/app/downloadSlice";
import { useNotification } from "./src/app/notification";

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

  const { expoPushToken, notification } = useNotification();

  // Splash screen
  if (!fontsLoaded) return <AppLoading />;

  // schedulePushNotification();

  return (
    <NavigationContainer>
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
          <SafeAreaView style={{ flex: 1 }}>
            <StackNavigator />
          </SafeAreaView>
        </SafeAreaProvider>
      </ApplicationProvider>
      <StatusBar style="light" backgroundColor="#7cb5d6" />
    </>
  );
}
