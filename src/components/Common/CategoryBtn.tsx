import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Icon,
  IconProps,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import QuicksandText, { QFontFamily } from "./QuicksandText";
import { ColorSchemeE } from "@/styles/colorScheme";

export interface CategoryBtnProps {
  name: string;
  onPress: () => any;
  iconName: string;
}

const MyIcon = (props: IconProps) => <Icon {...props} />;

const CategoryBtn = (props: CategoryBtnProps) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TouchableOpacity style={styles.container}>
      <MyIcon
        name={props.iconName}
        style={styles.icon}
        fill={styles.iconFill.backgroundColor}
      />
      <QuicksandText style={styles.text}>{props.name}</QuicksandText>
    </TouchableOpacity>
  );
};

export default CategoryBtn;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    width: 32,
    height: 32,
    margin: 8,
  },
  text: {
    textAlign: "center",
    fontFamily: QFontFamily.Quicksand_500Medium,
    color: ColorSchemeE["text-basic-color"],
    opacity: 0.8,
  },
  iconFill: {
    backgroundColor: ColorSchemeE["color-info-400"],
  },
});
