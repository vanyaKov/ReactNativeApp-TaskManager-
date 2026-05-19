import { useTaskStore } from "@/entities/task/model/taskStore";
import { TaskStatus } from "@/entities/task/model/types";
import { TaskCardProps } from "@/entities/task/ui/task-card/model";
import TaskStatusBadge from "@/entities/task/ui/task-status-badge";
import { StatusPicker } from "@/features/update-task";
import theme from "@/shared/config/theme";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  in_progress: "In process",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function TaskCard({ task, onCardPress }: TaskCardProps) {
  const { title, createdAt, deadline, status } = task;
  const [statusPickerVisible, setStatusPickerVisible] = useState(false);
  const onPressStatusPicker = () => {
    setStatusPickerVisible(true);
  };
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const formattedDeadline = useMemo(() => {
    if (!task) return "";
    return new Date(deadline).toLocaleString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [deadline]);

  const formattedCreatedAt = useMemo(() => {
    if (!task) return "";
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
        label={STATUS_LABELS[status]}
        onStatusPress={onPressStatusPicker}
      />
      <StatusPicker
        visible={statusPickerVisible}
        status={status}
        onClose={() => setStatusPickerVisible(false)}
        onSelectStatus={(status) => updateTaskStatus(task.id, status)}
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
