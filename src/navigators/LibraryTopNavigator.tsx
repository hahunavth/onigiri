import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DownloadTab, RecentTab, SubscribeTab } from "@/screens/LibraryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { ColorSchemeE } from "@/styles/colorScheme";

const { Navigator, Screen } =
  createMaterialTopTabNavigator<LibraryTopNavigatorParamList>();

type LibraryTopNavigatorParamList = {
  recent: undefined;
  subscribes: undefined;
  downloads: undefined;
};

const themedStyles = StyleService.create({
  tabBar: {
    backgroundColor: ColorSchemeE["background-basic-color-1"],
  },
  iconColor: {
    backgroundColor: ColorSchemeE["text-basic-color"],
  },
});

export const LibraryTopNavigator = () => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,

        tabBarLabelStyle: {},
        tabBarItemStyle: {
          margin: -5,
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarPressOpacity: 0.1,
        tabBarIndicatorStyle: {
          backgroundColor: "#1285f0df",
          flex: 1,
          height: 38,
          borderWidth: 5,
          borderRadius: 12,
          borderColor: "transparent",
        },
        tabBarActiveTintColor: "white",
        tabBarAllowFontScaling: false,
        tabBarInactiveTintColor: "gray",
        tabBarPressColor: "transparent",
      }}
    >
      <Screen name="recent">{RecentTab}</Screen>
      <Screen name="subscribes">{SubscribeTab}</Screen>
      <Screen name="downloads">{DownloadTab}</Screen>
    </Navigator>
  );
};
