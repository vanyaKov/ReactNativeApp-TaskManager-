import { Task } from "@/entities/task/model/types";
import { getJson, setJson } from "@/shared/lib/storage";

export async function loadTasks() {
  return (await getJson<Task[]>("tasks")) ?? [];
}

export async function saveTasks(tasks: Task[]) {
  return await setJson<Task[]>("tasks", tasks);
}
