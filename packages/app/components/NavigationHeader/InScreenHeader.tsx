import { View, Text } from "react-native";
import React from "react";
import {
  NavigationHeader as WebNavigationHeader,
  NavigationHeaderProps
} from "./NavigationHeader.web";

type Props = {};

const InScreenHeader = (props: NavigationHeaderProps) => {
  return <WebNavigationHeader {...props} />;
};

export default InScreenHeader;
