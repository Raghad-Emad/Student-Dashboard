import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { createAnnouncement } from "../services/announcementService";
import { useTranslation } from "react-i18next";

export default function AddAnnouncementScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert(t("required"));
      return;
    }
    try {
      await createAnnouncement({ title, content });
      Alert.alert(t("success"), t("announcementCreated"));
      router.replace("/(tabs)/announcments" as any);
    } catch (err: any) {
      Alert.alert(t("error"));
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

      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>{t("create")}</Text>
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
