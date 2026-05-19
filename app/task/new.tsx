import { CreateTaskForm } from "@/features/create-task";
import { Stack } from "expo-router";
export default function NewTaskScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "New task", headerRight: () => null }} />
      <CreateTaskForm />
    </>
  );
}
