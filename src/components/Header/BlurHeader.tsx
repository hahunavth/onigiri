import React from "react";
import { Layout } from "@ui-kitten/components";
import QuicksandText from "@/components/Common/QuicksandText";
import { MyBlurView } from "@/components/Common/MyBlurView";
import { View } from "react-native";

interface BlurHeaderProps {}

const BlurHeader = (props: BlurHeaderProps) => {
  return (
    <View style={{ flex: 1 }}>
      <MyBlurView
        // tint="dark"
        // intensity={100}
        blurType="dark"
        blurAmount={50}
        style={{ position: "absolute", height: "100%", width: "100%" }}
      />
      <View style={{ flex: 1 }}>
        <QuicksandText>aaa</QuicksandText>
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

export default BlurHeader;
