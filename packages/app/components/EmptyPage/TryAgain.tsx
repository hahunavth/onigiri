import { View, Text, Center, Button, ICenterProps } from "native-base";
import React from "react";
import { TextLgP } from "../Typo";

type Props = {
  containerStyle?: ICenterProps["style"];
  onPress?: () => any;
  msg?: string;
};

export const TryAgain = (props: Props) => {
  return (
    <Center style={props.containerStyle}>
      <Text>{props.msg}</Text>
      <Button variant={"link"} colorScheme="orange" onPress={props.onPress}>
        Try again!
      </Button>
    </Center>
  );
};
