import React from "react";
import { TextStyle } from "react-native";
import { Text, TextProps } from "@ui-kitten/components";

type Props = TextProps & {
  style?: TextStyle & {
    fontFamily?: FontFamilyStyle_T | string;
  };
};

type FontFamilyStyle_T =
  | "Quicksand_300Light"
  | "Quicksand_400Regular"
  | "Quicksand_500Medium"
  | "Quicksand_600SemiBold"
  | "Quicksand_700Bold";

export function QuicksandText(props: Props) {
  const fontFamily = props.style?.fontFamily || "Quicksand_400Regular";

  return (
    <Text
      {...props}
      style={[
        typeof props.style === "object" ? { ...props.style } : null,
        { fontFamily: fontFamily },
      ]}
    />
  );
}
