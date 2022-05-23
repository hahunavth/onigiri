import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { useThemedColor } from "./themed";

export function useThemedTopTabScreenOption(): MaterialTopTabNavigationOptions {
  const { backgroundPrimary, backgroundSecondary, textPrimary, textSecondary } =
    useThemedColor();

  return {
    tabBarStyle: {
      backgroundColor: backgroundPrimary
    },
    tabBarLabelStyle: {},
    tabBarItemStyle: {
      margin: -5,
      justifyContent: "center",
      alignItems: "center"
    },
    tabBarPressOpacity: 0.1,
    tabBarIndicatorStyle: {
      backgroundColor: textSecondary,
      flex: 1,
      height: 38,
      borderWidth: 5,
      borderRadius: 12,
      borderColor: "transparent"
    },
    tabBarActiveTintColor: backgroundPrimary,
    tabBarAllowFontScaling: false,
    tabBarInactiveTintColor: textPrimary,
    tabBarPressColor: "transparent"
    // tabBarScrollEnabled: false,
    // swipeEnabled: false,
    // lazy: false
  };
}
