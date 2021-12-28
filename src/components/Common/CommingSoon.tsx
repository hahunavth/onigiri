import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import QuicksandText, { QFontFamily } from "./QuicksandText";

const CommingSoon = () => {
  const styles = useStyleSheet(themeStyles);

  return (
    <View style={styles.conntainer}>
      <LottieView
        source={require("../../assets/under-maintenance.json")}
        autoPlay
        autoSize
        speed={0.8}
        resizeMode="cover"
        style={{ alignSelf: "auto", width: 200 }}
      />
      <QuicksandText
        style={{ fontFamily: QFontFamily.Quicksand_300Light, fontSize: 32 }}
      >
        Coming soon!
      </QuicksandText>
    </View>
  );
};

const themeStyles = StyleService.create({
  conntainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "background-basic-color-2",
  },
});

export default CommingSoon;
