import { View, Text } from "native-base";
import React from "react";
import LottieView from "lottie-react-native";

type Props = {};

export const NotFound = (props: Props) => {
  return (
    <View flex={1}>
      <LottieView
        // ref={animation => {
        //   this.animation = animation;
        // }}
        // style={{
        //   width: 1,
        //   height: 1
        //   // backgroundColor: '#eee'
        // }}
        source={require("../../assets/404-2.json")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        autoPlay
        loop
        style={{ marginBottom: 24 }}
      />
    </View>
  );
};
