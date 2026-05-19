import { TaskCard } from "@/entities/task";
import { useTaskStore } from "@/entities/task/model/taskStore";
import type { TaskStatus } from "@/entities/task/model/types";
import { useSortTasks } from "@/features/sort-tasks";
import { StatusPicker } from "@/features/update-task";
import { TaskListWidgetProps } from "@/widgets/task-list/model";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  in_progress: "In process",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function TaskListWidget({ tasks }: TaskListWidgetProps) {
  const sortedTasks = useSortTasks(tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const [statusPickerTaskId, setStatusPickerTaskId] = useState<string | null>(
    null,
  );

  const statusPickerTask = useMemo(
    () => tasks.find((task) => task.id === statusPickerTaskId),
    [statusPickerTaskId, tasks],
  );

  const onSelectStatus = (status: TaskStatus) => {
    if (!statusPickerTaskId) return;
    updateTaskStatus(statusPickerTaskId, status);
    setStatusPickerTaskId(null);
  };

  return (
    <>
      <FlatList
        data={sortedTasks}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            statusLabel={STATUS_LABELS[item.status]}
            onCardPress={() => router.navigate(`/task/${item.id}`)}
            onStatusPress={() => setStatusPickerTaskId(item.id)}
          />
        )}
        style={styles.container}
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id}
      />
      {statusPickerTask ? (
        <StatusPicker
          visible={Boolean(statusPickerTask)}
          status={statusPickerTask.status}
          onClose={() => setStatusPickerTaskId(null)}
          onSelectStatus={onSelectStatus}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  content: {
    paddingHorizontal: 8,
    gap: 16,
  },
});
