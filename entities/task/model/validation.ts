import { Task } from "@/entities/task/model/types";
import { Alert } from "react-native";

// validate task data, show alert if data is invalid
export function validateTask(task: Task): boolean {
  if (!task.title || !task.description || !task.location || !task.deadline) {
    Alert.alert(
      "Error",
      "Invalid task data(title, description, location, deadline are required)",
    );
    return false;
  } else {
    return true;
  }
}
