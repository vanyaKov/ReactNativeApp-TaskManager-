import { TaskStatus } from "@/entities/task/model/types";

export type StatusOption = {
  label: string;
  value: TaskStatus;
};

export type StatusPickerProps = {
  visible: boolean;
  status: TaskStatus;
  onClose: () => void;
  onSelectStatus: (status: TaskStatus) => void;
};
