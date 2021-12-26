// import React from "react";
// import { Button, StyleSheet } from "react-native";
// import { Layout, Text } from "@ui-kitten/components";
// import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";
// // import { useAppDispatch, useAppSelector } from "../../app/hooks";
// // import { fetchRecentlyAsync, selectHome } from "../../app/homeSlice";
// import { useApiRecently } from "../../app/api";
// import ErrorView from "@/components/Common/ErrorView";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";
// import SessionHeader from "@/components/Common/SessionHeader";
// import LottieView from "lottie-react-native";

// export const DashboardScreen = () => {
//   return (
//     <Layout style={{ flex: 1 }}>
//       <LottieView
//         source={require("../../assets/IconAnimation/location.json")}
//       />

//     </Layout>
//   );
// };

import React from "react";
import { View } from "react-native";
import { withStyles } from "@ui-kitten/components";
import {} from "@ui-kitten/components";

const AwesomeView = (props: any) => {
  const { eva, style, ...restProps } = props;

  return <View {...restProps} style={[eva.style.awesome, style]} />;
};

export const DashboardScreen = withStyles(AwesomeView, (theme) => ({
  awesome: {
    backgroundColor: theme["color-primary-100"],
    flex: 1,
  },
}));
