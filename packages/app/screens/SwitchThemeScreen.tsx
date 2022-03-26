import { View, Text } from "native-base";
import React from "react";
import { DayAndNight } from "../components/EmptyPage";
import { DayAndNightScreenProps } from "../navigators/StackNav";

export const SwitchThemeScreen = (props: DayAndNightScreenProps) => {
  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems={"center"}
      // style={{ backgroundColor: "#c4c4c4" }}
    >
      <DayAndNight type={props.route.params.type} />
    </View>
  );
};
