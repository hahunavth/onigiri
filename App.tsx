import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import store from "./src/app/store";

import { StackNavigator } from "./src/navigators/StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as SplashScreen from "expo-splash-screen";
// import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

const queryClient = new QueryClient();

// if (__DEV__) {
//   import("react-query-native-devtools").then(({ addPlugin }) => {
//     addPlugin({ queryClient });
//   });
// }
// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  // if (fontsLoaded) {
  //   console.log("done");
  //   return <AppLoading />;
  // }

  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider {...eva} theme={eva.light}>
                <StackNavigator />
              </ApplicationProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </Provider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

// import React, { useCallback, useEffect, useState } from "react";
// import { Text, View } from "react-native";
// import { Entypo } from "@expo/vector-icons";
// import * as SplashScreen from "expo-splash-screen";
// import * as Font from "expo-font";

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         // Keep the splash screen visible while we fetch resources
//         await SplashScreen.preventAutoHideAsync();
//         // Pre-load fonts, make any API calls you need to do here
//         await Font.loadAsync(Entypo.font);
//         // Artificially delay for two seconds to simulate a slow loading
//         // experience. Please remove this if you copy and paste the code!
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         // Tell the application to render
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       // This tells the splash screen to hide immediately! If we call this after
//       // `setAppIsReady`, then we may see a blank screen while the app is
//       // loading its initial state and rendering its first pixels. So instead,
//       // we hide the splash screen once we know the root view has already
//       // performed layout.
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <View
//       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//       onLayout={onLayoutRootView}
//     >
//       <Text>SplashScreen Demo! 👋</Text>
//       <Entypo name="rocket" size={30} />
//     </View>
//   );
// }
