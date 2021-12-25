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

// import { TabBar } from "@/components/BottomTab/TabBar";
import { AppsScreen } from "@/screens/Main/AppsScreen";
import { DashboardScreen } from "@/screens/Main/DashbroadScreen";
import { FindComicScreen } from "@/screens/Main/FindComic/index";
import { SettingScreen } from "@/screens/Main/SettingScreen";
import { MainNavigationProps } from "../StackNavigator";
import { CompositeNavigationProp } from "@react-navigation/native";
import { MainScreenProps } from "../StackNavigator";
import QuicksandText from "@/components/Common/QuicksandText";
import { IconProps, Layout } from "@ui-kitten/components";

import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

// export enum BTScreenName {
//   home = "home",
//   dashboard = "dashboard",
//   profile = "profile",
//   setting = "setting",
// }

export const BottomTabScreenName = {
  home: "home",
  dashboard: "dashboard",
  profile: "profile",
  setting: "undefined",
};

// Navigator Params List
export type BottomTabNavigatorParamList = {
  home: undefined;
  dashboard: undefined;
  profile: undefined;
  setting: undefined;
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

const HomeIcon = (props: IconProps) => {
  return <Icon {...props} name="home-outline" />;
};

const HomeIconSelected = (props: IconProps) => {
  return <Icon {...props} name="home" />;
};

const FindIcon = (props: IconProps) => {
  return <Icon {...props} name="search-outline" />;
};

const FindIconSelected = (props: IconProps) => {
  return <Icon {...props} name="search" />;
};

const ProfileIcon = (props: IconProps) => {
  return <Icon {...props} name="archive-outline" />;
};

const ProfileIconSelected = (props: IconProps) => {
  return <Icon {...props} name="archive" />;
};

const SettingIcon = (props: IconProps) => {
  return <Icon {...props} name="settings-2-outline" />;
};

const SettingIconSelected = (props: IconProps) => {
  return <Icon {...props} name="settings-2" />;
};

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  console.log(state);

  const routeList = [
    { title: "Home", icon: HomeIcon, selectedIcon: HomeIconSelected },
    { title: "Dashboard", icon: FindIcon, selectedIcon: FindIconSelected },
    { title: "Profile", icon: ProfileIcon, selectedIcon: ProfileIconSelected },
    { title: "Setting", icon: SettingIcon, selectedIcon: SettingIconSelected },
  ];

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      {/* <Layout level="3"> */}
      {routeList.map((route, id) => (
        <BottomNavigationTab
          key={route.title}
          title={route.title}
          icon={state.index === id ? route.selectedIcon : route.icon}
        />
      ))}
      {/* </Layout> */}
    </BottomNavigation>
  );
};

export const BottomMenu = (mainNavigation: MainScreenProps) => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        // tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
        }}
      >
        <Tab.Screen name="home" component={AppsScreen} />
        <Tab.Screen name="dashboard" component={DashboardScreen} />
        <Tab.Screen name="profile" component={FindComicScreen} options={{headerShown: false}} />
        <Tab.Screen name="setting" component={SettingScreen} />
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
    <Layout
      style={{
        // backgroundColor: "red",
        shadowRadius: 3,
        shadowColor: "black",
        height: 40,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
      }}
      level={"3"}
    >
      <QuicksandText>{props.route.name}</QuicksandText>
    </Layout>
  );
}
