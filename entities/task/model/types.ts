export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  location: string;
  createdAt: string;
  deadline: string;
};

export type TaskStatus = "pending" | "completed" | "cancelled" | "in_progress";
export type TaskSortBy = "default" | "createdAt" | "status";
