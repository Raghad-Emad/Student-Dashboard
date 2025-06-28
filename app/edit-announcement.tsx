import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import { updateAnnouncement } from "../services/announcementService";
import { useTranslation } from "react-i18next";

export default function EditAnnouncementScreen() {
  const {
    id,
    title: originalTitle,
    content: originalContent,
  } = useLocalSearchParams();
  const [title, setTitle] = useState(String(originalTitle || ""));
  const [content, setContent] = useState(String(originalContent || ""));
  const router = useRouter();
  const { t } = useTranslation();

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert(t("required"));
      return;
    }

    try {
      await updateAnnouncement(String(id), { title, content });
      Alert.alert(t("success"), t("update"));
      router.replace("/(tabs)/announcments" as any);
    } catch (err: any) {
      Alert.alert(t("error"), err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t("title")}
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder={t("content")}
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, { height: 100 }]}
      />

      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>{t("update")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafe",
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0057b7",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
