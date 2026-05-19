import { useTaskStore } from "@/entities/task/model/taskStore";
import { Task } from "@/entities/task/model/types";

export function useSortTasks(tasks: Task[]) {
  const sortBy = useTaskStore((state) => state.sortBy);
  switch (sortBy) {
    case "createdAt":
      return [...tasks].sort((b, a) => a.createdAt.localeCompare(b.createdAt));
    case "status":
      return [...tasks].sort((a, b) => a.status.localeCompare(b.status));
    default:
      return tasks;
  }
}
