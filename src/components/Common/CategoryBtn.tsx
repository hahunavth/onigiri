import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Icon, IconProps } from "@ui-kitten/components";
import QuicksandText from "./QuicksandText";

export interface CategoryBtnProps {
  name: string;
  onPress: () => any;
  iconName: string;
}

const MyIcon = (props: IconProps) => <Icon {...props} />;

const CategoryBtn = (props: CategoryBtnProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <MyIcon name={props.iconName} style={styles.icon} />
      <QuicksandText style={styles.text}>{props.name}</QuicksandText>
    </TouchableOpacity>
  );
};

export default CategoryBtn;

const styles = StyleSheet.create({
  container: {
    // color: "#857171",
    // backgroundColor: "#e92a2a",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    width: 52,
    height: 52,
    padding: 1,
    backgroundColor: "blue",
  },
  text: {
    textAlign: "center",
    // color: "#fff",
  },
});
