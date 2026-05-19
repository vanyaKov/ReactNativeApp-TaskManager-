import theme from "@/shared/config/theme";
import ButtonProps from "./model";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ label, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text> {label} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.buttonAddColor,
    color: theme.colors.buttonAddTextColor,
    padding: theme.padding.buttonPadding,
    borderRadius: theme.radius.radiusButton,
  },
});
