import React, { useMemo } from "react";
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

import * as SplashScreen from "expo-splash-screen";

export default function useAppPreload() {
  const [isReady, setIsReady] = React.useState(false);
  const [isNavReady, setIsNavReady] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold
  });

  const startAsync = React.useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();
    await Font.loadAsync(Entypo.font);
    await Font.loadAsync(AntDesign.font);
    await Font.loadAsync(MaterialCommunityIcons.font);
    await Font.loadAsync(Ionicons.font);
  }, []);

  const handleFinish = React.useCallback(() => setIsReady(true), []);

  const handleNavReady = React.useCallback(() => {
    // Sentry
    // routingInstrumentation.registerNavigationContainer(navigationRef);
    // Splash
    setIsNavReady(true);
  }, []);

  const isSplashReady = useMemo(() => {
    return isReady && fontsLoaded && isNavReady;
  }, [isReady, fontsLoaded, isNavReady]);

  return {
    startAsync,
    handleFinish,
    handleNavReady,
    isSplashReady
  };
}
