import { TaskStatus } from "@/entities/task/model/types";

export type TaskStatusBadgeProps = {
  status: TaskStatus;
  label: string;
  onStatusPress: () => void;
};
