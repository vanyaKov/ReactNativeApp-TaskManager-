import { TaskCard } from "@/entities/task";
import { useSortTasks } from "@/features/sort-tasks/model/sortTasks";
import { TaskListWidgetProps } from "@/widgets/task-list/model";
import { router } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

export default function TaskListWidget({ tasks }: TaskListWidgetProps) {
  const sortedTasks = useSortTasks(tasks);

  return (
    <FlatList
      data={sortedTasks}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onCardPress={() => router.navigate(`/task/${item.id}`)}
        />
      )}
      style={styles.container}
      contentContainerStyle={styles.content}
      keyExtractor={(item) => item.id}
    />
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
