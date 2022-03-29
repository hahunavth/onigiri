import { View, Text } from "react-native";
import React from "react";
import {
  NavigationHeader as WebNavigationHeader,
  NavigationHeaderProps
} from "./NavigationHeader.web";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type Props = {};

const InScreenHeader = (props: NavigationHeaderProps) => {
  return (
    <WebNavigationHeader
      {...props}
      headerLeft={() => (
        // <MaterialCommunityIcons
        //   name="arrow-left-bold-circle"
        //   size={36}
        //   color={"gray"}
        // />
        <Entypo name="chevron-down" size={24} color="black" />
      )}
    />
  );
};

export default InScreenHeader;
