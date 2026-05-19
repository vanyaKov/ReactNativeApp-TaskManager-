import { useTaskStore } from "@/entities/task/model/taskStore";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    useTaskStore.getState().hydrate();
  }, []);

  return <Stack />;
}
