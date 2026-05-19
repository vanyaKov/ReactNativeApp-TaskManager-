import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);

    if (raw === null) {
      return null;
    }

    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`[storage] Failed to read key "${key}"`, error);
    return null;
  }
}

export async function setJson<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[storage] Failed to write key "${key}"`, error);
    throw error;
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`[storage] Failed to remove key "${key}"`, error);
    throw error;
  }
}
