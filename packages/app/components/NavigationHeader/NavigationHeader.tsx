import React from "react";
import { NavigationHeader as WebNavigationHeader } from "./NavigationHeader.web";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View } from "native-base";
// import { Shadow } from "react-native-shadow-2";

export function NavigationHeader(props: NativeStackHeaderProps) {
  const leftLabel = React.useMemo(() => {
    return props.navigation.canGoBack() ? "back" : null;
  }, []);

  return (
    // <Shadow
    //   size={[350, 100]}
    //   //   distance={15}
    //   startColor={"#eb9066d8"}
    //   finalColor={"#ff00ff10"}
    //   //   offset={[3, 4]}
    //   //   size={[  100, 100 ]}
    // >
    <WebNavigationHeader
      title={props.options.title || props.route.name}
      leftLabel={leftLabel}
      headerLeft={props.options.headerLeft}
      headerRight={props.options.headerRight}
    />
    // </Shadow>
  );
}
