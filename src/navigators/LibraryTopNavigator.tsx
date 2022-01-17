import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DownloadTab, RecentTab, SubscribeTab } from "@/screens/LibraryScreen";

const { Navigator, Screen } =
  createMaterialTopTabNavigator<LibraryTopNavigatorParamList>();

type LibraryTopNavigatorParamList = {
  recent: undefined;
  subscribes: undefined;
  downloads: undefined;
};

export const LibraryTopNavigator = () => (
  <Navigator screenOptions={{}}>
    <Screen name="recent">{RecentTab}</Screen>
    <Screen name="subscribes">{SubscribeTab}</Screen>
    <Screen name="downloads">{DownloadTab}</Screen>
  </Navigator>
);
