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

const { Navigator, Screen } =
  createMaterialTopTabNavigator<LibraryTopNavigatorParamList>();

type LibraryTopNavigatorParamList = {
  recent: undefined;
  subscribes: undefined;
  downloads: undefined;
};

export const LibraryTopNavigator = () => {
  const { isFocused } = useIsFocused();

  const screenOptions = useThemedTopTabScreenOption();

  const Recent = React.useCallback(
    () => (isFocused ? <RecentTab /> : <Loading />),
    [isFocused]
  );
  const Subscribes = React.useCallback(
    () => (isFocused ? <SubscribeTab /> : <Loading />),
    [isFocused]
  );
  const Downloads = React.useCallback(
    () => (isFocused ? <DownloadTab /> : <Loading />),
    [isFocused]
  );

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
        component={Recent}
      ></Screen>
      <Screen
        name="subscribes"
        options={{ title: i18n.t("library.subscribes.name") }}
        component={Subscribes}
      ></Screen>
      <Screen
        name="downloads"
        options={{ title: i18n.t("library.downloads.name") }}
        component={Downloads}
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
