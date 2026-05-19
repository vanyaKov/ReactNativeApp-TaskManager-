import { TasksListPage } from "@/pages/tasks-list";
import {
  headerButtonStyles,
  headerIconColors,
  HEADER_ICON_SIZE,
} from "@/shared/config/headerButton";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

function HeaderAddButton() {
  return (
    <Pressable
      style={headerButtonStyles.button}
      onPress={() => router.push("/task/new")}
    >
      <Ionicons
        name="add"
        size={HEADER_ICON_SIZE}
        color={headerIconColors.default}
        style={headerButtonStyles.icon}
      />
    </Pressable>
  );
}

export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Tasks List",
          headerRight: HeaderAddButton,
        }}
      />
      <TasksListPage />
    </>
  );
}
