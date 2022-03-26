import { View, Text, VStack } from "native-base";
import React from "react";
import LottieView from "lottie-react-native";

export const Download = () => {
  return (
    <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
      <LottieView
        source={require("../../assets/download.json")}
        autoPlay
        loop={false}
        autoSize
        resizeMode="cover"
        speed={1}
        style={{
          marginBottom: 0,
          width: 180,
          height: 180
          // backgroundColor: "blue"
        }}
      />
      <Text pt={41} fontSize={18} fontWeight={"600"} color={"blueGray.500"}>
        {"Download to read offline!"}
      </Text>
    </VStack>
  );
};
