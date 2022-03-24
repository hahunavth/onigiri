import { Text, useColorModeValue, useToken, View } from "native-base";
import { Easing, Platform, useWindowDimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {} from "react";
// NOTE: IMPORT COMPONENT
import {
  BottomTabNavigationHeader,
  SearchNavigationHeader
} from "app/components/NavigationHeader";
import {
  HomeScreen,
  LibraryScreen,
  DiscoverScreen,
  SettingScreen,
  MainTestScreen
} from "app/screens";
import React from "react";
import i18n from "i18n-js";
import { NextLink } from "../components/NextLink";
import { navigate } from ".";
import { TouchableOpacity } from "react-native-gesture-handler";

export type BottomNavParamsList = {
  "main/home": undefined;
  "main/library": undefined;
  "main/discover": undefined;
  "main/setting": undefined;
  "main/test": undefined;
};

/**
 * ANCHOR: RETURN NAVIGATION
 */
const { Navigator, Screen } = createDrawerNavigator<BottomNavParamsList>();

export default function BottomNav() {
  const textT = useColorModeValue("$light.textPrimary", "$dark.textPrimary");
  const backgroundT = useColorModeValue(
    "$light.backgroundSecondary",
    "$dark.backgroundPrimary"
  );
  const [text, background] = useToken("colors", [textT, backgroundT]);
  const dimensions = useWindowDimensions();

  return (
    <Navigator
      defaultStatus="open"
      useLegacyImplementation={false}
      detachInactiveScreens
      screenOptions={{
        drawerType: dimensions.width >= 768 ? "permanent" : "front",
        drawerPosition: "right",
        overlayColor: "transparent"
        // headerShown: false
      }}

      // initialRouteName={__DEV__ ? 'main/test' : 'main/home'}
      // tabBar={
      //   Platform.OS === "web"
      //     ? ({ descriptors, insets, navigation, state }) => {
      //         console.log(descriptors);

      //         const selectedIndex = state.index;
      //         // @ts-ignore
      //         const onSelect = (id: number) => navigate(state.routeNames[id]);

      //         return (
      //           <View
      //             _web={{
      //               position: "absolute",
      //               top: 0,
      //               bottom: 0,
      //               left: 0,
      //               width: 200,
      //               bg: "$light.backgroundSecondary"
      //             }}
      //           >
      //             {state.routes.map(({ name, path }, id) => (
      //               <TouchableOpacity onPress={() => onSelect(id)}>
      //                 <Text
      //                   fontSize={20}
      //                   color={
      //                     id === selectedIndex
      //                       ? "$light.textPrimary"
      //                       : "$light.textDisable"
      //                   }
      //                 >
      //                   {name}
      //                 </Text>
      //               </TouchableOpacity>
      //             ))}
      //           </View>
      //         );
      //       }
      //     : undefined
      // }
      // screenOptions={{
      //   // TODO: WEB SPECIFIC STYLE
      //   // TODO: WEB SPECIFIC STYLE
      //   headerShown: false,
      //   header: BottomTabNavigationHeader,
      //   tabBarActiveTintColor: text,
      //   tabBarActiveBackgroundColor: background,
      //   tabBarInactiveBackgroundColor: background,
      //   tabBarHideOnKeyboard: true,
      //   tabBarVisibilityAnimationConfig: {
      //     show: {
      //       animation: "timing",
      //       config: { duration: 700, easing: Easing.out(Easing.exp) }
      //     }
      //     // hide: {
      //     //   animation: 'timing';
      //     //   config: {

      //     //   }
      //     // }
      //   }
      //   // tabBarVisibilityAnimationConfig
      //   //  TODO: WEB, SPECIFIC
      //   // tabBarItemStyle: {
      //   //   flex: undefined,
      //   //   height: 100,
      //   //   flexDirection: 'column',
      //   //   width: 200
      //   // },
      //   // // tabbarSty
      //   // tabBarStyle:
      //   //   Platform.OS === 'web'
      //   //     ? {
      //   //         position: 'absolute',
      //   //         top: 0,
      //   //         left: 0,
      //   //         width: 500,
      //   //         flexDirection: 'column',
      //   //         flex: 1,
      //   //         height: '100vh'
      //   //       }
      //   //     : null
      // }}

      // detachInactiveScreens={false}
    >
      <Screen
        name="main/home"
        component={HomeScreen}
        options={{
          title: i18n.t("home.name"),
          drawerIcon: HomeIcon
        }}
      ></Screen>

      <Screen
        name="main/library"
        component={LibraryScreen}
        options={{
          title: i18n.t("library.name"),
          drawerIcon: LibraryIcon
        }}
      ></Screen>

      <Screen
        name="main/discover"
        component={DiscoverScreen}
        options={{
          title: i18n.t("discover.name"),

          drawerIcon: DiscoverIcon
        }}
      ></Screen>

      <Screen
        name="main/setting"
        component={SettingScreen}
        options={{
          title: i18n.t("setting.name"),

          drawerIcon: SettingIcon
        }}
      ></Screen>

      {/* {__DEV__ && ( */}
      <Screen
        name="main/test"
        component={MainTestScreen}
        options={{
          title: "Test",
          drawerIcon: TestIcon
        }}
      ></Screen>
      {/* )} */}
    </Navigator>
  );
}

/**
 * ANCHOR: BOTTOM BAR ICONS
 */
function HomeIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Ionicons name="ios-home-sharp" size={24} color="#4a2702" />
  ) : (
    <Ionicons name="ios-home-outline" size={24} color="#a8a8a8" />
  );
}

function LibraryIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Ionicons name="ios-library-sharp" size={24} color="#4a2702" />
  ) : (
    <Ionicons name="ios-library-outline" size={24} color="#a8a8a8" />
  );
}

function DiscoverIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <MaterialCommunityIcons name="feature-search" size={24} color="#4a2702" />
  ) : (
    <MaterialCommunityIcons
      name="feature-search-outline"
      size={24}
      color="#a8a8a8"
    />
  );
}

function SettingIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Ionicons name="ios-settings" size={24} color="#4a2702" />
  ) : (
    <Ionicons name="ios-settings-outline" size={24} color="#a8a8a8" />
  );
}

function TestIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <MaterialCommunityIcons name="test-tube" size={24} color="#4a2702" />
  ) : (
    <MaterialCommunityIcons name="test-tube-off" size={24} color="#a8a8a8" />
  );
}
