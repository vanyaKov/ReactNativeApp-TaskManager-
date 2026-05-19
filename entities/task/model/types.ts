export type Task = {
  id: string; //Id of task
  title: string; // title of task
  description: string; // description of task
  status: TaskStatus; // status of task from TaskStatus type
  location: string; // location of task
  createdAt: string; // created at of task
  deadline: string; // deadline of task
};

export type TaskStatus = "pending" | "completed" | "cancelled" | "in_progress";
export type TaskSortBy = "default" | "createdAt" | "status";
