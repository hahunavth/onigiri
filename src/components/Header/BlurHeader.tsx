import React from "react";
import { Layout } from "@ui-kitten/components";
import QuicksandText from "../Common/QuicksandText";
import { BlurView } from "expo-blur";
import { View } from "react-native";

interface BlurHeaderProps {}

const BlurHeader = (props: BlurHeaderProps) => {
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
