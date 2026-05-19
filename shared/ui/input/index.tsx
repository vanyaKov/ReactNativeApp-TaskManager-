import theme from "@/shared/config/theme";
import InputProps from "@/shared/ui/input/model";
import { StyleSheet, TextInput } from "react-native";

export default function Input({
  placeholder,
  value,
  onChangeText,
}: InputProps) {
  return (
    <TextInput
      placeholderTextColor={theme.colors.descriptionColor}
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: theme.radius.radiusButton,
    padding: theme.padding.buttonPadding,
  },
});
