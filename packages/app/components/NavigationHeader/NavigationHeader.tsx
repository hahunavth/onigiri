import React from "react";
import { NavigationHeader as WebNavigationHeader } from "./NavigationHeader.web";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";

export function NavigationHeader(props: NativeStackHeaderProps) {
  const leftLabel = React.useMemo(() => {
    return props.navigation.canGoBack() ? "back" : null;
  }, []);

  return (
    <WebNavigationHeader
      title={props.options.title || props.route.name}
      leftLabel={leftLabel}
      headerLeft={props.options.headerLeft}
      headerRight={props.options.headerRight}
    />
  );
}
