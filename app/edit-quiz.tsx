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
import { updateQuiz } from "../services/quizService";
import { useTranslation } from "react-i18next";

export default function EditQuizScreen() {
  const {
    id,
    name: originalName,
    totalQuestions: originalTotal,
  } = useLocalSearchParams();

  const [name, setName] = useState(String(originalName || ""));
  const [totalQuestions, setTotalQuestions] = useState(
    String(originalTotal || "")
  );

  const router = useRouter();
  const { t } = useTranslation();

  const handleUpdate = async () => {
    if (!name.trim() || !totalQuestions.trim()) {
      Alert.alert(t("required"));
      return;
    }
    if (isNaN(Number(totalQuestions)) || Number(totalQuestions) <= 0) {
      Alert.alert(t("invalid"));
      return;
    }
    try {
      await updateQuiz(String(id), {
        name,
        totalQuestions: Number(totalQuestions),
      });
      Alert.alert(t("success"));
      router.replace("/(tabs)/quizzes" as any);
    } catch (err: any) {
      Alert.alert(t("error"), err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t("quizName")}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder={t("totalQuestions")}
        keyboardType="number-pad"
        value={totalQuestions}
        onChangeText={setTotalQuestions}
        style={styles.input}
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
