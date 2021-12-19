// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export const ProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Profile</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#a29bfe",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Card,
  Divider,
  Layout,
  List,
  StyleService,
  Text,
  Toggle,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import CommingSoon from "@/components/Common/CommingSoon";
import ErrorView from "@/components/Common/ErrorView";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { settingAction, settingSelector } from "../../app/settingSlice";
import QuicksandText from "@/components/Common/QuicksandText";

const data = new Array(8).fill({
  title: "Item",
});
// ListCustomItemShowcase
export const SettingScreen = () => {
  const styles = useStyleSheet(themeStyled);

  const dispatch = useAppDispatch();
  const setting = useAppSelector(settingSelector);

  return (
    <Layout style={styles.container} level="4">
      <Layout style={styles.settingItem} level={"2"}>
        <QuicksandText numberOfLines={1} style={styles.title}>
          Dark theme
        </QuicksandText>
        <Toggle
          checked={setting.theme === "light"}
          onChange={() => dispatch(settingAction.switchTheme())}
        ></Toggle>
      </Layout>
      <Divider />
    </Layout>
  );
};

const themeStyled = StyleService.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 8,
    paddingHorizontal: 12,
    alignItem: "center",
    height: 48,
  },
});
