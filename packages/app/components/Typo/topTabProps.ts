import {
  MaterialTopTabBarProps,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs'
import { colors } from 'app/colors'

/**
 * NOTE: THEMED TOP TAB
 */
export const createTypoTopTabNavScreenOption = (
  bgPrimary: string,
  textPrimary: string,
  bgSecondary: string,
  textSecondary: string
): MaterialTopTabNavigationOptions => {
  return {
    tabBarStyle: {
      backgroundColor: bgPrimary
    },

    tabBarLabelStyle: {},
    tabBarItemStyle: {
      margin: -5,
      justifyContent: 'center',
      alignItems: 'center'
    },

    tabBarPressOpacity: 0.1,
    tabBarIndicatorStyle: {
      backgroundColor: bgSecondary,
      flex: 1,
      height: 38,
      borderWidth: 5,
      borderRadius: 12,
      borderColor: 'transparent'
    },
    tabBarActiveTintColor: bgPrimary,
    tabBarAllowFontScaling: false,
    tabBarInactiveTintColor: textPrimary,
    tabBarPressColor: 'transparent'
  }
}
