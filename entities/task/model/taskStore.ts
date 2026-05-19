import { loadTasks, saveTasks } from "@/entities/task/api/taskStorage";
import type { Task, TaskStatus } from "@/entities/task/model/types";
import { create } from "zustand";

type TaskStore = {
  tasks: Task[]; // array of tasks
  sortBy: "default" | "status" | "createdAt"; // sort by type
  hydrate: () => Promise<void>; // first load tasks from storage
  addTask: (task: Task) => Promise<void>; // add task to storage
  removeTask: (id: string) => Promise<void>; // remove task from storage
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>; // update task status
  getTaskById: (id: string) => Task | undefined; // get task by id
  setSortBy: (sortBy: "default" | "status" | "createdAt") => void; // set sort by
};

// task store creaion using zustand
export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  sortBy: "default",
  hydrate: async () => {
    set({ tasks: await loadTasks() });
  },

  addTask: async (task: Task) => {
    const nextTasks = [...get().tasks, task];
    set({ tasks: nextTasks });
    await saveTasks(nextTasks);
  },

  removeTask: async (id: string) => {
    const nextTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: nextTasks });
    await saveTasks(nextTasks);
  },

  updateTaskStatus: async (id: string, status: TaskStatus) => {
    const nextTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, status } : task,
    );
    set({ tasks: nextTasks });
    await saveTasks(nextTasks);
  },

  getTaskById: (id: string) => {
    return get().tasks.find((task) => task.id === id);
  },
  setSortBy: (sortBy: "default" | "status" | "createdAt") => {
    set({ sortBy });
  },
}));
