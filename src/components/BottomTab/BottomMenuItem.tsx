import React from "react";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { blue, grey } from "../../styles";
import { AntDesignName_T } from "../../types/expo__vector-icon";

type Props = {
  iconName: AntDesignName_T;
  isCurrent?: boolean;
};

export const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AntDesign
        name={iconName}
        size={32}
        style={{ color: isCurrent ? blue : grey }}
      />
    </View>
  );
};
