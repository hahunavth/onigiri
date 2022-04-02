import React from "react";
import { TouchableOpacity } from "react-native";
import { Badge, IBadgeProps } from "native-base";
import { NextLink } from "../NextLink";

type Props = IBadgeProps & {
  selected: boolean;
};

export const SelectableBadge = (props: Props) => {
  return (
    <NextLink
      routeName="test"
      style={{ alignSelf: "center", borderRadius: 10, marginHorizontal: 2 }}
    >
      <Badge
        {...props}
        // rounded={4}
        // variant={'outline'}
        variant={"subtle"}
        colorScheme={"danger"}
        // bg={'$light.backgroundSecondary'}
      />
    </NextLink>
  );
};
