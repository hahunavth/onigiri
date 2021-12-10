//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  errMsg: string;
};

// create a component
const ErrorView = ({ errMsg }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Somethig wrong!</Text>
      <Text>{errMsg}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default ErrorView;
