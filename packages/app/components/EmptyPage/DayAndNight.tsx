import { View, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
// import { Animated } from "react-native";
import { goBack } from "../../navigators";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useDerivedValue,
  runOnJS
} from "react-native-reanimated";

export type DayAndNightProps = {
  type: "day-to-night" | "night-to-day";
};

export const DayAndNight = ({ type }: DayAndNightProps) => {
  console.log("object");
  const START = type === "day-to-night" ? 0.5 : 0;
  const END = type === "day-to-night" ? 1 : 0.5;

  // const progress = React.useRef(new Animated.Value(START));

  // React.useEffect(() => {
  //   Animated.timing(progress.current, {
  //     toValue: END,
  //     duration: 5000,
  //     useNativeDriver: false
  //   }).start();
  //   const t = setTimeout(() => {
  //     goBack();
  //   }, 5200);

  //   return () => {
  //     clearTimeout(t);
  //   };
  // }, []);

  // const progress = useSharedValue(0);

  // const animatedProps = useAnimatedProps(() => {
  //   return {
  //     progress: progress.value
  //   };
  // });

  // useEffect(() => {
  //   progress.value = withTiming(1, {
  //     duration: 1000
  //   });
  // }, [progress]);

  const [progress, setProgress] = useState(0);
  const animationProgress = useSharedValue(0);

  animationProgress.value = withTiming(0.5, {
    duration: 2000
  });

  useEffect(() => {
    const emit = setTimeout(() => {
      goBack();
    }, 2100);
    return () => clearTimeout(emit);
  });

  useDerivedValue(() => {
    runOnJS(setProgress)(animationProgress.value);
  }, [animationProgress]);

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
        loop={false}
        // autoSize
        // resizeMode="cover"
        // animatedProps={animatedProps}
        onAnimationFinish={() => goBack()}
        // speed={1}
        // progress={progress.current}
        progress={progress}
        // style={{
        //   marginBottom: 0,
        //   width: 180,
        //   height: 180
        //   // backgroundColor: "blue"
        // }}
      />
    </Animated.View>
  );
};

//
//
// //

// import { View, Text, VStack } from "native-base";
// import React, { useEffect } from "react";
// import LottieView from "lottie-react-native";
// // import { Animated } from "react-native";
// import { goBack } from "../../navigators";
// import Animated, {
//   useSharedValue,
//   useAnimatedProps,
//   withTiming
// } from "react-native-reanimated";

// export type DayAndNightProps = {
//   type: "day-to-night" | "night-to-day";
// };

// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

// export const DayAndNight = ({ type }: DayAndNightProps) => {
//   console.log("object");
//   const START = type === "day-to-night" ? 0.5 : 0;
//   const END = type === "day-to-night" ? 1 : 0.5;

//   // const progress = React.useRef(new Animated.Value(START));

//   // React.useEffect(() => {
//   //   Animated.timing(progress.current, {
//   //     toValue: END,
//   //     duration: 5000,
//   //     useNativeDriver: false
//   //   }).start();
//   //   const t = setTimeout(() => {
//   //     goBack();
//   //   }, 5200);

//   //   return () => {
//   //     clearTimeout(t);
//   //   };
//   // }, []);

//   const progress = useSharedValue(0);

//   const animatedProps = useAnimatedProps(() => {
//     return {
//       progress: progress.value
//     };
//   });

//   useEffect(() => {
//     progress.value = withTiming(1, {
//       duration: 1000
//     });
//   }, [progress]);

//   return (
//     <Animated.View
//       style={{
//         width: 300,
//         height: 300,
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 12,
//         backgroundColor: "white"
//       }}
//     >
//       <AnimatedLottieView
//         source={require("../../assets/day-and-night.json")}
//         // autoPlay
//         // loop={false}
//         // autoSize
//         // resizeMode="cover"
//         animatedProps={animatedProps}
//         onAnimationFinish={() => goBack()}
//         // speed={1}
//         progress={animatedProps.progress}
//         // progress={progress.current}
//         style={{
//           marginBottom: 0,
//           width: 180,
//           height: 180
//           // backgroundColor: "blue"
//         }}
//       />
//     </Animated.View>
//   );
// };
