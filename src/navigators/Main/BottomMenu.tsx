import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import { TabBar } from "@/components/BottomTab/TabBar";
import { AppsScreen } from "@/screens/Main/AppsScreen";
import { DashboardScreen } from "@/screens/Main/DashbroadScreen";
import { GroupScreen } from "@/screens/Main/GroupScreen";
import { ProfileScreen } from "@/screens/Main/ProfileScreen";
import { MainNavigationProps } from "../StackNavigator";
import { CompositeNavigationProp } from "@react-navigation/native";
import { MainScreenProps } from "../StackNavigator";

// Navigator Params List
export type BottomTabNavigatorParamList = {
  home: undefined;
  dashboard: undefined;
  profile: undefined;
  user: undefined;
};

// Screen Props
export type HomeBottomNavigation = BottomTabScreenProps<
  BottomTabNavigatorParamList,
  "home"
>;

// Navigation Props
export type HomeNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorParamList, "home">,
  MainNavigationProps
>;

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

export const BottomMenu = (mainNavigation: MainScreenProps) => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tab.Screen name="home" component={AppsScreen} />
        <Tab.Screen name="dashboard" component={DashboardScreen} />
        <Tab.Screen name="profile" component={GroupScreen} />
        <Tab.Screen name="user" component={ProfileScreen} />
      </Tab.Navigator>
      {useSafeArea().bottom > 0 && (
        <View
          style={{
            height: useSafeArea().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};
