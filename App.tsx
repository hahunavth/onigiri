import React from "react";

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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Provider } from "react-redux";

import { StackNavigator } from "@/navigator/StackNavigator";
import store from "./src/app/store";
import { useAppSelector } from "./src/app/hooks";
import { settingSelector } from "./src/app/settingSlice";

export default function App() {
  // Load font
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });
  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <Provider store={store}>
        {/* Provider  */}
        <UI />
        {/* Provider  */}
      </Provider>
    </NavigationContainer>
  );
}

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
