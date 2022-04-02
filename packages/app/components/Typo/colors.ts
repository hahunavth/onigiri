import { colors } from "app/colors";
import { ColorType } from "native-base/src/components/types";

export type ThemeColorT = {
  _light: { color: ColorType };
  _dark: { color: ColorType };
};

export const textPrimary: ThemeColorT = {
  _light: { color: colors.$light.textPrimary },
  _dark: { color: colors.$dark.textPrimary }
};

export const textSecondary: ThemeColorT = {
  _light: { color: colors.$light.textSecondary },
  _dark: { color: colors.$dark.textSecondary }
};

export const textInfo: ThemeColorT = {
  _light: { color: colors.$light.textInfo },
  _dark: { color: colors.$dark.textInfo }
};

export const textDisable: ThemeColorT = {
  _light: { color: colors.$light.textDisable },
  _dark: { color: colors.$dark.textDisable }
};

export const textButton: ThemeColorT = {
  _light: { color: colors.$light.textButton },
  _dark: { color: colors.$dark.textButton }
};
