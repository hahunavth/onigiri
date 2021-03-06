import {
  Text,
  useColorMode,
  useColorModeValue,
  useToken,
  View
} from "native-base";
import { Easing, Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBarProps
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {} from "react";
// NOTE: IMPORT COMPONENT
import {
  HomeScreen,
  LibraryScreen,
  DiscoverScreen,
  SettingScreen,
  MainTestScreen
} from "app/screens";
import React from "react";
import i18n from "i18n-js";
import { NextLink } from "app/components/NextLink";
import { navigate } from ".";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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
const { Navigator, Screen } = createBottomTabNavigator<BottomNavParamsList>();
// const { Navigator, Screen } =
//   createMaterialTopTabNavigator<BottomNavParamsList>();

export default function BottomNav() {
  const textT = useColorModeValue("$light.textPrimary", "$dark.textPrimary");
  const backgroundT = useColorModeValue(
    "$light.backgroundSecondary",
    "$dark.backgroundPrimary"
  );
  const [text, background] = useToken("colors", [textT, backgroundT]);

  const webTaskBar = React.useMemo(() => {
    return Platform.OS === "web"
      ? ({ descriptors, insets, navigation, state }: BottomTabBarProps) => {
          // console.log(descriptors);

          const selectedIndex = state.index;
          // @ts-ignore
          const onSelect = (id: number) => navigate(state.routeNames[id]);

          return (
            <View
              _web={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: 200,
                bg: "$light.backgroundSecondary"
              }}
            >
              {state.routes.map(({ name, path }, id) => (
                <TouchableOpacity onPress={() => onSelect(id)}>
                  <Text
                    fontSize={20}
                    color={
                      id === selectedIndex
                        ? "$light.textPrimary"
                        : "$light.textDisable"
                    }
                  >
                    {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        }
      : undefined;
  }, [Platform.OS]);

  return (
    <Navigator
      // initialRouteName={__DEV__ ? 'main/test' : 'main/home'}
      tabBar={webTaskBar}
      screenOptions={{
        headerShown: false,
        // header: BottomTabNavigationHeader,
        tabBarActiveTintColor: text,
        tabBarActiveBackgroundColor: useColorModeValue("#fbecdf", "#4b2510"),
        tabBarInactiveBackgroundColor: useColorModeValue("#fbecdf", "#4b2510"),
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: "timing",
            config: { duration: 700, easing: Easing.out(Easing.exp) }
          }
        },
        lazy: false,
        unmountOnBlur: false
      }}
      detachInactiveScreens={false}

      // NOTE: TOP TAB NAVIGATION
      // screenOptions={{
      //   tabBarContentContainerStyle: {},
      //   tabBarIconStyle: {},
      //   tabBarItemStyle: {
      //     padding: 0,
      //     margin: 0
      //   },
      //   tabBarLabelStyle: {},
      //   tabBarIndicatorStyle: {
      //     padding: 0,
      //     borderRadius: 12,
      //     top: 0,

      //     shadowColor: "#000",
      //     shadowOffset: {
      //       width: 0,
      //       height: 12
      //     },
      //     shadowOpacity: 0.58,
      //     shadowRadius: 16.0,

      //     elevation: 2
      //   },
      //   tabBarIndicatorContainerStyle: {},
      //   tabBarStyle: {},
      //   tabBarActiveTintColor: "#16c",
      //   tabBarInactiveTintColor: "gray",
      //   tabBarShowLabel: false,
      //   tabBarScrollEnabled: false,
      //   swipeEnabled: false
      // }}
      // tabBarPosition="bottom"
      // showPageIndicator={true}
    >
      <Screen
        name="main/home"
        component={HomeScreen}
        options={{
          title: i18n.t("home.name"),
          tabBarIcon: HomeIcon
        }}
      ></Screen>

      <Screen
        name="main/library"
        component={LibraryScreen}
        options={{
          title: i18n.t("library.name"),
          tabBarIcon: LibraryIcon,
          lazy: true,
          unmountOnBlur: true
          // NOTE: TOP TAB NAVIGATION
          // lazyPlaceholder: () => null,
          // lazyPreloadDistance: 1000
        }}
      ></Screen>

      <Screen
        name="main/discover"
        component={DiscoverScreen}
        options={{
          title: i18n.t("discover.name"),
          tabBarIcon: DiscoverIcon
        }}
      ></Screen>

      <Screen
        name="main/setting"
        component={SettingScreen}
        options={{
          title: i18n.t("setting.name"),
          tabBarIcon: SettingIcon
        }}
      ></Screen>

      {__DEV__ && (
        <Screen
          name="main/test"
          component={MainTestScreen}
          options={{
            title: "Test",
            tabBarIcon: TestIcon
          }}
        ></Screen>
      )}
    </Navigator>
  );
}

/**
 * ANCHOR: BOTTOM BAR ICONS
 */
function HomeIcon({ focused }: { focused: boolean }) {
  const {} = useToken("colors", "");
  return focused ? (
    <Ionicons
      name="ios-home-sharp"
      size={24}
      color={useColorModeValue("#4a2702", "#f6d7bf")}
    />
  ) : (
    <Ionicons name="ios-home-outline" size={24} color="#a8a8a8" />
  );
}

function LibraryIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <Ionicons
      name="ios-library-sharp"
      size={24}
      color={useColorModeValue("#4a2702", "#f6d7bf")}
    />
  ) : (
    <Ionicons name="ios-library-outline" size={24} color="#a8a8a8" />
  );
}

function DiscoverIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <MaterialCommunityIcons
      name="feature-search"
      size={24}
      color={useColorModeValue("#4a2702", "#f6d7bf")}
    />
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
    <Ionicons
      name="ios-settings"
      size={24}
      color={useColorModeValue("#4a2702", "#f6d7bf")}
    />
  ) : (
    <Ionicons name="ios-settings-outline" size={24} color="#a8a8a8" />
  );
}

function TestIcon({ focused }: { focused: boolean }) {
  return focused ? (
    <MaterialCommunityIcons
      name="test-tube"
      size={24}
      color={useColorModeValue("#4a2702", "#f6d7bf")}
    />
  ) : (
    <MaterialCommunityIcons name="test-tube-off" size={24} color="#a8a8a8" />
  );
}
