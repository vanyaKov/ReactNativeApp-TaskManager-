import { StyleSheet } from "react-native";

import theme from "./theme";

export const HEADER_BUTTON_SIZE = 36;
export const HEADER_ICON_SIZE = 22;

export const headerButtonStyles = StyleSheet.create({
  button: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: HEADER_BUTTON_SIZE,
    height: HEADER_BUTTON_SIZE,
    borderRadius: HEADER_BUTTON_SIZE / 2,
    backgroundColor: theme.colors.backgroundHeader,
  },
  icon: {
    width: HEADER_ICON_SIZE,
    textAlign: "center",
    includeFontPadding: false,
  },
});

export const headerIconColors = {
  default: theme.colors.cardBackground,
  destructive: theme.colors.errorColor,
} as const;
