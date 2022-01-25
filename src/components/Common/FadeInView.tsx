import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// const AnimatedLayout = Animated.createAnimatedComponent(Layout);

type Props = {
  children: React.ReactNode;
};

const FadeInView = (props: Props) => {
  // const fadeAnim = useSharedValue(0); // Initial value for opacity: 0

  // const fadeStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: withTiming(fadeAnim.value, {
  //       duration: 300,
  //       easing: Easing.in(Easing.linear),
  //     }),
  //   };
  // });

  // useFocusEffect(() => {
  //   // Animated.timing(fadeAnim, {
  //   //   toValue: 1,
  //   //   duration: 500,
  //   //   useNativeDriver: true,
  //   // }).start();
  //   fadeAnim.value = 1;
  //   return () => {
  //     fadeAnim.value = 0;
  //     // Animated.timing(fadeAnim, {
  //     //   toValue: 0,
  //     //   duration: 250,
  //     //   useNativeDriver: true,
  //     // }).start();
  //   };
  // });

  return (
    <Layout level={"1"} style={{ flex: 1 }}>
      {/* <Animated.View // Special animatable View
        // level={"4"}
        style={[
          {
            flex: 1,
            // opacity: fadeAnim, // Bind opacity to animated value
          },
          fadeStyle,
        ]}
      > */}
      {props.children}
      {/* </Animated.View> */}
    </Layout>
  );
};

export default FadeInView;
