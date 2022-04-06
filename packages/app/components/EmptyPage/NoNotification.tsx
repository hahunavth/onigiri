import { View, Text, VStack } from "native-base";
import React from "react";
import LottieView from "lottie-react-native";
import Animated, { FadeInDown, FadeIn, FadeOut } from "react-native-reanimated";

type Props = {};

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export const NoNotification = (props: Props) => {
  return (
    <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
      <AnimatedLottieView
        entering={FadeIn.delay(100)}
        exiting={FadeOut}
        // ref={animation => {
        //   this.animation = animation;
        // }}
        // style={{
        //   width: 1,
        //   height: 1
        //   // backgroundColor: '#eee'
        // }}
        source={require("app/assets/no-notifications.json")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        autoPlay
        loop
        style={{ marginBottom: 60 }}
      />
      {/* REVIEW: RNR LAYOUT ANIMATION */}
      <Animated.View
        entering={FadeInDown.delay(100).springify()}
        exiting={FadeOut}
      >
        <Text pt={80} fontSize={18} fontWeight={"600"} color={"blueGray.500"}>
          No Notifications
        </Text>
      </Animated.View>
    </VStack>
  );
};
