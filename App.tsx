// // import { StatusBar } from "expo-status-bar";
// // import { StyleSheet, Text, View } from "react-native";
// // import { Layout } from "@ui-kitten/components";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { BlurView } from "@react-native-community/blur";

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <BlurView>
// //         <LinearGradient
// //           colors={["red", "blue", "green"]}
// //           style={{ flex: 1, width: 399, height: 43 }}
// //         />
// //         <Text>Open up App.tsx to start working o n your app!</Text>
// //       </BlurView>
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// // });

// import "expo-dev-client";
// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
// import { BlurView } from "@react-native-community/blur";

// export default function App() {
//   const uri =
//     "https://github.com/Kureev/react-native-blur/raw/v3.6.1/example/bgimage.jpeg";

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <Image
//           key={"blurryImage"}
//           source={{ uri }}
//           style={{ height: 1000, width: 100 }}
//         />
//       </ScrollView>
//       <Text style={{ fontSize: 72 }}>Hi, I am some blurred text</Text>
//       {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
//       <BlurView
//         style={styles.absolute}
//         blurType="light"
//         blurAmount={10}
//         reducedTransparencyFallbackColor="white"
//       />
//       <Text>
//         I'm the non blurred text because I got rendered on top of the BlurView
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   absolute: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     // height: 300,
//     bottom: 0,
//     right: 0,
//   },
// });

import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

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
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { StackNavigator } from "@/navigators/StackNavigator";
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
import { navigationRef } from "@/navigators";

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
          {/* <SafeAreaView style={{ flex: 1 }}> */}
          <StackNavigator />
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      </ApplicationProvider>
      <StatusBar style="light" backgroundColor="#32404750" translucent={true} />
    </>
  );
}
