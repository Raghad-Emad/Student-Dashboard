import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { deleteQuiz } from "../services/quizService";
import { useTranslation } from "react-i18next";

export default function QuizCard({
  _id,
  name,
  totalQuestions,
  onDeleted,
}: {
  _id: string;
  name: string;
  totalQuestions: number;
  onDeleted: () => void;
}) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleDelete = async () => {
    await deleteQuiz(_id);
    onDeleted();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>
        {totalQuestions} {t("questions")}
      </Text>

      <View style={styles.btnRow}>
        <Pressable
          style={[styles.button, styles.editBtn]}
          onPress={() =>
            router.push({
              pathname: "/edit-quiz",
              params: { id: _id, name, totalQuestions },
            })
          }
        >
          <Text style={styles.buttonText}>{t("edit")}</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.deleteBtn]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>{t("delete")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#f9fafe",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: "#222",
    marginBottom: 6,
  },
  details: {
    color: "#444",
    fontSize: 14,
    marginBottom: 12,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  editBtn: {
    backgroundColor: "#007bff",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
