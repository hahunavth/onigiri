import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp
} from "@react-navigation/material-top-tabs";
import { DownloadTab } from "app/screens/LibraryScreen/DownloadTab";
import { RecentTab } from "app/screens/LibraryScreen/RecentTab";
import { SubscribeTab } from "app/screens/LibraryScreen/SubscribeTab";
import { StyleSheet } from "react-native";
import { useColorModeStyle } from "app/hooks/useColorModeStyle";
import i18n from "i18n-js";
import { useThemedTopTabScreenOption } from "app/components/Typo";
import { useIsFocused } from "../hooks/useIsFocused";
import { Loading } from "../components/EmptyPage";
import useInteraction from "../hooks/useInteraction";

import {
  createBottomTabNavigator,
  BottomTabBarProps
} from "@react-navigation/bottom-tabs";

const { Navigator, Screen } =
  createMaterialTopTabNavigator<LibraryTopNavigatorParamList>();

// const { Navigator, Screen } =
//   createBottomTabNavigator<LibraryTopNavigatorParamList>();

type LibraryTopNavigatorParamList = {
  recent: undefined;
  subscribes: undefined;
  downloads: undefined;
};

export const LibraryTopNavigator = () => {
  const screenOptions = useThemedTopTabScreenOption();

  const { loading } = useInteraction();

  if (loading) {
    return null;
  }

  return (
    <Navigator
      backBehavior="none"
      screenOptions={screenOptions}
      showPageIndicator
      defaultScreenOptions={{
        lazy: true
      }}
    >
      <Screen
        name="recent"
        options={{ title: i18n.t("library.recent.name") }}
        component={RecentTab}
      ></Screen>
      <Screen
        name="subscribes"
        options={{ title: i18n.t("library.subscribes.name") }}
        component={SubscribeTab}
      ></Screen>
      <Screen
        name="downloads"
        options={{ title: i18n.t("library.downloads.name") }}
        component={DownloadTab}
      ></Screen>
    </Navigator>
  );
};

export type RecentTabProps = MaterialTopTabNavigationProp<
  LibraryTopNavigatorParamList,
  "recent"
>;
export type SubscribeTabProps = MaterialTopTabNavigationProp<
  LibraryTopNavigatorParamList,
  "recent"
>;
export type DownloadTabProps = MaterialTopTabNavigationProp<
  LibraryTopNavigatorParamList,
  "recent"
>;
