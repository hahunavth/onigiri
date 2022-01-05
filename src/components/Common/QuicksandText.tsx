import React, { useMemo } from "react";
import { StyleProp, TextStyle } from "react-native";
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

export enum QFontFamily {
  Quicksand_300Light = "Quicksand_300Light",
  Quicksand_400Regular = "Quicksand_400Regular",
  Quicksand_500Medium = "Quicksand_500Medium",
  Quicksand_600SemiBold = "Quicksand_600SemiBold",
  Quicksand_700Bold = "Quicksand_700Bold",
}

function QuicksandText(props: Props) {
  const style = useMemo<StyleProp<TextProps>>(() => {
    return [
      typeof props.style === "object" ? props.style : null,
      { fontFamily: props.style?.fontFamily || "Quicksand_400Regular" },
    ];
  }, [props.style]);

  return <Text {...props} style={style} />;
}

export default React.memo(QuicksandText);
