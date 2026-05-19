import { TaskCardProps } from "@/entities/task/ui/task-card/model";
import TaskStatusBadge from "@/entities/task/ui/task-status-badge";
import theme from "@/shared/config/theme";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TaskCard({
  task,
  onCardPress,
  statusLabel,
  onStatusPress,
}: TaskCardProps) {
  const { title, createdAt, deadline, status } = task;
  const formattedDeadline = useMemo(() => {
    return new Date(deadline).toLocaleString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [deadline]);

  const formattedCreatedAt = useMemo(() => {
    return new Date(createdAt).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }, [createdAt]);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={onCardPress}>
        <Text
          style={{ flexShrink: 1, flex: 1 }}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={{ gap: 4 }}>
          <Text>
            {formattedCreatedAt}-{formattedDeadline}
          </Text>
        </View>
      </TouchableOpacity>
      <TaskStatusBadge
        status={status}
        label={statusLabel}
        onStatusPress={onStatusPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
    backgroundColor: theme.colors.cardBackground,
    padding: theme.padding.cardPadding,
    borderRadius: theme.radius.radiusCard,
  },
});
