import { useTaskStore } from "@/entities/task/model/taskStore";
import { TaskListWidget } from "@/widgets/task-list";
import { TaskSortBar } from "@/widgets/tasks-sort-bar";
import { StyleSheet, View } from "react-native";

export default function TasksListPage() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <View style={styles.page}>
      <TaskSortBar />
      <TaskListWidget tasks={tasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
