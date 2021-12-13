// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export const ProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Profile</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#a29bfe",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Card, Layout, List, Text } from "@ui-kitten/components";
import CommingSoon from "@/components/Common/CommingSoon";
import ErrorView from "@/components/Common/ErrorView";

const data = new Array(8).fill({
  title: "Item",
});
// ListCustomItemShowcase
export const ProfileScreen = () => {
  return <ErrorView errMsg={""} />;
};

const styles = StyleSheet.create({
  container: {
    // maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  layoutContainer: {
    flex: 1,
    flexDirection: "row",
  },
  layout: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 8,
  },
  poster: {
    width: 72,
    height: 108,
  },
});
