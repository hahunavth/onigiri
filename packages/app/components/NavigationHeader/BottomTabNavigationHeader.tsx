/**
 * NOTE: DEPRECATED
 *  - BottomNav: headerShown = false
 *  - StackNav.main: use SearchNavHeader
 */

import React from "react";
import { NavigationHeader as WebNavigationHeader } from "./NavigationHeader.web";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

export function BottomTabNavigationHeader(props: BottomTabHeaderProps) {
  return (
    <WebNavigationHeader
      title={props.options.title || props.route.name}
      onLeftPress={(props) => {
        // goBack()
        console.log("first");
      }}
      headerLeft={props.options.headerLeft}
      headerRight={props.options.headerRight}
    />
  );
}
