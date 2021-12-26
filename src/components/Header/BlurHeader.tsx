import React from "react";
import { Layout } from "@ui-kitten/components";
import QuicksandText from "../Common/QuicksandText";
import { BlurView } from "expo-blur";
import { View } from "react-native";

interface BlurHeaderProps {}

const BlurHeader = (props: BlurHeaderProps) => {
  return (
    <View style={{ flex: 1 }}>
      <BlurView
        tint="dark"
        intensity={100}
        style={{ position: "absolute", height: "100%", width: "100%" }}
      />
      <View style={{ flex: 1 }}>
        <QuicksandText>aaa</QuicksandText>
      </View>
    </View>
  );

  return (
    <View
      style={{
        padding: 30,
        margin: 30,
        // backgroundColor: "black",
      }}
    >
      <BlurView
        style={{
          height: 40,
          justifyContent: "center",
          borderRadius: 5,
          paddingHorizontal: 10,
        }}
        tint="dark"
        intensity={50}
      >
        <QuicksandText style={{}}>fffff</QuicksandText>
      </BlurView>
    </View>
  );
};

export default BlurHeader;
