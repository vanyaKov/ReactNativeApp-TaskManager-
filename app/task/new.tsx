import { TaskCreatePage } from "@/pages/task-create";
import { Stack } from "expo-router";

export default function NewTaskScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "New task", headerRight: () => null }} />
      <TaskCreatePage />
    </>
  );
}
