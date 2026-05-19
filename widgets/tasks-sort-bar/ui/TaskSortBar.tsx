import { useTaskStore } from "@/entities/task/model/taskStore";
import theme from "@/shared/config/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type SortKey = "default" | "status" | "createdAt";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Default", value: "default" },
  { label: "By date created", value: "createdAt" },
  { label: "By status", value: "status" },
];

const SORT_LABELS: Record<SortKey, string> = {
  default: "Default",
  createdAt: "By date",
  status: "By status",
};

export default function TaskSortBar() {
  const [visible, setVisible] = useState(false);
  const sortBy = useTaskStore((state) => state.sortBy);
  const setSortBy = useTaskStore((state) => state.setSortBy);

  const onSelect = (value: SortKey) => {
    setSortBy(value);
    setVisible(false);
  };

  return (
    <>
      <Pressable style={styles.bar} onPress={() => setVisible(true)}>
        <Ionicons
          name="swap-vertical"
          size={20}
          color={theme.colors.buttonAddColor}
        />
        <Text style={styles.barLabel}>Sort: {SORT_LABELS[sortBy]}</Text>
        <Ionicons
          name="chevron-down"
          size={18}
          color={theme.colors.descriptionColor}
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>Sort by</Text>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  sortBy === option.value && styles.optionActive,
                ]}
                onPress={() => onSelect(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    sortBy === option.value && styles.optionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: theme.padding.screenPadding,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.radius.radiusButton,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  barLabel: {
    flex: 1,
    fontSize: theme.fonts.descriptionSize,
    color: theme.colors.titleColor,
    fontWeight: "500",
  },
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
  sheetTitle: {
    fontSize: theme.fonts.titleHeader,
    fontWeight: "700",
    color: theme.colors.titleColor,
    marginBottom: 4,
  },
  option: {
    padding: theme.padding.buttonPadding,
    borderRadius: theme.radius.radiusButton,
    backgroundColor: theme.colors.screenBackground,
  },
  optionActive: {
    borderWidth: 1,
    borderColor: theme.colors.buttonAddColor,
  },
  optionText: {
    color: theme.colors.titleColor,
    fontSize: theme.fonts.descriptionSize,
  },
  optionTextActive: {
    color: theme.colors.buttonAddColor,
    fontWeight: "600",
  },
});
