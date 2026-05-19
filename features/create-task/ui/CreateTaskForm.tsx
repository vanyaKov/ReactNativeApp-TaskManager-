import { useTaskStore } from "@/entities/task/model/taskStore";
import { Task } from "@/entities/task/model/types";
import { validateTask } from "@/entities/task/model/validation";
import theme from "@/shared/config/theme";
import { Input } from "@/shared/ui";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState(new Date().toISOString());
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);

  const onDeadlinePickerPress = () => setShowDeadlinePicker(true);

  const onTitleChange = (text: string) => {
    setTitle(text);
  };
  const onDescriptionChange = (text: string) => {
    setDescription(text);
  };
  const onLocationChange = (text: string) => {
    setLocation(text);
  };
  const onDeadlineChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (event.type === "dismissed") {
      setShowDeadlinePicker(false);
      return;
    }
    if (selectedDate) {
      setDeadline(selectedDate.toISOString());
    }
    if (Platform.OS === "android" && event.type === "set") {
      setShowDeadlinePicker(false);
    }
  };

  const formattedDeadline = useMemo(
    () =>
      new Date(deadline).toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [deadline],
  );

  const onSubmitPress = async () => {
    const task: Task = {
      id: Crypto.randomUUID(),
      title,
      description,
      location,
      deadline,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const isValid = validateTask(task);
    if (!isValid) {
      Alert.alert(
        "Error",
        "Invalid task data(title, description, location, deadline are required)",
      );
      return;
    }
    await useTaskStore.getState().addTask(task);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      contentContainerStyle={{ padding: 16 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 8, paddingVertical: 16 }}
      >
        <Input
          placeholder="Title"
          value={title || ""}
          onChangeText={onTitleChange}
        />
        <Input
          placeholder="Description"
          value={description || ""}
          onChangeText={onDescriptionChange}
        />
        <Input
          placeholder="Location"
          value={location || ""}
          onChangeText={onLocationChange}
        />
        <Pressable
          onPress={onDeadlinePickerPress}
          style={({ pressed }) => [
            styles.deadlineField,
            showDeadlinePicker && styles.deadlineFieldActive,
            pressed && styles.deadlineFieldPressed,
          ]}
        >
          <View style={styles.deadlineContent}>
            <Text style={styles.deadlineLabel}>Deadline</Text>
            <Text style={styles.deadlineValue}>{formattedDeadline}</Text>
          </View>
          <Ionicons
            name="calendar-outline"
            size={22}
            color={
              showDeadlinePicker
                ? theme.colors.buttonAddColor
                : theme.colors.descriptionColor
            }
          />
        </Pressable>

        {showDeadlinePicker && (
          <DateTimePicker
            value={new Date(deadline)}
            onChange={onDeadlineChange}
            mode="datetime"
            display="spinner"
            minimumDate={new Date()}
            themeVariant="light"
            style={{
              backgroundColor: theme.colors.cardBackground,
              borderRadius: theme.radius.radiusButton,
              padding: theme.padding.buttonPadding,
              alignSelf: "center",
            }}
          />
        )}
        <TouchableOpacity
          onPress={onSubmitPress}
          style={{
            backgroundColor: theme.colors.buttonAddColor,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  deadlineField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: theme.radius.radiusButton,
    padding: theme.padding.buttonPadding,
    minHeight: 52,
  },
  deadlineFieldActive: {
    borderColor: theme.colors.buttonAddColor,
  },
  deadlineFieldPressed: {
    backgroundColor: theme.colors.screenBackground,
    borderColor: theme.colors.buttonAddColor,
  },
  deadlineContent: {
    flex: 1,
    gap: 4,
  },
  deadlineLabel: {
    fontSize: 12,
    color: theme.colors.descriptionColor,
  },
  deadlineValue: {
    fontSize: theme.fonts.descriptionSize,
    color: theme.colors.titleColor,
    fontWeight: "500",
  },
});
