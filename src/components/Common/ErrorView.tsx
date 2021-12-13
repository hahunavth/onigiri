//import liraries
import {
  useStyleSheet,
  useTheme,
  StyleService,
  ThemedComponentProps,
} from "@ui-kitten/components/theme";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  ScaledSize,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import QuicksandText, { QFontFamily } from "./QuicksandText";
import LottieView from "lottie-react-native";

type Props = {
  errMsg: string;
};

const ErrorView = ({ errMsg }: Props) => {
  const styles = useStyleSheet(themedStyles);

  const { width, height } = useWindowDimensions();
  const LottieViewWidth = height / 2;

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/something-went-wrong.json")}
        autoPlay
        autoSize
        speed={0.8}
        resizeMode="cover"
        style={{ width: LottieViewWidth, height: LottieViewWidth }}
      />
      <QuicksandText
        style={{
          ...styles.text,
          fontFamily: QFontFamily.Quicksand_500Medium,
        }}
        category={"h3"}
      >
        Oops!{" "}
      </QuicksandText>
      <QuicksandText style={styles.text} category={"h6"}>
        Something went wrong!
      </QuicksandText>
      <Text style={styles.text}>{errMsg}</Text>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "background-basic-color-1",
  },
  text: {
    color: "text-basic-color",
  },
});

export default ErrorView;
