// import React from "react";
// import { Button, StyleSheet } from "react-native";
// import { Layout, Text } from "@ui-kitten/components";
// import QuicksandText, { QFontFamily } from "@/components/Common/QuicksandText";
// // import { useAppDispatch, useAppSelector } from "@/app/hooks";
// // import { fetchRecentlyAsync, selectHome } from "@/app/homeSlice";
// import { useApiRecently } from "@/app/api";
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
//         source={require("@/assets/IconAnimation/location.json")}
//       />

//     </Layout>
//   );
// };

import React from "react";
import { View } from "react-native";
import { Layout, withStyles } from "@ui-kitten/components";
import {} from "@ui-kitten/components";
import { LibraryTopNavigator } from "@/navigators/LibraryTopNavigator";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RecentTab } from "./RecentTab";
import { SubscribeTab } from "./SubscribeTab";
import { DownloadTab } from "./DownloadTab";
import FadeInView from "@/components/Common/FadeInView";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigatorHeader from "@/components/Common/NavigatorHeader";

const AwesomeView = (props: any) => {
  // const { eva, style, ...restProps } = props;

  return (
    // <Layout
    //   //  {...restProps} style={[eva.style.awesome, style, { flex: 1 }]}
    //   style={{ flex: 1, backgroundColor: "red" }}
    // >
    <SafeAreaView style={{ flex: 1 }}>
      <FadeInView>
        <NavigatorHeader
          title="Library"
          headerContainerStyle={{ position: "relative", paddingTop: -40 }}
          // titleStyle={{ backgroundColor: "red" }}
        />
        <LibraryTopNavigator />
      </FadeInView>
    </SafeAreaView>
    // </Layout>
  );
};

export const DashboardScreen = withStyles(AwesomeView, (theme) => ({
  awesome: {
    // backgroundColor: theme["color-primary-100"],
    flex: 1,
  },
}));
