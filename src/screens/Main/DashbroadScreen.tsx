import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { QuicksandText } from "@/components/Common/QuicksandText";

export const DashboardScreen = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QuicksandText
        category="h1"
        //  style={{ fontFamily: "Quicksand_700Bold" }}
      >
        HOME22
      </QuicksandText>
    </Layout>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#81ecec",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
