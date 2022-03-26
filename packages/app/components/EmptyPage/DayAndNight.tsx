import { View, Text, VStack } from "native-base";
import React from "react";
import LottieView from "lottie-react-native";
import { Animated } from "react-native";
import { goBack } from "../../navigators";

export type DayAndNightProps = {
  type: "day-to-night" | "night-to-day";
};

export const DayAndNight = ({ type }: DayAndNightProps) => {
  console.log("object");
  const START = type === "day-to-night" ? 0.5 : 0;
  const END = type === "day-to-night" ? 1 : 0.5;

  const progress = React.useRef(new Animated.Value(START));

  // const color = progress.current.interpolate({
  //   inputRange: [START, END],
  //   outputRange: ["#c5c5c5", "#414141"]
  // });

  React.useEffect(() => {
    Animated.timing(progress.current, {
      toValue: END,
      duration: 5000,
      useNativeDriver: false
    }).start();
    const t = setTimeout(() => {
      goBack();
    }, 5200);

    return () => {
      clearTimeout(t);
    };
  }, []);

  return (
    <Animated.View
      style={{
        width: 300,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        backgroundColor: "white"
      }}
    >
      <LottieView
        source={require("../../assets/day-and-night.json")}
        // autoPlay
        // loop={false}
        // autoSize
        resizeMode="cover"
        // speed={1}
        progress={progress.current}
        style={{
          marginBottom: 0,
          width: 180,
          height: 180
          // backgroundColor: "blue"
        }}
      />
    </Animated.View>
  );
};
