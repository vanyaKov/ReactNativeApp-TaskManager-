import { useTaskStore } from "@/entities/task/model/taskStore";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    // first load tasks from storage
    useTaskStore.getState().hydrate();
  }, []); // for the first time only

  return <Stack />;
}
