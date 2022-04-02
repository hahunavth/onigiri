import { useColorModeValue, useTheme } from "native-base";

export function useThemedColor() {
  const theme = useTheme();

  const backgroundPrimary = useColorModeValue(
    theme.colors.$light.backgroundPrimary,
    theme.colors.$dark.backgroundPrimary
  );
  const backgroundSecondary = useColorModeValue(
    theme.colors.$light.backgroundSecondary,
    theme.colors.$dark.backgroundSecondary
  );
  const textPrimary = useColorModeValue(
    theme.colors.$light.textPrimary,
    theme.colors.$dark.textPrimary
  );
  const textSecondary = useColorModeValue(
    theme.colors.$light.textSecondary,
    theme.colors.$dark.textSecondary
  );

  return {
    backgroundPrimary,
    backgroundSecondary,
    textPrimary,
    textSecondary
  };
}
