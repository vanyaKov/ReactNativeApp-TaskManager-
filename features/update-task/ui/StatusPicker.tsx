import {
  StatusOption,
  StatusPickerProps,
} from "@/features/update-task/model/model";
import theme from "@/shared/config/theme";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const STATUS_OPTIONS: StatusOption[] = [
  { label: "Pending", value: "pending" },
  { label: "In Process", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function StatusPicker({
  visible,
  status,
  onClose,
  onSelectStatus,
}: StatusPickerProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {STATUS_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                onSelectStatus(option.value);
                onClose();
              }}
              style={[
                styles.option,
                {
                  backgroundColor: theme.colors.cardBackground,
                },
              ]}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: theme.colors.cardBackground,
    borderTopLeftRadius: theme.radius.radiusCard,
    borderTopRightRadius: theme.radius.radiusCard,
    padding: theme.padding.screenPadding,
    gap: 8,
  },
  title: {
    fontSize: theme.fonts.titleHeader,
    fontWeight: "700",
    color: theme.colors.titleColor,
    marginBottom: 8,
  },
  option: {
    padding: theme.padding.buttonPadding,
    borderRadius: theme.radius.radiusButton,
    backgroundColor: theme.colors.screenBackground,
  },
  optionActive: {
    borderWidth: 1,
    borderColor: theme.colors.cardBackground,
  },
  optionText: {
    color: theme.colors.titleColor,
    fontSize: theme.fonts.descriptionSize,
  },
  cancel: {
    marginTop: 8,
    alignItems: "center",
    padding: theme.padding.buttonPadding,
  },
  cancelText: {
    color: theme.colors.descriptionColor,
  },
});
