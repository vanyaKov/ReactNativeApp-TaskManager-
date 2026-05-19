import { TaskDetailPage } from "@/pages/task-detail";
import { useLocalSearchParams } from "expo-router";

export default function TaskDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TaskDetailPage taskId={id} />;
}
