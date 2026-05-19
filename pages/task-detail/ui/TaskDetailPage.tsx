import { useTaskStore } from "@/entities/task/model/taskStore";
import type { TaskStatus } from "@/entities/task/model/types";
import { StatusPicker } from "@/features/update-task";
import {
  headerButtonStyles,
  headerIconColors,
  HEADER_ICON_SIZE,
} from "@/shared/config/headerButton";
import theme from "@/shared/config/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  in_progress: "In process",
  completed: "Completed",
  cancelled: "Cancelled",
};

function statusBackground(status: TaskStatus) {
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
}

type TaskDetailPageProps = {
  taskId: string;
};

type DetailRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function TaskDetailPage({ taskId }: TaskDetailPageProps) {
  const navigation = useNavigation();
  const task = useTaskStore((state) => state.getTaskById(taskId));
  const onDeleteTask = useTaskStore((state) => state.removeTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const [statusPickerVisible, setStatusPickerVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: task?.title ?? "",
      headerBackTitle: "Back",
      headerRight: () =>
        task ? (
          <TouchableOpacity
            style={headerButtonStyles.button}
            onPress={async () => {
              await onDeleteTask(task.id);
              router.back();
            }}
          >
            <Ionicons
              name="trash-outline"
              size={HEADER_ICON_SIZE}
              color={headerIconColors.destructive}
              style={headerButtonStyles.icon}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, onDeleteTask, task]);

  const formattedDeadline = useMemo(() => {
    if (!task) return "";
    return new Date(task.deadline).toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [task]);

  const formattedCreatedAt = useMemo(() => {
    if (!task) return "";
    return new Date(task.createdAt).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [task]);

  if (!task) {
    return null;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cardTitle}>
        <Text style={styles.title}>{task.title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusBackground(task.status) },
          ]}
        >
          <TouchableOpacity onPress={() => setStatusPickerVisible(true)}>
            <Text style={styles.statusText}>{STATUS_LABELS[task.status]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {task.description ? (
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <DetailRow
          icon="location-outline"
          label="Location"
          value={task.location}
        />
        <View style={styles.divider} />
        <DetailRow
          icon="calendar-outline"
          label="Deadline"
          value={formattedDeadline}
        />
        <View style={styles.divider} />
        <DetailRow
          icon="time-outline"
          label="Created at"
          value={formattedCreatedAt}
        />
        <StatusPicker
          visible={statusPickerVisible}
          status={task.status}
          onClose={() => setStatusPickerVisible(false)}
          onSelectStatus={(status) => updateTaskStatus(task.id, status)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
  },
  content: {
    padding: theme.padding.screenPadding,
    gap: theme.padding.betweenCards,
    paddingBottom: theme.padding.screenPadding * 2,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.radius.radiusCard,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    padding: theme.padding.cardPadding,
    gap: theme.padding.betweenLines,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.radius.radiusCard,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    padding: theme.padding.cardPadding,
    gap: theme.padding.betweenLines,
  },
  title: {
    fontSize: theme.fonts.titleHeader,
    fontWeight: "700",
    color: theme.colors.titleColor,
    lineHeight: 28,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: theme.padding.badgePadding + 4,
    paddingVertical: theme.padding.badgePadding,
    borderRadius: theme.radius.radiusButton,
  },
  statusText: {
    color: theme.colors.badgeTextColor,
    fontSize: 14,
    fontWeight: "600",
  },
  sectionLabel: {
    fontSize: 12,
    color: theme.colors.descriptionColor,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: theme.fonts.descriptionSize,
    color: theme.colors.titleColor,
    lineHeight: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowLabel: {
    fontSize: 12,
    color: theme.colors.descriptionColor,
  },
  rowValue: {
    fontSize: theme.fonts.descriptionSize,
    color: theme.colors.titleColor,
    fontWeight: "500",
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderColor,
    marginVertical: 4,
  },
});
