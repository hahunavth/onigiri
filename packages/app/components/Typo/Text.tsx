import { Text, ITextProps } from "native-base";
import React from "react";

import { textButton, textInfo, textPrimary, textSecondary } from "./colors";

//
export function createThemedTextComponent(props?: ITextProps) {
  return function (cProp: ITextProps) {
    return (
      <Text
        {...props}
        {...cProp}
        style={[cProp?.style]}
        fontFamily={"Quicksand"}
      />
    );
  };
}

/**
 * FIXME: RESPONSIVE WITH FONT WEIGHT WILL BREAK FONT
 */
const tinyTextProps: ITextProps = {
  fontSize: [12, 13, 14, 15, 16],
  fontWeight: 500
};
const TextSmProps: ITextProps = {
  fontSize: [13, 15, 16, 18, 20],
  fontWeight: 500
};
const TextMdProps: ITextProps = {
  fontSize: [16, 16, 18, 20, 24],
  fontWeight: 600
};
const TextLgProps: ITextProps = {
  fontSize: [18, 20, 22, 24, 26],
  fontWeight: 600
};

const TextXsS = createThemedTextComponent({
  ...tinyTextProps,
  ...textSecondary
});
const TextXsP = createThemedTextComponent({
  ...tinyTextProps,
  ...textPrimary
});
const TextSmI = createThemedTextComponent({ ...TextSmProps, ...textInfo });
const TextSmP = createThemedTextComponent({ ...TextSmProps, ...textPrimary });
const TextSmS = createThemedTextComponent({ ...TextSmProps, ...textSecondary });
const TextMdP = createThemedTextComponent({ ...TextMdProps, ...textPrimary });
const TextLgP = createThemedTextComponent({ ...TextLgProps, ...textPrimary });
// const TextXLP = createThemedTextComponent({ ...tinyTextProps, ...textPrimary })

const testTextProps: ITextProps = {
  ...textInfo,
  fontSize: [18, 20, 22, 24, 26],
  fontWeight: 600
};

const TextTest = createThemedTextComponent(testTextProps);

export {
  TextXsS,
  TextTest,
  TextLgP,
  TextMdP,
  TextSmI,
  TextXsP,
  TextSmP,
  TextSmS
};
