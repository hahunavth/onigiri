// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { Layout } from "@ui-kitten/components";
// import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "@react-native-community/blur";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <BlurView>
//         <LinearGradient
//           colors={["red", "blue", "green"]}
//           style={{ flex: 1, width: 399, height: 43 }}
//         />
//         <Text>Open up App.tsx to start working o n your app!</Text>
//       </BlurView>
//       <StatusBar style="auto" />
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
// });

import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { BlurView } from "@react-native-community/blur";

export default function App() {
  const uri =
    "https://github.com/Kureev/react-native-blur/raw/v3.6.1/example/bgimage.jpeg";

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          key={"blurryImage"}
          source={{ uri }}
          style={{ height: 1000, width: 100 }}
        />
      </ScrollView>
      <Text style={{ fontSize: 72 }}>Hi, I am some blurred text</Text>
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <Text>
        I'm the non blurred text because I got rendered on top of the BlurView
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    // height: 300,
    bottom: 0,
    right: 0,
  },
});
