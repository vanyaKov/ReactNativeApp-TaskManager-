import { Task } from "@/entities/task/model/types";

export type TaskCardProps = {
  task: Task;
  onCardPress: () => void;
};
