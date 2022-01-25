import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabScreenProps,
  BottomTabNavigationProp,
  BottomTabHeaderProps,
} from "@react-navigation/bottom-tabs";
// import {} from "@react-navigation/material-top-tabs"
import { View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

// import { TabBar } from "@/components/BottomTab/TabBar";
import { AppsScreen } from "@/screens/AppsScreen/AppsScreen";
import { DashboardScreen } from "@/screens/LibraryScreen";
import { FindComicScreen } from "@/screens/FindComic/index";
import { SettingScreen } from "@/screens/SettingScreen";

import { MainNavigationProps, MainScreenProps } from "../StackNavigator";
import { CompositeNavigationProp } from "@react-navigation/native";
import QuicksandText from "@/components/Common/QuicksandText";
import { IconProps, Layout } from "@ui-kitten/components";

import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import { MyBlurView } from "@/components/Common/MyBlurView";
import FadeInView from "@/components/Common/FadeInView";
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
  // console.log(state);

  const routeList = [
    { title: "Home", icon: HomeIcon, selectedIcon: HomeIconSelected },
    { title: "Download", icon: ProfileIcon, selectedIcon: ProfileIconSelected },
    { title: "Find", icon: FindIcon, selectedIcon: FindIconSelected },
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
  const forFade = ({ current }: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        // tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
        tabBar={(props) => <BottomTabBar {...props} />}
        // screenOptions={{
        //   // header: (props) => <CustomHeader {...props} />,
        //   headerTransparent: true,
        //   headerBackground: () => (
        //     <MyBlurView
        //       blurAmount={50}
        //       style={{
        //         width: 100,
        //         height: 100,
        //       }}
        //       blurType="light"
        //     ></MyBlurView>
        //   ),
        // }}
        // detachInactiveScreens={false}
        screenOptions={{
          tabBarVisibilityAnimationConfig: {
            show: {
              config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
              },
              animation: "spring",
            },
          },
          // unmountOnBlur: true,
        }}
      >
        <Tab.Screen
          name="home"
          component={FadeAppScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="profile"
          component={FindComicScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="setting"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
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

const FadeAppScreen = (props: any) => (
  <FadeInView>
    <AppsScreen {...props} />
  </FadeInView>
);
