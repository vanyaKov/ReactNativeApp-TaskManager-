import { TaskStatusBadgeProps } from "@/entities/task/ui/task-status-badge/model";
import theme from "@/shared/config/theme";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TaskStatusBadge({
  status,
  label,
  onStatusPress,
}: TaskStatusBadgeProps) {
  const badgeBackground = useMemo(() => {
    switch (status) {
      case "completed":
        return theme.colors.badgeBackgroundCompleted;
      case "in_progress":
        return theme.colors.badgeBackgroundProgress;
      case "cancelled":
        return theme.colors.badgeBackgroundCancelled;
      default:
        return theme.colors.badgeBackgroundPending;
    }
  }, [status]);
  return (
    <TouchableOpacity
      style={[styles.badge, { backgroundColor: badgeBackground }]}
      onPress={onStatusPress}
    >
      <Text style={{ color: theme.colors.badgeTextColor }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.padding.badgePadding,
    paddingVertical: theme.padding.badgePadding,
    borderRadius: theme.radius.radiusButton,
    justifyContent: "center",
  },
});
