//import liraries
import { Button, Icon, IconProps } from "@ui-kitten/components";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  name: string;
  onPress?: () => any;
};

const MyIcon = (props: IconProps) => <Icon {...props} name={"flip"} />;
// create a component
const FloatingButton = ({ name, onPress }: Props) => {
  return (
    <Button onPress={onPress} style={styles.floatingBtn} accessoryLeft={MyIcon}>
      {name}
    </Button>
  );
};

// define your styles
const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

//make this component available to the app
export default FloatingButton;
