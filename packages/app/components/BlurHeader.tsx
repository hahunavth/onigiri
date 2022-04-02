import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { BlurView } from "app/components/BlurView";

interface BlurHeaderProps {
  style?: ViewStyle;
}

export const BlurHeader = (props: BlurHeaderProps) => {
  return (
    <View style={[{ flex: 1 }, props.style]}>
      <BlurView
        tint="dark"
        intensity={100}
        // blurType="dark"
        // blurAmount={50}
        style={{ position: "absolute", height: "100%", width: "100%" }}
      />
      <View style={{ flex: 1 }}>
        <Text>aaa</Text>
      </View>
    </View>
  );

  // return (
  //   <View
  //     style={{
  //       padding: 30,
  //       margin: 30,
  //       // backgroundColor: "black",
  //     }}
  //   >
  //     <MyBlurView
  //       style={{
  //         height: 40,
  //         justifyContent: "center",
  //         borderRadius: 5,
  //         paddingHorizontal: 10,
  //       }}
  //       tint="dark"
  //       intensity={50}
  //     >
  //       <QuicksandText style={{}}>fffff</QuicksandText>
  //     </MyBlurView>
  //   </View>
  // );
};
