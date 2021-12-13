import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabScreenProps,
  BottomTabNavigationProp,
  BottomTabHeaderProps,
} from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import { TabBar } from "@/components/BottomTab/TabBar";
import { AppsScreen } from "@/screens/Main/AppsScreen";
import { DashboardScreen } from "@/screens/Main/DashbroadScreen";
import { FindComicScreen } from "@/screens/Main/FindComic/index";
import { ProfileScreen } from "@/screens/Main/ProfileScreen";
import { MainNavigationProps } from "../StackNavigator";
import { CompositeNavigationProp } from "@react-navigation/native";
import { MainScreenProps } from "../StackNavigator";
import QuicksandText from "@/components/Common/QuicksandText";

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
        // tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
        }}
      >
        <Tab.Screen name="home" component={AppsScreen} />
        <Tab.Screen name="dashboard" component={DashboardScreen} />
        <Tab.Screen name="profile" component={FindComicScreen} />
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

function CustomHeader(props: BottomTabHeaderProps) {
  return (
    <View
      style={{
        // backgroundColor: "red",
        shadowRadius: 3,
        shadowColor: "black",
        height: 40,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <QuicksandText>{props.route.name}</QuicksandText>
    </View>
  );
}
